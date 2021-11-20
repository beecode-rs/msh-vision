"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const msh_node_log_1 = require("@beecode/msh-node-log");
const simple_console_log_1 = require("@beecode/msh-node-log/lib/console-log-strategy/simple-console-log");
const console_logger_1 = require("@beecode/msh-node-log/lib/console-logger");
const config_1 = require("src/util/config");
exports.logger = new console_logger_1.ConsoleLogger({
    logLevel: msh_node_log_1.LogLevelType[config_1.config.logLevel.toUpperCase()] ?? msh_node_log_1.LogLevelType.INFO,
    consoleLogStrategy: new simple_console_log_1.SimpleConsoleLog(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUNwRCwwR0FBb0c7QUFDcEcsNkVBQXdFO0FBQ3hFLDRDQUF3QztBQUUzQixRQUFBLE1BQU0sR0FBRyxJQUFJLDhCQUFhLENBQUM7SUFDdEMsUUFBUSxFQUFFLDJCQUFZLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLDJCQUFZLENBQUMsSUFBSTtJQUMxRSxrQkFBa0IsRUFBRSxJQUFJLHFDQUFnQixFQUFFO0NBQzNDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ0xldmVsVHlwZSB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWxvZydcbmltcG9ydCB7IFNpbXBsZUNvbnNvbGVMb2cgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nLXN0cmF0ZWd5L3NpbXBsZS1jb25zb2xlLWxvZydcbmltcG9ydCB7IENvbnNvbGVMb2dnZXIgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS1sb2cvbGliL2NvbnNvbGUtbG9nZ2VyJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnc3JjL3V0aWwvY29uZmlnJ1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIoe1xuICBsb2dMZXZlbDogTG9nTGV2ZWxUeXBlW2NvbmZpZy5sb2dMZXZlbC50b1VwcGVyQ2FzZSgpXSA/PyBMb2dMZXZlbFR5cGUuSU5GTyxcbiAgY29uc29sZUxvZ1N0cmF0ZWd5OiBuZXcgU2ltcGxlQ29uc29sZUxvZygpLFxufSlcbiJdfQ==