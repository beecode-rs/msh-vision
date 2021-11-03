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
        printIgnoreTypes: {
            type: 'boolean',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFxQjlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osaUJBQWlCLEVBQUU7UUFDakIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxTQUFTO1NBQ2hCO0tBQ1M7SUFDWixvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBVSxFQUFFO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLElBQUEsMEJBQWUsRUFBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QyxNQUFNLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzNELE9BQVEsUUFBUSxDQUFDLE9BQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQWdDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBSyxFQUFFO1FBQ3RGLE9BQU8sSUFBQSxrQkFBUSxFQUFJLElBQUksRUFBRSxJQUFBLDBCQUFlLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBtaW5pbWlzdE9wdGlvbnMsIHsgT3B0aW9ucyB9IGZyb20gJ21pbmltaXN0LW9wdGlvbnMnXG5cbmV4cG9ydCB0eXBlIEFyZ3NTZXJ2aWNlUGFyYW1zID0ge1xuICBhcmdzOiBzdHJpbmdbXVxuICBvcHRpb25zOiBPcHRpb25zXG59XG5cbmV4cG9ydCB0eXBlIENsaUNvbW1hbmRzID0gbWluaW1pc3QuUGFyc2VkQXJncyAmIHtcbiAgaGVscDogYm9vbGVhblxuICBoOiBib29sZWFuXG4gIHZlcnNpb246IGJvb2xlYW5cbiAgdjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBDbWRHZW5lcmF0ZVBhcmFtcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIHNyYzogc3RyaW5nXG4gIGRlc3Q6IHN0cmluZ1xuICBhcHBOYW1lOiBzdHJpbmdcbiAgdHNDb25maWc6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgYXJnc1NlcnZpY2UgPSB7XG4gIGNsaUNvbW1hbmRPcHRpb25zOiB7XG4gICAgaGVscDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICdoJyxcbiAgICB9LFxuICAgIHZlcnNpb246IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAndicsXG4gICAgfSxcbiAgfSBhcyBPcHRpb25zLFxuICBjbWRHZW5lcmF0ZVBhcmFtczoge1xuICAgIHNyYzoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBkZXN0OiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIGFwcE5hbWU6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgdHNDb25maWc6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVQYXRoczoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBwcmludElnbm9yZUV4dGVybmFsOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgfSxcbiAgICBwcmludElnbm9yZVR5cGVzOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgfSxcbiAgfSBhcyBPcHRpb25zLFxuICBzZWxlY3RlZENvbW1hbmRDb3VudDogKHsgYXJncywgb3B0aW9ucyB9OiBBcmdzU2VydmljZVBhcmFtcyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgbWluaU9wdHMgPSBtaW5pbWlzdE9wdGlvbnMob3B0aW9ucylcbiAgICBjb25zdCBjb21tYW5kcyA9IGFyZ3NTZXJ2aWNlLmFyZ1RvT2JqZWN0KHsgYXJncywgb3B0aW9ucyB9KVxuICAgIHJldHVybiAobWluaU9wdHMuYm9vbGVhbiBhcyBzdHJpbmdbXSkucmVkdWNlKChzdW0sIGNtZCkgPT4gKGNvbW1hbmRzW2NtZF0gPyArK3N1bSA6IHN1bSksIDApXG4gIH0sXG4gIGFyZ1RvT2JqZWN0OiA8VCBleHRlbmRzIG1pbmltaXN0LlBhcnNlZEFyZ3M+KHsgYXJncywgb3B0aW9ucyB9OiBBcmdzU2VydmljZVBhcmFtcyk6IFQgPT4ge1xuICAgIHJldHVybiBtaW5pbWlzdDxUPihhcmdzLCBtaW5pbWlzdE9wdGlvbnMob3B0aW9ucykpXG4gIH0sXG59XG4iXX0=