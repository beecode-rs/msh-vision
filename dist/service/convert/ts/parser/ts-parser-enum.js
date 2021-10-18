"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserEnum = void 0;
const entity_enum_1 = require("src/model/entity-enum");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserEnum {
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
            new entity_enum_1.EntityEnum({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                properties,
            }),
        ];
    }
}
exports.TsParserEnum = TsParserEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBa0Q7QUFHbEQsZ0ZBQTBFO0FBRTFFLE1BQWEsWUFBWTtJQUt2QixZQUFZLE1BQXVGO1FBQ2pHLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtRQUUvRixPQUFPO1lBQ0wsSUFBSSx3QkFBVSxDQUFDO2dCQUNiLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLFVBQVU7YUFDWCxDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQTNCRCxvQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlFbnVtIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1lbnVtJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyRW51bSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGU7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5RW51bVtdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSAodGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10gPz8gW10pLm1hcCgobSkgPT4gbS5nZXRUZXh0KHRoaXMuX3BhcnNlZFNvdXJjZSkpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eUVudW0oe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfSksXG4gICAgXVxuICB9XG59XG4iXX0=