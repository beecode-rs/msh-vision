"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserEnum = void 0;
const entity_1 = require("src/model/entity");
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
            new entity_1.Entity({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBeUM7QUFDekMsdURBQWtEO0FBR2xELGdGQUEwRTtBQUUxRSxNQUFhLFlBQVk7SUFLdkIsWUFBWSxNQUF1RjtRQUNqRyxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFL0YsT0FBTztZQUNMLElBQUksZUFBTSxDQUFDO2dCQUNULElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLElBQUksRUFBRSxJQUFJLHdCQUFVLENBQUM7b0JBQ25CLFVBQVU7aUJBQ1gsQ0FBQzthQUNILENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBN0JELG9DQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlFbnVtIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1lbnVtJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyRW51bSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3BhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGU7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgcGFyc2VkU291cmNlLCBzdGF0ZW1lbnQsIGluUHJvamVjdFBhdGggfSA9IHBhcmFtc1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gICAgdGhpcy5fcGFyc2VkU291cmNlID0gcGFyc2VkU291cmNlXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5PEVudGl0eUVudW0+W10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgY29uc3QgcHJvcGVydGllcyA9ICh0aGlzLl9zdGF0ZW1lbnRbJ21lbWJlcnMnXSA/PyBbXSkubWFwKChtKSA9PiBtLmdldFRleHQodGhpcy5fcGFyc2VkU291cmNlKSlcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eUVudW0oe1xuICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIH0pLFxuICAgICAgfSksXG4gICAgXVxuICB9XG59XG4iXX0=