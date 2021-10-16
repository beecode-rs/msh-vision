"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParserClass = void 0;
const entity_1 = require("src/model/entity");
const ts_parser_service_1 = require("src/service/convert/ts/statement-entity/parser/ts-parser-service");
exports.tsParserClass = {
    parse: (statement) => {
        const name = statement['name'].escapedText;
        const properties = statement['members'].map((m) => m.name?.escapedText);
        const isExported = ts_parser_service_1.tsParserService.isExported(statement.modifiers);
        return [
            {
                entityType: entity_1.EntityType.CLASS,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtcGFyc2VyLWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3BhcnNlci90cy1wYXJzZXItY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTZDO0FBRTdDLHdHQUFrRztBQUdyRixRQUFBLGFBQWEsR0FBRztJQUMzQixLQUFLLEVBQUUsQ0FBQyxTQUF1QixFQUFvQyxFQUFFO1FBQ25FLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUE7UUFDMUMsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUN2RSxNQUFNLFVBQVUsR0FBRyxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFbEUsT0FBTztZQUNMO2dCQUNFLFVBQVUsRUFBRSxtQkFBVSxDQUFDLEtBQUs7Z0JBQzVCLFNBQVM7Z0JBQ1QsSUFBSTtnQkFDSixJQUFJLEVBQUU7b0JBQ0osVUFBVTtvQkFDVixVQUFVO2lCQUNYO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy9zdGF0ZW1lbnQtZW50aXR5L3BhcnNlci90cy1wYXJzZXItc2VydmljZSdcbmltcG9ydCB7IFRzTWV0YUNsYXNzLCBUc1N0YXRlbWVudEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvc3RhdGVtZW50LWVudGl0eS90cy1zdGF0ZW1lbnQtZW50aXR5J1xuXG5leHBvcnQgY29uc3QgdHNQYXJzZXJDbGFzcyA9IHtcbiAgcGFyc2U6IChzdGF0ZW1lbnQ6IHRzLlN0YXRlbWVudCk6IFRzU3RhdGVtZW50RW50aXR5PFRzTWV0YUNsYXNzPltdID0+IHtcbiAgICBjb25zdCBuYW1lID0gc3RhdGVtZW50WyduYW1lJ10uZXNjYXBlZFRleHRcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gc3RhdGVtZW50WydtZW1iZXJzJ10ubWFwKChtKSA9PiBtLm5hbWU/LmVzY2FwZWRUZXh0KVxuICAgIGNvbnN0IGlzRXhwb3J0ZWQgPSB0c1BhcnNlclNlcnZpY2UuaXNFeHBvcnRlZChzdGF0ZW1lbnQubW9kaWZpZXJzKVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgZW50aXR5VHlwZTogRW50aXR5VHlwZS5DTEFTUyxcbiAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICBuYW1lLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgaXNFeHBvcnRlZCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG59XG4iXX0=