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
            default: process.cwd(),
        },
        dest: {
            type: 'string',
            default: `${process.cwd()}/vision/`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFtQjlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osaUJBQWlCLEVBQUU7UUFDakIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtTQUN2QjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVO1NBQ3BDO0tBQ1M7SUFDWixvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBVSxFQUFFO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLDBCQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUMzRCxPQUFRLFFBQVEsQ0FBQyxPQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFnQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQUssRUFBRTtRQUN0RixPQUFPLGtCQUFRLENBQUksSUFBSSxFQUFFLDBCQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBtaW5pbWlzdE9wdGlvbnMsIHsgT3B0aW9ucyB9IGZyb20gJ21pbmltaXN0LW9wdGlvbnMnXG5cbmV4cG9ydCB0eXBlIEFyZ3NTZXJ2aWNlUGFyYW1zID0ge1xuICBhcmdzOiBzdHJpbmdbXVxuICBvcHRpb25zOiBPcHRpb25zXG59XG5cbmV4cG9ydCB0eXBlIENsaUNvbW1hbmRzID0gbWluaW1pc3QuUGFyc2VkQXJncyAmIHtcbiAgaGVscDogYm9vbGVhblxuICBoOiBib29sZWFuXG4gIHZlcnNpb246IGJvb2xlYW5cbiAgdjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBDbWRHZW5lcmF0ZVBhcmFtcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIHNyYzogc3RyaW5nXG4gIGRlc3Q6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgYXJnc1NlcnZpY2UgPSB7XG4gIGNsaUNvbW1hbmRPcHRpb25zOiB7XG4gICAgaGVscDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgYWxpYXM6ICdoJyxcbiAgICB9LFxuICAgIHZlcnNpb246IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAndicsXG4gICAgfSxcbiAgfSBhcyBPcHRpb25zLFxuICBjbWRHZW5lcmF0ZVBhcmFtczoge1xuICAgIHNyYzoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiBwcm9jZXNzLmN3ZCgpLFxuICAgIH0sXG4gICAgZGVzdDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiBgJHtwcm9jZXNzLmN3ZCgpfS92aXNpb24vYCxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIHNlbGVjdGVkQ29tbWFuZENvdW50OiAoeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBtaW5pT3B0cyA9IG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKVxuICAgIGNvbnN0IGNvbW1hbmRzID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3QoeyBhcmdzLCBvcHRpb25zIH0pXG4gICAgcmV0dXJuIChtaW5pT3B0cy5ib29sZWFuIGFzIHN0cmluZ1tdKS5yZWR1Y2UoKHN1bSwgY21kKSA9PiAoY29tbWFuZHNbY21kXSA/ICsrc3VtIDogc3VtKSwgMClcbiAgfSxcbiAgYXJnVG9PYmplY3Q6IDxUIGV4dGVuZHMgbWluaW1pc3QuUGFyc2VkQXJncz4oeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogVCA9PiB7XG4gICAgcmV0dXJuIG1pbmltaXN0PFQ+KGFyZ3MsIG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKSlcbiAgfSxcbn1cbiJdfQ==