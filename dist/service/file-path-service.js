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
        return relativeOrAbsPath.startsWith(constant_1.constant.folderSep);
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
    lastFolderFromPath: (filePath) => {
        const pathSplit = filePath.split(constant_1.constant.folderSep);
        if (pathSplit[pathSplit.length - 1].includes('.'))
            pathSplit.pop();
        return pathSplit.join(constant_1.constant.folderSep);
    },
};
exports.filePathService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1wYXRoLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsZ0RBQTRDO0FBRTVDLE1BQU0sS0FBSyxHQUFHO0lBQ1osU0FBUyxFQUFFLENBQUMsR0FBRyxLQUFlLEVBQVUsRUFBRTtRQUN4QyxPQUFPLGNBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsaUJBQXlCLEVBQVcsRUFBRTtRQUNoRCxPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxJQUFZLEVBQVcsRUFBRTtRQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUNELGlCQUFpQixFQUFFLENBQUMsaUJBQXlCLEVBQVUsRUFBRTtRQUN2RCxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUE7SUFDbkgsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFDLGlCQUF5QixFQUFVLEVBQUU7UUFDakQsT0FBTyxjQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNELGdCQUFnQixFQUFFLENBQUMsUUFBZ0IsRUFBRSxVQUF1QyxFQUFFLEVBQVUsRUFBRTtRQUN4RixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDaEQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDeEMsSUFBSSxPQUFPLENBQUMsYUFBYTtZQUFFLE9BQU8sUUFBUSxDQUFBO1FBQzFDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMvQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDZixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELGtCQUFrQixFQUFFLENBQUMsUUFBZ0IsRUFBVSxFQUFFO1FBQy9DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNwRCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDbEUsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuY29uc3QgX3NlbGYgPSB7XG4gIGpvaW5QYXRoczogKC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHBhdGguam9pbiguLi5wYXRocylcbiAgfSxcbiAgaXNBYnNQYXRoOiAocmVsYXRpdmVPckFic1BhdGg6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiByZWxhdGl2ZU9yQWJzUGF0aC5zdGFydHNXaXRoKGNvbnN0YW50LmZvbGRlclNlcClcbiAgfSxcbiAgaXNEb3RQYXRoOiAocGF0aDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIHBhdGguc3RhcnRzV2l0aCgnLicpXG4gIH0sXG4gIHJlbGF0aXZlVG9BYnNQYXRoOiAocmVsYXRpdmVPckFic1BhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIF9zZWxmLmlzQWJzUGF0aChyZWxhdGl2ZU9yQWJzUGF0aCkgPyByZWxhdGl2ZU9yQWJzUGF0aCA6IF9zZWxmLmpvaW5QYXRocyhwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZU9yQWJzUGF0aClcbiAgfSxcbiAgY2xlYW51cFBhdGg6IChyZWxhdGl2ZU9yQWJzUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gcGF0aC5qb2luKHJlbGF0aXZlT3JBYnNQYXRoKVxuICB9LFxuICBmaWxlTmFtZUZyb21QYXRoOiAoZmlsZVBhdGg6IHN0cmluZywgb3B0aW9uczogeyB3aXRoRXh0ZW5zaW9uPzogYm9vbGVhbiB9ID0ge30pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gZmlsZVBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgIGNvbnN0IGxhc3RQYXJ0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgICBpZiAob3B0aW9ucy53aXRoRXh0ZW5zaW9uKSByZXR1cm4gbGFzdFBhcnRcbiAgICBjb25zdCBuYW1lUGFydHMgPSBsYXN0UGFydC5zcGxpdCgnLicpXG4gICAgaWYgKG5hbWVQYXJ0cy5sZW5ndGggPT09IDEpIHJldHVybiBuYW1lUGFydHNbMF1cbiAgICBuYW1lUGFydHMucG9wKClcbiAgICByZXR1cm4gbmFtZVBhcnRzLmpvaW4oJy4nKVxuICB9LFxuICBsYXN0Rm9sZGVyRnJvbVBhdGg6IChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBwYXRoU3BsaXQgPSBmaWxlUGF0aC5zcGxpdChjb25zdGFudC5mb2xkZXJTZXApXG4gICAgaWYgKHBhdGhTcGxpdFtwYXRoU3BsaXQubGVuZ3RoIC0gMV0uaW5jbHVkZXMoJy4nKSkgcGF0aFNwbGl0LnBvcCgpXG4gICAgcmV0dXJuIHBhdGhTcGxpdC5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVQYXRoU2VydmljZSA9IF9zZWxmXG4iXX0=