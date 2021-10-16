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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWluaXQtdXNlLWNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlLWNhc2UvY2xpLWluaXQtdXNlLWNhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQW1FO0FBQ25FLHlEQUFvRDtBQUVwRCwyREFBdUQ7QUFDdkQsK0RBQTBEO0FBQzFELHFFQUFnRTtBQUVuRCxRQUFBLGNBQWMsR0FBRztJQUM1QixpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBYyxFQUFpQixFQUFFO1FBQ3pELHNCQUFjLENBQUMsa0RBQWtELENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkUsaUVBQWlFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLHNCQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0QsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNELHdCQUF3QixFQUFFLENBQUMsSUFBYyxFQUFjLEVBQUU7UUFDdkQsTUFBTSxPQUFPLEdBQUcsMEJBQVcsQ0FBQyxXQUFXLENBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBRXRHLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxPQUFPLENBQUMsT0FBTztnQkFDbEIsT0FBTyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtZQUMzQixLQUFLLE9BQU8sQ0FBQyxJQUFJO2dCQUNmLE9BQU8sSUFBSSxzQkFBUyxFQUFFLENBQUE7WUFDeEI7Z0JBQ0UsT0FBTyxJQUFJLG1CQUFRLEVBQUUsQ0FBQTtZQUN2QixpRUFBaUU7U0FDbEU7SUFDSCxDQUFDO0lBQ0Qsa0RBQWtELEVBQUUsQ0FBQyxJQUFjLEVBQVEsRUFBRTtRQUMzRSxJQUFJLDBCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFNO1FBQ25HLHdCQUFVLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO0lBQ3ZFLENBQUM7SUFDRCx5Q0FBeUMsRUFBRSxDQUFDLElBQWMsRUFBUSxFQUFFO1FBQ2xFLElBQUksMEJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsMEJBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDcEcsd0JBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7SUFDckUsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGlDb21tYW5kcywgYXJnc1NlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9hcmdzLXNlcnZpY2UnXG5pbXBvcnQgeyBjbGlTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY2xpLXNlcnZpY2UnXG5pbXBvcnQgeyBFeGVjdXRhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29tbWFuZC9leGVjdXRhYmxlJ1xuaW1wb3J0IHsgR2VuZXJhdGUgfSBmcm9tICdzcmMvc2VydmljZS9jb21tYW5kL2dlbmVyYXRlJ1xuaW1wb3J0IHsgUHJpbnRIZWxwIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29tbWFuZC9wcmludC1oZWxwJ1xuaW1wb3J0IHsgUHJpbnRWZXJzaW9uIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29tbWFuZC9wcmludC12ZXJzaW9uJ1xuXG5leHBvcnQgY29uc3QgY2xpSW5pdFVzZUNhc2UgPSB7XG4gIGV4ZWNBcmdzQXNDb21tYW5kOiBhc3luYyAoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjbGlJbml0VXNlQ2FzZS5pZk1vcmVUaGVuT25lQ29tbWFuZFNlbGVjdGVkVGhyb3dFcnJvckFuZFByaW50SGVscChhcmdzKVxuICAgIC8vIGNsaUluaXRVc2VDYXNlLmlmTm9Db21tYW5kU2VsZWN0ZWRUaHJvd0Vycm9yQW5kUHJpbnRIZWxwKGFyZ3MpXG4gICAgY29uc3QgY29tbWFuZCA9IGNsaUluaXRVc2VDYXNlLmNyZWF0ZUNvbW1hbmRGcm9tQ2xpQXJncyhhcmdzKVxuICAgIGF3YWl0IGNvbW1hbmQuZXhlY3V0ZSgpXG4gIH0sXG4gIGNyZWF0ZUNvbW1hbmRGcm9tQ2xpQXJnczogKGFyZ3M6IHN0cmluZ1tdKTogRXhlY3V0YWJsZSA9PiB7XG4gICAgY29uc3QgY29tbWFuZCA9IGFyZ3NTZXJ2aWNlLmFyZ1RvT2JqZWN0PENsaUNvbW1hbmRzPih7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pXG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY29tbWFuZC52ZXJzaW9uOlxuICAgICAgICByZXR1cm4gbmV3IFByaW50VmVyc2lvbigpXG4gICAgICBjYXNlIGNvbW1hbmQuaGVscDpcbiAgICAgICAgcmV0dXJuIG5ldyBQcmludEhlbHAoKVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0ZSgpXG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29tbWFuZFske0pTT04uc3RyaW5naWZ5KGNvbW1hbmQpfV1gKVxuICAgIH1cbiAgfSxcbiAgaWZNb3JlVGhlbk9uZUNvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHA6IChhcmdzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIGlmIChhcmdzU2VydmljZS5zZWxlY3RlZENvbW1hbmRDb3VudCh7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pIDw9IDEpIHJldHVyblxuICAgIGNsaVNlcnZpY2UucHJpbnRIZWxwKClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VSUk9SICEhISAtIENMSSBjYW4gcnVuIG9ubHkgb25lIGNvbW1hbmQgYXQgYSB0aW1lJylcbiAgfSxcbiAgaWZOb0NvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHA6IChhcmdzOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICAgIGlmIChhcmdzU2VydmljZS5zZWxlY3RlZENvbW1hbmRDb3VudCh7IGFyZ3MsIG9wdGlvbnM6IGFyZ3NTZXJ2aWNlLmNsaUNvbW1hbmRPcHRpb25zIH0pICE9PSAwKSByZXR1cm5cbiAgICBjbGlTZXJ2aWNlLnByaW50SGVscCgpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFUlJPUiAhISEgLSBDTEkgbmVlZHMgb25lIGNvbW1hbmQgdG8gYmUgc2VsZWN0ZWQnKVxuICB9LFxufVxuIl19