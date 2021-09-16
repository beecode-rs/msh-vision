"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliInit = void 0;
const args_service_1 = require("src/service/args-service");
const cli_service_1 = require("src/service/cli-service");
const generate_1 = require("src/service/command/generate");
const print_help_1 = require("src/service/command/print-help");
const print_version_1 = require("src/service/command/print-version");
exports.cliInit = {
    execArgsAsCommand: async (args) => {
        exports.cliInit.ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp(args);
        exports.cliInit.ifNoCommandSelectedThrowErrorAndPrintHelp(args);
        const command = exports.cliInit.createCommandFromCliArgs(args);
        await command.execute();
    },
    createCommandFromCliArgs: (args) => {
        const command = args_service_1.argsService.argToObject({ args, options: args_service_1.argsService.cliCommandOptions });
        switch (true) {
            case command.version:
                return new print_version_1.PrintVersion();
            case command.help:
                return new print_help_1.PrintHelp();
            default:
                return new generate_1.Generate();
            // throw new Error(`Unknown command[${JSON.stringify(command)}]`)
        }
    },
    ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp: (args) => {
        if (args_service_1.argsService.selectedCommandCount({ args, options: args_service_1.argsService.cliCommandOptions }) <= 1)
            return;
        cli_service_1.cliService.printHelp();
        throw new Error('ERROR !!! - CLI can run only one command at a time');
    },
    ifNoCommandSelectedThrowErrorAndPrintHelp: (args) => {
        if (args_service_1.argsService.selectedCommandCount({ args, options: args_service_1.argsService.cliCommandOptions }) !== 0)
            return;
        cli_service_1.cliService.printHelp();
        throw new Error('ERROR !!! - CLI needs one command to be selected');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWluaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlLWNhc2UvY2xpLWluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQW1FO0FBQ25FLHlEQUFvRDtBQUVwRCwyREFBdUQ7QUFDdkQsK0RBQTBEO0FBQzFELHFFQUFnRTtBQUVuRCxRQUFBLE9BQU8sR0FBRztJQUNyQixpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBYyxFQUFpQixFQUFFO1FBQ3pELGVBQU8sQ0FBQyxrREFBa0QsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNoRSxlQUFPLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkQsTUFBTSxPQUFPLEdBQUcsZUFBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RELE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFDRCx3QkFBd0IsRUFBRSxDQUFDLElBQWMsRUFBYyxFQUFFO1FBQ3ZELE1BQU0sT0FBTyxHQUFHLDBCQUFXLENBQUMsV0FBVyxDQUFjLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSwwQkFBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtRQUN0RyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssT0FBTyxDQUFDLE9BQU87Z0JBQ2xCLE9BQU8sSUFBSSw0QkFBWSxFQUFFLENBQUE7WUFDM0IsS0FBSyxPQUFPLENBQUMsSUFBSTtnQkFDZixPQUFPLElBQUksc0JBQVMsRUFBRSxDQUFBO1lBQ3hCO2dCQUNFLE9BQU8sSUFBSSxtQkFBUSxFQUFFLENBQUE7WUFDdkIsaUVBQWlFO1NBQ2xFO0lBQ0gsQ0FBQztJQUNELGtEQUFrRCxFQUFFLENBQUMsSUFBYyxFQUFRLEVBQUU7UUFDM0UsSUFBSSwwQkFBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSwwQkFBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTTtRQUNuRyx3QkFBVSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBQ0QseUNBQXlDLEVBQUUsQ0FBQyxJQUFjLEVBQVEsRUFBRTtRQUNsRSxJQUFJLDBCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQ3BHLHdCQUFVLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXJnc1NlcnZpY2UsIGNsaUNvbW1hbmRzIH0gZnJvbSAnc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlJ1xuaW1wb3J0IHsgY2xpU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NsaS1zZXJ2aWNlJ1xuaW1wb3J0IHsgRXhlY3V0YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvZXhlY3V0YWJsZSdcbmltcG9ydCB7IEdlbmVyYXRlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29tbWFuZC9nZW5lcmF0ZSdcbmltcG9ydCB7IFByaW50SGVscCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvcHJpbnQtaGVscCdcbmltcG9ydCB7IFByaW50VmVyc2lvbiB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvcHJpbnQtdmVyc2lvbidcblxuZXhwb3J0IGNvbnN0IGNsaUluaXQgPSB7XG4gIGV4ZWNBcmdzQXNDb21tYW5kOiBhc3luYyAoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjbGlJbml0LmlmTW9yZVRoZW5PbmVDb21tYW5kU2VsZWN0ZWRUaHJvd0Vycm9yQW5kUHJpbnRIZWxwKGFyZ3MpXG4gICAgY2xpSW5pdC5pZk5vQ29tbWFuZFNlbGVjdGVkVGhyb3dFcnJvckFuZFByaW50SGVscChhcmdzKVxuICAgIGNvbnN0IGNvbW1hbmQgPSBjbGlJbml0LmNyZWF0ZUNvbW1hbmRGcm9tQ2xpQXJncyhhcmdzKVxuICAgIGF3YWl0IGNvbW1hbmQuZXhlY3V0ZSgpXG4gIH0sXG4gIGNyZWF0ZUNvbW1hbmRGcm9tQ2xpQXJnczogKGFyZ3M6IHN0cmluZ1tdKTogRXhlY3V0YWJsZSA9PiB7XG4gICAgY29uc3QgY29tbWFuZCA9IGFyZ3NTZXJ2aWNlLmFyZ1RvT2JqZWN0PGNsaUNvbW1hbmRzPih7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGNvbW1hbmQudmVyc2lvbjpcbiAgICAgICAgcmV0dXJuIG5ldyBQcmludFZlcnNpb24oKVxuICAgICAgY2FzZSBjb21tYW5kLmhlbHA6XG4gICAgICAgIHJldHVybiBuZXcgUHJpbnRIZWxwKClcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGUoKVxuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbW1hbmRbJHtKU09OLnN0cmluZ2lmeShjb21tYW5kKX1dYClcbiAgICB9XG4gIH0sXG4gIGlmTW9yZVRoZW5PbmVDb21tYW5kU2VsZWN0ZWRUaHJvd0Vycm9yQW5kUHJpbnRIZWxwOiAoYXJnczogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgICBpZiAoYXJnc1NlcnZpY2Uuc2VsZWN0ZWRDb21tYW5kQ291bnQoeyBhcmdzLCBvcHRpb25zOiBhcmdzU2VydmljZS5jbGlDb21tYW5kT3B0aW9ucyB9KSA8PSAxKSByZXR1cm5cbiAgICBjbGlTZXJ2aWNlLnByaW50SGVscCgpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFUlJPUiAhISEgLSBDTEkgY2FuIHJ1biBvbmx5IG9uZSBjb21tYW5kIGF0IGEgdGltZScpXG4gIH0sXG4gIGlmTm9Db21tYW5kU2VsZWN0ZWRUaHJvd0Vycm9yQW5kUHJpbnRIZWxwOiAoYXJnczogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgICBpZiAoYXJnc1NlcnZpY2Uuc2VsZWN0ZWRDb21tYW5kQ291bnQoeyBhcmdzLCBvcHRpb25zOiBhcmdzU2VydmljZS5jbGlDb21tYW5kT3B0aW9ucyB9KSAhPT0gMCkgcmV0dXJuXG4gICAgY2xpU2VydmljZS5wcmludEhlbHAoKVxuICAgIHRocm93IG5ldyBFcnJvcignRVJST1IgISEhIC0gQ0xJIG5lZWRzIG9uZSBjb21tYW5kIHRvIGJlIHNlbGVjdGVkJylcbiAgfSxcbn1cbiJdfQ==