"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsService = void 0;
const minimist_1 = __importDefault(require("minimist"));
const minimist_options_1 = __importDefault(require("minimist-options"));
exports.argsService = {
    cliCommandOptions: {
        help: {
            type: 'boolean',
            alias: 'h',
        },
        version: {
            type: 'boolean',
            alias: 'v',
        },
    },
    selectedCommandCount: ({ args, options }) => {
        const miniOpts = (0, minimist_options_1.default)(options);
        const commands = exports.argsService.argToObject({ args, options });
        return miniOpts.boolean.reduce((sum, cmd) => (commands[cmd] ? ++sum : sum), 0);
    },
    argToObject: ({ args, options }) => {
        return (0, minimist_1.default)(args, (0, minimist_options_1.default)(options));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2FyZ3Mtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isd0VBQTJEO0FBWTlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQVUsRUFBRTtRQUNyRSxNQUFNLFFBQVEsR0FBRyxJQUFBLDBCQUFlLEVBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUMzRCxPQUFRLFFBQVEsQ0FBQyxPQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFnQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQUssRUFBRTtRQUN0RixPQUFPLElBQUEsa0JBQVEsRUFBSSxJQUFJLEVBQUUsSUFBQSwwQkFBZSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgbWluaW1pc3RPcHRpb25zLCB7IE9wdGlvbnMgfSBmcm9tICdtaW5pbWlzdC1vcHRpb25zJ1xuXG5leHBvcnQgdHlwZSBBcmdzU2VydmljZVBhcmFtcyA9IHtcbiAgYXJnczogc3RyaW5nW11cbiAgb3B0aW9uczogT3B0aW9uc1xufVxuXG5leHBvcnQgdHlwZSBDbGlDb21tYW5kcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIGhlbHA6IGJvb2xlYW5cbiAgdmVyc2lvbjogYm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgYXJnc1NlcnZpY2UgPSB7XG4gIGNsaUNvbW1hbmRPcHRpb25zOiB7XG4gICAgaGVscDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICdoJyxcbiAgICB9LFxuICAgIHZlcnNpb246IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAndicsXG4gICAgfSxcbiAgfSBhcyBPcHRpb25zLFxuICBzZWxlY3RlZENvbW1hbmRDb3VudDogKHsgYXJncywgb3B0aW9ucyB9OiBBcmdzU2VydmljZVBhcmFtcyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgbWluaU9wdHMgPSBtaW5pbWlzdE9wdGlvbnMob3B0aW9ucylcbiAgICBjb25zdCBjb21tYW5kcyA9IGFyZ3NTZXJ2aWNlLmFyZ1RvT2JqZWN0KHsgYXJncywgb3B0aW9ucyB9KVxuICAgIHJldHVybiAobWluaU9wdHMuYm9vbGVhbiBhcyBzdHJpbmdbXSkucmVkdWNlKChzdW0sIGNtZCkgPT4gKGNvbW1hbmRzW2NtZF0gPyArK3N1bSA6IHN1bSksIDApXG4gIH0sXG4gIGFyZ1RvT2JqZWN0OiA8VCBleHRlbmRzIG1pbmltaXN0LlBhcnNlZEFyZ3M+KHsgYXJncywgb3B0aW9ucyB9OiBBcmdzU2VydmljZVBhcmFtcyk6IFQgPT4ge1xuICAgIHJldHVybiBtaW5pbWlzdDxUPihhcmdzLCBtaW5pbWlzdE9wdGlvbnMob3B0aW9ucykpXG4gIH0sXG59XG4iXX0=