"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsStatementEntityService = void 0;
const entity_1 = require("src/model/entity");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/convert/ts/parser/ts-parser-class");
const ts_parser_import_1 = require("src/service/convert/ts/parser/ts-parser-import");
const ts_parser_interface_1 = require("src/service/convert/ts/parser/ts-parser-interface");
const ts_parser_object_1 = require("src/service/convert/ts/parser/ts-parser-object");
const ts_parser_type_1 = require("src/service/convert/ts/parser/ts-parser-type");
const logger_1 = require("src/util/logger");
const self = {
    factory: (statement) => {
        const entityType = self.entityTypeByStatementKind(statement.kind);
        if (!entityType)
            return [];
        return self.parserByType({ entityType, statement });
    },
    entityTypeByStatementKind: (kind) => {
        switch (kind) {
            case ts_1.default.SyntaxKind.ImportDeclaration:
                return entity_1.EntityType.IMPORT;
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return entity_1.EntityType.TYPE;
            case ts_1.default.SyntaxKind.ClassDeclaration:
                return entity_1.EntityType.CLASS;
            case ts_1.default.SyntaxKind.InterfaceDeclaration:
                return entity_1.EntityType.INTERFACE;
            case ts_1.default.SyntaxKind.VariableDeclaration:
            case ts_1.default.SyntaxKind.VariableStatement:
            case ts_1.default.SyntaxKind.VariableDeclarationList:
                return entity_1.EntityType.OBJECT;
            default:
                logger_1.logger.warn(`Unknown parser for type "${ts_1.default.SyntaxKind[kind]}"`);
                return undefined;
        }
    },
    parserByType: ({ entityType, statement }) => {
        switch (entityType) {
            case entity_1.EntityType.OBJECT:
                return ts_parser_object_1.tsParserObject.parse(statement);
            case entity_1.EntityType.IMPORT:
                return ts_parser_import_1.tsParserImport.parse(statement);
            case entity_1.EntityType.TYPE:
                return ts_parser_type_1.tsParserType.parse(statement);
            case entity_1.EntityType.CLASS:
                return ts_parser_class_1.tsParserClass.parse(statement);
            case entity_1.EntityType.INTERFACE:
                return ts_parser_interface_1.tsParserInterface.parse(statement);
            default:
                throw new Error(`Unknown entity type "${entityType}"`);
        }
    },
};
exports.tsStatementEntityService = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc3RhdGVtZW50LWVudGl0eS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBNkM7QUFDN0MsdURBQThCO0FBQzlCLG1GQUE2RTtBQUM3RSxxRkFBK0U7QUFDL0UsMkZBQXFGO0FBQ3JGLHFGQUErRTtBQUMvRSxpRkFBMkU7QUFFM0UsNENBQXdDO0FBRXhDLE1BQU0sSUFBSSxHQUFHO0lBQ1gsT0FBTyxFQUFFLENBQUMsU0FBdUIsRUFBNEIsRUFBRTtRQUM3RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsSUFBbUIsRUFBMEIsRUFBRTtRQUN6RSxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7Z0JBQ2xDLE9BQU8sbUJBQVUsQ0FBQyxNQUFNLENBQUE7WUFDMUIsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtnQkFDckMsT0FBTyxtQkFBVSxDQUFDLElBQUksQ0FBQTtZQUN4QixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2dCQUNqQyxPQUFPLG1CQUFVLENBQUMsS0FBSyxDQUFBO1lBQ3pCLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7Z0JBQ3JDLE9BQU8sbUJBQVUsQ0FBQyxTQUFTLENBQUE7WUFDN0IsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZDLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQyxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO2dCQUN4QyxPQUFPLG1CQUFVLENBQUMsTUFBTSxDQUFBO1lBQzFCO2dCQUNFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMvRCxPQUFPLFNBQVMsQ0FBQTtTQUNuQjtJQUNILENBQUM7SUFFRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXVELEVBQTRCLEVBQUU7UUFDekgsUUFBUSxVQUFVLEVBQUU7WUFDbEIsS0FBSyxtQkFBVSxDQUFDLE1BQU07Z0JBQ3BCLE9BQU8saUNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEMsS0FBSyxtQkFBVSxDQUFDLE1BQU07Z0JBQ3BCLE9BQU8saUNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEMsS0FBSyxtQkFBVSxDQUFDLElBQUk7Z0JBQ2xCLE9BQU8sNkJBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdEMsS0FBSyxtQkFBVSxDQUFDLEtBQUs7Z0JBQ25CLE9BQU8sK0JBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkMsS0FBSyxtQkFBVSxDQUFDLFNBQVM7Z0JBQ3ZCLE9BQU8sdUNBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNDO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLFVBQVUsR0FBRyxDQUFDLENBQUE7U0FDekQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IHRzUGFyc2VyQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItY2xhc3MnXG5pbXBvcnQgeyB0c1BhcnNlckltcG9ydCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlckludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyB0c1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QnXG5pbXBvcnQgeyB0c1BhcnNlclR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZSdcbmltcG9ydCB7IFRzU3RhdGVtZW50RW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHknXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmNvbnN0IHNlbGYgPSB7XG4gIGZhY3Rvcnk6IChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFRzU3RhdGVtZW50RW50aXR5PGFueT5bXSA9PiB7XG4gICAgY29uc3QgZW50aXR5VHlwZSA9IHNlbGYuZW50aXR5VHlwZUJ5U3RhdGVtZW50S2luZChzdGF0ZW1lbnQua2luZClcbiAgICBpZiAoIWVudGl0eVR5cGUpIHJldHVybiBbXVxuICAgIHJldHVybiBzZWxmLnBhcnNlckJ5VHlwZSh7IGVudGl0eVR5cGUsIHN0YXRlbWVudCB9KVxuICB9LFxuICBlbnRpdHlUeXBlQnlTdGF0ZW1lbnRLaW5kOiAoa2luZDogdHMuU3ludGF4S2luZCk6IEVudGl0eVR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gRW50aXR5VHlwZS5JTVBPUlRcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlQWxpYXNEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIEVudGl0eVR5cGUuVFlQRVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLkNMQVNTXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLklOVEVSRkFDRVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQ6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3Q6XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLk9CSkVDVFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gcGFyc2VyIGZvciB0eXBlIFwiJHt0cy5TeW50YXhLaW5kW2tpbmRdfVwiYClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgfSxcblxuICBwYXJzZXJCeVR5cGU6ICh7IGVudGl0eVR5cGUsIHN0YXRlbWVudCB9OiB7IGVudGl0eVR5cGU6IEVudGl0eVR5cGU7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50IH0pOiBUc1N0YXRlbWVudEVudGl0eTxhbnk+W10gPT4ge1xuICAgIHN3aXRjaCAoZW50aXR5VHlwZSkge1xuICAgICAgY2FzZSBFbnRpdHlUeXBlLk9CSkVDVDpcbiAgICAgICAgcmV0dXJuIHRzUGFyc2VyT2JqZWN0LnBhcnNlKHN0YXRlbWVudClcbiAgICAgIGNhc2UgRW50aXR5VHlwZS5JTVBPUlQ6XG4gICAgICAgIHJldHVybiB0c1BhcnNlckltcG9ydC5wYXJzZShzdGF0ZW1lbnQpXG4gICAgICBjYXNlIEVudGl0eVR5cGUuVFlQRTpcbiAgICAgICAgcmV0dXJuIHRzUGFyc2VyVHlwZS5wYXJzZShzdGF0ZW1lbnQpXG4gICAgICBjYXNlIEVudGl0eVR5cGUuQ0xBU1M6XG4gICAgICAgIHJldHVybiB0c1BhcnNlckNsYXNzLnBhcnNlKHN0YXRlbWVudClcbiAgICAgIGNhc2UgRW50aXR5VHlwZS5JTlRFUkZBQ0U6XG4gICAgICAgIHJldHVybiB0c1BhcnNlckludGVyZmFjZS5wYXJzZShzdGF0ZW1lbnQpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZW50aXR5IHR5cGUgXCIke2VudGl0eVR5cGV9XCJgKVxuICAgIH1cbiAgfSxcbn1cbmV4cG9ydCBjb25zdCB0c1N0YXRlbWVudEVudGl0eVNlcnZpY2UgPSBzZWxmXG4iXX0=