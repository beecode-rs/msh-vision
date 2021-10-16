"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserType = void 0;
const entity_type_1 = require("src/model/entity-type");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserType {
    constructor({ statement, inProjectPath }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_type_1.EntityType({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
            }),
        ];
    }
}
exports.TsParserType = TsParserType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1REFBa0Q7QUFHbEQsZ0ZBQTBFO0FBRTFFLE1BQWEsWUFBWTtJQUl2QixZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBc0Q7UUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7SUFDckMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE9BQU87WUFDTCxJQUFJLHdCQUFVLENBQUM7Z0JBQ2IsSUFBSTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLFVBQVU7YUFDWCxDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQXJCRCxvQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS10eXBlJ1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBQYXJzYWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFRzUGFyc2VyVHlwZSBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH06IHsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlUeXBlW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHlUeXBlKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxufVxuIl19