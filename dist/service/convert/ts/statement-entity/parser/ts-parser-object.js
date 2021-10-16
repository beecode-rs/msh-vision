"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserObject = void 0;
const entity_1 = require("src/model/entity");
const ts_parser_service_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-service");
exports.tsParserObject = {
    parse: (statement) => {
        const result = ts_parser_service_1.tsParserService.nameFromDeclarationsList(statement['declarationList']);
        if (!result)
            throw new Error('Could not parse object from statement');
        const { name, declaration } = result;
        const properties = ts_parser_service_1.tsParserService.propertiesFromInitializer(declaration.initializer);
        const isExported = ts_parser_service_1.tsParserService.isExported(statement.modifiers);
        return [
            {
                entityType: entity_1.EntityType.OBJECT,
                statement,
                name,
                meta: {
                    isExported,
                    properties,
                },
            },
        ];
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS9wYXJzZXIvdHMtcGFyc2VyLW9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNkM7QUFFN0Msd0dBQWtHO0FBR3JGLFFBQUEsY0FBYyxHQUFHO0lBQzVCLEtBQUssRUFBRSxDQUFDLFNBQXVCLEVBQXFDLEVBQUU7UUFDcEUsTUFBTSxNQUFNLEdBQUcsbUNBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1FBQ3JGLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO1FBQ3JFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3JGLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVsRSxPQUFPO1lBQ0w7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFVLENBQUMsTUFBTTtnQkFDN0IsU0FBUztnQkFDVCxJQUFJO2dCQUNKLElBQUksRUFBRTtvQkFDSixVQUFVO29CQUNWLFVBQVU7aUJBQ1g7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyB0c1BhcnNlclNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvcGFyc2VyL3RzLXBhcnNlci1zZXJ2aWNlJ1xuaW1wb3J0IHsgVHNNZXRhT2JqZWN0LCBUc1N0YXRlbWVudEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS90cy1zdGF0ZW1lbnQtZW50aXR5J1xuXG5leHBvcnQgY29uc3QgdHNQYXJzZXJPYmplY3QgPSB7XG4gIHBhcnNlOiAoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFPYmplY3Q+W10gPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRzUGFyc2VyU2VydmljZS5uYW1lRnJvbURlY2xhcmF0aW9uc0xpc3Qoc3RhdGVtZW50WydkZWNsYXJhdGlvbkxpc3QnXSlcbiAgICBpZiAoIXJlc3VsdCkgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgcGFyc2Ugb2JqZWN0IGZyb20gc3RhdGVtZW50JylcbiAgICBjb25zdCB7IG5hbWUsIGRlY2xhcmF0aW9uIH0gPSByZXN1bHRcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gdHNQYXJzZXJTZXJ2aWNlLnByb3BlcnRpZXNGcm9tSW5pdGlhbGl6ZXIoZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXIpXG4gICAgY29uc3QgaXNFeHBvcnRlZCA9IHRzUGFyc2VyU2VydmljZS5pc0V4cG9ydGVkKHN0YXRlbWVudC5tb2RpZmllcnMpXG5cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLk9CSkVDVCxcbiAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICBuYW1lLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG59XG4iXX0=