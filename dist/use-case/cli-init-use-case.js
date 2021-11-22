"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliInitUseCase = void 0;
const args_service_1 = require("src/service/cli/args-service");
const cli_service_1 = require("src/service/cli/cli-service");
const generate_1 = require("src/service/cli/command/generate");
const print_help_1 = require("src/service/cli/command/print-help");
const print_version_1 = require("src/service/cli/command/print-version");
const _self = {
    execArgsAsCommand: async (args) => {
        _self.ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp(args);
        // _self.ifNoCommandSelectedThrowErrorAndPrintHelp(args)
        const command = _self.createCommandFromCliArgs(args);
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
exports.cliInitUseCase = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWluaXQtdXNlLWNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlLWNhc2UvY2xpLWluaXQtdXNlLWNhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQXVFO0FBQ3ZFLDZEQUF3RDtBQUV4RCwrREFBMkQ7QUFDM0QsbUVBQThEO0FBQzlELHlFQUFvRTtBQUVwRSxNQUFNLEtBQUssR0FBRztJQUNaLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFjLEVBQWlCLEVBQUU7UUFDekQsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlELHdEQUF3RDtRQUN4RCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDcEQsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNELHdCQUF3QixFQUFFLENBQUMsSUFBYyxFQUFjLEVBQUU7UUFDdkQsTUFBTSxPQUFPLEdBQUcsMEJBQVcsQ0FBQyxXQUFXLENBQWMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBRXRHLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxPQUFPLENBQUMsT0FBTztnQkFDbEIsT0FBTyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtZQUMzQixLQUFLLE9BQU8sQ0FBQyxJQUFJO2dCQUNmLE9BQU8sSUFBSSxzQkFBUyxFQUFFLENBQUE7WUFDeEI7Z0JBQ0UsT0FBTyxJQUFJLG1CQUFRLEVBQUUsQ0FBQTtZQUN2QixpRUFBaUU7U0FDbEU7SUFDSCxDQUFDO0lBQ0Qsa0RBQWtELEVBQUUsQ0FBQyxJQUFjLEVBQVEsRUFBRTtRQUMzRSxJQUFJLDBCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLDBCQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFNO1FBQ25HLHdCQUFVLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO0lBQ3ZFLENBQUM7SUFDRCx5Q0FBeUMsRUFBRSxDQUFDLElBQWMsRUFBUSxFQUFFO1FBQ2xFLElBQUksMEJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsMEJBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDcEcsd0JBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7SUFDckUsQ0FBQztDQUNGLENBQUE7QUFDWSxRQUFBLGNBQWMsR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGlDb21tYW5kcywgYXJnc1NlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9jbGkvYXJncy1zZXJ2aWNlJ1xuaW1wb3J0IHsgY2xpU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NsaS9jbGktc2VydmljZSdcbmltcG9ydCB7IEV4ZWN1dGFibGUgfSBmcm9tICdzcmMvc2VydmljZS9jbGkvY29tbWFuZC9leGVjdXRhYmxlJ1xuaW1wb3J0IHsgR2VuZXJhdGUgfSBmcm9tICdzcmMvc2VydmljZS9jbGkvY29tbWFuZC9nZW5lcmF0ZSdcbmltcG9ydCB7IFByaW50SGVscCB9IGZyb20gJ3NyYy9zZXJ2aWNlL2NsaS9jb21tYW5kL3ByaW50LWhlbHAnXG5pbXBvcnQgeyBQcmludFZlcnNpb24gfSBmcm9tICdzcmMvc2VydmljZS9jbGkvY29tbWFuZC9wcmludC12ZXJzaW9uJ1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZXhlY0FyZ3NBc0NvbW1hbmQ6IGFzeW5jIChhcmdzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIF9zZWxmLmlmTW9yZVRoZW5PbmVDb21tYW5kU2VsZWN0ZWRUaHJvd0Vycm9yQW5kUHJpbnRIZWxwKGFyZ3MpXG4gICAgLy8gX3NlbGYuaWZOb0NvbW1hbmRTZWxlY3RlZFRocm93RXJyb3JBbmRQcmludEhlbHAoYXJncylcbiAgICBjb25zdCBjb21tYW5kID0gX3NlbGYuY3JlYXRlQ29tbWFuZEZyb21DbGlBcmdzKGFyZ3MpXG4gICAgYXdhaXQgY29tbWFuZC5leGVjdXRlKClcbiAgfSxcbiAgY3JlYXRlQ29tbWFuZEZyb21DbGlBcmdzOiAoYXJnczogc3RyaW5nW10pOiBFeGVjdXRhYmxlID0+IHtcbiAgICBjb25zdCBjb21tYW5kID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3Q8Q2xpQ29tbWFuZHM+KHsgYXJncywgb3B0aW9uczogYXJnc1NlcnZpY2UuY2xpQ29tbWFuZE9wdGlvbnMgfSlcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBjb21tYW5kLnZlcnNpb246XG4gICAgICAgIHJldHVybiBuZXcgUHJpbnRWZXJzaW9uKClcbiAgICAgIGNhc2UgY29tbWFuZC5oZWxwOlxuICAgICAgICByZXR1cm4gbmV3IFByaW50SGVscCgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRlKClcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBjb21tYW5kWyR7SlNPTi5zdHJpbmdpZnkoY29tbWFuZCl9XWApXG4gICAgfVxuICB9LFxuICBpZk1vcmVUaGVuT25lQ29tbWFuZFNlbGVjdGVkVGhyb3dFcnJvckFuZFByaW50SGVscDogKGFyZ3M6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgaWYgKGFyZ3NTZXJ2aWNlLnNlbGVjdGVkQ29tbWFuZENvdW50KHsgYXJncywgb3B0aW9uczogYXJnc1NlcnZpY2UuY2xpQ29tbWFuZE9wdGlvbnMgfSkgPD0gMSkgcmV0dXJuXG4gICAgY2xpU2VydmljZS5wcmludEhlbHAoKVxuICAgIHRocm93IG5ldyBFcnJvcignRVJST1IgISEhIC0gQ0xJIGNhbiBydW4gb25seSBvbmUgY29tbWFuZCBhdCBhIHRpbWUnKVxuICB9LFxuICBpZk5vQ29tbWFuZFNlbGVjdGVkVGhyb3dFcnJvckFuZFByaW50SGVscDogKGFyZ3M6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gICAgaWYgKGFyZ3NTZXJ2aWNlLnNlbGVjdGVkQ29tbWFuZENvdW50KHsgYXJncywgb3B0aW9uczogYXJnc1NlcnZpY2UuY2xpQ29tbWFuZE9wdGlvbnMgfSkgIT09IDApIHJldHVyblxuICAgIGNsaVNlcnZpY2UucHJpbnRIZWxwKClcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0VSUk9SICEhISAtIENMSSBuZWVkcyBvbmUgY29tbWFuZCB0byBiZSBzZWxlY3RlZCcpXG4gIH0sXG59XG5leHBvcnQgY29uc3QgY2xpSW5pdFVzZUNhc2UgPSBfc2VsZlxuIl19