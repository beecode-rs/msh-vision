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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELHVEQUE4QjtBQUU5QixtRkFBNkU7QUFDN0UsaUZBQTJFO0FBRTNFLDJGQUFxRjtBQUNyRixxRkFBK0U7QUFDL0UsaUZBQTJFO0FBQzNFLDRDQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFNekIsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzVFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQTtJQUMvQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN4QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFcEUsT0FBTyxlQUFlLENBQUE7SUFDeEIsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pHLENBQUM7SUFFUyxlQUFlLENBQUMsU0FBdUI7UUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFD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RUFBRSxFQUFFLEVBQUUsQ0FDNUIsQ0FBQTtRQUNELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUE7UUFFMUMsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQU0sTUFBTSxDQUFDLElBQXFCLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDL0YsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdEYsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFNLENBQUM7Z0JBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO2dCQUNoQyxhQUFhLEVBQUUsU0FBUyxDQUFDLGFBQWE7Z0JBQ3RDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTthQUNyQixDQUFDLENBQUE7WUFDRixPQUFPLFlBQVksQ0FBQTtRQUNyQixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQTdGRCx3Q0E2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzJ1xuaW1wb3J0IHsgVHNQYXJzZXJFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IFRzUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZSdcbmltcG9ydCB7IFRzUGFyc2VyT2JqZWN0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdCdcbmltcG9ydCB7IFRzUGFyc2VyVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci10eXBlJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY2xhc3MgVHNFbnRpdHlQYXJzZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIGZpbGVOYW1lLCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cyA9IGltcG9ydFBhcnNlUmVzdWx0c1xuICB9XG5cbiAgcHVibGljIHBhcnNlZEVudGl0aWVzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHRoaXMuX3BhcnNlU3RhdGVtZW50cygpXG4gICAgY29uc3QgZW50aXR5V2l0aEpvaW5zID0gdGhpcy5fam9pbkVudGl0aWVzQnlBbGlhc1JlZmVyZW5jZShlbnRpdGllcylcblxuICAgIHJldHVybiBlbnRpdHlXaXRoSm9pbnNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnRzKCk6IEVudGl0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyc2VkU291cmNlLnN0YXRlbWVudHMubWFwKChzdGF0ZW1lbnQpID0+IHRoaXMuX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudCkpLmZsYXQoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLl9wYXJzZXJCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50KVxuICAgIGlmICghcGFyc2VyKSByZXR1cm4gW11cbiAgICByZXR1cm4gcGFyc2VyLnBhcnNlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlZFNvdXJjZSA9IHRoaXMuX3BhcnNlZFNvdXJjZVxuICAgIGNvbnN0IGluUHJvamVjdFBhdGggPSB0aGlzLl9pblByb2plY3RQYXRoXG4gICAgY29uc3QgaW1wb3J0UGFyc2VSZXN1bHRzID0gdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzXG5cbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyQ2xhc3MoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJJbnRlcmZhY2UoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQ6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3Q6XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJPYmplY3QoeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UGFyc2VSZXN1bHRzIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRW51bURlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyRW51bSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci53YXJuKGBVbmtub3duIHBhcnNlciBmb3IgdHlwZSBcIiR7dHMuU3ludGF4S2luZFtzdGF0ZW1lbnQua2luZF19XCJgKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9qb2luRW50aXRpZXNCeUFsaWFzUmVmZXJlbmNlKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBjb25zdCB3aXRoQWxpYXNSZWYgPSBlbnRpdGllcy5maWx0ZXIoXG4gICAgICAoZW50aXR5KSA9PiBlbnRpdHkuTWV0YSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdCAmJiAoZW50aXR5Lk1ldGEgYXMgRW50aXR5T2JqZWN0KS5BbGlhc1JlZmVyZW5jZVxuICAgIClcbiAgICBpZiAod2l0aEFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCB7IGFsaWFzUmVmLCBvdGhlciB9ID0gZW50aXRpZXMucmVkdWNlPHsgYWxpYXNSZWY6IEVudGl0eTxFbnRpdHlPYmplY3Q+W107IG90aGVyOiBFbnRpdHlbXSB9PihcbiAgICAgIChyZXN1bHQsIGVudGl0eSkgPT4ge1xuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLmluY2x1ZGVzKGVudGl0eSkpIHJldHVybiByZXN1bHRcbiAgICAgICAgaWYgKHdpdGhBbGlhc1JlZi5tYXAoKGUpID0+IChlLk1ldGEgYXMgRW50aXR5T2JqZWN0KS5BbGlhc1JlZmVyZW5jZSkuaW5jbHVkZXMoZW50aXR5Lk5hbWUpKSByZXN1bHQuYWxpYXNSZWYucHVzaChlbnRpdHkpXG4gICAgICAgIGVsc2UgcmVzdWx0Lm90aGVyLnB1c2goZW50aXR5KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9LFxuICAgICAgeyBhbGlhc1JlZjogW10sIG90aGVyOiBbXSB9XG4gICAgKVxuICAgIGlmIChhbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgYWxpYXNlZEVudGl0aWVzID0gd2l0aEFsaWFzUmVmLm1hcCgoZW50aXR5KSA9PiB7XG4gICAgICBjb25zdCBmb3VuZEpvaW4gPSBhbGlhc1JlZi5maW5kKChlKSA9PiBlLk5hbWUgPT09IChlbnRpdHkuTWV0YSBhcyBFbnRpdHlPYmplY3QpLkFsaWFzUmVmZXJlbmNlKVxuICAgICAgaWYgKCFmb3VuZEpvaW4pIHRocm93IG5ldyBFcnJvcihgSm9pbiBub3QgZm91bmQgZm9yIGVudGl0eSAke0pTT04uc3RyaW5naWZ5KGVudGl0eSl9YClcbiAgICAgIGNvbnN0IGpvaW5lZEVudGl0eSA9IG5ldyBFbnRpdHkoe1xuICAgICAgICBuYW1lOiBlbnRpdHkuTmFtZSxcbiAgICAgICAgaXNFeHBvcnRlZDogZm91bmRKb2luLklzRXhwb3J0ZWQsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IGZvdW5kSm9pbi5JblByb2plY3RQYXRoLFxuICAgICAgICBtZXRhOiBmb3VuZEpvaW4uTWV0YSxcbiAgICAgIH0pXG4gICAgICByZXR1cm4gam9pbmVkRW50aXR5XG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxufVxuIl19