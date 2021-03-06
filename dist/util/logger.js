"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const msh_node_log_1 = require("@beecode/msh-node-log");
const simple_console_log_1 = require("@beecode/msh-node-log/lib/console-log-strategy/simple-console-log");
const console_logger_1 = require("@beecode/msh-node-log/lib/console-logger");
const cache_util_1 = require("@beecode/msh-node-util/lib/cache-util");
const config_1 = require("src/util/config");
exports.logger = cache_util_1.cacheUtil.singleton(() => new console_logger_1.ConsoleLogger({
    logLevel: msh_node_log_1.LogLevelType[(0, config_1.config)().logLevel.toUpperCase()] ?? msh_node_log_1.LogLevelType.INFO,
    consoleLogStrategy: new simple_console_log_1.SimpleConsoleLog(),
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUFvRDtBQUNwRCwwR0FBb0c7QUFDcEcsNkVBQXdFO0FBQ3hFLHNFQUFpRTtBQUNqRSw0Q0FBd0M7QUFFM0IsUUFBQSxNQUFNLEdBQUcsc0JBQVMsQ0FBQyxTQUFTLENBQ3ZDLEdBQUcsRUFBRSxDQUNILElBQUksOEJBQWEsQ0FBQztJQUNoQixRQUFRLEVBQUUsMkJBQVksQ0FBQyxJQUFBLGVBQU0sR0FBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLDJCQUFZLENBQUMsSUFBSTtJQUM1RSxrQkFBa0IsRUFBRSxJQUFJLHFDQUFnQixFQUFFO0NBQzNDLENBQUMsQ0FDTCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnQGJlZWNvZGUvbXNoLW5vZGUtbG9nJ1xuaW1wb3J0IHsgU2ltcGxlQ29uc29sZUxvZyB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWxvZy9saWIvY29uc29sZS1sb2ctc3RyYXRlZ3kvc2ltcGxlLWNvbnNvbGUtbG9nJ1xuaW1wb3J0IHsgQ29uc29sZUxvZ2dlciB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLWxvZy9saWIvY29uc29sZS1sb2dnZXInXG5pbXBvcnQgeyBjYWNoZVV0aWwgfSBmcm9tICdAYmVlY29kZS9tc2gtbm9kZS11dGlsL2xpYi9jYWNoZS11dGlsJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnc3JjL3V0aWwvY29uZmlnJ1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gY2FjaGVVdGlsLnNpbmdsZXRvbihcbiAgKCkgPT5cbiAgICBuZXcgQ29uc29sZUxvZ2dlcih7XG4gICAgICBsb2dMZXZlbDogTG9nTGV2ZWxUeXBlW2NvbmZpZygpLmxvZ0xldmVsLnRvVXBwZXJDYXNlKCldID8/IExvZ0xldmVsVHlwZS5JTkZPLFxuICAgICAgY29uc29sZUxvZ1N0cmF0ZWd5OiBuZXcgU2ltcGxlQ29uc29sZUxvZygpLFxuICAgIH0pXG4pXG4iXX0=