"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEntityParser = void 0;
const entity_object_1 = require("src/model/entity-object");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/convert/ts/parser/ts-parser-class");
const ts_parser_enum_1 = require("src/service/convert/ts/parser/ts-parser-enum");
const ts_parser_interface_1 = require("src/service/convert/ts/parser/ts-parser-interface");
const ts_parser_object_1 = require("src/service/convert/ts/parser/ts-parser-object");
const ts_parser_type_1 = require("src/service/convert/ts/parser/ts-parser-type");
const logger_1 = require("src/util/logger");
class TsEntityParser {
    constructor(params) {
        const { parsedSource, fileName, inProjectPath, importParseResults } = params;
        this._parsedSource = parsedSource;
        this._fileName = fileName;
        this._inProjectPath = inProjectPath;
        this._importParseResults = importParseResults;
    }
    parsedEntities() {
        const entities = this._parseStatements();
        const entityWithJoins = this._joinEntitiesByAliasReference(entities);
        return entityWithJoins;
    }
    _parseStatements() {
        return this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat();
    }
    _parseStatement(statement) {
        const parser = this._parserByStatementKind(statement);
        if (!parser)
            return [];
        return parser.parse();
    }
    _parserByStatementKind(statement) {
        const parsedSource = this._parsedSource;
        const inProjectPath = this._inProjectPath;
        const importParseResults = this._importParseResults;
        switch (statement.kind) {
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return new ts_parser_type_1.TsParserType({ statement, inProjectPath });
            case ts_1.default.SyntaxKind.ClassDeclaration:
                return new ts_parser_class_1.TsParserClass({ parsedSource, statement, inProjectPath, importParseResults });
            case ts_1.default.SyntaxKind.InterfaceDeclaration:
                return new ts_parser_interface_1.TsParserInterface({ parsedSource, statement, inProjectPath });
            case ts_1.default.SyntaxKind.VariableDeclaration:
            case ts_1.default.SyntaxKind.VariableStatement:
            case ts_1.default.SyntaxKind.VariableDeclarationList:
                return new ts_parser_object_1.TsParserObject({ parsedSource, statement, inProjectPath, importParseResults });
            case ts_1.default.SyntaxKind.EnumDeclaration:
                return new ts_parser_enum_1.TsParserEnum({ parsedSource, statement, inProjectPath });
            case ts_1.default.SyntaxKind.ImportDeclaration:
                return undefined;
            default:
                logger_1.logger.warn(`Unknown parser for type "${ts_1.default.SyntaxKind[statement.kind]}"`);
                return undefined;
        }
    }
    _joinEntitiesByAliasReference(entities) {
        const withAliasRef = entities.filter((entity) => entity instanceof entity_object_1.EntityObject && entity.AliasReference);
        if (withAliasRef.length === 0)
            return entities;
        const { aliasRef, other } = entities.reduce((result, entity) => {
            if (withAliasRef.includes(entity))
                return result;
            if (withAliasRef.map((e) => e.AliasReference).includes(entity.Name))
                result.aliasRef.push(entity);
            else
                result.other.push(entity);
            return result;
        }, { aliasRef: [], other: [] });
        if (aliasRef.length === 0)
            return entities;
        const aliasedEntities = withAliasRef.map((entity) => {
            const foundJoin = aliasRef.find((e) => e.Name === entity.AliasReference);
            if (!foundJoin)
                throw new Error(`Join not found for entity ${JSON.stringify(entity)}`);
            foundJoin.renameEntity(entity.Name);
            return foundJoin;
        });
        return [...other, ...aliasedEntities];
    }
}
exports.TsEntityParser = TsEntityParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsdURBQThCO0FBRTlCLG1GQUE2RTtBQUM3RSxpRkFBMkU7QUFFM0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFDM0UsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQU16QixZQUFZLE1BS1g7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDNUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFBO0lBQy9DLENBQUM7SUFFTSxjQUFjO1FBQ25CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ3hDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVwRSxPQUFPLGVBQWUsQ0FBQTtJQUN4QixDQUFDO0lBRVMsZ0JBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDakcsQ0FBQztJQUVTLGVBQWUsQ0FBQyxTQUF1QjtRQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENB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QUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUUxQyxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDeEUsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdEYsU0FBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDbkMsT0FBTyxTQUFTLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBR0Y7QUExRkQsd0NBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJDbGFzcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1jbGFzcydcbmltcG9ydCB7IFRzUGFyc2VyRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1lbnVtJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyBUc1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBmaWxlTmFtZSwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9maWxlTmFtZSA9IGZpbGVOYW1lXG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHNcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZWRFbnRpdGllcygpOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgZW50aXRpZXMgPSB0aGlzLl9wYXJzZVN0YXRlbWVudHMoKVxuICAgIGNvbnN0IGVudGl0eVdpdGhKb2lucyA9IHRoaXMuX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXMpXG5cbiAgICByZXR1cm4gZW50aXR5V2l0aEpvaW5zXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50cygpOiBFbnRpdHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3RhdGVtZW50KSA9PiB0aGlzLl9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQpKS5mbGF0KClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5fcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudClcbiAgICBpZiAoIXBhcnNlcikgcmV0dXJuIFtdXG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFBhcnNhYmxlIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBwYXJzZWRTb3VyY2UgPSB0aGlzLl9wYXJzZWRTb3VyY2VcbiAgICBjb25zdCBpblByb2plY3RQYXRoID0gdGhpcy5faW5Qcm9qZWN0UGF0aFxuICAgIGNvbnN0IGltcG9ydFBhcnNlUmVzdWx0cyA9IHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0c1xuXG4gICAgc3dpdGNoIChzdGF0ZW1lbnQua2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyVHlwZSh7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IHdpdGhBbGlhc1JlZiA9IGVudGl0aWVzLmZpbHRlcihcbiAgICAgIChlbnRpdHkpID0+IGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdCAmJiAoZW50aXR5IGFzIEVudGl0eU9iamVjdCkuQWxpYXNSZWZlcmVuY2VcbiAgICApIGFzIEVudGl0eU9iamVjdFtdXG4gICAgaWYgKHdpdGhBbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgeyBhbGlhc1JlZiwgb3RoZXIgfSA9IGVudGl0aWVzLnJlZHVjZTx7IGFsaWFzUmVmOiBFbnRpdHlbXTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKHJlc3VsdCwgZW50aXR5KSA9PiB7XG4gICAgICAgIGlmICgod2l0aEFsaWFzUmVmIGFzIEVudGl0eVtdKS5pbmNsdWRlcyhlbnRpdHkpKSByZXR1cm4gcmVzdWx0XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYubWFwKChlKSA9PiBlLkFsaWFzUmVmZXJlbmNlKS5pbmNsdWRlcyhlbnRpdHkuTmFtZSkpIHJlc3VsdC5hbGlhc1JlZi5wdXNoKGVudGl0eSlcbiAgICAgICAgZWxzZSByZXN1bHQub3RoZXIucHVzaChlbnRpdHkpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICB7IGFsaWFzUmVmOiBbXSwgb3RoZXI6IFtdIH1cbiAgICApXG4gICAgaWYgKGFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCBhbGlhc2VkRW50aXRpZXMgPSB3aXRoQWxpYXNSZWYubWFwKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kSm9pbiA9IGFsaWFzUmVmLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gZW50aXR5LkFsaWFzUmVmZXJlbmNlKVxuICAgICAgaWYgKCFmb3VuZEpvaW4pIHRocm93IG5ldyBFcnJvcihgSm9pbiBub3QgZm91bmQgZm9yIGVudGl0eSAke0pTT04uc3RyaW5naWZ5KGVudGl0eSl9YClcbiAgICAgIGZvdW5kSm9pbi5yZW5hbWVFbnRpdHkoZW50aXR5Lk5hbWUpXG4gICAgICByZXR1cm4gZm91bmRKb2luXG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZElcbn1cbiJdfQ==