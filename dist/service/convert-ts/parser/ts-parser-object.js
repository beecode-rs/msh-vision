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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELG9GQUE2RTtBQUM3RSx1REFBOEI7QUFHOUIsa0dBQTJGO0FBQzNGLGdGQUEwRTtBQUMxRSw4RUFBd0U7QUFDeEUscURBQWlEO0FBQ2pELG1FQUE4RDtBQUM5RCx5REFBcUQ7QUFFckQsTUFBYSxjQUFjO0lBQ04sVUFBVSxDQUFjO0lBQ3hCLGNBQWMsQ0FBUTtJQUN0QixhQUFhLENBQWU7SUFDNUIsbUJBQW1CLENBQTZCO0lBRW5FLFlBQVksTUFLWDtRQUNDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtRQUNqQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLElBQUksRUFBRSxDQUFBO0lBQ3JELENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FB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QUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLG9EQUF1QixDQUFDLE9BQU8sQ0FBQTtRQUNyRSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxvREFBdUIsQ0FBQyxTQUFTLENBQUE7UUFDdEUsT0FBTyxvREFBdUIsQ0FBQyxNQUFNLENBQUE7SUFDdkMsQ0FBQztJQUVTLGdCQUFnQixDQUFDLFFBQWE7UUFDdEMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUk7WUFBRSxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDNUYsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQVU7WUFBRSxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDeEcsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUEvRkQsd0NBK0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3Byb3BlcnR5LWFjY2Vzcy1sZXZlbC10eXBlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvcGFyc2VyL3RzLXBhcnNlci1pbXBvcnQnXG5pbXBvcnQgeyB0c1BhcnNlckltcG9ydFJlbGF0aW9ucyB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtcGFyc2VyLWltcG9ydC1yZWxhdGlvbnMnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgVHNQYXJzaW5nRXJyb3IgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0LXRzL3RzLXBhcnNpbmctZXJyb3InXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9wcm9wZXJ0eSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyT2JqZWN0IGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gIHByb3RlY3RlZCByZWFkb25seSBfaW1wb3J0UGFyc2VSZXN1bHRzOiBUc1BhcnNlckltcG9ydFBhcnNlUmVzdWx0W11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICAgIGltcG9ydFBhcnNlUmVzdWx0czogVHNQYXJzZXJJbXBvcnRQYXJzZVJlc3VsdFtdXG4gIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoLCBpbXBvcnRQYXJzZVJlc3VsdHMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gICAgdGhpcy5faW1wb3J0UGFyc2VSZXN1bHRzID0gaW1wb3J0UGFyc2VSZXN1bHRzID8/IFtdXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5bXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KHRoaXMuX3N0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10pXG4gICAgaWYgKCFyZXN1bHQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIG9iamVjdCBmcm9tIHN0YXRlbWVudCcpXG4gICAgY29uc3QgeyBuYW1lLCBkZWNsYXJhdGlvbiB9ID0gcmVzdWx0XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2ZpbmRQcm9wZXJ0aWVzKGRlY2xhcmF0aW9uPy5pbml0aWFsaXplcj8uWydwcm9wZXJ0aWVzJ10pXG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG4gICAgY29uc3QgYWxpYXNSZWZlcmVuY2UgPVxuICAgICAgZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXI/LmtpbmQgPT09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllciA/IGRlY2xhcmF0aW9uLmluaXRpYWxpemVyWydlc2NhcGVkVGV4dCddIDogJydcblxuICAgIGNvbnN0IGltcG9ydHMgPSB0c1BhcnNlckltcG9ydFJlbGF0aW9ucy5maW5kSW1wb3J0UmVsYXRpb25zKGRlY2xhcmF0aW9uLCB0aGlzLl9pbXBvcnRQYXJzZVJlc3VsdHMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLk9CSkVDVCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcmVmZXJlbmNlczogWy4uLmltcG9ydHNdLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5T2JqZWN0KHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGFsaWFzUmVmZXJlbmNlLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KFxuICAgIGRlY2xhcmF0aW9uTGlzdDogdHMuVmFyaWFibGVEZWNsYXJhdGlvbkxpc3RcbiAgKTogeyBuYW1lOiBzdHJpbmc7IGRlY2xhcmF0aW9uOiB0cy5WYXJpYWJsZURlY2xhcmF0aW9uIH0gfCB1bmRlZmluZWQge1xuICAgIGlmICghZGVjbGFyYXRpb25MaXN0Py5kZWNsYXJhdGlvbnMpIHJldHVyblxuICAgIGNvbnN0IGRlY2wgPSBkZWNsYXJhdGlvbkxpc3QuZGVjbGFyYXRpb25zLmZpbmQoKGQpID0+IGQubmFtZSlcbiAgICBpZiAoIWRlY2wpIHJldHVyblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBkZWNsLm5hbWVbJ2VzY2FwZWRUZXh0J10sXG4gICAgICBkZWNsYXJhdGlvbjogZGVjbCxcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXM/OiBhbnlbXSk6IFByb3BlcnR5W10ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBbXVxuICAgICAgcmV0dXJuIHByb3BlcnRpZXNcbiAgICAgICAgLm1hcCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgICBpZiAoIXByb3BlcnR5Lm5hbWUpIHJldHVybiAvLyBUT0RPIHNvbHZlIHRoZSBzcHJlYWQgb3BlcmF0b3IgcHJvYmxlbSBpbiBvYmplY3RzLCBza2lwcGluZyBmb3Igbm93XG4gICAgICAgICAgY29uc3QgbmFtZSA9IHByb3BlcnR5Lm5hbWUuZXNjYXBlZFRleHRcbiAgICAgICAgICBjb25zdCBhY2Nlc3NMZXZlbCA9IHRoaXMuX2FjY2Vzc0xldmVsKG5hbWUpXG4gICAgICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IHRoaXMuX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eSlcbiAgICAgICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgICAgICAocHJvcGVydHkuaW5pdGlhbGl6ZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIDogcHJvcGVydHkuaW5pdGlhbGl6ZXIucGFyYW1ldGVycy5tYXAoKHApID0+IHAuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKS5qb2luKCcsICcpXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgYWNjZXNzTGV2ZWwsXG4gICAgICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBQcm9wZXJ0eVtdXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBuZXcgVHNQYXJzaW5nRXJyb3IoZXJyb3IsICdmaW5kIHByb3BlcnR5JywgcHJvcGVydGllcylcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbChwcm9wTmFtZTogc3RyaW5nKTogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUge1xuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfXycpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJJVkFURVxuICAgIGlmIChwcm9wTmFtZS5zdGFydHNXaXRoKCdfJykpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUk9URUNURURcbiAgICByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDXG4gIH1cblxuICBwcm90ZWN0ZWQgX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eTogYW55KTogc3RyaW5nIHtcbiAgICBpZiAocHJvcGVydHkuaW5pdGlhbGl6ZXI/LnR5cGUpIHJldHVybiBwcm9wZXJ0eS5pbml0aWFsaXplci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgIGlmIChwcm9wZXJ0eS5pbml0aWFsaXplcj8uZXhwcmVzc2lvbikgcmV0dXJuIHByb3BlcnR5LmluaXRpYWxpemVyLmV4cHJlc3Npb24uZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgcmV0dXJuICcnXG4gIH1cbn1cbiJdfQ==