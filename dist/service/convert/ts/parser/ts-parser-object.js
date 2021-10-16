"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParserObject = void 0;
const entity_object_1 = require("src/model/entity-object");
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
class TsParserObject {
    constructor({ statement, inProjectPath }) {
        this._statement = statement;
        this._inProjectPath = inProjectPath;
    }
    parse() {
        const result = ts_parser_service_1.tsParserService.nameFromDeclarationsList(this._statement['declarationList']);
        if (!result)
            throw new Error('Could not parse object from statement');
        const { name, declaration } = result;
        // const properties = tsParserService.propertiesFromInitializer(declaration.initializer)
        const isExported = ts_parser_service_1.tsParserService.isExported(this._statement.modifiers);
        return [
            new entity_object_1.EntityObject({
                name,
                inProjectPath: this._inProjectPath,
                isExported,
            }),
        ];
    }
}
exports.TsParserObject = TsParserObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvcGFyc2VyL3RzLXBhcnNlci1vYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQXNEO0FBR3RELGdGQUEwRTtBQUUxRSxNQUFhLGNBQWM7SUFJekIsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQXNEO1FBQzFGLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO0lBQ3JDLENBQUM7SUFFTSxLQUFLO1FBQ1YsTUFBTSxNQUFNLEdBQUcsbUNBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQTtRQUMzRixJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtRQUNyRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNwQyx3RkFBd0Y7UUFDeEYsTUFBTSxVQUFVLEdBQUcsbUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV4RSxPQUFPO1lBQ0wsSUFBSSw0QkFBWSxDQUFDO2dCQUNmLElBQUk7Z0JBQ0osYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUNsQyxVQUFVO2FBQ1gsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUF4QkQsd0NBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgdHMgZnJvbSAnc3JjL21vZHVsZS90cydcbmltcG9ydCB7IFBhcnNhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9wYXJzZXIvcGFyc2FibGUnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLXBhcnNlci1zZXJ2aWNlJ1xuXG5leHBvcnQgY2xhc3MgVHNQYXJzZXJPYmplY3QgaW1wbGVtZW50cyBQYXJzYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnRcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcih7IHN0YXRlbWVudCwgaW5Qcm9qZWN0UGF0aCB9OiB7IHN0YXRlbWVudDogdHMuU3RhdGVtZW50OyBpblByb2plY3RQYXRoOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX3N0YXRlbWVudCA9IHN0YXRlbWVudFxuICAgIHRoaXMuX2luUHJvamVjdFBhdGggPSBpblByb2plY3RQYXRoXG4gIH1cblxuICBwdWJsaWMgcGFyc2UoKTogRW50aXR5T2JqZWN0W10ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRzUGFyc2VyU2VydmljZS5uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3QodGhpcy5fc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0IGZyb20gc3RhdGVtZW50JylcbiAgICBjb25zdCB7IG5hbWUsIGRlY2xhcmF0aW9uIH0gPSByZXN1bHRcbiAgICAvLyBjb25zdCBwcm9wZXJ0aWVzID0gdHNQYXJzZXJTZXJ2aWNlLnByb3BlcnRpZXNGcm9tSW5pdGlhbGl6ZXIoZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXIpXG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHRoaXMuX3N0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEVudGl0eU9iamVjdCh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGluUHJvamVjdFBhdGg6IHRoaXMuX2luUHJvamVjdFBhdGgsXG4gICAgICAgIGlzRXhwb3J0ZWQsXG4gICAgICB9KSxcbiAgICBdXG4gIH1cbn1cbiJdfQ==