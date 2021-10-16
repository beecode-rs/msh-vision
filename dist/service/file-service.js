"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileService = void 0;
const fs_1 = require("fs");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("src/util/constant");
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
        return relativeOrAbsPath.startsWith(constant_1.constant.folderSep);
    },
    relativeToAbsPath: (relativeOrAbsPath) => {
        return exports.fileService.isAbsPath(relativeOrAbsPath) ? relativeOrAbsPath : exports.fileService.joinPaths(process.cwd(), relativeOrAbsPath);
    },
    cleanupPath: (relativeOrAbsPath) => {
        return path_1.default.join(relativeOrAbsPath);
        // return relativeOrAbsPath.startsWith('./') ? relativeOrAbsPath.slice(2) : relativeOrAbsPath
    },
    lastFolderFromPath: (filePath) => {
        const pathSplit = filePath.split(constant_1.constant.folderSep);
        if (pathSplit[pathSplit.length - 1].includes('.'))
            pathSplit.pop();
        return pathSplit.join(constant_1.constant.folderSep);
    },
    importPathFind: (filePathImportedFrom, importPath) => {
        const importedFromPath = exports.fileService.lastFolderFromPath(filePathImportedFrom);
        const importPathSplit = importPath.split(constant_1.constant.folderSep);
        const importedFromPathReverseSplit = importedFromPath.split(constant_1.constant.folderSep).reverse();
        let equalPathSplitCount = 0;
        for (const [ix, split] of Object.entries(importPathSplit)) {
            if (importedFromPathReverseSplit[ix] !== split)
                break;
            equalPathSplitCount = +ix + 1;
        }
        const cleanImportPath = importPathSplit.slice(equalPathSplitCount).join(constant_1.constant.folderSep);
        return exports.fileService.joinPaths(importedFromPath, cleanImportPath);
    },
    fileNameFromPath: (filePath, options = {}) => {
        const parts = filePath.split(constant_1.constant.folderSep);
        const lastPart = parts[parts.length - 1];
        if (options.withExtension)
            return lastPart;
        const nameParts = lastPart.split('.');
        if (nameParts.length === 1)
            return nameParts[0];
        nameParts.pop();
        return nameParts.join('.');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJCQUFtQztBQUNuQyxnREFBdUI7QUFDdkIsZ0RBQXVCO0FBQ3ZCLGdEQUE0QztBQUUvQixRQUFBLFdBQVcsR0FBRztJQUN6QixrQkFBa0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTBCLEVBQXFCLEVBQUU7UUFDdEYsT0FBTyxJQUFJLE9BQU8sQ0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMvQyxNQUFNLEdBQUcsR0FBRyxtQkFBVyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3JELGNBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEYsSUFBSSxHQUFHO29CQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMzQixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELG9CQUFvQixFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMEIsRUFBaUIsRUFBRTtRQUNwRixJQUFJLE1BQU0sYUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUN4RCxNQUFNLGFBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFB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RUFBRSxDQUFDLFFBQWdCLEVBQUUsVUFBdUMsRUFBRSxFQUFVLEVBQUU7UUFDeEYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2hELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLElBQUksT0FBTyxDQUFDLGFBQWE7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUMxQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2YsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvbWlzZXMgYXMgZnMgfSBmcm9tICdmcydcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNvbnN0IGZpbGVTZXJ2aWNlID0ge1xuICBmaWxlTGlzdEZyb21Gb2xkZXI6IGFzeW5jICh7IGZvbGRlclBhdGggfTogeyBmb2xkZXJQYXRoOiBzdHJpbmcgfSk6IFByb21pc2U8c3RyaW5nW10+ID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGN3ZCA9IGZpbGVTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKGZvbGRlclBhdGgpXG4gICAgICBnbG9iKCcqKi8qJywgeyBjd2QsIGRvdDogdHJ1ZSwgbm9kaXI6IHRydWUsIGlnbm9yZTogJyoudGVzdC50cycgfSwgKGVyciwgZmlsZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgICAgIHJldHVybiByZXNvbHZlKGZpbGVzKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBtYWtlRm9sZGVySWZOb3RFeGlzdDogYXN5bmMgKHsgZm9sZGVyUGF0aCB9OiB7IGZvbGRlclBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKGF3YWl0IGZzLnN0YXQoZm9sZGVyUGF0aCkuY2F0Y2goKCkgPT4gZmFsc2UpKSByZXR1cm5cbiAgICBhd2FpdCBmcy5ta2Rpcihmb2xkZXJQYXRoKVxuICB9LFxuICB3cml0ZVRvRmlsZTogYXN5bmMgKHsgZmlsZVBhdGgsIGRhdGEgfTogeyBmaWxlUGF0aDogc3RyaW5nOyBkYXRhOiBzdHJpbmcgfSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IGZzLndyaXRlRmlsZShmaWxlUGF0aCwgZGF0YSwgJ3V0Zi04JylcbiAgfSxcbiAgbWtkaXJBbmRXcml0ZVRvRmlsZTogYXN5bmMgKHtcbiAgICBmb2xkZXJQYXRoLFxuICAgIGZpbGVOYW1lLFxuICAgIGRhdGEsXG4gIH06IHtcbiAgICBmb2xkZXJQYXRoOiBzdHJpbmdcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4gICAgZGF0YTogc3RyaW5nXG4gIH0pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5tYWtlRm9sZGVySWZOb3RFeGlzdCh7IGZvbGRlclBhdGggfSlcbiAgICBhd2FpdCBmaWxlU2VydmljZS53cml0ZVRvRmlsZSh7IGZpbGVQYXRoOiBmaWxlU2VydmljZS5qb2luUGF0aHMoZm9sZGVyUGF0aCwgZmlsZU5hbWUpLCBkYXRhIH0pXG4gIH0sXG4gIGpvaW5QYXRoczogKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHBhdGguam9pbiguLi5wYXRocylcbiAgfSxcbiAgaXNBYnNQYXRoOiAocmVsYXRpdmVPckFic1BhdGg6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiByZWxhdGl2ZU9yQWJzUGF0aC5zdGFydHNXaXRoKGNvbnN0YW50LmZvbGRlclNlcClcbiAgfSxcbiAgcmVsYXRpdmVUb0Fic1BhdGg6IChyZWxhdGl2ZU9yQWJzUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZmlsZVNlcnZpY2UuaXNBYnNQYXRoKHJlbGF0aXZlT3JBYnNQYXRoKSA/IHJlbGF0aXZlT3JBYnNQYXRoIDogZmlsZVNlcnZpY2Uuam9pblBhdGhzKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlT3JBYnNQYXRoKVxuICB9LFxuICBjbGVhbnVwUGF0aDogKHJlbGF0aXZlT3JBYnNQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4ocmVsYXRpdmVPckFic1BhdGgpXG4gICAgLy8gcmV0dXJuIHJlbGF0aXZlT3JBYnNQYXRoLnN0YXJ0c1dpdGgoJy4vJykgPyByZWxhdGl2ZU9yQWJzUGF0aC5zbGljZSgyKSA6IHJlbGF0aXZlT3JBYnNQYXRoXG4gIH0sXG4gIGxhc3RGb2xkZXJGcm9tUGF0aDogKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHBhdGhTcGxpdCA9IGZpbGVQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICBpZiAocGF0aFNwbGl0W3BhdGhTcGxpdC5sZW5ndGggLSAxXS5pbmNsdWRlcygnLicpKSBwYXRoU3BsaXQucG9wKClcbiAgICByZXR1cm4gcGF0aFNwbGl0LmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICB9LFxuICBpbXBvcnRQYXRoRmluZDogKGZpbGVQYXRoSW1wb3J0ZWRGcm9tOiBzdHJpbmcsIGltcG9ydFBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgaW1wb3J0ZWRGcm9tUGF0aCA9IGZpbGVTZXJ2aWNlLmxhc3RGb2xkZXJGcm9tUGF0aChmaWxlUGF0aEltcG9ydGVkRnJvbSlcbiAgICBjb25zdCBpbXBvcnRQYXRoU3BsaXQgPSBpbXBvcnRQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICBjb25zdCBpbXBvcnRlZEZyb21QYXRoUmV2ZXJzZVNwbGl0ID0gaW1wb3J0ZWRGcm9tUGF0aC5zcGxpdChjb25zdGFudC5mb2xkZXJTZXApLnJldmVyc2UoKVxuICAgIGxldCBlcXVhbFBhdGhTcGxpdENvdW50ID0gMFxuICAgIGZvciAoY29uc3QgW2l4LCBzcGxpdF0gb2YgT2JqZWN0LmVudHJpZXMoaW1wb3J0UGF0aFNwbGl0KSkge1xuICAgICAgaWYgKGltcG9ydGVkRnJvbVBhdGhSZXZlcnNlU3BsaXRbaXhdICE9PSBzcGxpdCkgYnJlYWtcbiAgICAgIGVxdWFsUGF0aFNwbGl0Q291bnQgPSAraXggKyAxXG4gICAgfVxuICAgIGNvbnN0IGNsZWFuSW1wb3J0UGF0aCA9IGltcG9ydFBhdGhTcGxpdC5zbGljZShlcXVhbFBhdGhTcGxpdENvdW50KS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICByZXR1cm4gZmlsZVNlcnZpY2Uuam9pblBhdGhzKGltcG9ydGVkRnJvbVBhdGgsIGNsZWFuSW1wb3J0UGF0aClcbiAgfSxcbiAgZmlsZU5hbWVGcm9tUGF0aDogKGZpbGVQYXRoOiBzdHJpbmcsIG9wdGlvbnM6IHsgd2l0aEV4dGVuc2lvbj86IGJvb2xlYW4gfSA9IHt9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBwYXJ0cyA9IGZpbGVQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICBjb25zdCBsYXN0UGFydCA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXG4gICAgaWYgKG9wdGlvbnMud2l0aEV4dGVuc2lvbikgcmV0dXJuIGxhc3RQYXJ0XG4gICAgY29uc3QgbmFtZVBhcnRzID0gbGFzdFBhcnQuc3BsaXQoJy4nKVxuICAgIGlmIChuYW1lUGFydHMubGVuZ3RoID09PSAxKSByZXR1cm4gbmFtZVBhcnRzWzBdXG4gICAgbmFtZVBhcnRzLnBvcCgpXG4gICAgcmV0dXJuIG5hbWVQYXJ0cy5qb2luKCcuJylcbiAgfSxcbn1cbiJdfQ==