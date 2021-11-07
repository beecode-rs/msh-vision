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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYXJncy1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUErQjtBQUMvQix3RUFBMkQ7QUFxQjlDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLGlCQUFpQixFQUFFO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLEdBQUc7U0FDWDtLQUNTO0lBQ1osaUJBQWlCLEVBQUU7UUFDakIsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsUUFBUTtTQUNmO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLFFBQVE7U0FDZjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxRQUFRO1NBQ2Y7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxTQUFTO1NBQ2hCO1FBQ0QscUJBQXFCLEVBQUU7WUFDckIsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNTO0lBQ1osb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQVUsRUFBRTtRQUNyRSxNQUFNLFFBQVEsR0FBRyxJQUFBLDBCQUFlLEVBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUMzRCxPQUFRLFFBQVEsQ0FBQyxPQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFnQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQXFCLEVBQUssRUFBRTtRQUN0RixPQUFPLElBQUEsa0JBQVEsRUFBSSxJQUFJLEVBQUUsSUFBQSwwQkFBZSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWluaW1pc3QgZnJvbSAnbWluaW1pc3QnXG5pbXBvcnQgbWluaW1pc3RPcHRpb25zLCB7IE9wdGlvbnMgfSBmcm9tICdtaW5pbWlzdC1vcHRpb25zJ1xuXG5leHBvcnQgdHlwZSBBcmdzU2VydmljZVBhcmFtcyA9IHtcbiAgYXJnczogc3RyaW5nW11cbiAgb3B0aW9uczogT3B0aW9uc1xufVxuXG5leHBvcnQgdHlwZSBDbGlDb21tYW5kcyA9IG1pbmltaXN0LlBhcnNlZEFyZ3MgJiB7XG4gIGhlbHA6IGJvb2xlYW5cbiAgaDogYm9vbGVhblxuICB2ZXJzaW9uOiBib29sZWFuXG4gIHY6IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgQ21kR2VuZXJhdGVQYXJhbXMgPSBtaW5pbWlzdC5QYXJzZWRBcmdzICYge1xuICBzcmM6IHN0cmluZ1xuICBkZXN0OiBzdHJpbmdcbiAgYXBwTmFtZTogc3RyaW5nXG4gIHRzQ29uZmlnOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IGFyZ3NTZXJ2aWNlID0ge1xuICBjbGlDb21tYW5kT3B0aW9uczoge1xuICAgIGhlbHA6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGFsaWFzOiAnaCcsXG4gICAgfSxcbiAgICB2ZXJzaW9uOiB7XG4gICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICBhbGlhczogJ3YnLFxuICAgIH0sXG4gIH0gYXMgT3B0aW9ucyxcbiAgY21kR2VuZXJhdGVQYXJhbXM6IHtcbiAgICBzcmM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgZGVzdDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBhcHBOYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHRzQ29uZmlnOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICAgIHByaW50SWdub3JlUGF0aHM6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVFeHRlcm5hbDoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH0sXG4gICAgcHJpbnRJZ25vcmVUeXBlczoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH0sXG4gICAgcHJpbnRTaW1wbGlmeUVudGl0aWVzOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICB9IGFzIE9wdGlvbnMsXG4gIHNlbGVjdGVkQ29tbWFuZENvdW50OiAoeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBtaW5pT3B0cyA9IG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKVxuICAgIGNvbnN0IGNvbW1hbmRzID0gYXJnc1NlcnZpY2UuYXJnVG9PYmplY3QoeyBhcmdzLCBvcHRpb25zIH0pXG4gICAgcmV0dXJuIChtaW5pT3B0cy5ib29sZWFuIGFzIHN0cmluZ1tdKS5yZWR1Y2UoKHN1bSwgY21kKSA9PiAoY29tbWFuZHNbY21kXSA/ICsrc3VtIDogc3VtKSwgMClcbiAgfSxcbiAgYXJnVG9PYmplY3Q6IDxUIGV4dGVuZHMgbWluaW1pc3QuUGFyc2VkQXJncz4oeyBhcmdzLCBvcHRpb25zIH06IEFyZ3NTZXJ2aWNlUGFyYW1zKTogVCA9PiB7XG4gICAgcmV0dXJuIG1pbmltaXN0PFQ+KGFyZ3MsIG1pbmltaXN0T3B0aW9ucyhvcHRpb25zKSlcbiAgfSxcbn1cbiJdfQ==