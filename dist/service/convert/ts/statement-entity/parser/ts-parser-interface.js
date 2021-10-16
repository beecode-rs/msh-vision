"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserInterface = void 0;
const entity_1 = require("src/model/entity");
const ts_parser_service_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-service");
exports.tsParserInterface = {
    parse: (statement) => {
        const name = statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(statement.modifiers);
        return [
            {
                entityType: entity_1.EntityType.INTERFACE,
                statement,
                name,
                meta: {
                    isExported,
                },
            },
        ];
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS9wYXJzZXIvdHMtcGFyc2VyLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNkM7QUFFN0Msd0dBQWtHO0FBR3JGLFFBQUEsaUJBQWlCLEdBQUc7SUFDL0IsS0FBSyxFQUFFLENBQUMsU0FBdUIsRUFBd0MsRUFBRTtRQUN2RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQzFDLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVsRSxPQUFPO1lBQ0w7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFVLENBQUMsU0FBUztnQkFDaEMsU0FBUztnQkFDVCxJQUFJO2dCQUNKLElBQUksRUFBRTtvQkFDSixVQUFVO2lCQUNYO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3BhcnNlci90cy1wYXJzZXItc2VydmljZSdcbmltcG9ydCB7IFRzTWV0YUludGVyZmFjZSwgVHNTdGF0ZW1lbnRFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvdHMtc3RhdGVtZW50LWVudGl0eSdcblxuZXhwb3J0IGNvbnN0IHRzUGFyc2VySW50ZXJmYWNlID0ge1xuICBwYXJzZTogKHN0YXRlbWVudDogdHMuU3RhdGVtZW50KTogVHNTdGF0ZW1lbnRFbnRpdHk8VHNNZXRhSW50ZXJmYWNlPltdID0+IHtcbiAgICBjb25zdCBuYW1lID0gc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQoc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGVudGl0eVR5cGU6IEVudGl0eVR5cGUuSU5URVJGQUNFLFxuICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBpc0V4cG9ydGVkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG59XG4iXX0=