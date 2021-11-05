"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEntityParser = void 0;
const entity_types_1 = require("src/enum/entity-types");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/convert-ts/parser/ts-parser-class");
const ts_parser_enum_1 = require("src/service/convert-ts/parser/ts-parser-enum");
const ts_parser_interface_1 = require("src/service/convert-ts/parser/ts-parser-interface");
const ts_parser_object_1 = require("src/service/convert-ts/parser/ts-parser-object");
const ts_parser_type_1 = require("src/service/convert-ts/parser/ts-parser-type");
const ts_parsing_error_1 = require("src/service/convert-ts/ts-parsing-error");
const entity_1 = require("src/service/model/entity");
const reference_1 = require("src/service/model/reference");
const constant_1 = require("src/util/constant");
const logger_1 = require("src/util/logger");
class TsEntityParser {
    _parsedSource;
    _fileName;
    _inProjectPath;
    _importParseResults;
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
        try {
            const parser = this._parserByStatementKind(statement);
            if (!parser)
                return [];
            return parser.parse();
        }
        catch (error) {
            logger_1.logger.error(`Error in file ${[this._inProjectPath, this._fileName].join(constant_1.constant.folderSep)}`);
            if (error instanceof ts_parsing_error_1.TsParsingError && error.CanPrintCode)
                logger_1.logger.error(error.Statement.getText(this._parsedSource));
            throw error;
        }
    }
    _parserByStatementKind(statement) {
        const parsedSource = this._parsedSource;
        const inProjectPath = this._inProjectPath;
        const importParseResults = this._importParseResults;
        switch (statement.kind) {
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return new ts_parser_type_1.TsParserType({ parsedSource, statement, inProjectPath, importParseResults });
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
        const withAliasRef = entities.filter((entity) => entity.Type === entity_types_1.EntityTypes.OBJECT && entity.Meta.AliasReference);
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
            const references = foundJoin.References.map((r) => {
                if (r.Name !== foundJoin.Name)
                    return r;
                return new reference_1.Reference({
                    type: r.Type,
                    name: entity.Name,
                    inProjectPath: r.InProjectPath,
                    direction: r.Direction,
                });
            });
            return new entity_1.Entity({
                type: entity.Type,
                name: entity.Name,
                isExported: foundJoin.IsExported,
                inProjectPath: foundJoin.InProjectPath,
                references,
                meta: foundJoin.Meta,
            });
        });
        return [...other, ...aliasedEntities];
    }
}
exports.TsEntityParser = TsEntityParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsdURBQThCO0FBRTlCLG1GQUE2RTtBQUM3RSxpRkFBMkU7QUFFM0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFDM0UsOEVBQXdFO0FBQ3hFLHFEQUFpRDtBQUNqRCwyREFBdUQ7QUFDdkQsZ0RBQTRDO0FBQzVDLDRDQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFDTixhQUFhLENBQWU7SUFDNUIsU0FBUyxDQUFRO0lBQ2pCLGNBQWMsQ0FBUTtJQUN0QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzVFLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQTtJQUMvQyxDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN4QyxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRVMsZ0JBQWdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFD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RSxPQUFPLENBQUMsQ0FBQTtnQkFDdkMsT0FBTyxJQUFJLHFCQUFTLENBQUM7b0JBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDWixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ2pCLGFBQWEsRUFBRSxDQUFDLENBQUMsYUFBYTtvQkFDOUIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO2lCQUN2QixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sSUFBSSxlQUFNLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVU7Z0JBQ2hDLGFBQWEsRUFBRSxTQUFTLENBQUMsYUFBYTtnQkFDdEMsVUFBVTtnQkFDVixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7YUFDckIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUE3R0Qsd0NBNkdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzJ1xuaW1wb3J0IHsgVHNQYXJzZXJFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IFRzUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZSdcbmltcG9ydCB7IFRzUGFyc2VyT2JqZWN0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdCdcbmltcG9ydCB7IFRzUGFyc2VyVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci10eXBlJ1xuaW1wb3J0IHsgVHNQYXJzaW5nRXJyb3IgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNpbmctZXJyb3InXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9yZWZlcmVuY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY2xhc3MgVHNFbnRpdHlQYXJzZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIGZpbGVOYW1lLCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cyA9IGltcG9ydFBhcnNlUmVzdWx0c1xuICB9XG5cbiAgcHVibGljIHBhcnNlZEVudGl0aWVzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHRoaXMuX3BhcnNlU3RhdGVtZW50cygpXG4gICAgcmV0dXJuIHRoaXMuX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXMpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50cygpOiBFbnRpdHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3RhdGVtZW50KSA9PiB0aGlzLl9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQpKS5mbGF0KClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBFbnRpdHlbXSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgICBpZiAoIXBhcnNlcikgcmV0dXJuIFtdXG4gICAgICByZXR1cm4gcGFyc2VyLnBhcnNlKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciBpbiBmaWxlICR7W3RoaXMuX2luUHJvamVjdFBhdGgsIHRoaXMuX2ZpbGVOYW1lXS5qb2luKGNvbnN0YW50LmZvbGRlclNlcCl9YClcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFRzUGFyc2luZ0Vycm9yICYmIGVycm9yLkNhblByaW50Q29kZSkgbG9nZ2VyLmVycm9yKGVycm9yLlN0YXRlbWVudC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlZFNvdXJjZSA9IHRoaXMuX3BhcnNlZFNvdXJjZVxuICAgIGNvbnN0IGluUHJvamVjdFBhdGggPSB0aGlzLl9pblByb2plY3RQYXRoXG4gICAgY29uc3QgaW1wb3J0UGFyc2VSZXN1bHRzID0gdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzXG5cbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IHdpdGhBbGlhc1JlZiA9IGVudGl0aWVzLmZpbHRlcihcbiAgICAgIChlbnRpdHkpID0+IGVudGl0eS5UeXBlID09PSBFbnRpdHlUeXBlcy5PQkpFQ1QgJiYgKGVudGl0eSBhcyBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPikuTWV0YS5BbGlhc1JlZmVyZW5jZVxuICAgICkgYXMgRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXVxuICAgIGlmICh3aXRoQWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IHsgYWxpYXNSZWYsIG90aGVyIH0gPSBlbnRpdGllcy5yZWR1Y2U8eyBhbGlhc1JlZjogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKHJlc3VsdCwgZW50aXR5KSA9PiB7XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYuaW5jbHVkZXMoZW50aXR5KSkgcmV0dXJuIHJlc3VsdFxuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLm1hcCgoZSkgPT4gZS5NZXRhLkFsaWFzUmVmZXJlbmNlKS5pbmNsdWRlcyhlbnRpdHkuTmFtZSkpIHJlc3VsdC5hbGlhc1JlZi5wdXNoKGVudGl0eSlcbiAgICAgICAgZWxzZSByZXN1bHQub3RoZXIucHVzaChlbnRpdHkpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICB7IGFsaWFzUmVmOiBbXSwgb3RoZXI6IFtdIH1cbiAgICApXG4gICAgaWYgKGFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCBhbGlhc2VkRW50aXRpZXMgPSB3aXRoQWxpYXNSZWYubWFwKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kSm9pbiA9IGFsaWFzUmVmLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gZW50aXR5Lk1ldGEuQWxpYXNSZWZlcmVuY2UpXG4gICAgICBpZiAoIWZvdW5kSm9pbikgdGhyb3cgbmV3IEVycm9yKGBKb2luIG5vdCBmb3VuZCBmb3IgZW50aXR5ICR7SlNPTi5zdHJpbmdpZnkoZW50aXR5KX1gKVxuXG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZm91bmRKb2luLlJlZmVyZW5jZXMubWFwKChyKSA9PiB7XG4gICAgICAgIGlmIChyLk5hbWUgIT09IGZvdW5kSm9pbi5OYW1lKSByZXR1cm4gclxuICAgICAgICByZXR1cm4gbmV3IFJlZmVyZW5jZSh7XG4gICAgICAgICAgdHlwZTogci5UeXBlLFxuICAgICAgICAgIG5hbWU6IGVudGl0eS5OYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IHIuSW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgICBkaXJlY3Rpb246IHIuRGlyZWN0aW9uLFxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBlbnRpdHkuVHlwZSxcbiAgICAgICAgbmFtZTogZW50aXR5Lk5hbWUsXG4gICAgICAgIGlzRXhwb3J0ZWQ6IGZvdW5kSm9pbi5Jc0V4cG9ydGVkLFxuICAgICAgICBpblByb2plY3RQYXRoOiBmb3VuZEpvaW4uSW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgcmVmZXJlbmNlcyxcbiAgICAgICAgbWV0YTogZm91bmRKb2luLk1ldGEsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLm90aGVyLCAuLi5hbGlhc2VkRW50aXRpZXNdXG4gIH1cbn1cbiJdfQ==