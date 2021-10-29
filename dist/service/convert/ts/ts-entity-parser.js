"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEntityParser = void 0;
const entity_1 = require("src/model/entity");
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
        return this._joinEntitiesByAliasReference(entities);
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
                return new ts_parser_type_1.TsParserType({ parsedSource, statement, inProjectPath });
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
        const withAliasRef = entities.filter((entity) => entity.Meta instanceof entity_object_1.EntityObject && entity.Meta.AliasReference);
        if (withAliasRef.length === 0)
            return entities;
        const { aliasRef, other } = entities.reduce((result, entity) => {
            if (withAliasRef.includes(entity))
                return result;
            if (withAliasRef.map((e) => e.Meta.AliasReference).includes(entity.Name))
                result.aliasRef.push(entity);
            else
                result.other.push(entity);
            return result;
        }, { aliasRef: [], other: [] });
        if (aliasRef.length === 0)
            return entities;
        const aliasedEntities = withAliasRef.map((entity) => {
            const foundJoin = aliasRef.find((e) => e.Name === entity.Meta.AliasReference);
            if (!foundJoin)
                throw new Error(`Join not found for entity ${JSON.stringify(entity)}`);
            return new entity_1.Entity({
                name: entity.Name,
                isExported: foundJoin.IsExported,
                inProjectPath: foundJoin.InProjectPath,
                meta: foundJoin.Meta,
            });
        });
        return [...other, ...aliasedEntities];
    }
}
exports.TsEntityParser = TsEntityParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELHVEQUE4QjtBQUU5QixtRkFBNkU7QUFDN0UsaUZBQTJFO0FBRTNFLDJGQUFxRjtBQUNyRixxRkFBK0U7QUFDL0UsaUZBQTJFO0FBQzNFLDRDQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFNekIsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzVFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQTtJQUMvQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDakcsQ0FBQztJQUVTLGVBQWUsQ0FBQyxTQUF1QjtRQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFD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SUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUUxQyxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBTSxNQUFNLENBQUMsSUFBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMvRixJQUFJLENBQUMsU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN0RixPQUFPLElBQUksZUFBTSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTLENBQUMsVUFBVTtnQkFDaEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxhQUFhO2dCQUN0QyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7YUFDckIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUExRkQsd0NBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJDbGFzcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1jbGFzcydcbmltcG9ydCB7IFRzUGFyc2VyRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1lbnVtJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyBUc1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBmaWxlTmFtZSwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9maWxlTmFtZSA9IGZpbGVOYW1lXG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHNcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZWRFbnRpdGllcygpOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgZW50aXRpZXMgPSB0aGlzLl9wYXJzZVN0YXRlbWVudHMoKVxuICAgIHJldHVybiB0aGlzLl9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVN0YXRlbWVudHMoKTogRW50aXR5W10ge1xuICAgIHJldHVybiB0aGlzLl9wYXJzZWRTb3VyY2Uuc3RhdGVtZW50cy5tYXAoKHN0YXRlbWVudCkgPT4gdGhpcy5fcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50KSkuZmxhdCgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogRW50aXR5W10ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgaWYgKCFwYXJzZXIpIHJldHVybiBbXVxuICAgIHJldHVybiBwYXJzZXIucGFyc2UoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZXJCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBQYXJzYWJsZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VkU291cmNlID0gdGhpcy5fcGFyc2VkU291cmNlXG4gICAgY29uc3QgaW5Qcm9qZWN0UGF0aCA9IHRoaXMuX2luUHJvamVjdFBhdGhcbiAgICBjb25zdCBpbXBvcnRQYXJzZVJlc3VsdHMgPSB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHNcblxuICAgIHN3aXRjaCAoc3RhdGVtZW50LmtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlclR5cGUoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IHdpdGhBbGlhc1JlZiA9IGVudGl0aWVzLmZpbHRlcihcbiAgICAgIChlbnRpdHkpID0+IGVudGl0eS5NZXRhIGluc3RhbmNlb2YgRW50aXR5T2JqZWN0ICYmIChlbnRpdHkuTWV0YSBhcyBFbnRpdHlPYmplY3QpLkFsaWFzUmVmZXJlbmNlXG4gICAgKVxuICAgIGlmICh3aXRoQWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IHsgYWxpYXNSZWYsIG90aGVyIH0gPSBlbnRpdGllcy5yZWR1Y2U8eyBhbGlhc1JlZjogRW50aXR5PEVudGl0eU9iamVjdD5bXTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKHJlc3VsdCwgZW50aXR5KSA9PiB7XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYuaW5jbHVkZXMoZW50aXR5KSkgcmV0dXJuIHJlc3VsdFxuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLm1hcCgoZSkgPT4gKGUuTWV0YSBhcyBFbnRpdHlPYmplY3QpLkFsaWFzUmVmZXJlbmNlKS5pbmNsdWRlcyhlbnRpdHkuTmFtZSkpIHJlc3VsdC5hbGlhc1JlZi5wdXNoKGVudGl0eSlcbiAgICAgICAgZWxzZSByZXN1bHQub3RoZXIucHVzaChlbnRpdHkpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICB7IGFsaWFzUmVmOiBbXSwgb3RoZXI6IFtdIH1cbiAgICApXG4gICAgaWYgKGFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCBhbGlhc2VkRW50aXRpZXMgPSB3aXRoQWxpYXNSZWYubWFwKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kSm9pbiA9IGFsaWFzUmVmLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gKGVudGl0eS5NZXRhIGFzIEVudGl0eU9iamVjdCkuQWxpYXNSZWZlcmVuY2UpXG4gICAgICBpZiAoIWZvdW5kSm9pbikgdGhyb3cgbmV3IEVycm9yKGBKb2luIG5vdCBmb3VuZCBmb3IgZW50aXR5ICR7SlNPTi5zdHJpbmdpZnkoZW50aXR5KX1gKVxuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkoe1xuICAgICAgICBuYW1lOiBlbnRpdHkuTmFtZSxcbiAgICAgICAgaXNFeHBvcnRlZDogZm91bmRKb2luLklzRXhwb3J0ZWQsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IGZvdW5kSm9pbi5JblByb2plY3RQYXRoLFxuICAgICAgICBtZXRhOiBmb3VuZEpvaW4uTWV0YSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxufVxuIl19