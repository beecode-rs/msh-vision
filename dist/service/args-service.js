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
    selectedCommandCount: (params) => {
        const miniOpts = minimist_options_1.default(params.options);
        const commands = exports.argsService.argToObject(params);
        return miniOpts.boolean.reduce((sum, cmd) => {
            return commands[cmd] ? ++sum : sum;
        }, 0);
    },
    argToObject: (params) => {
        const miniOpts = minimist_options_1.default(params.options);
        return minimist_1.default(params.args, miniOpts);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFjOUMsUUFBQSxXQUFXLEdBQUc7SUFDekIsaUJBQWlCLEVBQUU7UUFDakIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsR0FBRztTQUNYO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsR0FBRztTQUNYO0tBQ1M7SUFDWixvQkFBb0IsRUFBRSxDQUFDLE1BQXlCLEVBQVUsRUFBRTtRQUMxRCxNQUFNLFFBQVEsR0FBRywwQkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoRCxNQUFNLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNoRCxPQUFRLFFBQVEsQ0FBQyxPQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN4RCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUNwQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQWdDLE1BQXlCLEVBQUssRUFBRTtRQUMzRSxNQUFNLFFBQVEsR0FBRywwQkFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoRCxPQUFPLGtCQUFRLENBQUksTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBtaW5pbWlzdE9wdGlvbnMsIHsgT3B0aW9ucyB9IGZyb20gJ21pbmltaXN0LW9wdGlvbnMnXG5cbmV4cG9ydCB0eXBlIGFyZ3NTZXJ2aWNlUGFyYW1zID0ge1xuICBhcmdzOiBzdHJpbmdbXVxuICBvcHRpb25zOiBPcHRpb25zXG59XG5cbmV4cG9ydCB0eXBlIGNsaUNvbW1hbmRzID0gbWluaW1pc3QuUGFyc2VkQXJncyAmIHtcbiAgaGVscDogYm9vbGVhblxuICBoOiBib29sZWFuXG4gIHZlcnNpb246IGJvb2xlYW5cbiAgdjogYm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgYXJnc1NlcnZpY2UgPSB7XG4gIGNsaUNvbW1hbmRPcHRpb25zOiB7XG4gICAgaGVscDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICdoJyxcbiAgICB9LFxuICAgIHZlcnNpb246IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAndicsXG4gICAgfSxcbiAgfSBhcyBPcHRpb25zLFxuICBzZWxlY3RlZENvbW1hbmRDb3VudDogKHBhcmFtczogYXJnc1NlcnZpY2VQYXJhbXMpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IG1pbmlPcHRzID0gbWluaW1pc3RPcHRpb25zKHBhcmFtcy5vcHRpb25zKVxuICAgIGNvbnN0IGNvbW1hbmRzID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3QocGFyYW1zKVxuICAgIHJldHVybiAobWluaU9wdHMuYm9vbGVhbiBhcyBzdHJpbmdbXSkucmVkdWNlKChzdW0sIGNtZCkgPT4ge1xuICAgICAgcmV0dXJuIGNvbW1hbmRzW2NtZF0gPyArK3N1bSA6IHN1bVxuICAgIH0sIDApXG4gIH0sXG4gIGFyZ1RvT2JqZWN0OiA8VCBleHRlbmRzIG1pbmltaXN0LlBhcnNlZEFyZ3M+KHBhcmFtczogYXJnc1NlcnZpY2VQYXJhbXMpOiBUID0+IHtcbiAgICBjb25zdCBtaW5pT3B0cyA9IG1pbmltaXN0T3B0aW9ucyhwYXJhbXMub3B0aW9ucylcbiAgICByZXR1cm4gbWluaW1pc3Q8VD4ocGFyYW1zLmFyZ3MsIG1pbmlPcHRzKVxuICB9LFxufVxuIl19