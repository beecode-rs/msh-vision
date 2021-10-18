"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliService = void 0;
const help_service_1 = require("src/service/help-service");
const shell_service_1 = require("src/service/shell-service");
const constant_1 = require("src/util/constant");
exports.cliService = {
    printVersion: () => {
        shell_service_1.shellService.print(`v${constant_1.constant.projectVersion}`);
    },
    printHelp: () => {
        shell_service_1.shellService.print(help_service_1.helpService.text());
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9jbGktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBc0Q7QUFDdEQsNkRBQXdEO0FBQ3hELGdEQUE0QztBQUUvQixRQUFBLFVBQVUsR0FBRztJQUN4QixZQUFZLEVBQUUsR0FBUyxFQUFFO1FBQ3ZCLDRCQUFZLENBQUMsS0FBSyxDQUFDLElBQUksbUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFDRCxTQUFTLEVBQUUsR0FBUyxFQUFFO1FBQ3BCLDRCQUFZLENBQUMsS0FBSyxDQUFDLDBCQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhlbHBTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvaGVscC1zZXJ2aWNlJ1xuaW1wb3J0IHsgc2hlbGxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2Uvc2hlbGwtc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjb25zdCBjbGlTZXJ2aWNlID0ge1xuICBwcmludFZlcnNpb246ICgpOiB2b2lkID0+IHtcbiAgICBzaGVsbFNlcnZpY2UucHJpbnQoYHYke2NvbnN0YW50LnByb2plY3RWZXJzaW9ufWApXG4gIH0sXG4gIHByaW50SGVscDogKCk6IHZvaWQgPT4ge1xuICAgIHNoZWxsU2VydmljZS5wcmludChoZWxwU2VydmljZS50ZXh0KCkpXG4gIH0sXG59XG4iXX0=