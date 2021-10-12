"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generate = void 0;
const puml_print_1 = require("../print/puml/puml-print");
const args_service_1 = require("src/service/args-service");
const vision_use_case_1 = require("src/use-case/vision-use-case");
class Generate {
    constructor(args) {
        this._params = args_service_1.argsService.argToObject({ args, options: args_service_1.argsService.cmdGenerateParams });
    }
    async execute() {
        const folderPath = this._params.src;
        const destinationPath = this._params.dest;
        const printStrategy = new puml_print_1.PumlPrint({ destinationPath, appName: 'app' }); // TODO intorduce app name
        await vision_use_case_1.visionUseCase.processFolder({ folderPath, printStrategy });
    }
}
exports.Generate = Generate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9jb21tYW5kL2dlbmVyYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFvRDtBQUNwRCwyREFBeUU7QUFFekUsa0VBQTREO0FBRTVELE1BQWEsUUFBUTtJQUVuQixZQUFZLElBQWM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBVyxDQUFDLFdBQVcsQ0FBb0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO0lBQzdHLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtRQUNuQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUN6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLHNCQUFTLENBQUMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUEsQ0FBQywwQkFBMEI7UUFDbkcsTUFBTSwrQkFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7Q0FDRjtBQVpELDRCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbFByaW50IH0gZnJvbSAnLi4vcHJpbnQvcHVtbC9wdW1sLXByaW50J1xuaW1wb3J0IHsgQ21kR2VuZXJhdGVQYXJhbXMsIGFyZ3NTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlJ1xuaW1wb3J0IHsgRXhlY3V0YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvZXhlY3V0YWJsZSdcbmltcG9ydCB7IHZpc2lvblVzZUNhc2UgfSBmcm9tICdzcmMvdXNlLWNhc2UvdmlzaW9uLXVzZS1jYXNlJ1xuXG5leHBvcnQgY2xhc3MgR2VuZXJhdGUgaW1wbGVtZW50cyBFeGVjdXRhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wYXJhbXM6IENtZEdlbmVyYXRlUGFyYW1zXG4gIGNvbnN0cnVjdG9yKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fcGFyYW1zID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3Q8Q21kR2VuZXJhdGVQYXJhbXM+KHsgYXJncywgb3B0aW9uczogYXJnc1NlcnZpY2UuY21kR2VuZXJhdGVQYXJhbXMgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLl9wYXJhbXMuc3JjXG4gICAgY29uc3QgZGVzdGluYXRpb25QYXRoID0gdGhpcy5fcGFyYW1zLmRlc3RcbiAgICBjb25zdCBwcmludFN0cmF0ZWd5ID0gbmV3IFB1bWxQcmludCh7IGRlc3RpbmF0aW9uUGF0aCwgYXBwTmFtZTogJ2FwcCcgfSkgLy8gVE9ETyBpbnRvcmR1Y2UgYXBwIG5hbWVcbiAgICBhd2FpdCB2aXNpb25Vc2VDYXNlLnByb2Nlc3NGb2xkZXIoeyBmb2xkZXJQYXRoLCBwcmludFN0cmF0ZWd5IH0pXG4gIH1cbn1cbiJdfQ==