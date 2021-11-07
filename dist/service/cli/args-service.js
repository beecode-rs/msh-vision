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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY2xpL2FyZ3Mtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3REFBK0I7QUFDL0Isd0VBQTJEO0FBMEI5QyxRQUFBLFdBQVcsR0FBRztJQUN6QixpQkFBaUIsRUFBRTtRQUNqQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ1g7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ1g7S0FDUztJQUNaLGlCQUFpQixFQUFFO1FBQ2pCLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLFNBQVM7U0FDaEI7UUFDRCxxQkFBcUIsRUFBRTtZQUNyQixJQUFJLEVBQUUsUUFBUTtTQUNmO0tBQ1M7SUFDWixvQkFBb0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBVSxFQUFFO1FBQ3JFLE1BQU0sUUFBUSxHQUFHLElBQUEsMEJBQWUsRUFBQyxPQUFPLENBQUMsQ0FBQTtRQUN6QyxNQUFNLFFBQVEsR0FBRyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzNELE9BQVEsUUFBUSxDQUFDLE9BQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBQ0QsV0FBVyxFQUFFLENBQWdDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBcUIsRUFBSyxFQUFFO1FBQ3RGLE9BQU8sSUFBQSxrQkFBUSxFQUFJLElBQUksRUFBRSxJQUFBLDBCQUFlLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtaW5pbWlzdCBmcm9tICdtaW5pbWlzdCdcbmltcG9ydCBtaW5pbWlzdE9wdGlvbnMsIHsgT3B0aW9ucyB9IGZyb20gJ21pbmltaXN0LW9wdGlvbnMnXG5cbmV4cG9ydCB0eXBlIEFyZ3NTZXJ2aWNlUGFyYW1zID0ge1xuICBhcmdzOiBzdHJpbmdbXVxuICBvcHRpb25zOiBPcHRpb25zXG59XG5cbmV4cG9ydCB0eXBlIENsaUNvbW1hbmRzID0gbWluaW1pc3QuUGFyc2VkQXJncyAmIHtcbiAgaGVscDogYm9vbGVhblxuICBoOiBib29sZWFuXG4gIHZlcnNpb246IGJvb2xlYW5cbiAgdjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBDbWRHZW5lcmF0ZVBhcmFtcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIHNyYzogc3RyaW5nXG4gIGRlc3Q6IHN0cmluZ1xuICBkZXN0TmFtZTogc3RyaW5nXG4gIGFwcE5hbWU6IHN0cmluZ1xuICB0c0NvbmZpZzogc3RyaW5nXG4gIHByaW50SWdub3JlUGF0aHM6IHN0cmluZ1xuICBwcmludElnbm9yZUV4dGVybmFsOiBib29sZWFuXG4gIHByaW50SWdub3JlVHlwZXM6IGJvb2xlYW5cbiAgcHJpbnRTaW1wbGlmeUVudGl0aWVzOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IGFyZ3NTZXJ2aWNlID0ge1xuICBjbGlDb21tYW5kT3B0aW9uczoge1xuICAgIGhlbHA6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAnaCcsXG4gICAgfSxcbiAgICB2ZXJzaW9uOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBhbGlhczogJ3YnLFxuICAgIH0sXG4gIH0gYXMgT3B0aW9ucyxcbiAgY21kR2VuZXJhdGVQYXJhbXM6IHtcbiAgICBzcmM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgZGVzdDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBkZXN0TmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBhcHBOYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHRzQ29uZmlnOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHByaW50SWdub3JlUGF0aHM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVFeHRlcm5hbDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVUeXBlczoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH0sXG4gICAgcHJpbnRTaW1wbGlmeUVudGl0aWVzOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIHNlbGVjdGVkQ29tbWFuZENvdW50OiAoeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBtaW5pT3B0cyA9IG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKVxuICAgIGNvbnN0IGNvbW1hbmRzID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3QoeyBhcmdzLCBvcHRpb25zIH0pXG4gICAgcmV0dXJuIChtaW5pT3B0cy5ib29sZWFuIGFzIHN0cmluZ1tdKS5yZWR1Y2UoKHN1bSwgY21kKSA9PiAoY29tbWFuZHNbY21kXSA/ICsrc3VtIDogc3VtKSwgMClcbiAgfSxcbiAgYXJnVG9PYmplY3Q6IDxUIGV4dGVuZHMgbWluaW1pc3QuUGFyc2VkQXJncz4oeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogVCA9PiB7XG4gICAgcmV0dXJuIG1pbmltaXN0PFQ+KGFyZ3MsIG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKSlcbiAgfSxcbn1cbiJdfQ==