"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserObject = void 0;
const entity_types_1 = require("src/enum/entity-types");
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/convert-ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/convert-ts/ts-parser-service");
const ts_parsing_error_1 = require("src/service/convert-ts/ts-parsing-error");
const entity_1 = require("src/service/model/entity");
const entity_object_1 = require("src/service/model/entity-object");
const property_1 = require("src/service/model/property");
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
        const aliasReference = declaration.initializer?.kind === ts_1.default.SyntaxKind.Identifier ? declaration.initializer['escapedText'] : '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELG9GQUE2RTtBQUM3RSx1REFBOEI7QUFHOUIsa0dBQTJGO0FBQzNGLGdGQUEwRTtBQUMxRSw4RUFBd0U7QUFDeEUscURBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCx5REFBcUQ7QUFFckQsTUFBYSxjQUFjO0lBQ04sVUFBVSxDQUFjO0lBQ3hCLGNBQWMsQ0FBUTtJQUN0QixhQUFhLENBQWU7SUFDNUIsbUJBQW1CLENBQTZCO0lBRW5FLFlBQVksTUFLWDtRQUNDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLElBQUksRUFBRSxDQUFBO0lBQ3JELENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3BDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDcEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVB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QUM7SUFFUyxZQUFZLENBQUMsUUFBZ0I7UUFDckMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sb0RBQXVCLENBQUMsT0FBTyxDQUFBO1FBQ3JFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLG9EQUF1QixDQUFDLFNBQVMsQ0FBQTtRQUN0RSxPQUFPLG9EQUF1QixDQUFDLE1BQU0sQ0FBQTtJQUN2QyxDQUFDO0lBRVMsZ0JBQWdCLENBQUMsUUFBYTtRQUN0QyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSTtZQUFFLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM1RixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVTtZQUFFLE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN4RyxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQWhHRCx3Q0FnR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHJvcGVydHktYWNjZXNzLWxldmVsLXR5cGUnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy9wYXJzZXIvdHMtcGFyc2VyLWltcG9ydCdcbmltcG9ydCB7IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC10cy90cy1wYXJzZXItaW1wb3J0LXJlbGF0aW9ucydcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5pbXBvcnQgeyBUc1BhcnNpbmdFcnJvciB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2luZy1lcnJvcidcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL3Byb3BlcnR5J1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJPYmplY3QgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5VHlwZXMuT0JKRUNUPltdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3QodGhpcy5fc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0IGZyb20gc3RhdGVtZW50JylcbiAgICBjb25zdCB7IG5hbWUsIGRlY2xhcmF0aW9uIH0gPSByZXN1bHRcbiAgICBpZiAoIW5hbWUpIHJldHVybiBbXVxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcyhkZWNsYXJhdGlvbj8uaW5pdGlhbGl6ZXI/LlsncHJvcGVydGllcyddKVxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuICAgIGNvbnN0IGFsaWFzUmVmZXJlbmNlID1cbiAgICAgIGRlY2xhcmF0aW9uLmluaXRpYWxpemVyPy5raW5kID09PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIgPyBkZWNsYXJhdGlvbi5pbml0aWFsaXplclsnZXNjYXBlZFRleHQnXSA6ICcnXG5cbiAgICBjb25zdCBpbXBvcnRzID0gdHNQYXJzZXJJbXBvcnRSZWxhdGlvbnMuZmluZEltcG9ydFJlbGF0aW9ucyhkZWNsYXJhdGlvbiwgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5PQkpFQ1QsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIHJlZmVyZW5jZXM6IFsuLi5pbXBvcnRzXSxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eU9iamVjdCh7XG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgICBhbGlhc1JlZmVyZW5jZSxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX25hbWVGcm9tRGVjbGFyYXRpb25zTGlzdChcbiAgICBkZWNsYXJhdGlvbkxpc3Q6IHRzLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0XG4gICk6IHsgbmFtZTogc3RyaW5nOyBkZWNsYXJhdGlvbjogdHMuVmFyaWFibGVEZWNsYXJhdGlvbiB9IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWRlY2xhcmF0aW9uTGlzdD8uZGVjbGFyYXRpb25zKSByZXR1cm5cbiAgICBjb25zdCBkZWNsID0gZGVjbGFyYXRpb25MaXN0LmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLm5hbWUpXG4gICAgaWYgKCFkZWNsKSByZXR1cm5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogZGVjbC5uYW1lWydlc2NhcGVkVGV4dCddLFxuICAgICAgZGVjbGFyYXRpb246IGRlY2wsXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9maW5kUHJvcGVydGllcyhwcm9wZXJ0aWVzPzogYW55W10pOiBQcm9wZXJ0eVtdIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFwcm9wZXJ0aWVzKSByZXR1cm4gW11cbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzXG4gICAgICAgIC5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgaWYgKCFwcm9wZXJ0eS5uYW1lKSByZXR1cm4gLy8gVE9ETyBzb2x2ZSB0aGUgc3ByZWFkIG9wZXJhdG9yIHByb2JsZW0gaW4gb2JqZWN0cywgc2tpcHBpbmcgZm9yIG5vd1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcm9wZXJ0eS5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICAgICAgY29uc3QgYWNjZXNzTGV2ZWwgPSB0aGlzLl9hY2Nlc3NMZXZlbChuYW1lKVxuICAgICAgICAgIGNvbnN0IHJldHVyblR5cGUgPSB0aGlzLl9yZXR1cm5UeXBlVmFsdWUocHJvcGVydHkpXG4gICAgICAgICAgY29uc3QgZnVuY3Rpb25QYXJhbXMgPVxuICAgICAgICAgICAgKHByb3BlcnR5LmluaXRpYWxpemVyLnBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA6IHByb3BlcnR5LmluaXRpYWxpemVyLnBhcmFtZXRlcnMubWFwKChwKSA9PiBwLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKSkuam9pbignLCAnKVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGFjY2Vzc0xldmVsLFxuICAgICAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uUGFyYW1zLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUHJvcGVydHlbXVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikgdGhyb3cgbmV3IFRzUGFyc2luZ0Vycm9yKGVycm9yLCAnZmluZCBwcm9wZXJ0eScsIHByb3BlcnRpZXMpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfYWNjZXNzTGV2ZWwocHJvcE5hbWU6IHN0cmluZyk6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIHtcbiAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnX18nKSkgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEVcbiAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnXycpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEXG4gICAgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBVQkxJQ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZXR1cm5UeXBlVmFsdWUocHJvcGVydHk6IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKHByb3BlcnR5LmluaXRpYWxpemVyPy50eXBlKSByZXR1cm4gcHJvcGVydHkuaW5pdGlhbGl6ZXIudHlwZS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICBpZiAocHJvcGVydHkuaW5pdGlhbGl6ZXI/LmV4cHJlc3Npb24pIHJldHVybiBwcm9wZXJ0eS5pbml0aWFsaXplci5leHByZXNzaW9uLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIHJldHVybiAnJ1xuICB9XG59XG4iXX0=