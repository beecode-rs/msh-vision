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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFxQjlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osaUJBQWlCLEVBQUU7UUFDakIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxRQUFRO1NBQ2Y7S0FDUztJQUNaLG9CQUFvQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFxQixFQUFVLEVBQUU7UUFDckUsTUFBTSxRQUFRLEdBQUcsMEJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QyxNQUFNLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzNELE9BQVEsUUFBUSxDQUFDLE9BQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQWdDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBSyxFQUFFO1FBQ3RGLE9BQU8sa0JBQVEsQ0FBSSxJQUFJLEVBQUUsMEJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQ3BELENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1pbmltaXN0IGZyb20gJ21pbmltaXN0J1xuaW1wb3J0IG1pbmltaXN0T3B0aW9ucywgeyBPcHRpb25zIH0gZnJvbSAnbWluaW1pc3Qtb3B0aW9ucydcblxuZXhwb3J0IHR5cGUgQXJnc1NlcnZpY2VQYXJhbXMgPSB7XG4gIGFyZ3M6IHN0cmluZ1tdXG4gIG9wdGlvbnM6IE9wdGlvbnNcbn1cblxuZXhwb3J0IHR5cGUgQ2xpQ29tbWFuZHMgPSBtaW5pbWlzdC5QYXJzZWRBcmdzICYge1xuICBoZWxwOiBib29sZWFuXG4gIGg6IGJvb2xlYW5cbiAgdmVyc2lvbjogYm9vbGVhblxuICB2OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIENtZEdlbmVyYXRlUGFyYW1zID0gbWluaW1pc3QuUGFyc2VkQXJncyAmIHtcbiAgc3JjOiBzdHJpbmdcbiAgZGVzdDogc3RyaW5nXG4gIGFwcE5hbWU6IHN0cmluZ1xuICB0c0NvbmZpZzogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBhcmdzU2VydmljZSA9IHtcbiAgY2xpQ29tbWFuZE9wdGlvbnM6IHtcbiAgICBoZWxwOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBhbGlhczogJ2gnLFxuICAgIH0sXG4gICAgdmVyc2lvbjoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICd2JyxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIGNtZEdlbmVyYXRlUGFyYW1zOiB7XG4gICAgc3JjOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIGRlc3Q6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgYXBwTmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICB0c0NvbmZpZzoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBwcmludElnbm9yZVBhdGhzOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIHNlbGVjdGVkQ29tbWFuZENvdW50OiAoeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBtaW5pT3B0cyA9IG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKVxuICAgIGNvbnN0IGNvbW1hbmRzID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3QoeyBhcmdzLCBvcHRpb25zIH0pXG4gICAgcmV0dXJuIChtaW5pT3B0cy5ib29sZWFuIGFzIHN0cmluZ1tdKS5yZWR1Y2UoKHN1bSwgY21kKSA9PiAoY29tbWFuZHNbY21kXSA/ICsrc3VtIDogc3VtKSwgMClcbiAgfSxcbiAgYXJnVG9PYmplY3Q6IDxUIGV4dGVuZHMgbWluaW1pc3QuUGFyc2VkQXJncz4oeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogVCA9PiB7XG4gICAgcmV0dXJuIG1pbmltaXN0PFQ+KGFyZ3MsIG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKSlcbiAgfSxcbn1cbiJdfQ==