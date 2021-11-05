"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliService = void 0;
const help_service_1 = require("src/service/cli/help-service");
const shell_service_1 = require("src/service/cli/shell-service");
const constant_1 = require("src/util/constant");
exports.cliService = {
    printVersion: () => {
        shell_service_1.shellService.print(`v${constant_1.constant.projectVersion}`);
    },
    printHelp: () => {
        shell_service_1.shellService.print(help_service_1.helpService.text());
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9jbGkvY2xpLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTBEO0FBQzFELGlFQUE0RDtBQUM1RCxnREFBNEM7QUFFL0IsUUFBQSxVQUFVLEdBQUc7SUFDeEIsWUFBWSxFQUFFLEdBQVMsRUFBRTtRQUN2Qiw0QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLG1CQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBQ0QsU0FBUyxFQUFFLEdBQVMsRUFBRTtRQUNwQiw0QkFBWSxDQUFDLEtBQUssQ0FBQywwQkFBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoZWxwU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NsaS9oZWxwLXNlcnZpY2UnXG5pbXBvcnQgeyBzaGVsbFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jbGkvc2hlbGwtc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjb25zdCBjbGlTZXJ2aWNlID0ge1xuICBwcmludFZlcnNpb246ICgpOiB2b2lkID0+IHtcbiAgICBzaGVsbFNlcnZpY2UucHJpbnQoYHYke2NvbnN0YW50LnByb2plY3RWZXJzaW9ufWApXG4gIH0sXG4gIHByaW50SGVscDogKCk6IHZvaWQgPT4ge1xuICAgIHNoZWxsU2VydmljZS5wcmludChoZWxwU2VydmljZS50ZXh0KCkpXG4gIH0sXG59XG4iXX0=