"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const msh_node_env_1 = require("@beecode/msh-node-env");
const cli_args_minimist_location_1 = require("@beecode/msh-node-env/lib/location/cli-args-minimist-location");
const environment_location_1 = require("@beecode/msh-node-env/lib/location/environment-location");
const logger_1 = require("@beecode/msh-node-env/lib/util/logger");
const msh_node_log_1 = require("@beecode/msh-node-log");
const simple_console_log_1 = require("@beecode/msh-node-log/lib/console-log-strategy/simple-console-log");
const console_logger_1 = require("@beecode/msh-node-log/lib/console-logger");
const cache_util_1 = require("@beecode/msh-node-util/lib/cache-util");
const dotenv_1 = __importDefault(require("dotenv"));
(0, logger_1.NodeEnvLogger)(new console_logger_1.ConsoleLogger({ logLevel: msh_node_log_1.LogLevelType.INFO, consoleLogStrategy: new simple_console_log_1.SimpleConsoleLog() }));
const env = (0, msh_node_env_1.MshNodeEnv)({
    locationStrategies: [
        new cli_args_minimist_location_1.CliArgsMinimistLocation({
            options: {
                VISION_APPLICATION_NAME: { type: 'string', alias: ['appName', 'app-name'] },
                VISION_PROJECT_ROOT_PATH: { type: 'string', alias: ['projectRootPath', 'project-root-path'] },
                VISION_PROJECT_SRC_FOLDER_PATH: { type: 'string', alias: ['src'] },
                VISION_EXPORT_FILE_PATH: { type: 'string', alias: ['dest'] },
                VISION_EXPORT_FILE_NAME: { type: 'string', alias: ['destName', 'dest-name'] },
                VISION_TS_TSCONFIG_PATH: { type: 'string', alias: ['tsConfig', 'ts-config'] },
                VISION_PRINT_IGNORE_PATHS_JSON_ARRAY: { type: 'string', alias: ['printIgnorePaths', 'print-ignore-paths'] },
                VISION_PRINT_IGNORE_EXTERNAL: { type: 'string', alias: ['printIgnoreExternal', 'print-ignore-external'] },
                VISION_PRINT_IGNORE_TYPES: { type: 'string', alias: ['printIgnoreTypes', 'print-ignore-types'] },
                VISION_PRINT_SIMPLIFY_ENTITIES_JSON_ARRAY: {
                    type: 'string',
                    alias: ['printSimplifyEntities', 'print-simplify-entities'],
                },
            },
        }),
        new environment_location_1.EnvironmentLocation(),
    ],
});
dotenv_1.default.config({ path: './.vision' });
exports.config = cache_util_1.cacheUtil.singleton(() => Object.freeze({
    env: env('NODE_ENV').string.default('prod').required,
    logLevel: env('LOG_LEVEL').string.default('info').required,
    vision: {
        ignoreGlobPaths: env('VISION_IGNORE_GLOB_PATHS')
            .json()
            .default(['**/*.test.ts', '**/*.contract.ts', '**/__mocks__/**/*']).required,
        applicationName: env('VISION_APPLICATION_NAME').string.default('').required,
        projectRootPath: env('VISION_PROJECT_ROOT_PATH').string.default(process.cwd()).required,
        projectSrcFolderPath: env('VISION_PROJECT_SRC_FOLDER_PATH').string.default('./src').required,
        exportFilePath: env('VISION_EXPORT_FILE_PATH').string.default(`${process.cwd()}/`).required,
        exportFileName: env('VISION_EXPORT_FILE_NAME').string.default('vision').required,
        ts: {
            tsconfigPath: env('VISION_TS_TSCONFIG_PATH').string.default(`${process.cwd()}/tsconfig.json`).required,
        },
        print: {
            ignorePaths: env('VISION_PRINT_IGNORE_PATHS_JSON_ARRAY').json().default([]).required,
            ignoreExternal: env('VISION_PRINT_IGNORE_EXTERNAL').boolean.default(false).required,
            ignoreTypes: env('VISION_PRINT_IGNORE_TYPES').boolean.default(false).required,
            simplifyEntities: env('VISION_PRINT_SIMPLIFY_ENTITIES_JSON_ARRAY').json().default([]).required,
        },
    },
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFrRDtBQUNsRCw4R0FBdUc7QUFDdkcsa0dBQTZGO0FBQzdGLGtFQUFxRTtBQUNyRSx3REFBb0Q7QUFDcEQsMEdBQW9HO0FBQ3BHLDZFQUF3RTtBQUN4RSxzRUFBaUU7QUFDakUsb0RBQTJCO0FBRTNCLElBQUEsc0JBQWEsRUFBQyxJQUFJLDhCQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsMkJBQVksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxxQ0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBRTdHLE1BQU0sR0FBRyxHQUFHLElBQUEseUJBQVUsRUFBQztJQUNyQixrQkFBa0IsRUFBRTtRQUNsQixJQUFJLG9EQUF1QixDQUFDO1lBQzFCLE9BQU8sRUFBRTtnQkFDUCx1QkFBdUIsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUMzRSx3QkFBd0IsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsRUFBRTtnQkFDN0YsOEJBQThCLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNsRSx1QkFBdUIsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzVELHVCQUF1QixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQzdFLHVCQUF1QixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFL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c0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUTtTQUNuSDtLQUNGO0NBQ0YsQ0FBQyxDQUNILENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNc2hOb2RlRW52IH0gZnJvbSAnQGJlZWNvZGUvbXNoLW5vZGUtZW52J1xuaW1wb3J0IHsgQ2xpQXJnc01pbmltaXN0TG9jYXRpb24gfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1lbnYvbGliL2xvY2F0aW9uL2NsaS1hcmdzLW1pbmltaXN0LWxvY2F0aW9uJ1xuaW1wb3J0IHsgRW52aXJvbm1lbnRMb2NhdGlvbiB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWVudi9saWIvbG9jYXRpb24vZW52aXJvbm1lbnQtbG9jYXRpb24nXG5pbXBvcnQgeyBOb2RlRW52TG9nZ2VyIH0gZnJvbSAnQGJlZWNvZGUvbXNoLW5vZGUtZW52L2xpYi91dGlsL2xvZ2dlcidcbmltcG9ydCB7IExvZ0xldmVsVHlwZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWxvZydcbmltcG9ydCB7IFNpbXBsZUNvbnNvbGVMb2cgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nLXN0cmF0ZWd5L3NpbXBsZS1jb25zb2xlLWxvZydcbmltcG9ydCB7IENvbnNvbGVMb2dnZXIgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nZ2VyJ1xuaW1wb3J0IHsgY2FjaGVVdGlsIH0gZnJvbSAnQGJlZWNvZGUvbXNoLW5vZGUtdXRpbC9saWIvY2FjaGUtdXRpbCdcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuXG5Ob2RlRW52TG9nZ2VyKG5ldyBDb25zb2xlTG9nZ2VyKHsgbG9nTGV2ZWw6IExvZ0xldmVsVHlwZS5JTkZPLCBjb25zb2xlTG9nU3RyYXRlZ3k6IG5ldyBTaW1wbGVDb25zb2xlTG9nKCkgfSkpXG5cbmNvbnN0IGVudiA9IE1zaE5vZGVFbnYoe1xuICBsb2NhdGlvblN0cmF0ZWdpZXM6IFtcbiAgICBuZXcgQ2xpQXJnc01pbmltaXN0TG9jYXRpb24oe1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBWSVNJT05fQVBQTElDQVRJT05fTkFNRTogeyB0eXBlOiAnc3RyaW5nJywgYWxpYXM6IFsnYXBwTmFtZScsICdhcHAtbmFtZSddIH0sXG4gICAgICAgIFZJU0lPTl9QUk9KRUNUX1JPT1RfUEFUSDogeyB0eXBlOiAnc3RyaW5nJywgYWxpYXM6IFsncHJvamVjdFJvb3RQYXRoJywgJ3Byb2plY3Qtcm9vdC1wYXRoJ10gfSxcbiAgICAgICAgVklTSU9OX1BST0pFQ1RfU1JDX0ZPTERFUl9QQVRIOiB7IHR5cGU6ICdzdHJpbmcnLCBhbGlhczogWydzcmMnXSB9LFxuICAgICAgICBWSVNJT05fRVhQT1JUX0ZJTEVfUEFUSDogeyB0eXBlOiAnc3RyaW5nJywgYWxpYXM6IFsnZGVzdCddIH0sXG4gICAgICAgIFZJU0lPTl9FWFBPUlRfRklMRV9OQU1FOiB7IHR5cGU6ICdzdHJpbmcnLCBhbGlhczogWydkZXN0TmFtZScsICdkZXN0LW5hbWUnXSB9LFxuICAgICAgICBWSVNJT05fVFNfVFNDT05GSUdfUEFUSDogeyB0eXBlOiAnc3RyaW5nJywgYWxpYXM6IFsndHNDb25maWcnLCAndHMtY29uZmlnJ10gfSxcbiAgICAgICAgVklTSU9OX1BSSU5UX0lHTk9SRV9QQVRIU19KU09OX0FSUkFZOiB7IHR5cGU6ICdzdHJpbmcnLCBhbGlhczogWydwcmludElnbm9yZVBhdGhzJywgJ3ByaW50LWlnbm9yZS1wYXRocyddIH0sXG4gICAgICAgIFZJU0lPTl9QUklOVF9JR05PUkVfRVhURVJOQUw6IHsgdHlwZTogJ3N0cmluZycsIGFsaWFzOiBbJ3ByaW50SWdub3JlRXh0ZXJuYWwnLCAncHJpbnQtaWdub3JlLWV4dGVybmFsJ10gfSxcbiAgICAgICAgVklTSU9OX1BSSU5UX0lHTk9SRV9UWVBFUzogeyB0eXBlOiAnc3RyaW5nJywgYWxpYXM6IFsncHJpbnRJZ25vcmVUeXBlcycsICdwcmludC1pZ25vcmUtdHlwZXMnXSB9LFxuICAgICAgICBWSVNJT05fUFJJTlRfU0lNUExJRllfRU5USVRJRVNfSlNPTl9BUlJBWToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGFsaWFzOiBbJ3ByaW50U2ltcGxpZnlFbnRpdGllcycsICdwcmludC1zaW1wbGlmeS1lbnRpdGllcyddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBuZXcgRW52aXJvbm1lbnRMb2NhdGlvbigpLFxuICBdLFxufSlcbmRvdGVudi5jb25maWcoeyBwYXRoOiAnLi8udmlzaW9uJyB9KVxuXG5leHBvcnQgY29uc3QgY29uZmlnID0gY2FjaGVVdGlsLnNpbmdsZXRvbigoKSA9PlxuICBPYmplY3QuZnJlZXplKHtcbiAgICBlbnY6IGVudignTk9ERV9FTlYnKS5zdHJpbmcuZGVmYXVsdCgncHJvZCcpLnJlcXVpcmVkLFxuICAgIGxvZ0xldmVsOiBlbnYoJ0xPR19MRVZFTCcpLnN0cmluZy5kZWZhdWx0KCdpbmZvJykucmVxdWlyZWQgYXMgJ2Vycm9yJyB8ICd3YXJuJyB8ICdpbmZvJyB8ICdkZWJ1ZycsXG4gICAgdmlzaW9uOiB7XG4gICAgICBpZ25vcmVHbG9iUGF0aHM6IGVudignVklTSU9OX0lHTk9SRV9HTE9CX1BBVEhTJylcbiAgICAgICAgLmpzb248c3RyaW5nW10+KClcbiAgICAgICAgLmRlZmF1bHQoWycqKi8qLnRlc3QudHMnLCAnKiovKi5jb250cmFjdC50cycsICcqKi9fX21vY2tzX18vKiovKiddKS5yZXF1aXJlZCxcbiAgICAgIGFwcGxpY2F0aW9uTmFtZTogZW52KCdWSVNJT05fQVBQTElDQVRJT05fTkFNRScpLnN0cmluZy5kZWZhdWx0KCcnKS5yZXF1aXJlZCxcbiAgICAgIHByb2plY3RSb290UGF0aDogZW52KCdWSVNJT05fUFJPSkVDVF9ST09UX1BBVEgnKS5zdHJpbmcuZGVmYXVsdChwcm9jZXNzLmN3ZCgpKS5yZXF1aXJlZCxcbiAgICAgIHByb2plY3RTcmNGb2xkZXJQYXRoOiBlbnYoJ1ZJU0lPTl9QUk9KRUNUX1NSQ19GT0xERVJfUEFUSCcpLnN0cmluZy5kZWZhdWx0KCcuL3NyYycpLnJlcXVpcmVkLFxuICAgICAgZXhwb3J0RmlsZVBhdGg6IGVudignVklTSU9OX0VYUE9SVF9GSUxFX1BBVEgnKS5zdHJpbmcuZGVmYXVsdChgJHtwcm9jZXNzLmN3ZCgpfS9gKS5yZXF1aXJlZCxcbiAgICAgIGV4cG9ydEZpbGVOYW1lOiBlbnYoJ1ZJU0lPTl9FWFBPUlRfRklMRV9OQU1FJykuc3RyaW5nLmRlZmF1bHQoJ3Zpc2lvbicpLnJlcXVpcmVkLFxuICAgICAgdHM6IHtcbiAgICAgICAgdHNjb25maWdQYXRoOiBlbnYoJ1ZJU0lPTl9UU19UU0NPTkZJR19QQVRIJykuc3RyaW5nLmRlZmF1bHQoYCR7cHJvY2Vzcy5jd2QoKX0vdHNjb25maWcuanNvbmApLnJlcXVpcmVkLFxuICAgICAgfSxcbiAgICAgIHByaW50OiB7XG4gICAgICAgIGlnbm9yZVBhdGhzOiBlbnYoJ1ZJU0lPTl9QUklOVF9JR05PUkVfUEFUSFNfSlNPTl9BUlJBWScpLmpzb248c3RyaW5nW10+KCkuZGVmYXVsdChbXSkucmVxdWlyZWQsXG4gICAgICAgIGlnbm9yZUV4dGVybmFsOiBlbnYoJ1ZJU0lPTl9QUklOVF9JR05PUkVfRVhURVJOQUwnKS5ib29sZWFuLmRlZmF1bHQoZmFsc2UpLnJlcXVpcmVkLFxuICAgICAgICBpZ25vcmVUeXBlczogZW52KCdWSVNJT05fUFJJTlRfSUdOT1JFX1RZUEVTJykuYm9vbGVhbi5kZWZhdWx0KGZhbHNlKS5yZXF1aXJlZCxcbiAgICAgICAgc2ltcGxpZnlFbnRpdGllczogZW52KCdWSVNJT05fUFJJTlRfU0lNUExJRllfRU5USVRJRVNfSlNPTl9BUlJBWScpLmpzb248W3N0cmluZywgc3RyaW5nXVtdPigpLmRlZmF1bHQoW10pLnJlcXVpcmVkLFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxuKVxuIl19