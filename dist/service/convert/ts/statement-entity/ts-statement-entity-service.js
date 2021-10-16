"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsStatementEntityService = void 0;
const entity_1 = require("src/model/entity");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_class_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-class");
const ts_parser_import_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-import");
const ts_parser_interface_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-interface");
const ts_parser_object_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-object");
const ts_parser_type_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-type");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc3RhdGVtZW50LWVudGl0eS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBNkM7QUFDN0MsdURBQThCO0FBQzlCLG9HQUE4RjtBQUM5RixzR0FBZ0c7QUFDaEcsNEdBQXNHO0FBQ3RHLHNHQUFnRztBQUNoRyxrR0FBNEY7QUFFNUYsNENBQXdDO0FBRXhDLE1BQU0sSUFBSSxHQUFHO0lBQ1gsT0FBTyxFQUFFLENBQUMsU0FBdUIsRUFBNEIsRUFBRTtRQUM3RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsSUFBbUIsRUFBMEIsRUFBRTtRQUN6RSxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7Z0JBQ2xDLE9BQU8sbUJBQVUsQ0FBQyxNQUFNLENBQUE7WUFDMUIsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG9CQUFvQjtnQkFDckMsT0FBTyxtQkFBVSxDQUFDLElBQUksQ0FBQTtZQUN4QixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO2dCQUNqQyxPQUFPLG1CQUFVLENBQUMsS0FBSyxDQUFBO1lBQ3pCLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7Z0JBQ3JDLE9BQU8sbUJBQVUsQ0FBQyxTQUFTLENBQUE7WUFDN0IsS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDO1lBQ3ZDLEtBQUssWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztZQUNyQyxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCO2dCQUN4QyxPQUFPLG1CQUFVLENBQUMsTUFBTSxDQUFBO1lBQzFCO2dCQUNFLGVBQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMvRCxPQUFPLFNBQVMsQ0FBQTtTQUNuQjtJQUNILENBQUM7SUFFRCxZQUFZLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQXVELEVBQTRCLEVBQUU7UUFDekgsUUFBUSxVQUFVLEVBQUU7WUFDbEIsS0FBSyxtQkFBVSxDQUFDLE1BQU07Z0JBQ3BCLE9BQU8saUNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEMsS0FBSyxtQkFBVSxDQUFDLE1BQU07Z0JBQ3BCLE9BQU8saUNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDeEMsS0FBSyxtQkFBVSxDQUFDLElBQUk7Z0JBQ2xCLE9BQU8sNkJBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdEMsS0FBSyxtQkFBVSxDQUFDLEtBQUs7Z0JBQ25CLE9BQU8sK0JBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkMsS0FBSyxtQkFBVSxDQUFDLFNBQVM7Z0JBQ3ZCLE9BQU8sdUNBQWlCLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNDO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLFVBQVUsR0FBRyxDQUFDLENBQUE7U0FDekQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IHRzUGFyc2VyQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvcGFyc2VyL3RzLXBhcnNlci1jbGFzcydcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuaW1wb3J0IHsgdHNQYXJzZXJJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UnXG5pbXBvcnQgeyB0c1BhcnNlck9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdCdcbmltcG9ydCB7IHRzUGFyc2VyVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS9wYXJzZXIvdHMtcGFyc2VyLXR5cGUnXG5pbXBvcnQgeyBUc1N0YXRlbWVudEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS90cy1zdGF0ZW1lbnQtZW50aXR5J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5jb25zdCBzZWxmID0ge1xuICBmYWN0b3J5OiAoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBUc1N0YXRlbWVudEVudGl0eTxhbnk+W10gPT4ge1xuICAgIGNvbnN0IGVudGl0eVR5cGUgPSBzZWxmLmVudGl0eVR5cGVCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50LmtpbmQpXG4gICAgaWYgKCFlbnRpdHlUeXBlKSByZXR1cm4gW11cbiAgICByZXR1cm4gc2VsZi5wYXJzZXJCeVR5cGUoeyBlbnRpdHlUeXBlLCBzdGF0ZW1lbnQgfSlcbiAgfSxcbiAgZW50aXR5VHlwZUJ5U3RhdGVtZW50S2luZDogKGtpbmQ6IHRzLlN5bnRheEtpbmQpOiBFbnRpdHlUeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JbXBvcnREZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIEVudGl0eVR5cGUuSU1QT1JUXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLlRZUEVcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gRW50aXR5VHlwZS5DTEFTU1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkludGVyZmFjZURlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gRW50aXR5VHlwZS5JTlRFUkZBQ0VcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uOlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50OlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0OlxuICAgICAgICByZXR1cm4gRW50aXR5VHlwZS5PQkpFQ1RcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci53YXJuKGBVbmtub3duIHBhcnNlciBmb3IgdHlwZSBcIiR7dHMuU3ludGF4S2luZFtraW5kXX1cImApXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG4gIH0sXG5cbiAgcGFyc2VyQnlUeXBlOiAoeyBlbnRpdHlUeXBlLCBzdGF0ZW1lbnQgfTogeyBlbnRpdHlUeXBlOiBFbnRpdHlUeXBlOyBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCB9KTogVHNTdGF0ZW1lbnRFbnRpdHk8YW55PltdID0+IHtcbiAgICBzd2l0Y2ggKGVudGl0eVR5cGUpIHtcbiAgICAgIGNhc2UgRW50aXR5VHlwZS5PQkpFQ1Q6XG4gICAgICAgIHJldHVybiB0c1BhcnNlck9iamVjdC5wYXJzZShzdGF0ZW1lbnQpXG4gICAgICBjYXNlIEVudGl0eVR5cGUuSU1QT1JUOlxuICAgICAgICByZXR1cm4gdHNQYXJzZXJJbXBvcnQucGFyc2Uoc3RhdGVtZW50KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlLlRZUEU6XG4gICAgICAgIHJldHVybiB0c1BhcnNlclR5cGUucGFyc2Uoc3RhdGVtZW50KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlLkNMQVNTOlxuICAgICAgICByZXR1cm4gdHNQYXJzZXJDbGFzcy5wYXJzZShzdGF0ZW1lbnQpXG4gICAgICBjYXNlIEVudGl0eVR5cGUuSU5URVJGQUNFOlxuICAgICAgICByZXR1cm4gdHNQYXJzZXJJbnRlcmZhY2UucGFyc2Uoc3RhdGVtZW50KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGVudGl0eSB0eXBlIFwiJHtlbnRpdHlUeXBlfVwiYClcbiAgICB9XG4gIH0sXG59XG5leHBvcnQgY29uc3QgdHNTdGF0ZW1lbnRFbnRpdHlTZXJ2aWNlID0gc2VsZlxuIl19