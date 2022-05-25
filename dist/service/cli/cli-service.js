"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliService = void 0;
const help_service_1 = require("src/service/cli/help-service");
const shell_service_1 = require("src/service/cli/shell-service");
const constant_1 = require("src/util/constant");
exports.cliService = {
    printVersion: () => {
        shell_service_1.shellService.print(`v${(0, constant_1.constant)().projectVersion}`);
    },
    printHelp: () => {
        shell_service_1.shellService.print(help_service_1.helpService.text());
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9jbGkvY2xpLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTBEO0FBQzFELGlFQUE0RDtBQUM1RCxnREFBNEM7QUFFL0IsUUFBQSxVQUFVLEdBQUc7SUFDeEIsWUFBWSxFQUFFLEdBQVMsRUFBRTtRQUN2Qiw0QkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUEsbUJBQVEsR0FBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUNELFNBQVMsRUFBRSxHQUFTLEVBQUU7UUFDcEIsNEJBQVksQ0FBQyxLQUFLLENBQUMsMEJBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGVscFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jbGkvaGVscC1zZXJ2aWNlJ1xuaW1wb3J0IHsgc2hlbGxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY2xpL3NoZWxsLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY29uc3QgY2xpU2VydmljZSA9IHtcbiAgcHJpbnRWZXJzaW9uOiAoKTogdm9pZCA9PiB7XG4gICAgc2hlbGxTZXJ2aWNlLnByaW50KGB2JHtjb25zdGFudCgpLnByb2plY3RWZXJzaW9ufWApXG4gIH0sXG4gIHByaW50SGVscDogKCk6IHZvaWQgPT4ge1xuICAgIHNoZWxsU2VydmljZS5wcmludChoZWxwU2VydmljZS50ZXh0KCkpXG4gIH0sXG59XG4iXX0=