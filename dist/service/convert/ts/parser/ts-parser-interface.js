"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const entity_1 = require("src/model/entity");
const entity_interface_1 = require("src/model/entity-interface");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserInterface {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBQzdFLDZDQUF5QztBQUN6QyxpRUFBNEQ7QUFDNUQsaURBQTZDO0FBRzdDLGdGQUEwRTtBQUUxRSxNQUFhLGlCQUFpQjtJQUs1QixZQUFZLE1BQXVGO1FBQ2pHLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNwRCxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2hDLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNuQyxDQUFDLENBQUE7UUFDRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFFekMsT0FBTztZQUNMLElBQUksZUFBTSxDQUFDO2dCQUNULElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLElBQUksRUFBRSxJQUFJLGtDQUFlLENBQUM7b0JBQ3hCLFVBQVU7b0JBQ1YsVUFBVTtpQkFDWCxDQUFDO2FBQ0gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUE7WUFDcEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQzFELE1BQU0sY0FBYyxHQUNsQixDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxTQUFTO2dCQUNYLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUUsT0FBTyxJQUFJLG1CQUFRLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osV0FBVyxFQUFFLG9EQUF1QixDQUFDLE1BQU07Z0JBQzNDLFVBQVU7Z0JBQ1YsY0FBYzthQUNmLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBcERELDhDQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHJvcGVydHktYWNjZXNzLWxldmVsLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5SW50ZXJmYWNlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1pbnRlcmZhY2UnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckludGVyZmFjZSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGU7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eUludGVyZmFjZT5bXSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX3N0YXRlbWVudFsnbmFtZSddLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICBjb25zdCByZWZlcmVuY2VzID0gdHNQYXJzZXJTZXJ2aWNlLmZpbmRDbGFzc1JlbGF0aW9ucyh7XG4gICAgICBzdGF0ZW1lbnQ6IHRoaXMuX3N0YXRlbWVudCxcbiAgICAgIHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLFxuICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICB9KVxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcygpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIG1ldGE6IG5ldyBFbnRpdHlJbnRlcmZhY2Uoe1xuICAgICAgICAgIHJlZmVyZW5jZXMsXG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXS5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IG1lbWJlci5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICBjb25zdCByZXR1cm5UeXBlID0gbWVtYmVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIChtZW1iZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IG1lbWJlci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhY2Nlc3NMZXZlbDogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIl19