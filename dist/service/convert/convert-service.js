"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertService = void 0;
const ts_convert_1 = require("src/service/convert/ts/ts-convert");
const logger_1 = require("src/util/logger");
exports.convertService = {
    strategyByFile: (params) => {
        const { filePath, folderPath } = params;
        if (filePath.endsWith('.ts'))
            return new ts_convert_1.TsConvert({ filePath, folderPath });
        logger_1.logger.debug(`Strategy not found for filePath: ${filePath}`);
        return undefined;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvY29udmVydC9jb252ZXJ0LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0VBQTZEO0FBQzdELDRDQUF3QztBQUUzQixRQUFBLGNBQWMsR0FBRztJQUM1QixjQUFjLEVBQUUsQ0FBQyxNQUFnRCxFQUErQixFQUFFO1FBQ2hHLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3ZDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLElBQUksc0JBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBRTVFLGVBQU0sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDNUQsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb252ZXJ0U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L2NvbnZlcnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBUc0NvbnZlcnQgfSBmcm9tICdzcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLWNvbnZlcnQnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjb25zdCBjb252ZXJ0U2VydmljZSA9IHtcbiAgc3RyYXRlZ3lCeUZpbGU6IChwYXJhbXM6IHsgZmlsZVBhdGg6IHN0cmluZzsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBDb252ZXJ0U3RyYXRlZ3kgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IHsgZmlsZVBhdGgsIGZvbGRlclBhdGggfSA9IHBhcmFtc1xuICAgIGlmIChmaWxlUGF0aC5lbmRzV2l0aCgnLnRzJykpIHJldHVybiBuZXcgVHNDb252ZXJ0KHsgZmlsZVBhdGgsIGZvbGRlclBhdGggfSlcblxuICAgIGxvZ2dlci5kZWJ1ZyhgU3RyYXRlZ3kgbm90IGZvdW5kIGZvciBmaWxlUGF0aDogJHtmaWxlUGF0aH1gKVxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfSxcbn1cbiJdfQ==