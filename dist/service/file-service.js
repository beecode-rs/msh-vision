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
    removeDotSlashFromRelativePath: (relativeOrAbsPath) => {
        return relativeOrAbsPath.startsWith('./') ? relativeOrAbsPath.slice(2) : relativeOrAbsPath;
    },
    fileNameFromPath: (filePath) => {
        const parts = filePath.split('/');
        const lastPart = parts[parts.length - 1];
        const nameParts = lastPart.split('.');
        if (nameParts.length === 1)
            return nameParts[0];
        nameParts.pop();
        return nameParts.join('.');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIsZ0RBQXVCO0FBRVYsUUFBQSxXQUFXLEdBQUc7SUFDekIsa0JBQWtCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUEwQixFQUFxQixFQUFFO1FBQ3RGLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNyRCxjQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hGLElBQUksR0FBRztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0IsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTBCLEVBQWlCLEVBQUU7UUFDcEYsSUFBSSxNQUFNLGFBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDeEQsTUFBTSxhQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBc0MsRUFBaUIsRUFBRTtRQUMzRixNQUFNLGFBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0QsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQzFCLFVBQVUsRUFDVixRQUFRLEVBQ1IsSUFBSSxHQUtMLEVBQWlCLEVBQUU7UUFDbEIsTUFBTSxtQkFBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtRQUN0RCxNQUFNLG1CQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLG1CQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLEtBQWUsRUFBVSxFQUFFO1FBQ3hDLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxpQkFBeUIsRUFBVyxFQUFFO1FBQ2hELE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxDQUFDLGlCQUF5QixFQUFVLEVBQUU7UUFDdkQsT0FBTyxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsbUJBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDL0gsQ0FBQztJQUNELDhCQUE4QixFQUFFLENBQUMsaUJBQXlCLEVBQVUsRUFBRTtRQUNwRSxPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQTtJQUM1RixDQUFDO0lBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFnQixFQUFVLEVBQUU7UUFDN0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2YsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcydcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgY29uc3QgZmlsZVNlcnZpY2UgPSB7XG4gIGZpbGVMaXN0RnJvbUZvbGRlcjogYXN5bmMgKHsgZm9sZGVyUGF0aCB9OiB7IGZvbGRlclBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTxzdHJpbmdbXT4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmdbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY3dkID0gZmlsZVNlcnZpY2UucmVsYXRpdmVUb0Fic1BhdGgoZm9sZGVyUGF0aClcbiAgICAgIGdsb2IoJyoqLyonLCB7IGN3ZCwgZG90OiB0cnVlLCBub2RpcjogdHJ1ZSwgaWdub3JlOiAnKi50ZXN0LnRzJyB9LCAoZXJyLCBmaWxlcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycilcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmlsZXMpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIG1ha2VGb2xkZXJJZk5vdEV4aXN0OiBhc3luYyAoeyBmb2xkZXJQYXRoIH06IHsgZm9sZGVyUGF0aDogc3RyaW5nIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoYXdhaXQgZnMuc3RhdChmb2xkZXJQYXRoKS5jYXRjaCgoKSA9PiBmYWxzZSkpIHJldHVyblxuICAgIGF3YWl0IGZzLm1rZGlyKGZvbGRlclBhdGgpXG4gIH0sXG4gIHdyaXRlVG9GaWxlOiBhc3luYyAoeyBmaWxlUGF0aCwgZGF0YSB9OiB7IGZpbGVQYXRoOiBzdHJpbmc7IGRhdGE6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBkYXRhLCAndXRmLTgnKVxuICB9LFxuICBta2RpckFuZFdyaXRlVG9GaWxlOiBhc3luYyAoe1xuICAgIGZvbGRlclBhdGgsXG4gICAgZmlsZU5hbWUsXG4gICAgZGF0YSxcbiAgfToge1xuICAgIGZvbGRlclBhdGg6IHN0cmluZ1xuICAgIGZpbGVOYW1lOiBzdHJpbmdcbiAgICBkYXRhOiBzdHJpbmdcbiAgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1ha2VGb2xkZXJJZk5vdEV4aXN0KHsgZm9sZGVyUGF0aCB9KVxuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLndyaXRlVG9GaWxlKHsgZmlsZVBhdGg6IGZpbGVTZXJ2aWNlLmpvaW5QYXRocyhmb2xkZXJQYXRoLCBmaWxlTmFtZSksIGRhdGEgfSlcbiAgfSxcbiAgam9pblBhdGhzOiAoLi4ucGF0aHM6IHN0cmluZ1tdKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gcGF0aC5qb2luKC4uLnBhdGhzKVxuICB9LFxuICBpc0Fic1BhdGg6IChyZWxhdGl2ZU9yQWJzUGF0aDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHJlbGF0aXZlT3JBYnNQYXRoLnN0YXJ0c1dpdGgoJy8nKVxuICB9LFxuICByZWxhdGl2ZVRvQWJzUGF0aDogKHJlbGF0aXZlT3JBYnNQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBmaWxlU2VydmljZS5pc0Fic1BhdGgocmVsYXRpdmVPckFic1BhdGgpID8gcmVsYXRpdmVPckFic1BhdGggOiBmaWxlU2VydmljZS5qb2luUGF0aHMocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVPckFic1BhdGgpXG4gIH0sXG4gIHJlbW92ZURvdFNsYXNoRnJvbVJlbGF0aXZlUGF0aDogKHJlbGF0aXZlT3JBYnNQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiByZWxhdGl2ZU9yQWJzUGF0aC5zdGFydHNXaXRoKCcuLycpID8gcmVsYXRpdmVPckFic1BhdGguc2xpY2UoMikgOiByZWxhdGl2ZU9yQWJzUGF0aFxuICB9LFxuICBmaWxlTmFtZUZyb21QYXRoOiAoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgcGFydHMgPSBmaWxlUGF0aC5zcGxpdCgnLycpXG4gICAgY29uc3QgbGFzdFBhcnQgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXVxuICAgIGNvbnN0IG5hbWVQYXJ0cyA9IGxhc3RQYXJ0LnNwbGl0KCcuJylcbiAgICBpZiAobmFtZVBhcnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG5hbWVQYXJ0c1swXVxuICAgIG5hbWVQYXJ0cy5wb3AoKVxuICAgIHJldHVybiBuYW1lUGFydHMuam9pbignLicpXG4gIH0sXG59XG4iXX0=