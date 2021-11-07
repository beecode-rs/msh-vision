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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3RzLXBhcnNlci1lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFtRDtBQUNuRCw2Q0FBeUM7QUFDekMsdURBQWtEO0FBR2xELCtFQUF5RTtBQUV6RSxNQUFhLFlBQVk7SUFDSixVQUFVLENBQWM7SUFDeEIsY0FBYyxDQUFRO0lBQ3RCLGFBQWEsQ0FBZTtJQUUvQyxZQUFZLE1BQXVGO1FBQ2pHLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQTtJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtRQUUvRixPQUFPO1lBQ0wsSUFBSSxlQUFNLENBQUM7Z0JBQ1QsSUFBSSxFQUFFLDBCQUFXLENBQUMsSUFBSTtnQkFDdEIsSUFBSTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLFVBQVU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksd0JBQVUsQ0FBQztvQkFDbkIsVUFBVTtpQkFDWCxDQUFDO2FBQ0gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUE5QkQsb0NBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5RW51bSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktZW51bSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgUGFyc2FibGUgfSBmcm9tICdzcmMvc2VydmljZS9wYXJzZXItdHMvcGFyc2VyL3BhcnNhYmxlJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcGFyc2VyLXRzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJFbnVtIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcGFyc2VkU291cmNlOiB0cy5Tb3VyY2VGaWxlXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZTsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBwYXJzZWRTb3VyY2UsIHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9ID0gcGFyYW1zXG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9wYXJzZWRTb3VyY2UgPSBwYXJzZWRTb3VyY2VcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHk8RW50aXR5VHlwZXMuRU5VTT5bXSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuX3N0YXRlbWVudFsnbmFtZSddLmVzY2FwZWRUZXh0XG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gKHRoaXMuX3N0YXRlbWVudFsnbWVtYmVycyddID8/IFtdKS5tYXAoKG0pID0+IG0uZ2V0VGV4dCh0aGlzLl9wYXJzZWRTb3VyY2UpKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHkoe1xuICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5FTlVNLFxuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICBtZXRhOiBuZXcgRW50aXR5RW51bSh7XG4gICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgfSksXG4gICAgICB9KSxcbiAgICBdXG4gIH1cbn1cbiJdfQ==