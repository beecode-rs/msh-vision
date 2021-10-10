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
            const cwd = exports.fileService.relativeToAbsPath(folderPath);
            glob_1.default('**/*', { cwd, dot: true, nodir: true, ignore: '*.test.ts' }, (err, files) => {
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
    isAbsPath: (relativeOrAbsPath) => {
        return relativeOrAbsPath.startsWith('/');
    },
    relativeToAbsPath: (relativeOrAbsPath) => {
        return exports.fileService.isAbsPath(relativeOrAbsPath) ? relativeOrAbsPath : exports.fileService.joinPaths(process.cwd(), relativeOrAbsPath);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIsZ0RBQXVCO0FBRVYsUUFBQSxXQUFXLEdBQUc7SUFDekIsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEwQixFQUFxQixFQUFFO1FBQ3RGLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNyRCxjQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hGLElBQUksR0FBRztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTBCLEVBQWlCLEVBQUU7UUFDcEYsSUFBSSxNQUFNLGFBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDeEQsTUFBTSxhQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBc0MsRUFBaUIsRUFBRTtRQUMzRixNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQzFCLFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxHQUtMLEVBQWlCLEVBQUU7UUFDbEIsTUFBTSxtQkFBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUN0RCxNQUFNLG1CQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQWUsRUFBVSxFQUFFO1FBQ3hDLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBeUIsRUFBVyxFQUFFO1FBQ2hELE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxDQUFDLGlCQUF5QixFQUFVLEVBQUU7UUFDdkQsT0FBTyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDL0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9taXNlcyBhcyBmcyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBjb25zdCBmaWxlU2VydmljZSA9IHtcbiAgZmlsZUxpc3RGcm9tRm9sZGVyOiBhc3luYyAoeyBmb2xkZXJQYXRoIH06IHsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBQcm9taXNlPHN0cmluZ1tdPiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZ1tdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjd2QgPSBmaWxlU2VydmljZS5yZWxhdGl2ZVRvQWJzUGF0aChmb2xkZXJQYXRoKVxuICAgICAgZ2xvYignKiovKicsIHsgY3dkLCBkb3Q6IHRydWUsIG5vZGlyOiB0cnVlLCBpZ25vcmU6ICcqLnRlc3QudHMnIH0sIChlcnIsIGZpbGVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKVxuICAgICAgICByZXR1cm4gcmVzb2x2ZShmaWxlcylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgbWFrZUZvbGRlcklmTm90RXhpc3Q6IGFzeW5jICh7IGZvbGRlclBhdGggfTogeyBmb2xkZXJQYXRoOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChhd2FpdCBmcy5zdGF0KGZvbGRlclBhdGgpLmNhdGNoKCgpID0+IGZhbHNlKSkgcmV0dXJuXG4gICAgYXdhaXQgZnMubWtkaXIoZm9sZGVyUGF0aClcbiAgfSxcbiAgd3JpdGVUb0ZpbGU6IGFzeW5jICh7IGZpbGVQYXRoLCBkYXRhIH06IHsgZmlsZVBhdGg6IHN0cmluZzsgZGF0YTogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoZmlsZVBhdGgsIGRhdGEsICd1dGYtOCcpXG4gIH0sXG4gIG1rZGlyQW5kV3JpdGVUb0ZpbGU6IGFzeW5jICh7XG4gICAgZm9sZGVyUGF0aCxcbiAgICBmaWxlTmFtZSxcbiAgICBkYXRhLFxuICB9OiB7XG4gICAgZm9sZGVyUGF0aDogc3RyaW5nXG4gICAgZmlsZU5hbWU6IHN0cmluZ1xuICAgIGRhdGE6IHN0cmluZ1xuICB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgZmlsZVNlcnZpY2UubWFrZUZvbGRlcklmTm90RXhpc3QoeyBmb2xkZXJQYXRoIH0pXG4gICAgYXdhaXQgZmlsZVNlcnZpY2Uud3JpdGVUb0ZpbGUoeyBmaWxlUGF0aDogZmlsZVNlcnZpY2Uuam9pblBhdGhzKGZvbGRlclBhdGgsIGZpbGVOYW1lKSwgZGF0YSB9KVxuICB9LFxuICBqb2luUGF0aHM6ICguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oLi4ucGF0aHMpXG4gIH0sXG4gIGlzQWJzUGF0aDogKHJlbGF0aXZlT3JBYnNQYXRoOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gcmVsYXRpdmVPckFic1BhdGguc3RhcnRzV2l0aCgnLycpXG4gIH0sXG4gIHJlbGF0aXZlVG9BYnNQYXRoOiAocmVsYXRpdmVPckFic1BhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGZpbGVTZXJ2aWNlLmlzQWJzUGF0aChyZWxhdGl2ZU9yQWJzUGF0aCkgPyByZWxhdGl2ZU9yQWJzUGF0aCA6IGZpbGVTZXJ2aWNlLmpvaW5QYXRocyhwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZU9yQWJzUGF0aClcbiAgfSxcbn1cbiJdfQ==