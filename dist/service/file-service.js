"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
exports.fileService = {
    fileListFromFolder: async ({ folderPath }) => {
        return new Promise((resolve, reject) => {
            glob_1.default('**/*', { cwd: folderPath, dot: true, nodir: true, ignore: '*.test.ts' }, (err, files) => {
                if (err)
                    return reject(err);
                return resolve(files);
            });
        });
    },
    makeFolderIfNotExist: async ({ folderPath }) => {
        if (await fs_1.promises.stat(folderPath).catch(() => false))
            return;
        await fs_1.promises.mkdir(folderPath);
    },
    writeToFile: async ({ filePath, data }) => {
        await fs_1.promises.writeFile(filePath, data, 'utf-8');
    },
    mkdirAndWriteToFile: async ({ folderPath, fileName, data, }) => {
        await exports.fileService.makeFolderIfNotExist({ folderPath });
        await exports.fileService.writeToFile({ filePath: exports.fileService.joinPaths(folderPath, fileName), data });
    },
    joinPaths: (...paths) => {
        return path_1.default.join(...paths);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIsZ0RBQXVCO0FBRVYsUUFBQSxXQUFXLEdBQUc7SUFDekIsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEwQixFQUFxQixFQUFFO1FBQ3RGLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsY0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDNUYsSUFBSSxHQUFHO29CQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMzQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELG9CQUFvQixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMEIsRUFBaUIsRUFBRTtRQUNwRixJQUFJLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUN4RCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFzQyxFQUFpQixFQUFFO1FBQzNGLE1BQU0sYUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFDRCxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsRUFDMUIsVUFBVSxFQUNWLFFBQVEsRUFDUixJQUFJLEdBS0wsRUFBaUIsRUFBRTtRQUNsQixNQUFNLG1CQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sbUJBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsbUJBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUNELFNBQVMsRUFBRSxDQUFDLEdBQUcsS0FBZSxFQUFVLEVBQUU7UUFDeEMsT0FBTyxjQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUE7SUFDNUIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBjb25zdCBmaWxlU2VydmljZSA9IHtcbiAgZmlsZUxpc3RGcm9tRm9sZGVyOiBhc3luYyAoeyBmb2xkZXJQYXRoIH06IHsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBQcm9taXNlPHN0cmluZ1tdPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZ1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2Q6IGZvbGRlclBhdGgsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogJyoudGVzdC50cycgfSwgKGVyciwgZmlsZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgIHJldHVybiByZXNvbHZlKGZpbGVzKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBtYWtlRm9sZGVySWZOb3RFeGlzdDogYXN5bmMgKHsgZm9sZGVyUGF0aCB9OiB7IGZvbGRlclBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGF3YWl0IGZzLnN0YXQoZm9sZGVyUGF0aCkuY2F0Y2goKCkgPT4gZmFsc2UpKSByZXR1cm5cbiAgICBhd2FpdCBmcy5ta2Rpcihmb2xkZXJQYXRoKVxuICB9LFxuICB3cml0ZVRvRmlsZTogYXN5bmMgKHsgZmlsZVBhdGgsIGRhdGEgfTogeyBmaWxlUGF0aDogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShmaWxlUGF0aCwgZGF0YSwgJ3V0Zi04JylcbiAgfSxcbiAgbWtkaXJBbmRXcml0ZVRvRmlsZTogYXN5bmMgKHtcbiAgICBmb2xkZXJQYXRoLFxuICAgIGZpbGVOYW1lLFxuICAgIGRhdGEsXG4gIH06IHtcbiAgICBmb2xkZXJQYXRoOiBzdHJpbmdcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4gICAgZGF0YTogc3RyaW5nXG4gIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5tYWtlRm9sZGVySWZOb3RFeGlzdCh7IGZvbGRlclBhdGggfSlcbiAgICBhd2FpdCBmaWxlU2VydmljZS53cml0ZVRvRmlsZSh7IGZpbGVQYXRoOiBmaWxlU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZmlsZU5hbWUpLCBkYXRhIH0pXG4gIH0sXG4gIGpvaW5QYXRoczogKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHBhdGguam9pbiguLi5wYXRocylcbiAgfSxcbn1cbiJdfQ==