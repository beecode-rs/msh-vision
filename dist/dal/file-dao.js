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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGFsL2ZpbGUtZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIscUVBQStEO0FBQy9ELDRDQUE4QztBQUU5QyxNQUFNLEtBQUssR0FBRztJQUNaLGtCQUFrQixFQUFFLEtBQUssRUFBRSxVQUFrQixFQUFxQixFQUFFO1FBQ2xFLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQTtZQUNwSCxJQUFBLGNBQUksRUFBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pHLGdEQUFnRDtnQkFDaEQsSUFBSSxHQUFHO29CQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMzQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxtQ0FBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVFLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLFVBQWtCLEVBQWlCLEVBQUU7UUFDaEUsSUFBSSxNQUFNLGFBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDeEQsTUFBTSxhQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQTBDLEVBQWlCLEVBQUU7UUFDL0UsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDakMsTUFBTSxhQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUNELFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBZ0IsRUFBbUIsRUFBRTtRQUNwRCxPQUFPLGFBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFDRCxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsTUFBOEQsRUFBaUIsRUFBRTtRQUMzRyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDN0MsTUFBTSxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDNUMsTUFBTSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLG1DQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlGLENBQUM7Q0FDRixDQUFBO0FBRVksUUFBQSxPQUFPLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcydcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgeyBmaWxlUGF0aFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZSdcbmltcG9ydCB7IHZpc2lvbkNvbmZpZyB9IGZyb20gJ3NyYy91dGlsL2NvbmZpZydcblxuY29uc3QgX3NlbGYgPSB7XG4gIGZpbGVMaXN0RnJvbUZvbGRlcjogYXN5bmMgKGZvbGRlclBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGN3ZCA9IGZpbGVQYXRoU2VydmljZS5yZWxhdGl2ZVRvQWJzUGF0aChmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKHZpc2lvbkNvbmZpZygpLnByb2plY3RSb290UGF0aCwgZm9sZGVyUGF0aCkpXG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2QsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogWycqKi8qLnRlc3QudHMnLCAnKiovKi5jb250cmFjdC50cyddIH0sIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gaW1wbGVtZW50IHNvbWUgbWVjaGFuaXNtIHRvIGlnbm9yZSBmaWxlc1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZXMubWFwKChmKSA9PiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKGZvbGRlclBhdGgsIGYpKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgbWFrZUZvbGRlcklmTm90RXhpc3Q6IGFzeW5jIChmb2xkZXJQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoYXdhaXQgZnMuc3RhdChmb2xkZXJQYXRoKS5jYXRjaCgoKSA9PiBmYWxzZSkpIHJldHVyblxuICAgIGF3YWl0IGZzLm1rZGlyKGZvbGRlclBhdGgpXG4gIH0sXG4gIHdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZpbGVQYXRoOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBmaWxlUGF0aCwgZGF0YSB9ID0gcGFyYW1zXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBkYXRhLCAndXRmLTgnKVxuICB9LFxuICByZWFkRmlsZTogYXN5bmMgKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIHJldHVybiBmcy5yZWFkRmlsZShmaWxlUGF0aCwgJ3V0ZjgnKVxuICB9LFxuICBta2RpckFuZFdyaXRlVG9GaWxlOiBhc3luYyAocGFyYW1zOiB7IGZvbGRlclBhdGg6IHN0cmluZzsgZmlsZU5hbWU6IHN0cmluZzsgZGF0YTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGZvbGRlclBhdGgsIGZpbGVOYW1lLCBkYXRhIH0gPSBwYXJhbXNcbiAgICBhd2FpdCBfc2VsZi5tYWtlRm9sZGVySWZOb3RFeGlzdChmb2xkZXJQYXRoKVxuICAgIGF3YWl0IF9zZWxmLndyaXRlVG9GaWxlKHsgZmlsZVBhdGg6IGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZmlsZU5hbWUpLCBkYXRhIH0pXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCBmaWxlRGFvID0gX3NlbGZcbiJdfQ==