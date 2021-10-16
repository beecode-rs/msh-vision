"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const entity_interface_1 = require("src/model/entity-interface");
const property_1 = require("src/model/property");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserInterface {
    constructor({ parsedSource, statement, inProjectPath, }) {
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
            new entity_interface_1.EntityInterface({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                references,
                properties,
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
                accessLevel: property_1.PropertyAccessLevelType.PUBLIC,
                returnType,
                functionParams,
            });
        });
    }
}
exports.TsParserInterface = TsParserInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQTREO0FBQzVELGlEQUFzRTtBQUd0RSxnRkFBMEU7QUFFMUUsTUFBYSxpQkFBaUI7SUFLNUIsWUFBWSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsYUFBYSxHQUtkO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsa0JBQWtCLENBQUM7WUFDcEQsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzFCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNoQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDbkMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBRXpDLE9BQU87WUFDTCxJQUFJLGtDQUFlLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLFVBQVU7Z0JBQ1YsVUFBVTthQUNYLENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMxRCxNQUFNLGNBQWMsR0FDbEIsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVFLE9BQU8sSUFBSSxtQkFBUSxDQUFDO2dCQUNsQixJQUFJO2dCQUNKLFdBQVcsRUFBRSxrQ0FBdUIsQ0FBQyxNQUFNO2dCQUMzQyxVQUFVO2dCQUNWLGNBQWM7YUFDZixDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQXpERCw4Q0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IFByb3BlcnR5LCBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtcGFyc2VyLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBUc1BhcnNlckludGVyZmFjZSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBwYXJzZWRTb3VyY2UsXG4gICAgc3RhdGVtZW50LFxuICAgIGluUHJvamVjdFBhdGgsXG4gIH06IHtcbiAgICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgICBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICAgIGluUHJvamVjdFBhdGg6IHN0cmluZ1xuICB9KSB7XG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX3N0YXRlbWVudFsnbmFtZSddLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICBjb25zdCByZWZlcmVuY2VzID0gdHNQYXJzZXJTZXJ2aWNlLmZpbmRDbGFzc1JlbGF0aW9ucyh7XG4gICAgICBzdGF0ZW1lbnQ6IHRoaXMuX3N0YXRlbWVudCxcbiAgICAgIHBhcnNlZFNvdXJjZTogdGhpcy5fcGFyc2VkU291cmNlLFxuICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICB9KVxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9maW5kUHJvcGVydGllcygpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eUludGVyZmFjZSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIHJlZmVyZW5jZXMsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICB9KSxcbiAgICBdXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZpbmRQcm9wZXJ0aWVzKCk6IFByb3BlcnR5W10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXS5tYXAoKG1lbWJlcikgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IG1lbWJlci5uYW1lLmVzY2FwZWRUZXh0XG4gICAgICBjb25zdCByZXR1cm5UeXBlID0gbWVtYmVyLnR5cGUuZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpXG4gICAgICBjb25zdCBmdW5jdGlvblBhcmFtcyA9XG4gICAgICAgIChtZW1iZXIucGFyYW1ldGVycyA/PyBbXSkubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICA6IG1lbWJlci5wYXJhbWV0ZXJzLm1hcCgocCkgPT4gcC5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpLmpvaW4oJywgJylcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBhY2Nlc3NMZXZlbDogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDLFxuICAgICAgICByZXR1cm5UeXBlLFxuICAgICAgICBmdW5jdGlvblBhcmFtcyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIl19