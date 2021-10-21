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
            foundJoin.renameEntity(entity.Name);
            const joinedEntity = new entity_1.Entity({
                name: entity.Name,
                isExported: foundJoin.IsExported,
                inProjectPath: foundJoin.InProjectPath,
                meta: foundJoin.Meta,
            });
            return joinedEntity;
        });
        return [...other, ...aliasedEntities];
    }
}
exports.TsEntityParser = TsEntityParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELHVEQUE4QjtBQUU5QixtRkFBNkU7QUFDN0UsaUZBQTJFO0FBRTNFLDJGQUFxRjtBQUNyRixxRkFBK0U7QUFDL0UsaUZBQTJFO0FBQzNFLDRDQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFNekIsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzVFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQTtJQUMvQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN4QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFcEUsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pHLENBQUM7SUFFUyxlQUFlLENBQUMsU0FBdUI7UUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFD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RUFBRSxDQUM1QixDQUFBO1FBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUUxQyxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBTSxNQUFNLENBQUMsSUFBcUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUMvRixJQUFJLENBQUMsU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN0RixTQUFTLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQyxNQUFNLFlBQVksR0FBRyxJQUFJLGVBQU0sQ0FBQztnQkFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0JBQ2hDLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYTtnQkFDdEMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2FBQ3JCLENBQUMsQ0FBQTtZQUNGLE9BQU8sWUFBWSxDQUFBO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUdGO0FBaEdELHdDQWdHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlPYmplY3QgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LW9iamVjdCdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IFRzUGFyc2VyQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItY2xhc3MnXG5pbXBvcnQgeyBUc1BhcnNlckVudW0gfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItZW51bSdcbmltcG9ydCB7IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHQgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuaW1wb3J0IHsgVHNQYXJzZXJJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgVHNQYXJzZXJPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItb2JqZWN0J1xuaW1wb3J0IHsgVHNQYXJzZXJUeXBlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLXR5cGUnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjbGFzcyBUc0VudGl0eVBhcnNlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgZmlsZU5hbWUsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBmaWxlTmFtZVxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzXG4gIH1cblxuICBwdWJsaWMgcGFyc2VkRW50aXRpZXMoKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gdGhpcy5fcGFyc2VTdGF0ZW1lbnRzKClcbiAgICBjb25zdCBlbnRpdHlXaXRoSm9pbnMgPSB0aGlzLl9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzKVxuXG4gICAgcmV0dXJuIGVudGl0eVdpdGhKb2luc1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVN0YXRlbWVudHMoKTogRW50aXR5W10ge1xuICAgIHJldHVybiB0aGlzLl9wYXJzZWRTb3VyY2Uuc3RhdGVtZW50cy5tYXAoKHN0YXRlbWVudCkgPT4gdGhpcy5fcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50KSkuZmxhdCgpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogRW50aXR5W10ge1xuICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgaWYgKCFwYXJzZXIpIHJldHVybiBbXVxuICAgIHJldHVybiBwYXJzZXIucGFyc2UoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZXJCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBQYXJzYWJsZSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcGFyc2VkU291cmNlID0gdGhpcy5fcGFyc2VkU291cmNlXG4gICAgY29uc3QgaW5Qcm9qZWN0UGF0aCA9IHRoaXMuX2luUHJvamVjdFBhdGhcbiAgICBjb25zdCBpbXBvcnRQYXJzZVJlc3VsdHMgPSB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHNcblxuICAgIHN3aXRjaCAoc3RhdGVtZW50LmtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlclR5cGUoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyQ2xhc3MoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJJbnRlcmZhY2UoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQ6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3Q6XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJPYmplY3QoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyRW51bSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci53YXJuKGBVbmtub3duIHBhcnNlciBmb3IgdHlwZSBcIiR7dHMuU3ludGF4S2luZFtzdGF0ZW1lbnQua2luZF19XCJgKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBjb25zdCB3aXRoQWxpYXNSZWYgPSBlbnRpdGllcy5maWx0ZXIoXG4gICAgICAoZW50aXR5KSA9PiBlbnRpdHkuTWV0YSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdCAmJiAoZW50aXR5Lk1ldGEgYXMgRW50aXR5T2JqZWN0KS5BbGlhc1JlZmVyZW5jZVxuICAgIClcbiAgICBpZiAod2l0aEFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCB7IGFsaWFzUmVmLCBvdGhlciB9ID0gZW50aXRpZXMucmVkdWNlPHsgYWxpYXNSZWY6IEVudGl0eTxFbnRpdHlPYmplY3Q+W107IG90aGVyOiBFbnRpdHlbXSB9PihcbiAgICAgIChyZXN1bHQsIGVudGl0eSkgPT4ge1xuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLmluY2x1ZGVzKGVudGl0eSkpIHJldHVybiByZXN1bHRcbiAgICAgICAgaWYgKHdpdGhBbGlhc1JlZi5tYXAoKGUpID0+IChlLk1ldGEgYXMgRW50aXR5T2JqZWN0KS5BbGlhc1JlZmVyZW5jZSkuaW5jbHVkZXMoZW50aXR5Lk5hbWUpKSByZXN1bHQuYWxpYXNSZWYucHVzaChlbnRpdHkpXG4gICAgICAgIGVsc2UgcmVzdWx0Lm90aGVyLnB1c2goZW50aXR5KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9LFxuICAgICAgeyBhbGlhc1JlZjogW10sIG90aGVyOiBbXSB9XG4gICAgKVxuICAgIGlmIChhbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgYWxpYXNlZEVudGl0aWVzID0gd2l0aEFsaWFzUmVmLm1hcCgoZW50aXR5KSA9PiB7XG4gICAgICBjb25zdCBmb3VuZEpvaW4gPSBhbGlhc1JlZi5maW5kKChlKSA9PiBlLk5hbWUgPT09IChlbnRpdHkuTWV0YSBhcyBFbnRpdHlPYmplY3QpLkFsaWFzUmVmZXJlbmNlKVxuICAgICAgaWYgKCFmb3VuZEpvaW4pIHRocm93IG5ldyBFcnJvcihgSm9pbiBub3QgZm91bmQgZm9yIGVudGl0eSAke0pTT04uc3RyaW5naWZ5KGVudGl0eSl9YClcbiAgICAgIGZvdW5kSm9pbi5yZW5hbWVFbnRpdHkoZW50aXR5Lk5hbWUpXG4gICAgICBjb25zdCBqb2luZWRFbnRpdHkgPSBuZXcgRW50aXR5KHtcbiAgICAgICAgbmFtZTogZW50aXR5Lk5hbWUsXG4gICAgICAgIGlzRXhwb3J0ZWQ6IGZvdW5kSm9pbi5Jc0V4cG9ydGVkLFxuICAgICAgICBpblByb2plY3RQYXRoOiBmb3VuZEpvaW4uSW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgbWV0YTogZm91bmRKb2luLk1ldGEsXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGpvaW5lZEVudGl0eVxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLm90aGVyLCAuLi5hbGlhc2VkRW50aXRpZXNdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRJXG59XG4iXX0=