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
            (0, logger_1.logger)().error(`Error in file ${[this._inProjectPath, this._fileName].join((0, constant_1.constant)().folderSep)}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1lbnRpdHktcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFtRDtBQUNuRCw2Q0FBeUM7QUFDekMsbURBQStDO0FBQy9DLHVEQUE4QjtBQUU5QixrRkFBNEU7QUFDNUUsZ0ZBQTBFO0FBRTFFLDBGQUFvRjtBQUNwRixvRkFBOEU7QUFDOUUsZ0ZBQTBFO0FBQzFFLDZFQUF1RTtBQUN2RSxnREFBNEM7QUFDNUMsNENBQXdDO0FBRXhDLE1BQWEsY0FBYztJQUNOLGFBQWEsQ0FBZTtJQUM1QixTQUFTLENBQVE7SUFDakIsY0FBYyxDQUFRO0lBQ3RCLG1CQUFtQixDQUE2QjtJQUVuRSxZQUFtQixNQUtsQjtRQUNDLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM1RSxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUE7SUFDL0MsQ0FBQztJQUVNLGNBQWM7UUFDbkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7UUFDeEMsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pHLENBQUM7SUFFUyxlQUFlLENBQUMsU0FBdUI7UUFDL0MsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsTUFBTTtnQkFBRSxPQUFPLEVBQUUsQ0FBQTtZQUN0QixPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUN0QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBQSxlQUFNLEdBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVEsR0FBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNuRyxJQUFJLEtBQUssWUFBWSxpQ0FBYyxJQUFJLEtBQUssQ0FBQyxZQUFZO2dCQUFFLElBQUEsZUFBTSxHQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1lBQ3RILE1BQU0sS0FBSyxDQUFBO1NBQ1o7SUFDSCxDQUFDO0lBRVMsc0JBQXNCLENBQUMsU0FBdUI7UUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUN2QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFBO1FBQ3pDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFBO1FBRW5ELFFBQVEsU0FBUyxDQUFDLElBQUksRUFBRTtZQUN0QixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO2dCQUNyQyxPQUFPLElBQUksNkJBQVksQ0FBQyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtZQUN6RixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2dCQUNqQyxPQUFPLElBQUksK0JBQWEsQ0FBQyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtZQUMxRixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO2dCQUNyQyxPQUFPLElBQUksdUNBQWlCLENBQUMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7WUFDMUUsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZDLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQyxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO2dCQUN4QyxPQUFPLElBQUksaUNBQWMsQ0FBQyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtZQUMzRixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZTtnQkFDaEMsT0FBTyxJQUFJLDZCQUFZLENBQUMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7WUFDckUsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtnQkFDbEMsT0FBTyxTQUFTLENBQUE7WUFDbEI7Z0JBQ0UsSUFBQSxlQUFNLEdBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLFlBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0UsT0FBTyxTQUFTLENBQUE7U0FDbkI7SUFDSCxDQUFDO0lBRVMsNkJBQTZCLENBQUMsUUFBa0I7UUFDeEQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDbEMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssMEJBQVcsQ0FBQyxNQUFNLElBQUssTUFBcUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUM3RSxDQUFBO1FBQ2pDLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUE7UUFFOUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUN6QyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqQixJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUFFLE9BQU8sTUFBTSxDQUFBO1lBQ2hELElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTs7Z0JBQ2pHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzlCLE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQyxFQUNELEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQzVCLENBQUE7UUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sUUFBUSxDQUFBO1FBRTFDLE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDN0UsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7WUFFdEYsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJO29CQUFFLE9BQU8sQ0FBQyxDQUFBO2dCQUN2QyxPQUFPLElBQUkscUJBQVMsQ0FBQztvQkFDbkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNaLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDakIsYUFBYSxFQUFFLENBQUMsQ0FBQyxhQUFhO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7aUJBQ3ZCLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1lBRUYsT0FBTyxJQUFJLGVBQU0sQ0FBQztnQkFDaEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO2dCQUNqQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTLENBQUMsVUFBVTtnQkFDaEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxhQUFhO2dCQUN0QyxVQUFVO2dCQUNWLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTthQUNyQixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQTdHRCx3Q0E2R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvcmVmZXJlbmNlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItY2xhc3MnXG5pbXBvcnQgeyBUc1BhcnNlckVudW0gfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1lbnVtJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IFRzUGFyc2VySW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItaW50ZXJmYWNlJ1xuaW1wb3J0IHsgVHNQYXJzZXJPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci10eXBlJ1xuaW1wb3J0IHsgVHNQYXJzaW5nRXJyb3IgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2luZy1lcnJvcidcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjbGFzcyBUc0VudGl0eVBhcnNlciB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgICBpbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuICB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIGZpbGVOYW1lLCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICAgIHRoaXMuX2ZpbGVOYW1lID0gZmlsZU5hbWVcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cyA9IGltcG9ydFBhcnNlUmVzdWx0c1xuICB9XG5cbiAgcHVibGljIHBhcnNlZEVudGl0aWVzKCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHRoaXMuX3BhcnNlU3RhdGVtZW50cygpXG4gICAgcmV0dXJuIHRoaXMuX2pvaW5FbnRpdGllc0J5QWxpYXNSZWZlcmVuY2UoZW50aXRpZXMpXG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlU3RhdGVtZW50cygpOiBFbnRpdHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3RhdGVtZW50KSA9PiB0aGlzLl9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQpKS5mbGF0KClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnQoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBFbnRpdHlbXSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IHRoaXMuX3BhcnNlckJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQpXG4gICAgICBpZiAoIXBhcnNlcikgcmV0dXJuIFtdXG4gICAgICByZXR1cm4gcGFyc2VyLnBhcnNlKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyKCkuZXJyb3IoYEVycm9yIGluIGZpbGUgJHtbdGhpcy5faW5Qcm9qZWN0UGF0aCwgdGhpcy5fZmlsZU5hbWVdLmpvaW4oY29uc3RhbnQoKS5mb2xkZXJTZXApfWApXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUc1BhcnNpbmdFcnJvciAmJiBlcnJvci5DYW5QcmludENvZGUpIGxvZ2dlcigpLmVycm9yKGVycm9yLlN0YXRlbWVudC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcnNlZFNvdXJjZSA9IHRoaXMuX3BhcnNlZFNvdXJjZVxuICAgIGNvbnN0IGluUHJvamVjdFBhdGggPSB0aGlzLl9pblByb2plY3RQYXRoXG4gICAgY29uc3QgaW1wb3J0UGFyc2VSZXN1bHRzID0gdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzXG5cbiAgICBzd2l0Y2ggKHN0YXRlbWVudC5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJUeXBlKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJDbGFzcyh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0pXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZVN0YXRlbWVudDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdDpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlck9iamVjdCh7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJFbnVtKHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyKCkud2FybihgVW5rbm93biBwYXJzZXIgZm9yIHR5cGUgXCIke3RzLlN5bnRheEtpbmRbc3RhdGVtZW50LmtpbmRdfVwiYClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfam9pbkVudGl0aWVzQnlBbGlhc1JlZmVyZW5jZShlbnRpdGllczogRW50aXR5W10pOiBFbnRpdHlbXSB7XG4gICAgY29uc3Qgd2l0aEFsaWFzUmVmID0gZW50aXRpZXMuZmlsdGVyKFxuICAgICAgKGVudGl0eSkgPT4gZW50aXR5LlR5cGUgPT09IEVudGl0eVR5cGVzLk9CSkVDVCAmJiAoZW50aXR5IGFzIEVudGl0eTxFbnRpdHlUeXBlcy5PQkpFQ1Q+KS5NZXRhLkFsaWFzUmVmZXJlbmNlXG4gICAgKSBhcyBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPltdXG4gICAgaWYgKHdpdGhBbGlhc1JlZi5sZW5ndGggPT09IDApIHJldHVybiBlbnRpdGllc1xuXG4gICAgY29uc3QgeyBhbGlhc1JlZiwgb3RoZXIgfSA9IGVudGl0aWVzLnJlZHVjZTx7IGFsaWFzUmVmOiBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPltdOyBvdGhlcjogRW50aXR5W10gfT4oXG4gICAgICAocmVzdWx0LCBlbnRpdHkpID0+IHtcbiAgICAgICAgaWYgKHdpdGhBbGlhc1JlZi5pbmNsdWRlcyhlbnRpdHkpKSByZXR1cm4gcmVzdWx0XG4gICAgICAgIGlmICh3aXRoQWxpYXNSZWYubWFwKChlKSA9PiBlLk1ldGEuQWxpYXNSZWZlcmVuY2UpLmluY2x1ZGVzKGVudGl0eS5OYW1lKSkgcmVzdWx0LmFsaWFzUmVmLnB1c2goZW50aXR5KVxuICAgICAgICBlbHNlIHJlc3VsdC5vdGhlci5wdXNoKGVudGl0eSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfSxcbiAgICAgIHsgYWxpYXNSZWY6IFtdLCBvdGhlcjogW10gfVxuICAgIClcbiAgICBpZiAoYWxpYXNSZWYubGVuZ3RoID09PSAwKSByZXR1cm4gZW50aXRpZXNcblxuICAgIGNvbnN0IGFsaWFzZWRFbnRpdGllcyA9IHdpdGhBbGlhc1JlZi5tYXAoKGVudGl0eSkgPT4ge1xuICAgICAgY29uc3QgZm91bmRKb2luID0gYWxpYXNSZWYuZmluZCgoZSkgPT4gZS5OYW1lID09PSBlbnRpdHkuTWV0YS5BbGlhc1JlZmVyZW5jZSlcbiAgICAgIGlmICghZm91bmRKb2luKSB0aHJvdyBuZXcgRXJyb3IoYEpvaW4gbm90IGZvdW5kIGZvciBlbnRpdHkgJHtKU09OLnN0cmluZ2lmeShlbnRpdHkpfWApXG5cbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBmb3VuZEpvaW4uUmVmZXJlbmNlcy5tYXAoKHIpID0+IHtcbiAgICAgICAgaWYgKHIuTmFtZSAhPT0gZm91bmRKb2luLk5hbWUpIHJldHVybiByXG4gICAgICAgIHJldHVybiBuZXcgUmVmZXJlbmNlKHtcbiAgICAgICAgICB0eXBlOiByLlR5cGUsXG4gICAgICAgICAgbmFtZTogZW50aXR5Lk5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogci5JblByb2plY3RQYXRoLFxuICAgICAgICAgIGRpcmVjdGlvbjogci5EaXJlY3Rpb24sXG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IGVudGl0eS5UeXBlLFxuICAgICAgICBuYW1lOiBlbnRpdHkuTmFtZSxcbiAgICAgICAgaXNFeHBvcnRlZDogZm91bmRKb2luLklzRXhwb3J0ZWQsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IGZvdW5kSm9pbi5JblByb2plY3RQYXRoLFxuICAgICAgICByZWZlcmVuY2VzLFxuICAgICAgICBtZXRhOiBmb3VuZEpvaW4uTWV0YSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHJldHVybiBbLi4ub3RoZXIsIC4uLmFsaWFzZWRFbnRpdGllc11cbiAgfVxufVxuIl19