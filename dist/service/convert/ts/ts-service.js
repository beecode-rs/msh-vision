"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsService = void 0;
const mz_1 = require("mz");
const file_service_1 = require("src/service/file-service");
const typescript_1 = __importDefault(require("typescript"));
// https://allenhwkim.medium.com/how-to-parse-typescript-from-source-643387971f4e
// https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgYQuCA7Aph+BfOAMyjTgHIABAQwwHMBXAGyqgHoBjaLMgbgCgKqdNlwAKBHzhwAzlkZZ2MaAC5yIAJ5kANJLgws4ZvtVkAFnMYQ4ILADoyfPAEo+WAB6RYcds2nS4ALLqQpAi8BJ4QA
exports.tsService = {
    parseFile: async (filePath) => {
        const fileSource = await mz_1.fs.readFile(filePath, 'utf8');
        return typescript_1.default.createSourceFile(file_service_1.fileService.fileNameFromPath(filePath), fileSource, typescript_1.default.ScriptTarget.Latest);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBdUI7QUFDdkIsMkRBQXNEO0FBQ3RELDREQUEyQjtBQUUzQixpRkFBaUY7QUFDakYsOExBQThMO0FBQ2pMLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBMEIsRUFBRTtRQUM1RCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RELE9BQU8sb0JBQUUsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxvQkFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZzIH0gZnJvbSAnbXonXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB0cyBmcm9tICd0eXBlc2NyaXB0J1xuXG4vLyBodHRwczovL2FsbGVuaHdraW0ubWVkaXVtLmNvbS9ob3ctdG8tcGFyc2UtdHlwZXNjcmlwdC1mcm9tLXNvdXJjZS02NDMzODc5NzFmNGVcbi8vIGh0dHBzOi8vdHMtYXN0LXZpZXdlci5jb20vI2NvZGUvSllXd0RnOWdUZ0xnQkFiemdZUXVDQTdBcGgrQmZPQU15alRnSElBQkFRd3dITUJYQUd5cWdIb0JqYUxNZ2JnQ2dLcWRObHdBS0JIemh3QXpsa1paMk1hQUM1eUlBSjVrQU5KTGd3czRadnRWa0FGbk1ZUTRJTEFEb3lmUEFFbytXQUI2UlljZHMyblM0QUxMcVFwQWk4Qko0UUFcbmV4cG9ydCBjb25zdCB0c1NlcnZpY2UgPSB7XG4gIHBhcnNlRmlsZTogYXN5bmMgKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHRzLlNvdXJjZUZpbGU+ID0+IHtcbiAgICBjb25zdCBmaWxlU291cmNlID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsICd1dGY4JylcbiAgICByZXR1cm4gdHMuY3JlYXRlU291cmNlRmlsZShmaWxlU2VydmljZS5maWxlTmFtZUZyb21QYXRoKGZpbGVQYXRoKSwgZmlsZVNvdXJjZSwgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdClcbiAgfSxcbn1cbiJdfQ==