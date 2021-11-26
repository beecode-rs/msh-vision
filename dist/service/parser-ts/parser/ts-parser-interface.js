"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const entity_types_1 = require("src/enum/entity-types");
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const entity_1 = require("src/model/entity");
const entity_interface_1 = require("src/model/entity-interface");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
class TsParserInterface {
    _statement;
    _inProjectPath;
    _parsedSource;
    constructor(params) {
        const { parsedSource, statement, inProjectPath } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
        this._parsedSource = parsedSource;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        const references = ts_parser_service_1.tsParserService.findClassRelations({
            statement: this._statement,
            parsedSource: this._parsedSource,
            inProjectPath: this._inProjectPath,
        });
        const properties = this._findProperties();
        return [
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.INTERFACE,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                meta: new entity_interface_1.EntityInterface({
                    references,
                    properties,
                }),
            }),
        ];
    }
    _findProperties() {
        return this._statement['members'].map((member) => {
            const name = member.name.escapedText;
            const returnType = member.type.getText(this._parsedSource);
            const functionParams = (member.parameters ?? []).length === 0
                ? undefined
                : member.parameters.map((p) => p.getText(this._parsedSource)).join(', ');
            return new property_1.Property({
                name,
                accessLevel: property_access_level_type_1.PropertyAccessLevelType.PUBLIC,
                returnType,
                functionParams,
            });
        });
    }
}
exports.TsParserInterface = TsParserInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBbUQ7QUFDbkQsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QyxpRUFBNEQ7QUFDNUQsaURBQTZDO0FBRzdDLCtFQUF5RTtBQUV6RSxNQUFhLGlCQUFpQjtJQUNULFVBQVUsQ0FBYztJQUN4QixjQUFjLENBQVE7SUFDdEIsYUFBYSxDQUFlO0lBRS9DLFlBQW1CLE1BQXVGO1FBQ3hHLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUE7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFFekMsT0FBTztZQUNMLElBQUksZUFBTSxDQUFDO2dCQUNULElBQUksRUFBRSwwQkFBVyxDQUFDLFNBQVM7Z0JBQzNCLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLElBQUksRUFBRSxJQUFJLGtDQUFlLENBQUM7b0JBQ3hCLFVBQVU7b0JBQ1YsVUFBVTtpQkFDWCxDQUFDO2FBQ0gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzFELE1BQU0sY0FBYyxHQUNsQixDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxTQUFTO2dCQUNYLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUUsT0FBTyxJQUFJLG1CQUFRLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osV0FBVyxFQUFFLG9EQUF1QixDQUFDLE1BQU07Z0JBQzNDLFVBQVU7Z0JBQ1YsY0FBYzthQUNmLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBckRELDhDQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvZW51bS9wcm9wZXJ0eS1hY2Nlc3MtbGV2ZWwtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckludGVyZmFjZSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlOyBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudDsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eTxFbnRpdHlUeXBlcy5JTlRFUkZBQ0U+W10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IHRzUGFyc2VyU2VydmljZS5maW5kQ2xhc3NSZWxhdGlvbnMoe1xuICAgICAgc3RhdGVtZW50OiB0aGlzLl9zdGF0ZW1lbnQsXG4gICAgICBwYXJzZWRTb3VyY2U6IHRoaXMuX3BhcnNlZFNvdXJjZSxcbiAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgfSlcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fZmluZFByb3BlcnRpZXMoKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5JTlRFUkZBQ0UsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIG1ldGE6IG5ldyBFbnRpdHlJbnRlcmZhY2Uoe1xuICAgICAgICAgIHJlZmVyZW5jZXMsXG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXS5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IG1lbWJlci5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICBjb25zdCByZXR1cm5UeXBlID0gbWVtYmVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIChtZW1iZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IG1lbWJlci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhY2Nlc3NMZXZlbDogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIl19