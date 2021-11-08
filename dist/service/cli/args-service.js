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
        projectRootPath: {
            type: 'string',
        },
        dest: {
            type: 'string',
        },
        destName: {
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
        printIgnoreTypes: {
            type: 'boolean',
        },
        printSimplifyEntities: {
            type: 'string',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2FyZ3Mtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isd0VBQTJEO0FBMkI5QyxRQUFBLFdBQVcsR0FBRztJQUN6QixpQkFBaUIsRUFBRTtRQUNqQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ1g7S0FDUztJQUNaLGlCQUFpQixFQUFFO1FBQ2pCLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxlQUFlLEVBQUU7WUFDZixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QscUJBQXFCLEVBQUU7WUFDckIsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNTO0lBQ1osb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQVUsRUFBRTtRQUNyRSxNQUFNLFFBQVEsR0FBRyxJQUFBLDBCQUFlLEVBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUMzRCxPQUFRLFFBQVEsQ0FBQyxPQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFnQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQUssRUFBRTtRQUN0RixPQUFPLElBQUEsa0JBQVEsRUFBSSxJQUFJLEVBQUUsSUFBQSwwQkFBZSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgbWluaW1pc3RPcHRpb25zLCB7IE9wdGlvbnMgfSBmcm9tICdtaW5pbWlzdC1vcHRpb25zJ1xuXG5leHBvcnQgdHlwZSBBcmdzU2VydmljZVBhcmFtcyA9IHtcbiAgYXJnczogc3RyaW5nW11cbiAgb3B0aW9uczogT3B0aW9uc1xufVxuXG5leHBvcnQgdHlwZSBDbGlDb21tYW5kcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIGhlbHA6IGJvb2xlYW5cbiAgaDogYm9vbGVhblxuICB2ZXJzaW9uOiBib29sZWFuXG4gIHY6IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgQ21kR2VuZXJhdGVQYXJhbXMgPSBtaW5pbWlzdC5QYXJzZWRBcmdzICYge1xuICBzcmM6IHN0cmluZ1xuICBwcm9qZWN0Um9vdFBhdGg6IHN0cmluZ1xuICBkZXN0OiBzdHJpbmdcbiAgZGVzdE5hbWU6IHN0cmluZ1xuICBhcHBOYW1lOiBzdHJpbmdcbiAgdHNDb25maWc6IHN0cmluZ1xuICBwcmludElnbm9yZVBhdGhzOiBzdHJpbmdcbiAgcHJpbnRJZ25vcmVFeHRlcm5hbDogYm9vbGVhblxuICBwcmludElnbm9yZVR5cGVzOiBib29sZWFuXG4gIHByaW50U2ltcGxpZnlFbnRpdGllczogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBhcmdzU2VydmljZSA9IHtcbiAgY2xpQ29tbWFuZE9wdGlvbnM6IHtcbiAgICBoZWxwOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBhbGlhczogJ2gnLFxuICAgIH0sXG4gICAgdmVyc2lvbjoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICd2JyxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIGNtZEdlbmVyYXRlUGFyYW1zOiB7XG4gICAgc3JjOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHByb2plY3RSb290UGF0aDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBkZXN0OiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIGRlc3ROYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIGFwcE5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgdHNDb25maWc6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVQYXRoczoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBwcmludElnbm9yZUV4dGVybmFsOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgfSxcbiAgICBwcmludElnbm9yZVR5cGVzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgfSxcbiAgICBwcmludFNpbXBsaWZ5RW50aXRpZXM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gIH0gYXMgT3B0aW9ucyxcbiAgc2VsZWN0ZWRDb21tYW5kQ291bnQ6ICh7IGFyZ3MsIG9wdGlvbnMgfTogQXJnc1NlcnZpY2VQYXJhbXMpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG1pbmlPcHRzID0gbWluaW1pc3RPcHRpb25zKG9wdGlvbnMpXG4gICAgY29uc3QgY29tbWFuZHMgPSBhcmdzU2VydmljZS5hcmdUb09iamVjdCh7IGFyZ3MsIG9wdGlvbnMgfSlcbiAgICByZXR1cm4gKG1pbmlPcHRzLmJvb2xlYW4gYXMgc3RyaW5nW10pLnJlZHVjZSgoc3VtLCBjbWQpID0+IChjb21tYW5kc1tjbWRdID8gKytzdW0gOiBzdW0pLCAwKVxuICB9LFxuICBhcmdUb09iamVjdDogPFQgZXh0ZW5kcyBtaW5pbWlzdC5QYXJzZWRBcmdzPih7IGFyZ3MsIG9wdGlvbnMgfTogQXJnc1NlcnZpY2VQYXJhbXMpOiBUID0+IHtcbiAgICByZXR1cm4gbWluaW1pc3Q8VD4oYXJncywgbWluaW1pc3RPcHRpb25zKG9wdGlvbnMpKVxuICB9LFxufVxuIl19