"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generate = void 0;
const args_service_1 = require("src/service/args-service");
const puml_print_strategy_1 = require("src/service/print/puml/puml-print-strategy");
const vision_use_case_1 = require("src/use-case/vision-use-case");
class Generate {
    constructor(args) {
        this._params = args_service_1.argsService.argToObject({ args, options: args_service_1.argsService.cmdGenerateParams });
    }
    async execute() {
        const folderPath = this._params.src;
        const destinationPath = this._params.dest;
        const printStrategy = new puml_print_strategy_1.PumlPrintStrategy({ destinationPath, appName: 'app' }); // TODO intorduce app name
        await vision_use_case_1.visionUseCase.processFolder({ folderPath, printStrategy });
    }
}
exports.Generate = Generate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9jb21tYW5kL2dlbmVyYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUF5RTtBQUV6RSxvRkFBOEU7QUFDOUUsa0VBQTREO0FBRTVELE1BQWEsUUFBUTtJQUVuQixZQUFZLElBQWM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBVyxDQUFDLFdBQVcsQ0FBb0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO0lBQzdHLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtRQUNuQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLHVDQUFpQixDQUFDLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBLENBQUMsMEJBQTBCO1FBQzNHLE1BQU0sK0JBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0NBQ0Y7QUFaRCw0QkFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENtZEdlbmVyYXRlUGFyYW1zLCBhcmdzU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2FyZ3Mtc2VydmljZSdcbmltcG9ydCB7IEV4ZWN1dGFibGUgfSBmcm9tICdzcmMvc2VydmljZS9jb21tYW5kL2V4ZWN1dGFibGUnXG5pbXBvcnQgeyBQdW1sUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC1zdHJhdGVneSdcbmltcG9ydCB7IHZpc2lvblVzZUNhc2UgfSBmcm9tICdzcmMvdXNlLWNhc2UvdmlzaW9uLXVzZS1jYXNlJ1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGUgaW1wbGVtZW50cyBFeGVjdXRhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJhbXM6IENtZEdlbmVyYXRlUGFyYW1zXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fcGFyYW1zID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3Q8Q21kR2VuZXJhdGVQYXJhbXM+KHsgYXJncywgb3B0aW9uczogYXJnc1NlcnZpY2UuY21kR2VuZXJhdGVQYXJhbXMgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLl9wYXJhbXMuc3JjXG4gICAgY29uc3QgZGVzdGluYXRpb25QYXRoID0gdGhpcy5fcGFyYW1zLmRlc3RcbiAgICBjb25zdCBwcmludFN0cmF0ZWd5ID0gbmV3IFB1bWxQcmludFN0cmF0ZWd5KHsgZGVzdGluYXRpb25QYXRoLCBhcHBOYW1lOiAnYXBwJyB9KSAvLyBUT0RPIGludG9yZHVjZSBhcHAgbmFtZVxuICAgIGF3YWl0IHZpc2lvblVzZUNhc2UucHJvY2Vzc0ZvbGRlcih7IGZvbGRlclBhdGgsIHByaW50U3RyYXRlZ3kgfSlcbiAgfVxufVxuIl19