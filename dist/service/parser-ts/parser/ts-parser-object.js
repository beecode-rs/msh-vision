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
                const name = property.name.escapedText;
                const accessLevel = this._accessLevel(name);
                const returnType = this._returnTypeValue(property);
                const functionParams = (property.initializer.parameters ?? []).length === 0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QywyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixpR0FBMEY7QUFDMUYsK0VBQXlFO0FBQ3pFLDZFQUF1RTtBQUV2RSxNQUFhLGNBQWM7SUFDTixVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUM1QixtQkFBbUIsQ0FBNkI7SUFFbkUsWUFBWSxNQUtYO1FBQ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxrQkFBa0IsSUFBSSxFQUFFLENBQUE7SUFDckQsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7UUFDakYsSUFBSSxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7UUFDckUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDcEMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUNwQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDeEUsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRTVELE1BQU0sT0FBTyxHQUFHLG9EQUF1QixDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUVsRyxPQUFPO1lBQ0wsSUFBSSxlQUFNLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLDBCQUFXLENBQUMsTUFBTTtnQkFDeEIsSUFBSTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLFVBQVU7Z0JBQ1YsVUFBVSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksRUFBRSxJQUFJLDRCQUFZLENBQUM7b0JBQ3JCLFVBQVU7b0JBQ1YsY0FBYztpQkFDZixDQUFDO2FBQ0gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0lBRVMsbUJBQW1CLENBQUMsV0FBZ0I7UUFDNUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVU7WUFBRSxPQUFPLEVBQUUsQ0FBQTtRQUN6RSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssV0FBVztZQUFFLE9BQU8sRUFBRSxDQUFBO1FBQ3JFLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMvQyxDQUFDO0lBRVMseUJBQXlCLENBQ2pDLGVBQTJDO1FBRTNDLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWTtZQUFFLE9BQU07UUFDMUMsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU07UUFDakIsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUM5QixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFBO0lBQ0gsQ0FBQztJQUVTLGVBQWUsQ0FBQyxVQUFrQjtRQUMxQyxJQUFJO1lBQ0YsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTyxFQUFFLENBQUE7WUFDMUIsT0FBTyxVQUFVO2lCQUNkLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBQUUsT0FBTSxDQUFDLHNFQUFzRTtnQkFDakcsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7Z0JBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzNDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDbEQsTUFBTSxjQUFjLEdBQ2xCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ2xELENBQUMsQ0FBQyxTQUFTO29CQUNYLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMxRixPQUFPLElBQUksbUJBQVEsQ0FBQztvQkFDbEIsSUFBSTtvQkFDSixXQUFXO29CQUNYLFVBQVU7b0JBQ1YsY0FBYztpQkFDZixDQUFDLENBQUE7WUFDSixDQUFDLENBQUM7aUJBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBZSxDQUFBO1NBQ2pDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLEtBQUssWUFBWSxLQUFLO2dCQUFFLE1BQU0sSUFBSSxpQ0FBYyxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDeEYsTUFBTSxLQUFLLENBQUE7U0FDWjtJQUNILENBQUM7SUFFUyxZQUFZLENBQUMsUUFBZ0I7UUFDckMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sb0RBQXVCLENBQUMsT0FBTyxDQUFBO1FBQ3JFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLG9EQUF1QixDQUFDLFNBQVMsQ0FBQTtRQUN0RSxPQUFPLG9EQUF1QixDQUFDLE1BQU0sQ0FBQTtJQUN2QyxDQUFDO0lBRVMsZ0JBQWdCLENBQUMsUUFBYTtRQUN0QyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSTtZQUFFLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM1RixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVTtZQUFFLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN4RyxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQXJHRCx3Q0FxR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHJvcGVydHktYWNjZXNzLWxldmVsLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1pbXBvcnQtcmVsYXRpb25zJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgVHNQYXJzaW5nRXJyb3IgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2luZy1lcnJvcidcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyT2JqZWN0IGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KHRoaXMuX3N0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10pXG4gICAgaWYgKCFyZXN1bHQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIG9iamVjdCBmcm9tIHN0YXRlbWVudCcpXG4gICAgY29uc3QgeyBuYW1lLCBkZWNsYXJhdGlvbiB9ID0gcmVzdWx0XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gW11cbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoZGVjbGFyYXRpb24/LmluaXRpYWxpemVyPy5bJ3Byb3BlcnRpZXMnXSlcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBhbGlhc1JlZmVyZW5jZSA9IHRoaXMuX2FsaWFzUmVmZXJlbmNlTmFtZShkZWNsYXJhdGlvbilcblxuICAgIGNvbnN0IGltcG9ydHMgPSB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5maW5kSW1wb3J0UmVsYXRpb25zKGRlY2xhcmF0aW9uLCB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLk9CSkVDVCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5T2JqZWN0KHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGFsaWFzUmVmZXJlbmNlLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfYWxpYXNSZWZlcmVuY2VOYW1lKGRlY2xhcmF0aW9uOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChkZWNsYXJhdGlvbi5pbml0aWFsaXplcj8ua2luZCAhPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSByZXR1cm4gJydcbiAgICBpZiAoZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXJbJ2VzY2FwZWRUZXh0J10gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJydcbiAgICByZXR1cm4gZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXJbJ2VzY2FwZWRUZXh0J11cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KFxuICAgIGRlY2xhcmF0aW9uTGlzdDogdHMuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3RcbiAgKTogeyBuYW1lOiBzdHJpbmc7IGRlY2xhcmF0aW9uOiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uIH0gfCB1bmRlZmluZWQge1xuICAgIGlmICghZGVjbGFyYXRpb25MaXN0Py5kZWNsYXJhdGlvbnMpIHJldHVyblxuICAgIGNvbnN0IGRlY2wgPSBkZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQubmFtZSlcbiAgICBpZiAoIWRlY2wpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBkZWNsLm5hbWVbJ2VzY2FwZWRUZXh0J10sXG4gICAgICBkZWNsYXJhdGlvbjogZGVjbCxcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXM/OiBhbnlbXSk6IFByb3BlcnR5W10ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBbXVxuICAgICAgcmV0dXJuIHByb3BlcnRpZXNcbiAgICAgICAgLm1hcCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgICBpZiAoIXByb3BlcnR5Lm5hbWUpIHJldHVybiAvLyBUT0RPIHNvbHZlIHRoZSBzcHJlYWQgb3BlcmF0b3IgcHJvYmxlbSBpbiBvYmplY3RzLCBza2lwcGluZyBmb3Igbm93XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHByb3BlcnR5Lm5hbWUuZXNjYXBlZFRleHRcbiAgICAgICAgICBjb25zdCBhY2Nlc3NMZXZlbCA9IHRoaXMuX2FjY2Vzc0xldmVsKG5hbWUpXG4gICAgICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IHRoaXMuX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eSlcbiAgICAgICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgICAgICAocHJvcGVydHkuaW5pdGlhbGl6ZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIDogcHJvcGVydHkuaW5pdGlhbGl6ZXIucGFyYW1ldGVycy5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKS5qb2luKCcsICcpXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgYWNjZXNzTGV2ZWwsXG4gICAgICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBQcm9wZXJ0eVtdXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBuZXcgVHNQYXJzaW5nRXJyb3IoZXJyb3IsICdmaW5kIHByb3BlcnR5JywgcHJvcGVydGllcylcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbChwcm9wTmFtZTogc3RyaW5nKTogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUge1xuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfXycpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJJVkFURVxuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfJykpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUk9URUNURURcbiAgICByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAocHJvcGVydHkuaW5pdGlhbGl6ZXI/LnR5cGUpIHJldHVybiBwcm9wZXJ0eS5pbml0aWFsaXplci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIGlmIChwcm9wZXJ0eS5pbml0aWFsaXplcj8uZXhwcmVzc2lvbikgcmV0dXJuIHByb3BlcnR5LmluaXRpYWxpemVyLmV4cHJlc3Npb24uZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgcmV0dXJuICcnXG4gIH1cbn1cbiJdfQ==