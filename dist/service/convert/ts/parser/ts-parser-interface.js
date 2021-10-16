"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserInterface = void 0;
const entity_interface_1 = require("src/model/entity-interface");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserInterface {
    constructor({ statement, inProjectPath }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_interface_1.EntityInterface({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
            }),
        ];
    }
}
exports.TsParserInterface = TsParserInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQTREO0FBRzVELGdGQUEwRTtBQUUxRSxNQUFhLGlCQUFpQjtJQUk1QixZQUFZLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBc0Q7UUFDMUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7SUFDckMsQ0FBQztJQUVNLEtBQUs7UUFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQTtRQUNoRCxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXhFLE9BQU87WUFDTCxJQUFJLGtDQUFlLENBQUM7Z0JBQ2xCLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2FBQ1gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFyQkQsOENBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5SW50ZXJmYWNlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1pbnRlcmZhY2UnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJJbnRlcmZhY2UgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcih7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9OiB7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5SW50ZXJmYWNlW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9zdGF0ZW1lbnRbJ25hbWUnXS5lc2NhcGVkVGV4dFxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZCh0aGlzLl9zdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbnRpdHlJbnRlcmZhY2Uoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpblByb2plY3RQYXRoOiB0aGlzLl9pblByb2plY3RQYXRoLFxuICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgfSksXG4gICAgXVxuICB9XG59XG4iXX0=