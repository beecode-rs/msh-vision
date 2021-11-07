"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserService = void 0;
const parser_ts_1 = require("src/service/parser-ts/parser-ts");
const logger_1 = require("src/util/logger");
exports.parserService = {
    strategyByFile: (params) => {
        const { filePath, folderPath } = params;
        if (filePath.endsWith('.ts'))
            return new parser_ts_1.ParserTs({ filePath, folderPath });
        logger_1.logger.debug(`Strategy not found for filePath: ${filePath}`);
        return undefined;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9wYXJzZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrREFBMEQ7QUFDMUQsNENBQXdDO0FBTTNCLFFBQUEsYUFBYSxHQUFHO0lBQzNCLGNBQWMsRUFBRSxDQUFDLE1BQWdELEVBQStCLEVBQUU7UUFDaEcsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDdkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sSUFBSSxvQkFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFFM0UsZUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM1RCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQYXJzZXJUcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL3BhcnNlci10cy9wYXJzZXItdHMnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVydFN0cmF0ZWd5IHtcbiAgY29udmVydCgpOiBQcm9taXNlPEVudGl0eVtdPlxufVxuXG5leHBvcnQgY29uc3QgcGFyc2VyU2VydmljZSA9IHtcbiAgc3RyYXRlZ3lCeUZpbGU6IChwYXJhbXM6IHsgZmlsZVBhdGg6IHN0cmluZzsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBDb252ZXJ0U3RyYXRlZ3kgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IHsgZmlsZVBhdGgsIGZvbGRlclBhdGggfSA9IHBhcmFtc1xuICAgIGlmIChmaWxlUGF0aC5lbmRzV2l0aCgnLnRzJykpIHJldHVybiBuZXcgUGFyc2VyVHMoeyBmaWxlUGF0aCwgZm9sZGVyUGF0aCB9KVxuXG4gICAgbG9nZ2VyLmRlYnVnKGBTdHJhdGVneSBub3QgZm91bmQgZm9yIGZpbGVQYXRoOiAke2ZpbGVQYXRofWApXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9LFxufVxuIl19