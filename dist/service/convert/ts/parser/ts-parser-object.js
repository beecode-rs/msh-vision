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
            // const returnType = property.initializer.type.getText(this._parsedSource)
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
            return property_1.PropertyAccessLevelType.PRIVATE;
        if (propName.startsWith('_'))
            return property_1.PropertyAccessLevelType.PROTECTED;
        return property_1.PropertyAccessLevelType.PUBLIC;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQXNEO0FBQ3RELGlEQUFzRTtBQUd0RSxnRkFBMEU7QUFFMUUsTUFBYSxjQUFjO0lBS3pCLFlBQVksRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULGFBQWEsR0FLZDtRQUNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFBO0lBQ25DLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxNQUFNLEdBQUcsbUNBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUMzRixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsT0FBTztZQUNMLElBQUksNEJBQVksQ0FBQztnQkFDZixJQUFJO2dCQUNKLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztnQkFDbEMsVUFBVTtnQkFDVixVQUFVO2FBQ1gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0lBRVMsZUFBZSxDQUFDLFVBQWtCO1FBQzFDLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDMUIsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDdEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMzQywyRUFBMkU7WUFDM0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ2xELE1BQU0sY0FBYyxHQUNsQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUNsRCxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMxRixPQUFPLElBQUksbUJBQVEsQ0FBQztnQkFDbEIsSUFBSTtnQkFDSixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsY0FBYzthQUNmLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVTLFlBQVksQ0FBQyxRQUFnQjtRQUNyQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxrQ0FBdUIsQ0FBQyxPQUFPLENBQUE7UUFDckUsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sa0NBQXVCLENBQUMsU0FBUyxDQUFBO1FBQ3RFLE9BQU8sa0NBQXVCLENBQUMsTUFBTSxDQUFBO0lBQ3ZDLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxRQUFhO1FBQ3RDLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJO1lBQUUsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzVGLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxVQUFVO1lBQUUsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3hHLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBbkVELHdDQW1FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgUHJvcGVydHksIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyT2JqZWN0IGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHBhcnNlZFNvdXJjZSxcbiAgICBzdGF0ZW1lbnQsXG4gICAgaW5Qcm9qZWN0UGF0aCxcbiAgfToge1xuICAgIHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuICAgIHN0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eU9iamVjdFtdIHtcbiAgICBjb25zdCByZXN1bHQgPSB0c1BhcnNlclNlcnZpY2UubmFtZUZyb21EZWNsYXJhdGlvbnNMaXN0KHRoaXMuX3N0YXRlbWVudFsnZGVjbGFyYXRpb25MaXN0J10pXG4gICAgaWYgKCFyZXN1bHQpIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIG9iamVjdCBmcm9tIHN0YXRlbWVudCcpXG4gICAgY29uc3QgeyBuYW1lLCBkZWNsYXJhdGlvbiB9ID0gcmVzdWx0XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHRoaXMuX2ZpbmRQcm9wZXJ0aWVzKGRlY2xhcmF0aW9uPy5pbml0aWFsaXplcj8uWydwcm9wZXJ0aWVzJ10pXG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eU9iamVjdCh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKHByb3BlcnRpZXM/OiBhbnlbXSk6IFByb3BlcnR5W10ge1xuICAgIGlmICghcHJvcGVydGllcykgcmV0dXJuIFtdXG4gICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IHByb3BlcnR5Lm5hbWUuZXNjYXBlZFRleHRcbiAgICAgIGNvbnN0IGFjY2Vzc0xldmVsID0gdGhpcy5fYWNjZXNzTGV2ZWwobmFtZSlcbiAgICAgIC8vIGNvbnN0IHJldHVyblR5cGUgPSBwcm9wZXJ0eS5pbml0aWFsaXplci50eXBlLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKVxuICAgICAgY29uc3QgcmV0dXJuVHlwZSA9IHRoaXMuX3JldHVyblR5cGVWYWx1ZShwcm9wZXJ0eSlcbiAgICAgIGNvbnN0IGZ1bmN0aW9uUGFyYW1zID1cbiAgICAgICAgKHByb3BlcnR5LmluaXRpYWxpemVyLnBhcmFtZXRlcnMgPz8gW10pLmxlbmd0aCA9PT0gMFxuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBwcm9wZXJ0eS5pbml0aWFsaXplci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhY2Nlc3NMZXZlbCxcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgZnVuY3Rpb25QYXJhbXMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2FjY2Vzc0xldmVsKHByb3BOYW1lOiBzdHJpbmcpOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB7XG4gICAgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ19fJykpIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUklWQVRFXG4gICAgaWYgKHByb3BOYW1lLnN0YXJ0c1dpdGgoJ18nKSkgcmV0dXJuIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBST1RFQ1RFRFxuICAgIHJldHVybiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QVUJMSUNcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmV0dXJuVHlwZVZhbHVlKHByb3BlcnR5OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChwcm9wZXJ0eS5pbml0aWFsaXplcj8udHlwZSkgcmV0dXJuIHByb3BlcnR5LmluaXRpYWxpemVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgaWYgKHByb3BlcnR5LmluaXRpYWxpemVyPy5leHByZXNzaW9uKSByZXR1cm4gcHJvcGVydHkuaW5pdGlhbGl6ZXIuZXhwcmVzc2lvbi5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSlcbiAgICByZXR1cm4gJydcbiAgfVxufVxuIl19