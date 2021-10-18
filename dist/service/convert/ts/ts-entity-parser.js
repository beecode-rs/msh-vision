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
        const { parsedSource, fileName, inProjectPath } = params;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQsdURBQThCO0FBRTlCLG1GQUE2RTtBQUM3RSxpRkFBMkU7QUFDM0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFDM0UsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUt6QixZQUFZLE1BQWdGO1FBQzFGLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtJQUNyQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUE7UUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7UUFDekMsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN6RyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEUsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztJQUVTLGVBQWUsQ0FBQyxTQUF1QjtRQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENB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QUFLLEVBQUUsRUFBRSxFQUFFLENBQzVCLENBQUE7UUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sUUFBUSxDQUFBO1FBRTFDLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUN4RSxJQUFJLENBQUMsU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN0RixTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQyxPQUFPLFNBQVMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQTlFRCx3Q0E4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzJ1xuaW1wb3J0IHsgVHNQYXJzZXJFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZTsgZmlsZU5hbWU6IHN0cmluZzsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgZmlsZU5hbWUsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICB9XG5cbiAgcHVibGljIHBhcnNlZEVudGl0aWVzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllczogRW50aXR5W10gPSBbXVxuICAgIGVudGl0aWVzLnB1c2goLi4udGhpcy5fcGFyc2VTdGF0ZW1lbnRzKCkpXG4gICAgcmV0dXJuIGVudGl0aWVzXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50cygpOiBFbnRpdHlbXSB7XG4gICAgY29uc3QgZW50aXRpZXMgPSB0aGlzLl9wYXJzZWRTb3VyY2Uuc3RhdGVtZW50cy5tYXAoKHN0YXRlbWVudCkgPT4gdGhpcy5fcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50KSkuZmxhdCgpXG4gICAgY29uc3QgZW50aXR5V2l0aEpvaW5zID0gdGhpcy5fam9pbkVudGl0aWVzQnlBbGlhc1JlZmVyZW5jZShlbnRpdGllcylcbiAgICByZXR1cm4gZW50aXR5V2l0aEpvaW5zXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogRW50aXR5W10ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgaWYgKCFwYXJzZXIpIHJldHVybiBbXVxuICAgIHJldHVybiBwYXJzZXIucGFyc2UoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZXJCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBQYXJzYWJsZSB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoIChzdGF0ZW1lbnQua2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyVHlwZSh7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uOlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50OlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0OlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyT2JqZWN0KHsgcGFyc2VkU291cmNlOiB0aGlzLl9wYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkVudW1EZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckVudW0oeyBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci53YXJuKGBVbmtub3duIHBhcnNlciBmb3IgdHlwZSBcIiR7dHMuU3ludGF4S2luZFtzdGF0ZW1lbnQua2luZF19XCJgKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBjb25zdCB3aXRoQWxpYXNSZWYgPSBlbnRpdGllcy5maWx0ZXIoXG4gICAgICAoZW50aXR5KSA9PiBlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlPYmplY3QgJiYgKGVudGl0eSBhcyBFbnRpdHlPYmplY3QpLkFsaWFzUmVmZXJlbmNlXG4gICAgKSBhcyBFbnRpdHlPYmplY3RbXVxuICAgIGlmICh3aXRoQWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IHsgYWxpYXNSZWYsIG90aGVyIH0gPSBlbnRpdGllcy5yZWR1Y2U8eyBhbGlhc1JlZjogRW50aXR5W107IG90aGVyOiBFbnRpdHlbXSB9PihcbiAgICAgIChyZXN1bHQsIGVudGl0eSkgPT4ge1xuICAgICAgICBpZiAoKHdpdGhBbGlhc1JlZiBhcyBFbnRpdHlbXSkuaW5jbHVkZXMoZW50aXR5KSkgcmV0dXJuIHJlc3VsdFxuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLm1hcCgoZSkgPT4gZS5BbGlhc1JlZmVyZW5jZSkuaW5jbHVkZXMoZW50aXR5Lk5hbWUpKSByZXN1bHQuYWxpYXNSZWYucHVzaChlbnRpdHkpXG4gICAgICAgIGVsc2UgcmVzdWx0Lm90aGVyLnB1c2goZW50aXR5KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9LFxuICAgICAgeyBhbGlhc1JlZjogW10sIG90aGVyOiBbXSB9XG4gICAgKVxuICAgIGlmIChhbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgYWxpYXNlZEVudGl0aWVzID0gd2l0aEFsaWFzUmVmLm1hcCgoZW50aXR5KSA9PiB7XG4gICAgICBjb25zdCBmb3VuZEpvaW4gPSBhbGlhc1JlZi5maW5kKChlKSA9PiBlLk5hbWUgPT09IGVudGl0eS5BbGlhc1JlZmVyZW5jZSlcbiAgICAgIGlmICghZm91bmRKb2luKSB0aHJvdyBuZXcgRXJyb3IoYEpvaW4gbm90IGZvdW5kIGZvciBlbnRpdHkgJHtKU09OLnN0cmluZ2lmeShlbnRpdHkpfWApXG4gICAgICBmb3VuZEpvaW4ucmVuYW1lRW50aXR5KGVudGl0eS5OYW1lKVxuICAgICAgcmV0dXJuIGZvdW5kSm9pblxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLm90aGVyLCAuLi5hbGlhc2VkRW50aXRpZXNdXG4gIH1cbn1cbiJdfQ==