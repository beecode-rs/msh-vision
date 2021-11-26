"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserEnum = void 0;
const entity_types_1 = require("src/enum/entity-types");
const entity_1 = require("src/model/entity");
const entity_enum_1 = require("src/model/entity-enum");
const ts_parser_service_1 = require("src/service/parser-ts/ts-parser-service");
class TsParserEnum {
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
        const properties = (this._statement['members'] ?? []).map((m) => m.getText(this._parsedSource));
        return [
            new entity_1.Entity({
                type: entity_types_1.EntityTypes.ENUM,
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                meta: new entity_enum_1.EntityEnum({
                    properties,
                }),
            }),
        ];
    }
}
exports.TsParserEnum = TsParserEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFtRDtBQUNuRCw2Q0FBeUM7QUFDekMsdURBQWtEO0FBR2xELCtFQUF5RTtBQUV6RSxNQUFhLFlBQVk7SUFDSixVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUUvQyxZQUFtQixNQUF1RjtRQUN4RyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFL0YsT0FBTztZQUNMLElBQUksZUFBTSxDQUFDO2dCQUNULElBQUksRUFBRSwwQkFBVyxDQUFDLElBQUk7Z0JBQ3RCLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLElBQUksRUFBRSxJQUFJLHdCQUFVLENBQUM7b0JBQ25CLFVBQVU7aUJBQ1gsQ0FBQzthQUNILENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBOUJELG9DQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eUVudW0gfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWVudW0nXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3BhcnNlci9wYXJzYWJsZSdcbmltcG9ydCB7IHRzUGFyc2VyU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyRW51bSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlOyBzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudDsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IHBhcnNlZFNvdXJjZSwgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICAgIHRoaXMuX3BhcnNlZFNvdXJjZSA9IHBhcnNlZFNvdXJjZVxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eTxFbnRpdHlUeXBlcy5FTlVNPltdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSAodGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10gPz8gW10pLm1hcCgobSkgPT4gbS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgIHR5cGU6IEVudGl0eVR5cGVzLkVOVU0sXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICAgIG1ldGE6IG5ldyBFbnRpdHlFbnVtKHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxufVxuIl19