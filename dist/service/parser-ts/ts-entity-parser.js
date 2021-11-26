"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEntityParser = void 0;
const entity_types_1 = require("src/enum/entity-types");
const entity_1 = require("src/model/entity");
const reference_1 = require("src/model/reference");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/parser-ts/parser/ts-parser-class");
const ts_parser_enum_1 = require("src/service/parser-ts/parser/ts-parser-enum");
const ts_parser_interface_1 = require("src/service/parser-ts/parser/ts-parser-interface");
const ts_parser_object_1 = require("src/service/parser-ts/parser/ts-parser-object");
const ts_parser_type_1 = require("src/service/parser-ts/parser/ts-parser-type");
const ts_parsing_error_1 = require("src/service/parser-ts/ts-parsing-error");
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
            (0, logger_1.logger)().error(`Error in file ${[this._inProjectPath, this._fileName].join(constant_1.constant.folderSep)}`);
            if (error instanceof ts_parsing_error_1.TsParsingError && error.CanPrintCode)
                (0, logger_1.logger)().error(error.Statement.getText(this._parsedSource));
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
                (0, logger_1.logger)().warn(`Unknown parser for type "${ts_1.default.SyntaxKind[statement.kind]}"`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1lbnRpdHktcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFtRDtBQUNuRCw2Q0FBeUM7QUFDekMsbURBQStDO0FBQy9DLHVEQUE4QjtBQUU5QixrRkFBNEU7QUFDNUUsZ0ZBQTBFO0FBRTFFLDBGQUFvRjtBQUNwRixvRkFBOEU7QUFDOUUsZ0ZBQTBFO0FBQzFFLDZFQUF1RTtBQUN2RSxnREFBNEM7QUFDNUMsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUNOLGFBQWEsQ0FBZTtJQUM1QixTQUFTLENBQVE7SUFDakIsY0FBYyxDQUFRO0lBQ3RCLG1CQUFtQixDQUE2QjtJQUVuRSxZQUFtQixNQUtsQjtRQUNDLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM1RSxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUE7SUFDL0MsQ0FBQztJQUVNLGNBQWM7UUFDbkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDeEMsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lB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QyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUk7b0JBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ3ZDLE9BQU8sSUFBSSxxQkFBUyxDQUFDO29CQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO29CQUNqQixhQUFhLEVBQUUsQ0FBQyxDQUFDLGFBQWE7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztpQkFDdkIsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLElBQUksZUFBTSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtnQkFDakIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO2dCQUNoQyxhQUFhLEVBQUUsU0FBUyxDQUFDLGFBQWE7Z0JBQ3RDLFVBQVU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO2FBQ3JCLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNGO0FBN0dELHdDQTZHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2UnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IFRzUGFyc2VyQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1jbGFzcydcbmltcG9ydCB7IFRzUGFyc2VyRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWVudW0nXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuaW1wb3J0IHsgVHNQYXJzZXJJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdCdcbmltcG9ydCB7IFRzUGFyc2VyVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLXR5cGUnXG5pbXBvcnQgeyBUc1BhcnNpbmdFcnJvciB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzaW5nLWVycm9yJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgZmlsZU5hbWUsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBmaWxlTmFtZVxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzXG4gIH1cblxuICBwdWJsaWMgcGFyc2VkRW50aXRpZXMoKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gdGhpcy5fcGFyc2VTdGF0ZW1lbnRzKClcbiAgICByZXR1cm4gdGhpcy5fam9pbkVudGl0aWVzQnlBbGlhc1JlZmVyZW5jZShlbnRpdGllcylcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnRzKCk6IEVudGl0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyc2VkU291cmNlLnN0YXRlbWVudHMubWFwKChzdGF0ZW1lbnQpID0+IHRoaXMuX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudCkpLmZsYXQoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IEVudGl0eVtdIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyc2VyID0gdGhpcy5fcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudClcbiAgICAgIGlmICghcGFyc2VyKSByZXR1cm4gW11cbiAgICAgIHJldHVybiBwYXJzZXIucGFyc2UoKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIoKS5lcnJvcihgRXJyb3IgaW4gZmlsZSAke1t0aGlzLl9pblByb2plY3RQYXRoLCB0aGlzLl9maWxlTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApfWApXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUc1BhcnNpbmdFcnJvciAmJiBlcnJvci5DYW5QcmludENvZGUpIGxvZ2dlcigpLmVycm9yKGVycm9yLlN0YXRlbWVudC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlZFNvdXJjZSA9IHRoaXMuX3BhcnNlZFNvdXJjZVxuICAgIGNvbnN0IGluUHJvamVjdFBhdGggPSB0aGlzLl9pblByb2plY3RQYXRoXG4gICAgY29uc3QgaW1wb3J0UGFyc2VSZXN1bHRzID0gdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzXG5cbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyKCkud2FybihgVW5rbm93biBwYXJzZXIgZm9yIHR5cGUgXCIke3RzLlN5bnRheEtpbmRbc3RhdGVtZW50LmtpbmRdfVwiYClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfam9pbkVudGl0aWVzQnlBbGlhc1JlZmVyZW5jZShlbnRpdGllczogRW50aXR5W10pOiBFbnRpdHlbXSB7XG4gICAgY29uc3Qgd2l0aEFsaWFzUmVmID0gZW50aXRpZXMuZmlsdGVyKFxuICAgICAgKGVudGl0eSkgPT4gZW50aXR5LlR5cGUgPT09IEVudGl0eVR5cGVzLk9CSkVDVCAmJiAoZW50aXR5IGFzIEVudGl0eTxFbnRpdHlUeXBlcy5PQkpFQ1Q+KS5NZXRhLkFsaWFzUmVmZXJlbmNlXG4gICAgKSBhcyBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPltdXG4gICAgaWYgKHdpdGhBbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgeyBhbGlhc1JlZiwgb3RoZXIgfSA9IGVudGl0aWVzLnJlZHVjZTx7IGFsaWFzUmVmOiBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPltdOyBvdGhlcjogRW50aXR5W10gfT4oXG4gICAgICAocmVzdWx0LCBlbnRpdHkpID0+IHtcbiAgICAgICAgaWYgKHdpdGhBbGlhc1JlZi5pbmNsdWRlcyhlbnRpdHkpKSByZXR1cm4gcmVzdWx0XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYubWFwKChlKSA9PiBlLk1ldGEuQWxpYXNSZWZlcmVuY2UpLmluY2x1ZGVzKGVudGl0eS5OYW1lKSkgcmVzdWx0LmFsaWFzUmVmLnB1c2goZW50aXR5KVxuICAgICAgICBlbHNlIHJlc3VsdC5vdGhlci5wdXNoKGVudGl0eSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfSxcbiAgICAgIHsgYWxpYXNSZWY6IFtdLCBvdGhlcjogW10gfVxuICAgIClcbiAgICBpZiAoYWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IGFsaWFzZWRFbnRpdGllcyA9IHdpdGhBbGlhc1JlZi5tYXAoKGVudGl0eSkgPT4ge1xuICAgICAgY29uc3QgZm91bmRKb2luID0gYWxpYXNSZWYuZmluZCgoZSkgPT4gZS5OYW1lID09PSBlbnRpdHkuTWV0YS5BbGlhc1JlZmVyZW5jZSlcbiAgICAgIGlmICghZm91bmRKb2luKSB0aHJvdyBuZXcgRXJyb3IoYEpvaW4gbm90IGZvdW5kIGZvciBlbnRpdHkgJHtKU09OLnN0cmluZ2lmeShlbnRpdHkpfWApXG5cbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBmb3VuZEpvaW4uUmVmZXJlbmNlcy5tYXAoKHIpID0+IHtcbiAgICAgICAgaWYgKHIuTmFtZSAhPT0gZm91bmRKb2luLk5hbWUpIHJldHVybiByXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICB0eXBlOiByLlR5cGUsXG4gICAgICAgICAgbmFtZTogZW50aXR5Lk5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogci5JblByb2plY3RQYXRoLFxuICAgICAgICAgIGRpcmVjdGlvbjogci5EaXJlY3Rpb24sXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IGVudGl0eS5UeXBlLFxuICAgICAgICBuYW1lOiBlbnRpdHkuTmFtZSxcbiAgICAgICAgaXNFeHBvcnRlZDogZm91bmRKb2luLklzRXhwb3J0ZWQsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IGZvdW5kSm9pbi5JblByb2plY3RQYXRoLFxuICAgICAgICByZWZlcmVuY2VzLFxuICAgICAgICBtZXRhOiBmb3VuZEpvaW4uTWV0YSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxufVxuIl19