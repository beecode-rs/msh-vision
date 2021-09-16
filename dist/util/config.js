"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const msh_node_env_1 = __importDefault(require("@beecode/msh-node-env"));
const msh_node_log_1 = require("@beecode/msh-node-log");
const simple_console_log_1 = require("@beecode/msh-node-log/lib/console-log-strategy/simple-console-log");
const console_logger_1 = require("@beecode/msh-node-log/lib/console-logger");
const dotenv_1 = __importDefault(require("dotenv"));
const env = msh_node_env_1.default({
    loggerStrategy: new console_logger_1.ConsoleLogger({ logLevel: msh_node_log_1.LogLevelType.INFO, consoleLogStrategy: new simple_console_log_1.SimpleConsoleLog() }),
});
dotenv_1.default.config();
exports.config = Object.freeze({
    env: env('NODE_ENV').string.default('dev').required,
    logLevel: env('LOG_LEVEL').string.default('error').required,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUE4QztBQUM5Qyx3REFBb0Q7QUFDcEQsMEdBQW9HO0FBQ3BHLDZFQUF3RTtBQUN4RSxvREFBMkI7QUFFM0IsTUFBTSxHQUFHLEdBQUcsc0JBQVUsQ0FBQztJQUNyQixjQUFjLEVBQUUsSUFBSSw4QkFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLDJCQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUkscUNBQWdCLEVBQUUsRUFBRSxDQUFDO0NBQy9HLENBQUMsQ0FBQTtBQUNGLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFRixRQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xDLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRO0lBQ25ELFFBQVEsRUFBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUl6QztDQUNaLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNc2hOb2RlRW52IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWVudidcbmltcG9ydCB7IExvZ0xldmVsVHlwZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWxvZydcbmltcG9ydCB7IFNpbXBsZUNvbnNvbGVMb2cgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nLXN0cmF0ZWd5L3NpbXBsZS1jb25zb2xlLWxvZydcbmltcG9ydCB7IENvbnNvbGVMb2dnZXIgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nZ2VyJ1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnXG5cbmNvbnN0IGVudiA9IE1zaE5vZGVFbnYoe1xuICBsb2dnZXJTdHJhdGVneTogbmV3IENvbnNvbGVMb2dnZXIoeyBsb2dMZXZlbDogTG9nTGV2ZWxUeXBlLklORk8sIGNvbnNvbGVMb2dTdHJhdGVneTogbmV3IFNpbXBsZUNvbnNvbGVMb2coKSB9KSxcbn0pXG5kb3RlbnYuY29uZmlnKClcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICBlbnY6IGVudignTk9ERV9FTlYnKS5zdHJpbmcuZGVmYXVsdCgnZGV2JykucmVxdWlyZWQsXG4gIGxvZ0xldmVsOiAoZW52KCdMT0dfTEVWRUwnKS5zdHJpbmcuZGVmYXVsdCgnZXJyb3InKS5yZXF1aXJlZCBhcyAnZXJyb3InIHwgJ3dhcm4nIHwgJ2luZm8nIHwgJ2RlYnVnJykgYXNcbiAgICB8ICdlcnJvcidcbiAgICB8ICd3YXJuJ1xuICAgIHwgJ2luZm8nXG4gICAgfCAnZGVidWcnLFxufSlcbiJdfQ==