"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliInitUseCase = void 0;
const args_service_1 = require("src/service/args-service");
const cli_service_1 = require("src/service/cli-service");
const generate_1 = require("src/service/command/generate");
const print_help_1 = require("src/service/command/print-help");
const print_version_1 = require("src/service/command/print-version");
exports.cliInitUseCase = {
    execArgsAsCommand: async (args) => {
        exports.cliInitUseCase.ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp(args);
        // cliInitUseCase.ifNoCommandSelectedThrowErrorAndPrintHelp(args)
        const command = exports.cliInitUseCase.createCommandFromCliArgs(args);
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
                return new generate_1.Generate(args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWluaXQtdXNlLWNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlLWNhc2UvY2xpLWluaXQtdXNlLWNhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQW1FO0FBQ25FLHlEQUFvRDtBQUVwRCwyREFBdUQ7QUFDdkQsK0RBQTBEO0FBQzFELHFFQUFnRTtBQUVuRCxRQUFBLGNBQWMsR0FBRztJQUM1QixpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBYyxFQUFpQixFQUFFO1FBQ3pELHNCQUFjLENBQUMsa0RBQWtELENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkUsaUVBQWlFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLHNCQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0QsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNELHdCQUF3QixFQUFFLENBQUMsSUFBYyxFQUFjLEVBQUU7UUFDdkQsTUFBTSxPQUFPLEdBQUcsMEJBQVcsQ0FBQyxXQUFXLENBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQ3RHLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxPQUFPLENBQUMsT0FBTztnQkFDbEIsT0FBTyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtZQUMzQixLQUFLLE9BQU8sQ0FBQyxJQUFJO2dCQUNmLE9BQU8sSUFBSSxzQkFBUyxFQUFFLENBQUE7WUFDeEI7Z0JBQ0UsT0FBTyxJQUFJLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDM0IsaUVBQWlFO1NBQ2xFO0lBQ0gsQ0FBQztJQUNELGtEQUFrRCxFQUFFLENBQUMsSUFBYyxFQUFRLEVBQUU7UUFDM0UsSUFBSSwwQkFBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSwwQkFBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTTtRQUNuRyx3QkFBVSxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtJQUN2RSxDQUFDO0lBQ0QseUNBQXlDLEVBQUUsQ0FBQyxJQUFjLEVBQVEsRUFBRTtRQUNsRSxJQUFJLDBCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQ3BHLHdCQUFVLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpQ29tbWFuZHMsIGFyZ3NTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlJ1xuaW1wb3J0IHsgY2xpU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NsaS1zZXJ2aWNlJ1xuaW1wb3J0IHsgRXhlY3V0YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvZXhlY3V0YWJsZSdcbmltcG9ydCB7IEdlbmVyYXRlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29tbWFuZC9nZW5lcmF0ZSdcbmltcG9ydCB7IFByaW50SGVscCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvcHJpbnQtaGVscCdcbmltcG9ydCB7IFByaW50VmVyc2lvbiB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NvbW1hbmQvcHJpbnQtdmVyc2lvbidcblxuZXhwb3J0IGNvbnN0IGNsaUluaXRVc2VDYXNlID0ge1xuICBleGVjQXJnc0FzQ29tbWFuZDogYXN5bmMgKGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY2xpSW5pdFVzZUNhc2UuaWZNb3JlVGhlbk9uZUNvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHAoYXJncylcbiAgICAvLyBjbGlJbml0VXNlQ2FzZS5pZk5vQ29tbWFuZFNlbGVjdGVkVGhyb3dFcnJvckFuZFByaW50SGVscChhcmdzKVxuICAgIGNvbnN0IGNvbW1hbmQgPSBjbGlJbml0VXNlQ2FzZS5jcmVhdGVDb21tYW5kRnJvbUNsaUFyZ3MoYXJncylcbiAgICBhd2FpdCBjb21tYW5kLmV4ZWN1dGUoKVxuICB9LFxuICBjcmVhdGVDb21tYW5kRnJvbUNsaUFyZ3M6IChhcmdzOiBzdHJpbmdbXSk6IEV4ZWN1dGFibGUgPT4ge1xuICAgIGNvbnN0IGNvbW1hbmQgPSBhcmdzU2VydmljZS5hcmdUb09iamVjdDxDbGlDb21tYW5kcz4oeyBhcmdzLCBvcHRpb25zOiBhcmdzU2VydmljZS5jbGlDb21tYW5kT3B0aW9ucyB9KVxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBjb21tYW5kLnZlcnNpb246XG4gICAgICAgIHJldHVybiBuZXcgUHJpbnRWZXJzaW9uKClcbiAgICAgIGNhc2UgY29tbWFuZC5oZWxwOlxuICAgICAgICByZXR1cm4gbmV3IFByaW50SGVscCgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlKGFyZ3MpXG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29tbWFuZFske0pTT04uc3RyaW5naWZ5KGNvbW1hbmQpfV1gKVxuICAgIH1cbiAgfSxcbiAgaWZNb3JlVGhlbk9uZUNvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHA6IChhcmdzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIGlmIChhcmdzU2VydmljZS5zZWxlY3RlZENvbW1hbmRDb3VudCh7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pIDw9IDEpIHJldHVyblxuICAgIGNsaVNlcnZpY2UucHJpbnRIZWxwKClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VSUk9SICEhISAtIENMSSBjYW4gcnVuIG9ubHkgb25lIGNvbW1hbmQgYXQgYSB0aW1lJylcbiAgfSxcbiAgaWZOb0NvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHA6IChhcmdzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIGlmIChhcmdzU2VydmljZS5zZWxlY3RlZENvbW1hbmRDb3VudCh7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pICE9PSAwKSByZXR1cm5cbiAgICBjbGlTZXJ2aWNlLnByaW50SGVscCgpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFUlJPUiAhISEgLSBDTEkgbmVlZHMgb25lIGNvbW1hbmQgdG8gYmUgc2VsZWN0ZWQnKVxuICB9LFxufVxuIl19