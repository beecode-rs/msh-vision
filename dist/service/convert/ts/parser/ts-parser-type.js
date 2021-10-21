"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserType = void 0;
const entity_1 = require("src/model/entity");
const entity_type_1 = require("src/model/entity-type");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserType {
    constructor(params) {
        const { statement, inProjectPath } = params;
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const name = this._statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_1.Entity({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
                meta: new entity_type_1.EntityType(),
            }),
        ];
    }
}
exports.TsParserType = TsParserType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3BhcnNlci90cy1wYXJzZXItdHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBeUM7QUFDekMsdURBQWtEO0FBR2xELGdGQUEwRTtBQUUxRSxNQUFhLFlBQVk7SUFJdkIsWUFBWSxNQUEwRDtRQUNwRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtJQUNyQyxDQUFDO0lBRU0sS0FBSztRQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQ2hELE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFeEUsT0FBTztZQUNMLElBQUksZUFBTSxDQUFDO2dCQUNULElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2dCQUNWLElBQUksRUFBRSxJQUFJLHdCQUFVLEVBQUU7YUFDdkIsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF2QkQsb0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LXR5cGUnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJUeXBlIGltcGxlbWVudHMgUGFyc2FibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0YXRlbWVudDogdHMuU3RhdGVtZW50XG4gIHByb3RlY3RlZCByZWFkb25seSBfaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgc3RhdGVtZW50LCBpblByb2plY3RQYXRoIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9zdGF0ZW1lbnQgPSBzdGF0ZW1lbnRcbiAgICB0aGlzLl9pblByb2plY3RQYXRoID0gaW5Qcm9qZWN0UGF0aFxuICB9XG5cbiAgcHVibGljIHBhcnNlKCk6IEVudGl0eTxFbnRpdHlUeXBlPltdIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5fc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQodGhpcy5fc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgaW5Qcm9qZWN0UGF0aDogdGhpcy5faW5Qcm9qZWN0UGF0aCxcbiAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgbWV0YTogbmV3IEVudGl0eVR5cGUoKSxcbiAgICAgIH0pLFxuICAgIF1cbiAgfVxufVxuIl19