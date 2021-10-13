"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsStatementEntityService = void 0;
const ts_1 = __importDefault(require("src/module/ts"));
const ts_statement_entity_1 = require("src/service/convert/ts/statement-entity/ts-statement-entity");
// import { logger } from 'src/util/logger'
const self = {
    factory: (statement) => {
        const entityType = self.entityTypeByStatementKind(statement.kind);
        const isExported = statement.modifiers ? self.isExported(statement.modifiers) : false;
        const data = self.parserByType(entityType)(statement);
        return new ts_statement_entity_1.TsStatementEntity({ entityType, statement, isExported, name: data.name, properties: data.properties });
    },
    entityTypeByStatementKind: (kind) => {
        switch (kind) {
            case ts_1.default.SyntaxKind.ImportDeclaration:
                return ts_statement_entity_1.TsStatementEntityType.IMPORT;
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return ts_statement_entity_1.TsStatementEntityType.TYPE;
            default:
                return ts_statement_entity_1.TsStatementEntityType.OBJECT;
        }
    },
    isExported: (modifiers) => {
        return !!modifiers.find((m) => m.kind === ts_1.default.SyntaxKind.ExportKeyword);
    },
    nameFromDeclarationsList: (declarationList) => {
        if (!declarationList?.declarations)
            return;
        const decl = declarationList.declarations.find((d) => d.name);
        if (!decl)
            return;
        return {
            name: decl.name['escapedText'],
            declaration: decl,
        };
    },
    propertiesFromInitializer: (initializer) => {
        return initializer.properties.map((p) => p.name.escapedText);
    },
    parserByType: (entityType) => {
        switch (entityType) {
            case ts_statement_entity_1.TsStatementEntityType.OBJECT:
                return self.objectParser;
            default:
                return (_) => {
                    return {};
                };
        }
    },
    objectParser: (statement) => {
        const result = self.nameFromDeclarationsList(statement['declarationList']);
        if (!result)
            return {};
        const { name, declaration } = result;
        const properties = self.propertiesFromInitializer(declaration.initializer);
        return {
            name,
            properties,
        };
    },
};
exports.tsStatementEntityService = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc3RhdGVtZW50LWVudGl0eS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx1REFBOEI7QUFDOUIscUdBQXNIO0FBQ3RILDJDQUEyQztBQUUzQyxNQUFNLElBQUksR0FBRztJQUNYLE9BQU8sRUFBRSxDQUFDLFNBQXVCLEVBQXFCLEVBQUU7UUFDdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqRSxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ3JGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFckQsT0FBTyxJQUFJLHVDQUFpQixDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQ25ILENBQUM7SUFDRCx5QkFBeUIsRUFBRSxDQUFDLElBQW1CLEVBQXlCLEVBQUU7UUFDeEUsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO2dCQUNsQyxPQUFPLDJDQUFxQixDQUFDLE1BQU0sQ0FBQTtZQUNyQyxLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO2dCQUNyQyxPQUFPLDJDQUFxQixDQUFDLElBQUksQ0FBQTtZQUNuQztnQkFDRSxPQUFPLDJDQUFxQixDQUFDLE1BQU0sQ0FBQTtTQUN0QztJQUNILENBQUM7SUFDRCxVQUFVLEVBQUUsQ0FBQyxTQUE0QixFQUFXLEVBQUU7UUFDcEQsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFDRCx3QkFBd0IsRUFBRSxDQUN4QixlQUEyQyxFQUN3QixFQUFFO1FBQ3JFLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWTtZQUFFLE9BQU07UUFDMUMsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU07UUFDakIsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFBO0lBQ0gsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsV0FBZ0IsRUFBWSxFQUFFO1FBQ3hELE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNELFlBQVksRUFBRSxDQUFDLFVBQWlDLEVBQXNDLEVBQUU7UUFDdEYsUUFBUSxVQUFVLEVBQUU7WUFDbEIsS0FBSywyQ0FBcUIsQ0FBQyxNQUFNO2dCQUMvQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7WUFDMUI7Z0JBQ0UsT0FBTyxDQUFDLENBQU0sRUFBTyxFQUFFO29CQUNyQixPQUFPLEVBQUUsQ0FBQTtnQkFDWCxDQUFDLENBQUE7U0FDSjtJQUNILENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxTQUF1QixFQUFPLEVBQUU7UUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUN0QixNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTFFLE9BQU87WUFDTCxJQUFJO1lBQ0osVUFBVTtTQUNYLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBUc1N0YXRlbWVudEVudGl0eSwgVHNTdGF0ZW1lbnRFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHknXG4vLyBpbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmNvbnN0IHNlbGYgPSB7XG4gIGZhY3Rvcnk6IChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFRzU3RhdGVtZW50RW50aXR5ID0+IHtcbiAgICBjb25zdCBlbnRpdHlUeXBlID0gc2VsZi5lbnRpdHlUeXBlQnlTdGF0ZW1lbnRLaW5kKHN0YXRlbWVudC5raW5kKVxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSBzdGF0ZW1lbnQubW9kaWZpZXJzID8gc2VsZi5pc0V4cG9ydGVkKHN0YXRlbWVudC5tb2RpZmllcnMpIDogZmFsc2VcbiAgICBjb25zdCBkYXRhID0gc2VsZi5wYXJzZXJCeVR5cGUoZW50aXR5VHlwZSkoc3RhdGVtZW50KVxuXG4gICAgcmV0dXJuIG5ldyBUc1N0YXRlbWVudEVudGl0eSh7IGVudGl0eVR5cGUsIHN0YXRlbWVudCwgaXNFeHBvcnRlZCwgbmFtZTogZGF0YS5uYW1lLCBwcm9wZXJ0aWVzOiBkYXRhLnByb3BlcnRpZXMgfSlcbiAgfSxcbiAgZW50aXR5VHlwZUJ5U3RhdGVtZW50S2luZDogKGtpbmQ6IHRzLlN5bnRheEtpbmQpOiBUc1N0YXRlbWVudEVudGl0eVR5cGUgPT4ge1xuICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gVHNTdGF0ZW1lbnRFbnRpdHlUeXBlLklNUE9SVFxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gVHNTdGF0ZW1lbnRFbnRpdHlUeXBlLlRZUEVcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBUc1N0YXRlbWVudEVudGl0eVR5cGUuT0JKRUNUXG4gICAgfVxuICB9LFxuICBpc0V4cG9ydGVkOiAobW9kaWZpZXJzOiB0cy5Nb2RpZmllcnNBcnJheSk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiAhIW1vZGlmaWVycy5maW5kKChtKSA9PiBtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuRXhwb3J0S2V5d29yZClcbiAgfSxcbiAgbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0OiAoXG4gICAgZGVjbGFyYXRpb25MaXN0OiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFxuICApOiB7IG5hbWU6IHN0cmluZzsgZGVjbGFyYXRpb246IHRzLlZhcmlhYmxlRGVjbGFyYXRpb24gfSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgaWYgKCFkZWNsYXJhdGlvbkxpc3Q/LmRlY2xhcmF0aW9ucykgcmV0dXJuXG4gICAgY29uc3QgZGVjbCA9IGRlY2xhcmF0aW9uTGlzdC5kZWNsYXJhdGlvbnMuZmluZCgoZCkgPT4gZC5uYW1lKVxuICAgIGlmICghZGVjbCkgcmV0dXJuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGRlY2wubmFtZVsnZXNjYXBlZFRleHQnXSxcbiAgICAgIGRlY2xhcmF0aW9uOiBkZWNsLFxuICAgIH1cbiAgfSxcbiAgcHJvcGVydGllc0Zyb21Jbml0aWFsaXplcjogKGluaXRpYWxpemVyOiBhbnkpOiBzdHJpbmdbXSA9PiB7XG4gICAgcmV0dXJuIGluaXRpYWxpemVyLnByb3BlcnRpZXMubWFwKChwKSA9PiBwLm5hbWUuZXNjYXBlZFRleHQpXG4gIH0sXG4gIHBhcnNlckJ5VHlwZTogKGVudGl0eVR5cGU6IFRzU3RhdGVtZW50RW50aXR5VHlwZSk6ICgoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpID0+IGFueSkgPT4ge1xuICAgIHN3aXRjaCAoZW50aXR5VHlwZSkge1xuICAgICAgY2FzZSBUc1N0YXRlbWVudEVudGl0eVR5cGUuT0JKRUNUOlxuICAgICAgICByZXR1cm4gc2VsZi5vYmplY3RQYXJzZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAoXzogYW55KTogYW55ID0+IHtcbiAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgIH1cbiAgfSxcbiAgb2JqZWN0UGFyc2VyOiAoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBhbnkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYubmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KHN0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10pXG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiB7fVxuICAgIGNvbnN0IHsgbmFtZSwgZGVjbGFyYXRpb24gfSA9IHJlc3VsdFxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBzZWxmLnByb3BlcnRpZXNGcm9tSW5pdGlhbGl6ZXIoZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXIpXG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZSxcbiAgICAgIHByb3BlcnRpZXMsXG4gICAgfVxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzU3RhdGVtZW50RW50aXR5U2VydmljZSA9IHNlbGZcbiJdfQ==