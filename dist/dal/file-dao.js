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
            const cwd = file_path_service_1.filePathService.relativeToAbsPath(file_path_service_1.filePathService.joinPaths((0, config_1.visionConfig)().projectRootPath, folderPath));
            // const cwd = filePathService.relativeToAbsPath(folderPath)
            (0, glob_1.default)('**/*', { cwd, dot: true, nodir: true, ignore: ['**/*.test.ts', '**/*.contract.ts'] }, (err, files) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGFsL2ZpbGUtZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIscUVBQStEO0FBQy9ELDRDQUE4QztBQUU5QyxNQUFNLEtBQUssR0FBRztJQUNaLGtCQUFrQixFQUFFLEtBQUssRUFBRSxVQUFrQixFQUFxQixFQUFFO1FBQ2xFLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtZQUNwSCw0REFBNEQ7WUFDNUQsSUFBQSxjQUFJLEVBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6RyxnREFBZ0Q7Z0JBQ2hELElBQUksR0FBRztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsbUNBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1RSxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELG9CQUFvQixFQUFFLEtBQUssRUFBRSxVQUFrQixFQUFpQixFQUFFO1FBQ2hFLElBQUksTUFBTSxhQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQ3hELE1BQU0sYUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUEwQyxFQUFpQixFQUFFO1FBQy9FLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ2pDLE1BQU0sYUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzdDLENBQUM7SUFDRCxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQWdCLEVBQW1CLEVBQUU7UUFDcEQsT0FBTyxhQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBQ0QsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLE1BQThELEVBQWlCLEVBQUU7UUFDM0csTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzdDLE1BQU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzVDLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUM5RixDQUFDO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsT0FBTyxHQUFHLEtBQUssQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb21pc2VzIGFzIGZzIH0gZnJvbSAnZnMnXG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJ1xuaW1wb3J0IHsgZmlsZVBhdGhTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1wYXRoLXNlcnZpY2UnXG5pbXBvcnQgeyB2aXNpb25Db25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbmNvbnN0IF9zZWxmID0ge1xuICBmaWxlTGlzdEZyb21Gb2xkZXI6IGFzeW5jIChmb2xkZXJQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZ1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjd2QgPSBmaWxlUGF0aFNlcnZpY2UucmVsYXRpdmVUb0Fic1BhdGgoZmlsZVBhdGhTZXJ2aWNlLmpvaW5QYXRocyh2aXNpb25Db25maWcoKS5wcm9qZWN0Um9vdFBhdGgsIGZvbGRlclBhdGgpKVxuICAgICAgLy8gY29uc3QgY3dkID0gZmlsZVBhdGhTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKGZvbGRlclBhdGgpXG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2QsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogWycqKi8qLnRlc3QudHMnLCAnKiovKi5jb250cmFjdC50cyddIH0sIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gaW1wbGVtZW50IHNvbWUgbWVjaGFuaXNtIHRvIGlnbm9yZSBmaWxlc1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZXMubWFwKChmKSA9PiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKGZvbGRlclBhdGgsIGYpKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgbWFrZUZvbGRlcklmTm90RXhpc3Q6IGFzeW5jIChmb2xkZXJQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoYXdhaXQgZnMuc3RhdChmb2xkZXJQYXRoKS5jYXRjaCgoKSA9PiBmYWxzZSkpIHJldHVyblxuICAgIGF3YWl0IGZzLm1rZGlyKGZvbGRlclBhdGgpXG4gIH0sXG4gIHdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZpbGVQYXRoOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBmaWxlUGF0aCwgZGF0YSB9ID0gcGFyYW1zXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBkYXRhLCAndXRmLTgnKVxuICB9LFxuICByZWFkRmlsZTogYXN5bmMgKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxuICB9LFxuICBta2RpckFuZFdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZvbGRlclBhdGg6IHN0cmluZzsgZmlsZU5hbWU6IHN0cmluZzsgZGF0YTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGZvbGRlclBhdGgsIGZpbGVOYW1lLCBkYXRhIH0gPSBwYXJhbXNcbiAgICBhd2FpdCBfc2VsZi5tYWtlRm9sZGVySWZOb3RFeGlzdChmb2xkZXJQYXRoKVxuICAgIGF3YWl0IF9zZWxmLndyaXRlVG9GaWxlKHsgZmlsZVBhdGg6IGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZmlsZU5hbWUpLCBkYXRhIH0pXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBmaWxlRGFvID0gX3NlbGZcbiJdfQ==