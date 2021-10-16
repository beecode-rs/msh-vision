"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserType = void 0;
const entity_1 = require("src/model/entity");
const ts_parser_service_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-service");
exports.tsParserType = {
    parse: (statement) => {
        const name = statement['name'].escapedText;
        const isExported = ts_parser_service_1.tsParserService.isExported(statement.modifiers);
        return [
            {
                entityType: entity_1.EntityType.TYPE,
                statement,
                name,
                meta: {
                    isExported,
                },
            },
        ];
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3N0YXRlbWVudC1lbnRpdHkvcGFyc2VyL3RzLXBhcnNlci10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUE2QztBQUU3Qyx3R0FBa0c7QUFHckYsUUFBQSxZQUFZLEdBQUc7SUFDMUIsS0FBSyxFQUFFLENBQUMsU0FBdUIsRUFBbUMsRUFBRTtRQUNsRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFBO1FBQzFDLE1BQU0sVUFBVSxHQUFHLG1DQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVsRSxPQUFPO1lBQ0w7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFVLENBQUMsSUFBSTtnQkFDM0IsU0FBUztnQkFDVCxJQUFJO2dCQUNKLElBQUksRUFBRTtvQkFDSixVQUFVO2lCQUNYO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3BhcnNlci90cy1wYXJzZXItc2VydmljZSdcbmltcG9ydCB7IFRzTWV0YVR5cGUsIFRzU3RhdGVtZW50RW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3RzLXN0YXRlbWVudC1lbnRpdHknXG5cbmV4cG9ydCBjb25zdCB0c1BhcnNlclR5cGUgPSB7XG4gIHBhcnNlOiAoc3RhdGVtZW50OiB0cy5TdGF0ZW1lbnQpOiBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFUeXBlPltdID0+IHtcbiAgICBjb25zdCBuYW1lID0gc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBpc0V4cG9ydGVkID0gdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQoc3RhdGVtZW50Lm1vZGlmaWVycylcblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGVudGl0eVR5cGU6IEVudGl0eVR5cGUuVFlQRSxcbiAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICBuYW1lLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXVxuICB9LFxufVxuIl19