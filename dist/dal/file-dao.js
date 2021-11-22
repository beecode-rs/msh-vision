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
    fileListFromFolder: async (folderPath) => {
        return new Promise((resolve, reject) => {
            const cwd = file_path_service_1.filePathService.relativeToAbsPath(file_path_service_1.filePathService.joinPaths((0, config_1.config)().vision.projectRootPath, folderPath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGFsL2ZpbGUtZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIscUVBQStEO0FBQy9ELDRDQUF3QztBQUV4QyxNQUFNLEtBQUssR0FBRztJQUNaLGtCQUFrQixFQUFFLEtBQUssRUFBRSxVQUFrQixFQUFxQixFQUFFO1FBQ2xFLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxJQUFBLGVBQU0sR0FBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtZQUNySCxJQUFBLGNBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFBLGVBQU0sR0FBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDcEcsZ0RBQWdEO2dCQUNoRCxJQUFJLEdBQUc7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1DQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUUsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsVUFBa0IsRUFBaUIsRUFBRTtRQUNoRSxJQUFJLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUN4RCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBMEMsRUFBaUIsRUFBRTtRQUMvRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNqQyxNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFnQixFQUFtQixFQUFFO1FBQ3BELE9BQU8sYUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNELG1CQUFtQixFQUFFLEtBQUssRUFBRSxNQUE4RCxFQUFpQixFQUFFO1FBQzNHLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3QyxNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsbUNBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDOUYsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB7IGZpbGVQYXRoU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtcGF0aC1zZXJ2aWNlJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnc3JjL3V0aWwvY29uZmlnJ1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZmlsZUxpc3RGcm9tRm9sZGVyOiBhc3luYyAoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmdbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3dkID0gZmlsZVBhdGhTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHMoY29uZmlnKCkudmlzaW9uLnByb2plY3RSb290UGF0aCwgZm9sZGVyUGF0aCkpXG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2QsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogY29uZmlnKCkudmlzaW9uLmlnbm9yZUdsb2JQYXRocyB9LCAoZXJyLCBmaWxlcykgPT4ge1xuICAgICAgICAvLyBUT0RPIGltcGxlbWVudCBzb21lIG1lY2hhbmlzbSB0byBpZ25vcmUgZmlsZXNcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgIHJldHVybiByZXNvbHZlKGZpbGVzLm1hcCgoZikgPT4gZmlsZVBhdGhTZXJ2aWNlLmpvaW5QYXRocyhmb2xkZXJQYXRoLCBmKSkpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIG1ha2VGb2xkZXJJZk5vdEV4aXN0OiBhc3luYyAoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGF3YWl0IGZzLnN0YXQoZm9sZGVyUGF0aCkuY2F0Y2goKCkgPT4gZmFsc2UpKSByZXR1cm5cbiAgICBhd2FpdCBmcy5ta2Rpcihmb2xkZXJQYXRoKVxuICB9LFxuICB3cml0ZVRvRmlsZTogYXN5bmMgKHBhcmFtczogeyBmaWxlUGF0aDogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHsgZmlsZVBhdGgsIGRhdGEgfSA9IHBhcmFtc1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShmaWxlUGF0aCwgZGF0YSwgJ3V0Zi04JylcbiAgfSxcbiAgcmVhZEZpbGU6IGFzeW5jIChmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICByZXR1cm4gZnMucmVhZEZpbGUoZmlsZVBhdGgsICd1dGY4JylcbiAgfSxcbiAgbWtkaXJBbmRXcml0ZVRvRmlsZTogYXN5bmMgKHBhcmFtczogeyBmb2xkZXJQYXRoOiBzdHJpbmc7IGZpbGVOYW1lOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBmb2xkZXJQYXRoLCBmaWxlTmFtZSwgZGF0YSB9ID0gcGFyYW1zXG4gICAgYXdhaXQgX3NlbGYubWFrZUZvbGRlcklmTm90RXhpc3QoZm9sZGVyUGF0aClcbiAgICBhd2FpdCBfc2VsZi53cml0ZVRvRmlsZSh7IGZpbGVQYXRoOiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKGZvbGRlclBhdGgsIGZpbGVOYW1lKSwgZGF0YSB9KVxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgZmlsZURhbyA9IF9zZWxmXG4iXX0=