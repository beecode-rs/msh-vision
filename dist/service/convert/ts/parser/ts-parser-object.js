"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserObject = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const entity_1 = require("src/model/entity");
const entity_object_1 = require("src/model/entity-object");
const property_1 = require("src/model/property");
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_import_relations_1 = require("src/service/convert/ts/ts-parser-import-relations");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserObject {
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
        const properties = this._findProperties(declaration?.initializer?.['properties']);
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const aliasReference = declaration.initializer?.kind === ts_1.default.SyntaxKind.Identifier ? declaration.initializer['escapedText'] : '';
        const imports = ts_parser_import_relations_1.tsParserImportRelations.findImportRelations(declaration, this._importParseResults);
        return [
            new entity_1.Entity({
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
        if (!properties)
            return [];
        return properties.map((property) => {
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
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QywyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHVEQUE4QjtBQUc5QixrR0FBMkY7QUFDM0YsZ0ZBQTBFO0FBRTFFLE1BQWEsY0FBYztJQU16QixZQUFZLE1BS1g7UUFDQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtCQUFrQixJQUFJLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7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QyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDeEcsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUF0RkQsd0NBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvZW51bS9wcm9wZXJ0eS1hY2Nlc3MtbGV2ZWwtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlPYmplY3QgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LW9iamVjdCdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlckltcG9ydFJlbGF0aW9ucyB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJPYmplY3QgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pbXBvcnRQYXJzZVJlc3VsdHM6IFRzUGFyc2VySW1wb3J0UGFyc2VSZXN1bHRbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cbiAgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGgsIGltcG9ydFBhcnNlUmVzdWx0cyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgICB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMgPSBpbXBvcnRQYXJzZVJlc3VsdHMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5T2JqZWN0PltdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3QodGhpcy5fc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0IGZyb20gc3RhdGVtZW50JylcbiAgICBjb25zdCB7IG5hbWUsIGRlY2xhcmF0aW9uIH0gPSByZXN1bHRcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoZGVjbGFyYXRpb24/LmluaXRpYWxpemVyPy5bJ3Byb3BlcnRpZXMnXSlcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcbiAgICBjb25zdCBhbGlhc1JlZmVyZW5jZSA9XG4gICAgICBkZWNsYXJhdGlvbi5pbml0aWFsaXplcj8ua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyID8gZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXJbJ2VzY2FwZWRUZXh0J10gOiAnJ1xuXG4gICAgY29uc3QgaW1wb3J0cyA9IHRzUGFyc2VySW1wb3J0UmVsYXRpb25zLmZpbmRJbXBvcnRSZWxhdGlvbnMoZGVjbGFyYXRpb24sIHRoaXMuX2ltcG9ydFBhcnNlUmVzdWx0cylcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5T2JqZWN0KHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGFsaWFzUmVmZXJlbmNlLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KFxuICAgIGRlY2xhcmF0aW9uTGlzdDogdHMuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3RcbiAgKTogeyBuYW1lOiBzdHJpbmc7IGRlY2xhcmF0aW9uOiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uIH0gfCB1bmRlZmluZWQge1xuICAgIGlmICghZGVjbGFyYXRpb25MaXN0Py5kZWNsYXJhdGlvbnMpIHJldHVyblxuICAgIGNvbnN0IGRlY2wgPSBkZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQubmFtZSlcbiAgICBpZiAoIWRlY2wpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBkZWNsLm5hbWVbJ2VzY2FwZWRUZXh0J10sXG4gICAgICBkZWNsYXJhdGlvbjogZGVjbCxcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXM/OiBhbnlbXSk6IFByb3BlcnR5W10ge1xuICAgIGlmICghcHJvcGVydGllcykgcmV0dXJuIFtdXG4gICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IHByb3BlcnR5Lm5hbWUuZXNjYXBlZFRleHRcbiAgICAgIGNvbnN0IGFjY2Vzc0xldmVsID0gdGhpcy5fYWNjZXNzTGV2ZWwobmFtZSlcbiAgICAgIGNvbnN0IHJldHVyblR5cGUgPSB0aGlzLl9yZXR1cm5UeXBlVmFsdWUocHJvcGVydHkpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIChwcm9wZXJ0eS5pbml0aWFsaXplci5wYXJhbWV0ZXJzID8/IFtdKS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDogcHJvcGVydHkuaW5pdGlhbGl6ZXIucGFyYW1ldGVycy5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKS5qb2luKCcsICcpXG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYWNjZXNzTGV2ZWwsXG4gICAgICAgIHJldHVyblR5cGUsXG4gICAgICAgIGZ1bmN0aW9uUGFyYW1zLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbChwcm9wTmFtZTogc3RyaW5nKTogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUge1xuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfXycpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJJVkFURVxuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfJykpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUk9URUNURURcbiAgICByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAocHJvcGVydHkuaW5pdGlhbGl6ZXI/LnR5cGUpIHJldHVybiBwcm9wZXJ0eS5pbml0aWFsaXplci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIGlmIChwcm9wZXJ0eS5pbml0aWFsaXplcj8uZXhwcmVzc2lvbikgcmV0dXJuIHByb3BlcnR5LmluaXRpYWxpemVyLmV4cHJlc3Npb24uZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgcmV0dXJuICcnXG4gIH1cbn1cbiJdfQ==