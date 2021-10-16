"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserObject = void 0;
const entity_object_1 = require("src/model/entity-object");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserObject {
    constructor({ parsedSource, statement, inProjectPath, }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
    }
    parse() {
        const result = ts_parser_service_1.tsParserService.nameFromDeclarationsList(this._statement['declarationList']);
        if (!result)
            throw new Error('Could not parse object from statement');
        const { name, declaration } = result;
        const properties = this._findProperties(declaration?.initializer?.['properties']);
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_object_1.EntityObject({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                properties,
            }),
        ];
    }
    _findProperties(properties) {
        if (!properties)
            return [];
        return properties.map((property) => {
            const name = property.name.escapedText;
            const accessLevel = this._accessLevel(name);
            const returnType = property.initializer.type.getText(this._parsedSource);
            const functionParams = property.initializer.parameters.length === 0
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
            return property_1.PropertyAccessLevelType.PRIVATE;
        if (propName.startsWith('_'))
            return property_1.PropertyAccessLevelType.PROTECTED;
        return property_1.PropertyAccessLevelType.PUBLIC;
    }
}
exports.TsParserObject = TsParserObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQXNEO0FBQ3RELGlEQUFzRTtBQUd0RSxnRkFBMEU7QUFFMUUsTUFBYSxjQUFjO0lBS3pCLFlBQVksRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULGFBQWEsR0FLZDtRQUNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO0lBQ25DLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxNQUFNLEdBQUcsbUNBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUMzRixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsT0FBTztZQUNMLElBQUksNEJBQVksQ0FBQztnQkFDZixJQUFJO2dCQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDbEMsVUFBVTtnQkFDVixVQUFVO2FBQ1gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0lBRVMsZUFBZSxDQUFDLFVBQWtCO1FBQzFDLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDMUIsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDdEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMzQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3hFLE1BQU0sY0FBYyxHQUNsQixRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ1gsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDMUYsT0FBTyxJQUFJLG1CQUFRLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osV0FBVztnQkFDWCxVQUFVO2dCQUNWLGNBQWM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFUyxZQUFZLENBQUMsUUFBZ0I7UUFDckMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sa0NBQXVCLENBQUMsT0FBTyxDQUFBO1FBQ3JFLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLGtDQUF1QixDQUFDLFNBQVMsQ0FBQTtRQUN0RSxPQUFPLGtDQUF1QixDQUFDLE1BQU0sQ0FBQTtJQUN2QyxDQUFDO0NBQ0Y7QUE1REQsd0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBQcm9wZXJ0eSwgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJPYmplY3QgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgcGFyc2VkU291cmNlLFxuICAgIHN0YXRlbWVudCxcbiAgICBpblByb2plY3RQYXRoLFxuICB9OiB7XG4gICAgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG4gICAgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgfSkge1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5T2JqZWN0W10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRzUGFyc2VyU2VydmljZS5uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3QodGhpcy5fc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0IGZyb20gc3RhdGVtZW50JylcbiAgICBjb25zdCB7IG5hbWUsIGRlY2xhcmF0aW9uIH0gPSByZXN1bHRcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoZGVjbGFyYXRpb24/LmluaXRpYWxpemVyPy5bJ3Byb3BlcnRpZXMnXSlcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5T2JqZWN0KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZmluZFByb3BlcnRpZXMocHJvcGVydGllcz86IGFueVtdKTogUHJvcGVydHlbXSB7XG4gICAgaWYgKCFwcm9wZXJ0aWVzKSByZXR1cm4gW11cbiAgICByZXR1cm4gcHJvcGVydGllcy5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gcHJvcGVydHkubmFtZS5lc2NhcGVkVGV4dFxuICAgICAgY29uc3QgYWNjZXNzTGV2ZWwgPSB0aGlzLl9hY2Nlc3NMZXZlbChuYW1lKVxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IHByb3BlcnR5LmluaXRpYWxpemVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIHByb3BlcnR5LmluaXRpYWxpemVyLnBhcmFtZXRlcnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IHByb3BlcnR5LmluaXRpYWxpemVyLnBhcmFtZXRlcnMubWFwKChwKSA9PiBwLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKSkuam9pbignLCAnKVxuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGFjY2Vzc0xldmVsLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfYWNjZXNzTGV2ZWwocHJvcE5hbWU6IHN0cmluZyk6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIHtcbiAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnX18nKSkgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEVcbiAgICBpZiAocHJvcE5hbWUuc3RhcnRzV2l0aCgnXycpKSByZXR1cm4gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEXG4gICAgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBVQkxJQ1xuICB9XG59XG4iXX0=