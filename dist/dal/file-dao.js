"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDao = void 0;
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const file_path_service_1 = require("src/service/file-path-service");
const config_1 = require("src/util/config");
const _self = {
    fileListFromFolder: async (params) => {
        const { rootFolder, folderPath } = params;
        return new Promise((resolve, reject) => {
            const cwd = file_path_service_1.filePathService.relativeToAbsPath(file_path_service_1.filePathService.joinPaths(rootFolder, folderPath));
            (0, glob_1.default)('**/*', { cwd, dot: true, nodir: true, ignore: (0, config_1.config)().vision.ignoreGlobPaths }, (err, files) => {
                // TODO implement some mechanism to ignore files
                if (err)
                    return reject(err);
                return resolve(files.map((f) => file_path_service_1.filePathService.joinPaths(folderPath, f)));
            });
        });
    },
    makeFolderIfNotExist: async (folderPath) => {
        if (await fs_1.promises.stat(folderPath).catch(() => false))
            return;
        await fs_1.promises.mkdir(folderPath);
    },
    writeToFile: async (params) => {
        const { filePath, data } = params;
        await fs_1.promises.writeFile(filePath, data, 'utf-8');
    },
    readFile: async (filePath) => {
        return fs_1.promises.readFile(filePath, 'utf8');
    },
    mkdirAndWriteToFile: async (params) => {
        const { folderPath, fileName, data } = params;
        await _self.makeFolderIfNotExist(folderPath);
        await _self.writeToFile({ filePath: file_path_service_1.filePathService.joinPaths(folderPath, fileName), data });
    },
};
exports.fileDao = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGFsL2ZpbGUtZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIscUVBQStEO0FBQy9ELDRDQUF3QztBQUV4QyxNQUFNLEtBQUssR0FBRztJQUNaLGtCQUFrQixFQUFFLEtBQUssRUFBRSxNQUFrRCxFQUFxQixFQUFFO1FBQ2xHLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtZQUNoRyxJQUFBLGNBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFBLGVBQU0sR0FBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDcEcsZ0RBQWdEO2dCQUNoRCxJQUFJLEdBQUc7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1DQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUUsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsVUFBa0IsRUFBaUIsRUFBRTtRQUNoRSxJQUFJLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUN4RCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBMEMsRUFBaUIsRUFBRTtRQUMvRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNqQyxNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFnQixFQUFtQixFQUFFO1FBQ3BELE9BQU8sYUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNELG1CQUFtQixFQUFFLEtBQUssRUFBRSxNQUE4RCxFQUFpQixFQUFFO1FBQzNHLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3QyxNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsbUNBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDOUYsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB7IGZpbGVQYXRoU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtcGF0aC1zZXJ2aWNlJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnc3JjL3V0aWwvY29uZmlnJ1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZmlsZUxpc3RGcm9tRm9sZGVyOiBhc3luYyAocGFyYW1zOiB7IHJvb3RGb2xkZXI6IHN0cmluZzsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBQcm9taXNlPHN0cmluZ1tdPiA9PiB7XG4gICAgY29uc3QgeyByb290Rm9sZGVyLCBmb2xkZXJQYXRoIH0gPSBwYXJhbXNcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGN3ZCA9IGZpbGVQYXRoU2VydmljZS5yZWxhdGl2ZVRvQWJzUGF0aChmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKHJvb3RGb2xkZXIsIGZvbGRlclBhdGgpKVxuICAgICAgZ2xvYignKiovKicsIHsgY3dkLCBkb3Q6IHRydWUsIG5vZGlyOiB0cnVlLCBpZ25vcmU6IGNvbmZpZygpLnZpc2lvbi5pZ25vcmVHbG9iUGF0aHMgfSwgKGVyciwgZmlsZXMpID0+IHtcbiAgICAgICAgLy8gVE9ETyBpbXBsZW1lbnQgc29tZSBtZWNoYW5pc20gdG8gaWdub3JlIGZpbGVzXG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlcy5tYXAoKGYpID0+IGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZikpKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBtYWtlRm9sZGVySWZOb3RFeGlzdDogYXN5bmMgKGZvbGRlclBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChhd2FpdCBmcy5zdGF0KGZvbGRlclBhdGgpLmNhdGNoKCgpID0+IGZhbHNlKSkgcmV0dXJuXG4gICAgYXdhaXQgZnMubWtkaXIoZm9sZGVyUGF0aClcbiAgfSxcbiAgd3JpdGVUb0ZpbGU6IGFzeW5jIChwYXJhbXM6IHsgZmlsZVBhdGg6IHN0cmluZzsgZGF0YTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGZpbGVQYXRoLCBkYXRhIH0gPSBwYXJhbXNcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoZmlsZVBhdGgsIGRhdGEsICd1dGYtOCcpXG4gIH0sXG4gIHJlYWRGaWxlOiBhc3luYyAoZmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgcmV0dXJuIGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmOCcpXG4gIH0sXG4gIG1rZGlyQW5kV3JpdGVUb0ZpbGU6IGFzeW5jIChwYXJhbXM6IHsgZm9sZGVyUGF0aDogc3RyaW5nOyBmaWxlTmFtZTogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgZm9sZGVyUGF0aCwgZmlsZU5hbWUsIGRhdGEgfSA9IHBhcmFtc1xuICAgIGF3YWl0IF9zZWxmLm1ha2VGb2xkZXJJZk5vdEV4aXN0KGZvbGRlclBhdGgpXG4gICAgYXdhaXQgX3NlbGYud3JpdGVUb0ZpbGUoeyBmaWxlUGF0aDogZmlsZVBhdGhTZXJ2aWNlLmpvaW5QYXRocyhmb2xkZXJQYXRoLCBmaWxlTmFtZSksIGRhdGEgfSlcbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVEYW8gPSBfc2VsZlxuIl19