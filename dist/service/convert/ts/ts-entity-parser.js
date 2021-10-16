"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEntityParser = void 0;
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/convert/ts/parser/ts-parser-class");
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
        return this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat();
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
                return new ts_parser_class_1.TsParserClass({ statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.InterfaceDeclaration:
                return new ts_parser_interface_1.TsParserInterface({ statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.VariableDeclaration:
            case ts_1.default.SyntaxKind.VariableStatement:
            case ts_1.default.SyntaxKind.VariableDeclarationList:
                return new ts_parser_object_1.TsParserObject({ statement, inProjectPath: this._inProjectPath });
            case ts_1.default.SyntaxKind.ImportDeclaration:
                return undefined;
            default:
                logger_1.logger.warn(`Unknown parser for type "${ts_1.default.SyntaxKind[statement.kind]}"`);
                return undefined;
        }
    }
}
exports.TsEntityParser = TsEntityParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtZW50aXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx1REFBOEI7QUFFOUIsbUZBQTZFO0FBQzdFLDJGQUFxRjtBQUNyRixxRkFBK0U7QUFDL0UsaUZBQTJFO0FBQzNFLDRDQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFLekIsWUFBWSxFQUNWLFlBQVksRUFDWixRQUFRLEVBQ1IsYUFBYSxHQUtkO1FBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7SUFDckMsQ0FBQztJQUVNLGNBQWM7UUFDbkIsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFBO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNqRyxDQUFDO0lBRVMsZUFBZSxDQUFDLFNBQXVCO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8sRUFBRSxDQUFBO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFUyxzQkFBc0IsQ0FBQyxTQUF1QjtRQUN0RCxRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDdEIsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtnQkFDckMsT0FBTyxJQUFJLDZCQUFZLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQzVFLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7Z0JBQ2pDLE9BQU8sSUFBSSwrQkFBYSxDQUFDLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtZQUM3RSxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO2dCQUNyQyxPQUFPLElBQUksdUNBQWlCLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQ2pGLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztZQUN2QyxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUM7WUFDckMsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtnQkFDeEMsT0FBTyxJQUFJLGlDQUFjLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO1lBQzlFLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7Z0JBQ2xDLE9BQU8sU0FBUyxDQUFBO1lBQ2xCO2dCQUNFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLFlBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDekUsT0FBTyxTQUFTLENBQUE7U0FDbkI7SUFDSCxDQUFDO0NBQ0Y7QUF0REQsd0NBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IFRzUGFyc2VyQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItY2xhc3MnXG5pbXBvcnQgeyBUc1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyBUc1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyBUc1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFRzRW50aXR5UGFyc2VyIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHBhcnNlZFNvdXJjZSxcbiAgICBmaWxlTmFtZSxcbiAgICBpblByb2plY3RQYXRoLFxuICB9OiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICB9KSB7XG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBmaWxlTmFtZVxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gIH1cblxuICBwdWJsaWMgcGFyc2VkRW50aXRpZXMoKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGVudGl0aWVzOiBFbnRpdHlbXSA9IFtdXG4gICAgZW50aXRpZXMucHVzaCguLi50aGlzLl9wYXJzZVN0YXRlbWVudHMoKSlcbiAgICByZXR1cm4gZW50aXRpZXNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VTdGF0ZW1lbnRzKCk6IEVudGl0eVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyc2VkU291cmNlLnN0YXRlbWVudHMubWFwKChzdGF0ZW1lbnQpID0+IHRoaXMuX3BhcnNlU3RhdGVtZW50KHN0YXRlbWVudCkpLmZsYXQoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZVN0YXRlbWVudChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBwYXJzZXIgPSB0aGlzLl9wYXJzZXJCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50KVxuICAgIGlmICghcGFyc2VyKSByZXR1cm4gW11cbiAgICByZXR1cm4gcGFyc2VyLnBhcnNlKClcbiAgfVxuXG4gIHByb3RlY3RlZCBfcGFyc2VyQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogUGFyc2FibGUgfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAoc3RhdGVtZW50LmtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlclR5cGUoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gbmV3IFRzUGFyc2VyQ2xhc3MoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBUc1BhcnNlckludGVyZmFjZSh7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCB9KVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQ6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3Q6XG4gICAgICAgIHJldHVybiBuZXcgVHNQYXJzZXJPYmplY3QoeyBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGggfSlcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW3N0YXRlbWVudC5raW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn1cbiJdfQ==