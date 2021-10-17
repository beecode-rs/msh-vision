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
    constructor({ parsedSource, fileName, inProjectPath, }) {
        this._parsedSource = parsedSource;
        this._fileName = fileName;
        this._inProjectPath = inProjectPath;
    }
    parsedEntities() {
        const entities = [];
        entities.push(...this._parseStatements());
        return entities;
    }
    _parseStatements() {
        const entities = this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat();
        const entityWithJoins = this._joinEntitiesByAliasReference(entities);
        return entityWithJoins;
    }
    _parseStatement(statement) {
        const parser = this._parserByStatementKind(statement);
        if (!parser)
            return [];
        return parser.parse();
    }
    _parserByStatementKind(statement) {
        switch (statement.kind) {
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return new ts_parser_type_1.TsParserType({ statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.ClassDeclaration:
                return new ts_parser_class_1.TsParserClass({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.InterfaceDeclaration:
                return new ts_parser_interface_1.TsParserInterface({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.VariableDeclaration:
            case ts_1.default.SyntaxKind.VariableStatement:
            case ts_1.default.SyntaxKind.VariableDeclarationList:
                return new ts_parser_object_1.TsParserObject({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.EnumDeclaration:
                return new ts_parser_enum_1.TsParserEnum({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsdURBQThCO0FBRTlCLG1GQUE2RTtBQUM3RSxpRkFBMkU7QUFDM0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFDM0UsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUt6QixZQUFZLEVBQ1YsWUFBWSxFQUNaLFFBQVEsRUFDUixhQUFhLEdBS2Q7UUFDQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtJQUNyQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7UUFDekMsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN6RyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEUsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztJQUVTLGVBQWUsQ0FBQyxTQUF1QjtRQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUE7UUFD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RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sUUFBUSxDQUFBO1FBRTFDLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUN4RSxJQUFJLENBQUMsU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN0RixTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQyxPQUFPLFNBQVMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQXJGRCx3Q0FxRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzJ1xuaW1wb3J0IHsgVHNQYXJzZXJFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHBhcnNlZFNvdXJjZSxcbiAgICBmaWxlTmFtZSxcbiAgICBpblByb2plY3RQYXRoLFxuICB9OiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICB9KSB7XG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBmaWxlTmFtZVxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gIH1cblxuICBwdWJsaWMgcGFyc2VkRW50aXRpZXMoKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGVudGl0aWVzOiBFbnRpdHlbXSA9IFtdXG4gICAgZW50aXRpZXMucHVzaCguLi50aGlzLl9wYXJzZVN0YXRlbWVudHMoKSlcbiAgICByZXR1cm4gZW50aXRpZXNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnRzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHRoaXMuX3BhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3RhdGVtZW50KSA9PiB0aGlzLl9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQpKS5mbGF0KClcbiAgICBjb25zdCBlbnRpdHlXaXRoSm9pbnMgPSB0aGlzLl9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzKVxuICAgIHJldHVybiBlbnRpdHlXaXRoSm9pbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5fcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudClcbiAgICBpZiAoIXBhcnNlcikgcmV0dXJuIFtdXG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZSgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFBhcnNhYmxlIHwgdW5kZWZpbmVkIHtcbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckNsYXNzKHsgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkludGVyZmFjZURlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VySW50ZXJmYWNlKHsgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQ6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3Q6XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJPYmplY3QoeyBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyRW51bSh7IHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IHdpdGhBbGlhc1JlZiA9IGVudGl0aWVzLmZpbHRlcihcbiAgICAgIChlbnRpdHkpID0+IGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdCAmJiAoZW50aXR5IGFzIEVudGl0eU9iamVjdCkuQWxpYXNSZWZlcmVuY2VcbiAgICApIGFzIEVudGl0eU9iamVjdFtdXG4gICAgaWYgKHdpdGhBbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgeyBhbGlhc1JlZiwgb3RoZXIgfSA9IGVudGl0aWVzLnJlZHVjZTx7IGFsaWFzUmVmOiBFbnRpdHlbXTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKHJlc3VsdCwgZW50aXR5KSA9PiB7XG4gICAgICAgIGlmICgod2l0aEFsaWFzUmVmIGFzIEVudGl0eVtdKS5pbmNsdWRlcyhlbnRpdHkpKSByZXR1cm4gcmVzdWx0XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYubWFwKChlKSA9PiBlLkFsaWFzUmVmZXJlbmNlKS5pbmNsdWRlcyhlbnRpdHkuTmFtZSkpIHJlc3VsdC5hbGlhc1JlZi5wdXNoKGVudGl0eSlcbiAgICAgICAgZWxzZSByZXN1bHQub3RoZXIucHVzaChlbnRpdHkpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICB7IGFsaWFzUmVmOiBbXSwgb3RoZXI6IFtdIH1cbiAgICApXG4gICAgaWYgKGFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCBhbGlhc2VkRW50aXRpZXMgPSB3aXRoQWxpYXNSZWYubWFwKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kSm9pbiA9IGFsaWFzUmVmLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gZW50aXR5LkFsaWFzUmVmZXJlbmNlKVxuICAgICAgaWYgKCFmb3VuZEpvaW4pIHRocm93IG5ldyBFcnJvcihgSm9pbiBub3QgZm91bmQgZm9yIGVudGl0eSAke0pTT04uc3RyaW5naWZ5KGVudGl0eSl9YClcbiAgICAgIGZvdW5kSm9pbi5yZW5hbWVFbnRpdHkoZW50aXR5Lk5hbWUpXG4gICAgICByZXR1cm4gZm91bmRKb2luXG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxufVxuIl19