"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserClass = void 0;
const entity_class_1 = require("src/model/entity-class");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserClass {
    constructor({ statement, inProjectPath }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        // const properties = this._statement['members'].map((m) => m.name?.escapedText)
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_class_1.EntityClass({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
            }),
        ];
    }
}
exports.TsParserClass = TsParserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvdHMtcGFyc2VyLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFvRDtBQUdwRCxnRkFBMEU7QUFFMUUsTUFBYSxhQUFhO0lBSXhCLFlBQVksRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFzRDtRQUMxRixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtJQUNyQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELGdGQUFnRjtRQUNoRixNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE9BQU87WUFDTCxJQUFJLDBCQUFXLENBQUM7Z0JBQ2QsSUFBSTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLFVBQVU7YUFDWCxDQUFDO1NBQ0gsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQXRCRCxzQ0FzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlDbGFzcyB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJDbGFzcyBpbXBsZW1lbnRzIFBhcnNhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2luUHJvamVjdFBhdGg6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH06IHsgc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQ7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fc3RhdGVtZW50ID0gc3RhdGVtZW50XG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZSgpOiBFbnRpdHlDbGFzc1tdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICAvLyBjb25zdCBwcm9wZXJ0aWVzID0gdGhpcy5fc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtKSA9PiBtLm5hbWU/LmVzY2FwZWRUZXh0KVxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHlDbGFzcyh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICB9KSxcbiAgICBdXG4gIH1cbn1cbiJdfQ==