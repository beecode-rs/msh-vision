"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserObject = void 0;
const entity_types_1 = require("src/enum/entity-types");
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const entity_1 = require("src/model/entity");
const entity_object_1 = require("src/model/entity-object");
const property_1 = require("src/model/property");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/parser-ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
const ts_parsing_error_1 = require("src/service/parser-ts/ts-parsing-error");
class TsParserObject {
    _statement;
    _inProjectPath;
    _parsedSource;
    _importParseResults;
    constructor(params) {
        const { parsedSource, statement, inProjectPath, importParseResults } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
        this._importParseResults = importParseResults ?? [];
    }
    parse() {
        const result = this._nameFromDeclarationsList(this._statement['declarationList']);
        if (!result)
            throw new Error('Could not parse object from statement');
        const { name, declaration } = result;
        if (!name)
            return [];
        const properties = this._findProperties(declaration?.initializer?.['properties']);
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const aliasReference = this._aliasReferenceName(declaration);
        const imports = ts_parser_import_relations_1.tsParserImportRelations.findImportRelations(declaration, this._importParseResults);
        return [
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.OBJECT,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                references: [...imports],
                meta: new entity_object_1.EntityObject({
                    properties,
                    aliasReference,
                }),
            }),
        ];
    }
    _aliasReferenceName(declaration) {
        if (declaration.initializer?.kind !== ts_1.default.SyntaxKind.Identifier)
            return '';
        if (declaration.initializer['escapedText'] === 'undefined')
            return '';
        return declaration.initializer['escapedText'];
    }
    _nameFromDeclarationsList(declarationList) {
        if (!declarationList?.declarations)
            return;
        const decl = declarationList.declarations.find((d) => d.name);
        if (!decl)
            return;
        return {
            name: decl.name['escapedText'],
            declaration: decl,
        };
    }
    _findProperties(properties) {
        try {
            if (!properties)
                return [];
            return properties
                .map((property) => {
                if (!property.name)
                    return; // TODO solve the spread operator problem in objects, skipping for now
                const name = property.name.escapedText ?? property.name.text;
                const accessLevel = this._accessLevel(name);
                const returnType = this._returnTypeValue(property);
                const functionParams = (property.initializer?.parameters ?? []).length === 0
                    ? undefined
                    : property.initializer.parameters.map((p) => p.getText(this._parsedSource)).join(', ');
                return new property_1.Property({
                    name,
                    accessLevel,
                    returnType,
                    functionParams,
                });
            })
                .filter(Boolean);
        }
        catch (error) {
            if (error instanceof Error)
                throw new ts_parsing_error_1.TsParsingError(error, 'find property', properties);
            throw error;
        }
    }
    _accessLevel(propName) {
        if (propName.startsWith('__'))
            return property_access_level_type_1.PropertyAccessLevelType.PRIVATE;
        if (propName.startsWith('_'))
            return property_access_level_type_1.PropertyAccessLevelType.PROTECTED;
        return property_access_level_type_1.PropertyAccessLevelType.PUBLIC;
    }
    _returnTypeValue(property) {
        if (property.initializer?.type)
            return property.initializer.type.getText(this._parsedSource);
        if (property.initializer?.expression)
            return property.initializer.expression.getText(this._parsedSource);
        return '';
    }
}
exports.TsParserObject = TsParserObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QywyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixpR0FBMEY7QUFDMUYsK0VBQXlFO0FBQ3pFLDZFQUF1RTtBQUV2RSxNQUFhLGNBQWM7SUFDTixVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUM1QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBbUIsTUFLbEI7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sRUFBRSxDQUFBO1FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxl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QztpQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFlLENBQUE7U0FDakM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksS0FBSyxZQUFZLEtBQUs7Z0JBQUUsTUFBTSxJQUFJLGlDQUFjLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUN4RixNQUFNLEtBQUssQ0FBQTtTQUNaO0lBQ0gsQ0FBQztJQUVTLFlBQVksQ0FBQyxRQUFnQjtRQUNyQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxvREFBdUIsQ0FBQyxPQUFPLENBQUE7UUFDckUsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sb0RBQXVCLENBQUMsU0FBUyxDQUFBO1FBQ3RFLE9BQU8sb0RBQXVCLENBQUMsTUFBTSxDQUFBO0lBQ3ZDLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxRQUFhO1FBQ3RDLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJO1lBQUUsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzVGLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVO1lBQUUsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3hHLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBckdELHdDQXFHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvZW51bS9wcm9wZXJ0eS1hY2Nlc3MtbGV2ZWwtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlPYmplY3QgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LW9iamVjdCdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci90cy1wYXJzZXItaW1wb3J0J1xuaW1wb3J0IHsgdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5pbXBvcnQgeyBUc1BhcnNpbmdFcnJvciB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzaW5nLWVycm9yJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJPYmplY3QgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KHRoaXMuX3N0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10pXG4gICAgaWYgKCFyZXN1bHQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIG9iamVjdCBmcm9tIHN0YXRlbWVudCcpXG4gICAgY29uc3QgeyBuYW1lLCBkZWNsYXJhdGlvbiB9ID0gcmVzdWx0XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gW11cbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoZGVjbGFyYXRpb24/LmluaXRpYWxpemVyPy5bJ3Byb3BlcnRpZXMnXSlcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBhbGlhc1JlZmVyZW5jZSA9IHRoaXMuX2FsaWFzUmVmZXJlbmNlTmFtZShkZWNsYXJhdGlvbilcblxuICAgIGNvbnN0IGltcG9ydHMgPSB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5maW5kSW1wb3J0UmVsYXRpb25zKGRlY2xhcmF0aW9uLCB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLk9CSkVDVCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5T2JqZWN0KHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGFsaWFzUmVmZXJlbmNlLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfYWxpYXNSZWZlcmVuY2VOYW1lKGRlY2xhcmF0aW9uOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChkZWNsYXJhdGlvbi5pbml0aWFsaXplcj8ua2luZCAhPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSByZXR1cm4gJydcbiAgICBpZiAoZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXJbJ2VzY2FwZWRUZXh0J10gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJydcbiAgICByZXR1cm4gZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXJbJ2VzY2FwZWRUZXh0J11cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KFxuICAgIGRlY2xhcmF0aW9uTGlzdDogdHMuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3RcbiAgKTogeyBuYW1lOiBzdHJpbmc7IGRlY2xhcmF0aW9uOiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uIH0gfCB1bmRlZmluZWQge1xuICAgIGlmICghZGVjbGFyYXRpb25MaXN0Py5kZWNsYXJhdGlvbnMpIHJldHVyblxuICAgIGNvbnN0IGRlY2wgPSBkZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQubmFtZSlcbiAgICBpZiAoIWRlY2wpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBkZWNsLm5hbWVbJ2VzY2FwZWRUZXh0J10sXG4gICAgICBkZWNsYXJhdGlvbjogZGVjbCxcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXM/OiBhbnlbXSk6IFByb3BlcnR5W10ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBbXVxuICAgICAgcmV0dXJuIHByb3BlcnRpZXNcbiAgICAgICAgLm1hcCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgICBpZiAoIXByb3BlcnR5Lm5hbWUpIHJldHVybiAvLyBUT0RPIHNvbHZlIHRoZSBzcHJlYWQgb3BlcmF0b3IgcHJvYmxlbSBpbiBvYmplY3RzLCBza2lwcGluZyBmb3Igbm93XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHByb3BlcnR5Lm5hbWUuZXNjYXBlZFRleHQgPz8gcHJvcGVydHkubmFtZS50ZXh0XG4gICAgICAgICAgY29uc3QgYWNjZXNzTGV2ZWwgPSB0aGlzLl9hY2Nlc3NMZXZlbChuYW1lKVxuICAgICAgICAgIGNvbnN0IHJldHVyblR5cGUgPSB0aGlzLl9yZXR1cm5UeXBlVmFsdWUocHJvcGVydHkpXG4gICAgICAgICAgY29uc3QgZnVuY3Rpb25QYXJhbXMgPVxuICAgICAgICAgICAgKHByb3BlcnR5LmluaXRpYWxpemVyPy5wYXJhbWV0ZXJzID8/IFtdKS5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgOiBwcm9wZXJ0eS5pbml0aWFsaXplci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBhY2Nlc3NMZXZlbCxcbiAgICAgICAgICAgIHJldHVyblR5cGUsXG4gICAgICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFByb3BlcnR5W11cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG5ldyBUc1BhcnNpbmdFcnJvcihlcnJvciwgJ2ZpbmQgcHJvcGVydHknLCBwcm9wZXJ0aWVzKVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2FjY2Vzc0xldmVsKHByb3BOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB7XG4gICAgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ19fJykpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUklWQVRFXG4gICAgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ18nKSkgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBST1RFQ1RFRFxuICAgIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QVUJMSUNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmV0dXJuVHlwZVZhbHVlKHByb3BlcnR5OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChwcm9wZXJ0eS5pbml0aWFsaXplcj8udHlwZSkgcmV0dXJuIHByb3BlcnR5LmluaXRpYWxpemVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgaWYgKHByb3BlcnR5LmluaXRpYWxpemVyPy5leHByZXNzaW9uKSByZXR1cm4gcHJvcGVydHkuaW5pdGlhbGl6ZXIuZXhwcmVzc2lvbi5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICByZXR1cm4gJydcbiAgfVxufVxuIl19