"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsService = void 0;
const mz_1 = require("mz");
const ts_1 = __importDefault(require("src/module/ts"));
const file_service_1 = require("src/service/file-service");
// https://allenhwkim.medium.com/how-to-parse-typescript-from-source-643387971f4e
// https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgYQuCA7Aph+BfOAMyjTgHIABAQwwHMBXAGyqgHoBjaLMgbgCgKqdNlwAKBHzhwAzlkZZ2MaAC5yIAJ5kANJLgws4ZvtVkAFnMYQ4ILADoyfPAEo+WAB6RYcds2nS4ALLqQpAi8BJ4QA
exports.tsService = {
    parseFile: async (filePath) => {
        const fileSource = await mz_1.fs.readFile(filePath, 'utf8');
        return ts_1.default.createSourceFile(file_service_1.fileService.fileNameFromPath(filePath), fileSource, ts_1.default.ScriptTarget.ES2020); // TODO implement param for script target
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyQkFBdUI7QUFDdkIsdURBQThCO0FBQzlCLDJEQUFzRDtBQUV0RCxpRkFBaUY7QUFDakYsOExBQThMO0FBQ2pMLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBMEIsRUFBRTtRQUM1RCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RELE9BQU8sWUFBRSxDQUFDLGdCQUFnQixDQUFDLDBCQUFXLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyx5Q0FBeUM7SUFDbEosQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcyB9IGZyb20gJ216J1xuaW1wb3J0IHRzIGZyb20gJ3NyYy9tb2R1bGUvdHMnXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcblxuLy8gaHR0cHM6Ly9hbGxlbmh3a2ltLm1lZGl1bS5jb20vaG93LXRvLXBhcnNlLXR5cGVzY3JpcHQtZnJvbS1zb3VyY2UtNjQzMzg3OTcxZjRlXG4vLyBodHRwczovL3RzLWFzdC12aWV3ZXIuY29tLyNjb2RlL0pZV3dEZzlnVGdMZ0JBYnpnWVF1Q0E3QXBoK0JmT0FNeWpUZ0hJQUJBUXd3SE1CWEFHeXFnSG9CamFMTWdiZ0NnS3FkTmx3QUtCSHpod0F6bGtaWjJNYUFDNXlJQUo1a0FOSkxnd3M0WnZ0VmtBRm5NWVE0SUxBRG95ZlBBRW8rV0FCNlJZY2RzMm5TNEFMTHFRcEFpOEJKNFFBXG5leHBvcnQgY29uc3QgdHNTZXJ2aWNlID0ge1xuICBwYXJzZUZpbGU6IGFzeW5jIChmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTx0cy5Tb3VyY2VGaWxlPiA9PiB7XG4gICAgY29uc3QgZmlsZVNvdXJjZSA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmOCcpXG4gICAgcmV0dXJuIHRzLmNyZWF0ZVNvdXJjZUZpbGUoZmlsZVNlcnZpY2UuZmlsZU5hbWVGcm9tUGF0aChmaWxlUGF0aCksIGZpbGVTb3VyY2UsIHRzLlNjcmlwdFRhcmdldC5FUzIwMjApIC8vIFRPRE8gaW1wbGVtZW50IHBhcmFtIGZvciBzY3JpcHQgdGFyZ2V0XG4gIH0sXG59XG4iXX0=