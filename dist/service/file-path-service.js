"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filePathService = void 0;
const path_1 = __importDefault(require("path"));
const constant_1 = require("src/util/constant");
const _self = {
    joinPaths: (...paths) => {
        return path_1.default.join(...paths);
    },
    isAbsPath: (relativeOrAbsPath) => {
        return relativeOrAbsPath.startsWith((0, constant_1.constant)().folderSep);
    },
    isDotPath: (path) => {
        return path.startsWith('.');
    },
    relativeToAbsPath: (relativeOrAbsPath) => {
        return _self.isAbsPath(relativeOrAbsPath) ? relativeOrAbsPath : _self.joinPaths(process.cwd(), relativeOrAbsPath);
    },
    cleanupPath: (relativeOrAbsPath) => {
        return path_1.default.join(relativeOrAbsPath);
    },
    fileNameFromPath: (filePath, options = {}) => {
        const parts = filePath.split((0, constant_1.constant)().folderSep);
        const lastPart = parts[parts.length - 1];
        if (options.withExtension)
            return lastPart;
        const nameParts = lastPart.split('.');
        if (nameParts.length === 1)
            return nameParts[0];
        nameParts.pop();
        return nameParts.join('.');
    },
    lastFolderFromPath: (filePath) => {
        const pathSplit = filePath.split((0, constant_1.constant)().folderSep);
        if (pathSplit[pathSplit.length - 1].includes('.'))
            pathSplit.pop();
        return pathSplit.join((0, constant_1.constant)().folderSep);
    },
};
exports.filePathService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wYXRoLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsZ0RBQTRDO0FBRTVDLE1BQU0sS0FBSyxHQUFHO0lBQ1osU0FBUyxFQUFFLENBQUMsR0FBRyxLQUFlLEVBQVUsRUFBRTtRQUN4QyxPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsaUJBQXlCLEVBQVcsRUFBRTtRQUNoRCxPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFBLG1CQUFRLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUMzRCxDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsSUFBWSxFQUFXLEVBQUU7UUFDbkMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxDQUFDLGlCQUF5QixFQUFVLEVBQUU7UUFDdkQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQ25ILENBQUM7SUFDRCxXQUFXLEVBQUUsQ0FBQyxpQkFBeUIsRUFBVSxFQUFFO1FBQ2pELE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDRCxnQkFBZ0IsRUFBRSxDQUFDLFFBQWdCLEVBQUUsVUFBdUMsRUFBRSxFQUFVLEVBQUU7UUFDeEYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFBLG1CQUFRLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNsRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxJQUFJLE9BQU8sQ0FBQyxhQUFhO1lBQUUsT0FBTyxRQUFRLENBQUE7UUFDMUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNyQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQy9DLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNmLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxRQUFnQixFQUFVLEVBQUU7UUFDL0MsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFBLG1CQUFRLEdBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0RCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDbEUsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUEsbUJBQVEsR0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzdDLENBQUM7Q0FDRixDQUFBO0FBRVksUUFBQSxlQUFlLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmNvbnN0IF9zZWxmID0ge1xuICBqb2luUGF0aHM6ICguLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oLi4ucGF0aHMpXG4gIH0sXG4gIGlzQWJzUGF0aDogKHJlbGF0aXZlT3JBYnNQYXRoOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gcmVsYXRpdmVPckFic1BhdGguc3RhcnRzV2l0aChjb25zdGFudCgpLmZvbGRlclNlcClcbiAgfSxcbiAgaXNEb3RQYXRoOiAocGF0aDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHBhdGguc3RhcnRzV2l0aCgnLicpXG4gIH0sXG4gIHJlbGF0aXZlVG9BYnNQYXRoOiAocmVsYXRpdmVPckFic1BhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIF9zZWxmLmlzQWJzUGF0aChyZWxhdGl2ZU9yQWJzUGF0aCkgPyByZWxhdGl2ZU9yQWJzUGF0aCA6IF9zZWxmLmpvaW5QYXRocyhwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZU9yQWJzUGF0aClcbiAgfSxcbiAgY2xlYW51cFBhdGg6IChyZWxhdGl2ZU9yQWJzUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gcGF0aC5qb2luKHJlbGF0aXZlT3JBYnNQYXRoKVxuICB9LFxuICBmaWxlTmFtZUZyb21QYXRoOiAoZmlsZVBhdGg6IHN0cmluZywgb3B0aW9uczogeyB3aXRoRXh0ZW5zaW9uPzogYm9vbGVhbiB9ID0ge30pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZmlsZVBhdGguc3BsaXQoY29uc3RhbnQoKS5mb2xkZXJTZXApXG4gICAgY29uc3QgbGFzdFBhcnQgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXVxuICAgIGlmIChvcHRpb25zLndpdGhFeHRlbnNpb24pIHJldHVybiBsYXN0UGFydFxuICAgIGNvbnN0IG5hbWVQYXJ0cyA9IGxhc3RQYXJ0LnNwbGl0KCcuJylcbiAgICBpZiAobmFtZVBhcnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIG5hbWVQYXJ0c1swXVxuICAgIG5hbWVQYXJ0cy5wb3AoKVxuICAgIHJldHVybiBuYW1lUGFydHMuam9pbignLicpXG4gIH0sXG4gIGxhc3RGb2xkZXJGcm9tUGF0aDogKGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHBhdGhTcGxpdCA9IGZpbGVQYXRoLnNwbGl0KGNvbnN0YW50KCkuZm9sZGVyU2VwKVxuICAgIGlmIChwYXRoU3BsaXRbcGF0aFNwbGl0Lmxlbmd0aCAtIDFdLmluY2x1ZGVzKCcuJykpIHBhdGhTcGxpdC5wb3AoKVxuICAgIHJldHVybiBwYXRoU3BsaXQuam9pbihjb25zdGFudCgpLmZvbGRlclNlcClcbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVQYXRoU2VydmljZSA9IF9zZWxmXG4iXX0=