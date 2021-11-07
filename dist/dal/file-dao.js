"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDao = void 0;
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const file_path_service_1 = require("src/service/file-path-service");
const _self = {
    fileListFromFolder: async (folderPath) => {
        return new Promise((resolve, reject) => {
            const cwd = file_path_service_1.filePathService.relativeToAbsPath(folderPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGFsL2ZpbGUtZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIscUVBQStEO0FBRS9ELE1BQU0sS0FBSyxHQUFHO0lBQ1osa0JBQWtCLEVBQUUsS0FBSyxFQUFFLFVBQWtCLEVBQXFCLEVBQUU7UUFDbEUsT0FBTyxJQUFJLE9BQU8sQ0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMvQyxNQUFNLEdBQUcsR0FBRyxtQ0FBZSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3pELElBQUEsY0FBSSxFQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDekcsZ0RBQWdEO2dCQUNoRCxJQUFJLEdBQUc7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLG1DQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUUsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsVUFBa0IsRUFBaUIsRUFBRTtRQUNoRSxJQUFJLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUN4RCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBMEMsRUFBaUIsRUFBRTtRQUMvRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNqQyxNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFnQixFQUFtQixFQUFFO1FBQ3BELE9BQU8sYUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNELG1CQUFtQixFQUFFLEtBQUssRUFBRSxNQUE4RCxFQUFpQixFQUFFO1FBQzNHLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3QyxNQUFNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM1QyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsbUNBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDOUYsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCB7IGZpbGVQYXRoU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtcGF0aC1zZXJ2aWNlJ1xuXG5jb25zdCBfc2VsZiA9IHtcbiAgZmlsZUxpc3RGcm9tRm9sZGVyOiBhc3luYyAoZm9sZGVyUGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmdbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3dkID0gZmlsZVBhdGhTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKGZvbGRlclBhdGgpXG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2QsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogWycqKi8qLnRlc3QudHMnLCAnKiovKi5jb250cmFjdC50cyddIH0sIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gaW1wbGVtZW50IHNvbWUgbWVjaGFuaXNtIHRvIGlnbm9yZSBmaWxlc1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZXMubWFwKChmKSA9PiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKGZvbGRlclBhdGgsIGYpKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgbWFrZUZvbGRlcklmTm90RXhpc3Q6IGFzeW5jIChmb2xkZXJQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoYXdhaXQgZnMuc3RhdChmb2xkZXJQYXRoKS5jYXRjaCgoKSA9PiBmYWxzZSkpIHJldHVyblxuICAgIGF3YWl0IGZzLm1rZGlyKGZvbGRlclBhdGgpXG4gIH0sXG4gIHdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZpbGVQYXRoOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBmaWxlUGF0aCwgZGF0YSB9ID0gcGFyYW1zXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBkYXRhLCAndXRmLTgnKVxuICB9LFxuICByZWFkRmlsZTogYXN5bmMgKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxuICB9LFxuICBta2RpckFuZFdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZvbGRlclBhdGg6IHN0cmluZzsgZmlsZU5hbWU6IHN0cmluZzsgZGF0YTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGZvbGRlclBhdGgsIGZpbGVOYW1lLCBkYXRhIH0gPSBwYXJhbXNcbiAgICBhd2FpdCBfc2VsZi5tYWtlRm9sZGVySWZOb3RFeGlzdChmb2xkZXJQYXRoKVxuICAgIGF3YWl0IF9zZWxmLndyaXRlVG9GaWxlKHsgZmlsZVBhdGg6IGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZmlsZU5hbWUpLCBkYXRhIH0pXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBmaWxlRGFvID0gX3NlbGZcbiJdfQ==