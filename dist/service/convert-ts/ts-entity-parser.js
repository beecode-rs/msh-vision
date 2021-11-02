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
            return new entity_1.Entity({
                type: entity.Type,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsdURBQThCO0FBRTlCLG1GQUE2RTtBQUM3RSxpRkFBMkU7QUFFM0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFDM0UsOEVBQXdFO0FBQ3hFLHFEQUFpRDtBQUNqRCxnREFBNEM7QUFDNUMsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUNOLGFBQWEsQ0FBZTtJQUM1QixTQUFTLENBQVE7SUFDakIsY0FBYyxDQUFRO0lBQ3RCLG1CQUFtQixDQUE2QjtJQUVuRSxZQUFZLE1BS1g7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDNUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixDQUFBO0lBQy9DLENBQUM7SUFFTSxjQUFjO1FBQ25CLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNqRyxDQUFDO0lBRVMs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QUFFLFNBQVMsQ0FBQyxhQUFhO2dCQUN0QyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7YUFDckIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixPQUFPLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUFqR0Qsd0NBaUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzJ1xuaW1wb3J0IHsgVHNQYXJzZXJFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IFRzUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZSdcbmltcG9ydCB7IFRzUGFyc2VyT2JqZWN0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdCdcbmltcG9ydCB7IFRzUGFyc2VyVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci10eXBlJ1xuaW1wb3J0IHsgVHNQYXJzaW5nRXJyb3IgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNpbmctZXJyb3InXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY2xhc3MgVHNFbnRpdHlQYXJzZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIGZpbGVOYW1lLCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cyA9IGltcG9ydFBhcnNlUmVzdWx0c1xuICB9XG5cbiAgcHVibGljIHBhcnNlZEVudGl0aWVzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHRoaXMuX3BhcnNlU3RhdGVtZW50cygpXG4gICAgcmV0dXJuIHRoaXMuX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXMpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50cygpOiBFbnRpdHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3RhdGVtZW50KSA9PiB0aGlzLl9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQpKS5mbGF0KClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBFbnRpdHlbXSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgICBpZiAoIXBhcnNlcikgcmV0dXJuIFtdXG4gICAgICByZXR1cm4gcGFyc2VyLnBhcnNlKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciBpbiBmaWxlICR7W3RoaXMuX2luUHJvamVjdFBhdGgsIHRoaXMuX2ZpbGVOYW1lXS5qb2luKGNvbnN0YW50LmZvbGRlclNlcCl9YClcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFRzUGFyc2luZ0Vycm9yICYmIGVycm9yLkNhblByaW50Q29kZSkgbG9nZ2VyLmVycm9yKGVycm9yLlN0YXRlbWVudC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlZFNvdXJjZSA9IHRoaXMuX3BhcnNlZFNvdXJjZVxuICAgIGNvbnN0IGluUHJvamVjdFBhdGggPSB0aGlzLl9pblByb2plY3RQYXRoXG4gICAgY29uc3QgaW1wb3J0UGFyc2VSZXN1bHRzID0gdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzXG5cbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IHdpdGhBbGlhc1JlZiA9IGVudGl0aWVzLmZpbHRlcihcbiAgICAgIChlbnRpdHkpID0+IGVudGl0eS5UeXBlID09PSBFbnRpdHlUeXBlcy5PQkpFQ1QgJiYgKGVudGl0eSBhcyBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPikuTWV0YS5BbGlhc1JlZmVyZW5jZVxuICAgICkgYXMgRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXVxuICAgIGlmICh3aXRoQWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IHsgYWxpYXNSZWYsIG90aGVyIH0gPSBlbnRpdGllcy5yZWR1Y2U8eyBhbGlhc1JlZjogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXTsgb3RoZXI6IEVudGl0eVtdIH0+KFxuICAgICAgKHJlc3VsdCwgZW50aXR5KSA9PiB7XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYuaW5jbHVkZXMoZW50aXR5KSkgcmV0dXJuIHJlc3VsdFxuICAgICAgICBpZiAod2l0aEFsaWFzUmVmLm1hcCgoZSkgPT4gZS5NZXRhLkFsaWFzUmVmZXJlbmNlKS5pbmNsdWRlcyhlbnRpdHkuTmFtZSkpIHJlc3VsdC5hbGlhc1JlZi5wdXNoKGVudGl0eSlcbiAgICAgICAgZWxzZSByZXN1bHQub3RoZXIucHVzaChlbnRpdHkpXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0sXG4gICAgICB7IGFsaWFzUmVmOiBbXSwgb3RoZXI6IFtdIH1cbiAgICApXG4gICAgaWYgKGFsaWFzUmVmLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGVudGl0aWVzXG5cbiAgICBjb25zdCBhbGlhc2VkRW50aXRpZXMgPSB3aXRoQWxpYXNSZWYubWFwKChlbnRpdHkpID0+IHtcbiAgICAgIGNvbnN0IGZvdW5kSm9pbiA9IGFsaWFzUmVmLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gZW50aXR5Lk1ldGEuQWxpYXNSZWZlcmVuY2UpXG4gICAgICBpZiAoIWZvdW5kSm9pbikgdGhyb3cgbmV3IEVycm9yKGBKb2luIG5vdCBmb3VuZCBmb3IgZW50aXR5ICR7SlNPTi5zdHJpbmdpZnkoZW50aXR5KX1gKVxuICAgICAgcmV0dXJuIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBlbnRpdHkuVHlwZSxcbiAgICAgICAgbmFtZTogZW50aXR5Lk5hbWUsXG4gICAgICAgIGlzRXhwb3J0ZWQ6IGZvdW5kSm9pbi5Jc0V4cG9ydGVkLFxuICAgICAgICBpblByb2plY3RQYXRoOiBmb3VuZEpvaW4uSW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgbWV0YTogZm91bmRKb2luLk1ldGEsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gWy4uLm90aGVyLCAuLi5hbGlhc2VkRW50aXRpZXNdXG4gIH1cbn1cbiJdfQ==