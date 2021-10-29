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
    cmdGenerateParams: {
        src: {
            type: 'string',
        },
        dest: {
            type: 'string',
        },
        appName: {
            type: 'string',
        },
        tsConfig: {
            type: 'string',
        },
        printIgnorePaths: {
            type: 'string',
        },
        printIgnoreExternal: {
            type: 'boolean',
        },
    },
    selectedCommandCount: ({ args, options }) => {
        const miniOpts = minimist_options_1.default(options);
        const commands = exports.argsService.argToObject({ args, options });
        return miniOpts.boolean.reduce((sum, cmd) => (commands[cmd] ? ++sum : sum), 0);
    },
    argToObject: ({ args, options }) => {
        return minimist_1.default(args, minimist_options_1.default(options));
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFxQjlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osaUJBQWlCLEVBQUU7UUFDakIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsU0FBUztTQUNoQjtLQUNTO0lBQ1osb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQVUsRUFBRTtRQUNyRSxNQUFNLFFBQVEsR0FBRywwQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLG1CQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDM0QsT0FBUSxRQUFRLENBQUMsT0FBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzlGLENBQUM7SUFDRCxXQUFXLEVBQUUsQ0FBZ0MsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFxQixFQUFLLEVBQUU7UUFDdEYsT0FBTyxrQkFBUSxDQUFJLElBQUksRUFBRSwwQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgbWluaW1pc3RPcHRpb25zLCB7IE9wdGlvbnMgfSBmcm9tICdtaW5pbWlzdC1vcHRpb25zJ1xuXG5leHBvcnQgdHlwZSBBcmdzU2VydmljZVBhcmFtcyA9IHtcbiAgYXJnczogc3RyaW5nW11cbiAgb3B0aW9uczogT3B0aW9uc1xufVxuXG5leHBvcnQgdHlwZSBDbGlDb21tYW5kcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIGhlbHA6IGJvb2xlYW5cbiAgaDogYm9vbGVhblxuICB2ZXJzaW9uOiBib29sZWFuXG4gIHY6IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgQ21kR2VuZXJhdGVQYXJhbXMgPSBtaW5pbWlzdC5QYXJzZWRBcmdzICYge1xuICBzcmM6IHN0cmluZ1xuICBkZXN0OiBzdHJpbmdcbiAgYXBwTmFtZTogc3RyaW5nXG4gIHRzQ29uZmlnOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IGFyZ3NTZXJ2aWNlID0ge1xuICBjbGlDb21tYW5kT3B0aW9uczoge1xuICAgIGhlbHA6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAnaCcsXG4gICAgfSxcbiAgICB2ZXJzaW9uOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBhbGlhczogJ3YnLFxuICAgIH0sXG4gIH0gYXMgT3B0aW9ucyxcbiAgY21kR2VuZXJhdGVQYXJhbXM6IHtcbiAgICBzcmM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgZGVzdDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBhcHBOYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHRzQ29uZmlnOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHByaW50SWdub3JlUGF0aHM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVFeHRlcm5hbDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH0sXG4gIH0gYXMgT3B0aW9ucyxcbiAgc2VsZWN0ZWRDb21tYW5kQ291bnQ6ICh7IGFyZ3MsIG9wdGlvbnMgfTogQXJnc1NlcnZpY2VQYXJhbXMpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG1pbmlPcHRzID0gbWluaW1pc3RPcHRpb25zKG9wdGlvbnMpXG4gICAgY29uc3QgY29tbWFuZHMgPSBhcmdzU2VydmljZS5hcmdUb09iamVjdCh7IGFyZ3MsIG9wdGlvbnMgfSlcbiAgICByZXR1cm4gKG1pbmlPcHRzLmJvb2xlYW4gYXMgc3RyaW5nW10pLnJlZHVjZSgoc3VtLCBjbWQpID0+IChjb21tYW5kc1tjbWRdID8gKytzdW0gOiBzdW0pLCAwKVxuICB9LFxuICBhcmdUb09iamVjdDogPFQgZXh0ZW5kcyBtaW5pbWlzdC5QYXJzZWRBcmdzPih7IGFyZ3MsIG9wdGlvbnMgfTogQXJnc1NlcnZpY2VQYXJhbXMpOiBUID0+IHtcbiAgICByZXR1cm4gbWluaW1pc3Q8VD4oYXJncywgbWluaW1pc3RPcHRpb25zKG9wdGlvbnMpKVxuICB9LFxufVxuIl19