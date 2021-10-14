"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsStatementEntityService = void 0;
const entity_1 = require("src/model/entity");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_statement_entity_1 = require("src/service/convert/ts/statement-entity/ts-statement-entity");
const self = {
    factory: (statement, fileName) => {
        const entityType = self.entityTypeByStatementKind(statement.kind);
        const isExported = statement.modifiers ? self.isExported(statement.modifiers) : false;
        const { name = fileName, ...data } = self.parserByType(entityType)(statement);
        return new ts_statement_entity_1.TsStatementEntity({ entityType, statement, isExported, name, ...data });
    },
    entityTypeByStatementKind: (kind) => {
        switch (kind) {
            case ts_1.default.SyntaxKind.ImportDeclaration:
                return entity_1.EntityType.IMPORT;
            case ts_1.default.SyntaxKind.TypeAliasDeclaration:
                return entity_1.EntityType.TYPE;
            case ts_1.default.SyntaxKind.ClassDeclaration:
                return entity_1.EntityType.CLASS;
            default:
                return entity_1.EntityType.OBJECT;
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
        return (initializer.properties ?? []).map((p) => p.name.escapedText);
    },
    parserByType: (entityType) => {
        switch (entityType) {
            case entity_1.EntityType.OBJECT:
                return self.objectParser;
            case entity_1.EntityType.IMPORT:
                return self.importParser;
            case entity_1.EntityType.TYPE:
                return self.typeParser;
            case entity_1.EntityType.CLASS:
                return self.classParser;
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
    importParser: (statement) => {
        // TODO what to do if there is more then one import??
        const name = statement['importClause'].namedBindings.elements.find((e) => e.name).name.escapedText;
        const path = `${statement['moduleSpecifier'].text}.ts`;
        // const path = `${fileService.cleanupPath(statement['moduleSpecifier'].text)}.ts`
        return { path, name };
    },
    typeParser: (statement) => {
        const name = statement['name'].escapedText;
        return { name };
    },
    classParser: (statement) => {
        const name = statement['name'].escapedText;
        const properties = statement['members'].map((m) => m.name.escapedText);
        return { name, properties };
    },
};
exports.tsStatementEntityService = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc3RhdGVtZW50LWVudGl0eS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBNkM7QUFDN0MsdURBQThCO0FBQzlCLHFHQUErRjtBQUcvRixNQUFNLElBQUksR0FBRztJQUNYLE9BQU8sRUFBRSxDQUFDLFNBQXVCLEVBQUUsUUFBZ0IsRUFBcUIsRUFBRTtRQUN4RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pFLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDckYsTUFBTSxFQUFFLElBQUksR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRTdFLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUE7SUFDcEYsQ0FBQztJQUNELHlCQUF5QixFQUFFLENBQUMsSUFBbUIsRUFBYyxFQUFFO1FBQzdELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtnQkFDbEMsT0FBTyxtQkFBVSxDQUFDLE1BQU0sQ0FBQTtZQUMxQixLQUFLLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CO2dCQUNyQyxPQUFPLG1CQUFVLENBQUMsSUFBSSxD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O0lBQ3ZCLENBQUM7SUFDRCxVQUFVLEVBQUUsQ0FBQyxTQUF1QixFQUFPLEVBQUU7UUFDM0MsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUMxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFDLFNBQXVCLEVBQU8sRUFBRTtRQUM1QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQzFDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsd0JBQXdCLEdBQUcsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFRzU3RhdGVtZW50RW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHknXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcblxuY29uc3Qgc2VsZiA9IHtcbiAgZmFjdG9yeTogKHN0YXRlbWVudDogdHMuU3RhdGVtZW50LCBmaWxlTmFtZTogc3RyaW5nKTogVHNTdGF0ZW1lbnRFbnRpdHkgPT4ge1xuICAgIGNvbnN0IGVudGl0eVR5cGUgPSBzZWxmLmVudGl0eVR5cGVCeVN0YXRlbWVudEtpbmQoc3RhdGVtZW50LmtpbmQpXG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHN0YXRlbWVudC5tb2RpZmllcnMgPyBzZWxmLmlzRXhwb3J0ZWQoc3RhdGVtZW50Lm1vZGlmaWVycykgOiBmYWxzZVxuICAgIGNvbnN0IHsgbmFtZSA9IGZpbGVOYW1lLCAuLi5kYXRhIH0gPSBzZWxmLnBhcnNlckJ5VHlwZShlbnRpdHlUeXBlKShzdGF0ZW1lbnQpXG5cbiAgICByZXR1cm4gbmV3IFRzU3RhdGVtZW50RW50aXR5KHsgZW50aXR5VHlwZSwgc3RhdGVtZW50LCBpc0V4cG9ydGVkLCBuYW1lLCAuLi5kYXRhIH0pXG4gIH0sXG4gIGVudGl0eVR5cGVCeVN0YXRlbWVudEtpbmQ6IChraW5kOiB0cy5TeW50YXhLaW5kKTogRW50aXR5VHlwZSA9PiB7XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb246XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLklNUE9SVFxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uOlxuICAgICAgICByZXR1cm4gRW50aXR5VHlwZS5UWVBFXG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2xhc3NEZWNsYXJhdGlvbjpcbiAgICAgICAgcmV0dXJuIEVudGl0eVR5cGUuQ0xBU1NcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBFbnRpdHlUeXBlLk9CSkVDVFxuICAgIH1cbiAgfSxcbiAgaXNFeHBvcnRlZDogKG1vZGlmaWVyczogdHMuTW9kaWZpZXJzQXJyYXkpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gISFtb2RpZmllcnMuZmluZCgobSkgPT4gbS5raW5kID09PSB0cy5TeW50YXhLaW5kLkV4cG9ydEtleXdvcmQpXG4gIH0sXG4gIG5hbWVGcm9tRGVjbGFyYXRpb25zTGlzdDogKFxuICAgIGRlY2xhcmF0aW9uTGlzdDogdHMuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3RcbiAgKTogeyBuYW1lOiBzdHJpbmc7IGRlY2xhcmF0aW9uOiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uIH0gfCB1bmRlZmluZWQgPT4ge1xuICAgIGlmICghZGVjbGFyYXRpb25MaXN0Py5kZWNsYXJhdGlvbnMpIHJldHVyblxuICAgIGNvbnN0IGRlY2wgPSBkZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQubmFtZSlcbiAgICBpZiAoIWRlY2wpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBkZWNsLm5hbWVbJ2VzY2FwZWRUZXh0J10sXG4gICAgICBkZWNsYXJhdGlvbjogZGVjbCxcbiAgICB9XG4gIH0sXG4gIHByb3BlcnRpZXNGcm9tSW5pdGlhbGl6ZXI6IChpbml0aWFsaXplcjogYW55KTogc3RyaW5nW10gPT4ge1xuICAgIHJldHVybiAoaW5pdGlhbGl6ZXIucHJvcGVydGllcyA/PyBbXSkubWFwKChwKSA9PiBwLm5hbWUuZXNjYXBlZFRleHQpXG4gIH0sXG4gIHBhcnNlckJ5VHlwZTogKGVudGl0eVR5cGU6IEVudGl0eVR5cGUpOiAoKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KSA9PiBhbnkpID0+IHtcbiAgICBzd2l0Y2ggKGVudGl0eVR5cGUpIHtcbiAgICAgIGNhc2UgRW50aXR5VHlwZS5PQkpFQ1Q6XG4gICAgICAgIHJldHVybiBzZWxmLm9iamVjdFBhcnNlclxuICAgICAgY2FzZSBFbnRpdHlUeXBlLklNUE9SVDpcbiAgICAgICAgcmV0dXJuIHNlbGYuaW1wb3J0UGFyc2VyXG4gICAgICBjYXNlIEVudGl0eVR5cGUuVFlQRTpcbiAgICAgICAgcmV0dXJuIHNlbGYudHlwZVBhcnNlclxuICAgICAgY2FzZSBFbnRpdHlUeXBlLkNMQVNTOlxuICAgICAgICByZXR1cm4gc2VsZi5jbGFzc1BhcnNlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIChfOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9XG4gICAgfVxuICB9LFxuICBvYmplY3RQYXJzZXI6IChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IGFueSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gc2VsZi5uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3Qoc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHt9XG4gICAgY29uc3QgeyBuYW1lLCBkZWNsYXJhdGlvbiB9ID0gcmVzdWx0XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHNlbGYucHJvcGVydGllc0Zyb21Jbml0aWFsaXplcihkZWNsYXJhdGlvbi5pbml0aWFsaXplcilcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgcHJvcGVydGllcyxcbiAgICB9XG4gIH0sXG4gIGltcG9ydFBhcnNlcjogKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogYW55ID0+IHtcbiAgICAvLyBUT0RPIHdoYXQgdG8gZG8gaWYgdGhlcmUgaXMgbW9yZSB0aGVuIG9uZSBpbXBvcnQ/P1xuICAgIGNvbnN0IG5hbWUgPSBzdGF0ZW1lbnRbJ2ltcG9ydENsYXVzZSddLm5hbWVkQmluZGluZ3MuZWxlbWVudHMuZmluZCgoZSkgPT4gZS5uYW1lKS5uYW1lLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgcGF0aCA9IGAke3N0YXRlbWVudFsnbW9kdWxlU3BlY2lmaWVyJ10udGV4dH0udHNgXG4gICAgLy8gY29uc3QgcGF0aCA9IGAke2ZpbGVTZXJ2aWNlLmNsZWFudXBQYXRoKHN0YXRlbWVudFsnbW9kdWxlU3BlY2lmaWVyJ10udGV4dCl9LnRzYFxuICAgIHJldHVybiB7IHBhdGgsIG5hbWUgfVxuICB9LFxuICB0eXBlUGFyc2VyOiAoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBhbnkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBzdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIHJldHVybiB7IG5hbWUgfVxuICB9LFxuICBjbGFzc1BhcnNlcjogKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogYW55ID0+IHtcbiAgICBjb25zdCBuYW1lID0gc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtKSA9PiBtLm5hbWUuZXNjYXBlZFRleHQpXG5cbiAgICByZXR1cm4geyBuYW1lLCBwcm9wZXJ0aWVzIH1cbiAgfSxcbn1cbmV4cG9ydCBjb25zdCB0c1N0YXRlbWVudEVudGl0eVNlcnZpY2UgPSBzZWxmXG4iXX0=