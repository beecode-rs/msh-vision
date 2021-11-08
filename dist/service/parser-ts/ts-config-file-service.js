"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfigFileService = void 0;
const file_path_service_1 = require("src/service/file-path-service");
const config_1 = require("src/util/config");
let __tsConfigFileJson = undefined;
const _self = {
    init: async () => {
        if (__tsConfigFileJson)
            return;
        const tsConfigAbsPath = file_path_service_1.filePathService.relativeToAbsPath((0, config_1.visionConfig)().ts.tsconfigPath);
        __tsConfigFileJson = require(tsConfigAbsPath); // eslint-disable-line @typescript-eslint/no-var-requires
    },
    _getFileJson: () => {
        if (!__tsConfigFileJson)
            throw new Error('tsconfig.json is not found');
        return __tsConfigFileJson;
    },
    _cleanReplacePaths: () => {
        const paths = _self._getFileJson().compilerOptions?.paths ?? {};
        return Object.entries(paths)
            .map(([refPath, [replacePaths, ..._paths]]) => ({
            startsWith: refPath.split('*').join(''),
            replaceWith: _self._cleanReplaceWith(replacePaths.split('*').join('')),
        }))
            .filter((r) => r.startsWith);
    },
    _cleanReplaceWith: (path) => {
        if (!path.startsWith((0, config_1.visionConfig)().projectSrcFolderPath))
            return path;
        return `.${file_path_service_1.filePathService.cleanupPath(path.slice((0, config_1.visionConfig)().projectSrcFolderPath.length))}`;
    },
    moduleAliasResolve: (path) => {
        const resolver = _self._cleanReplacePaths().find((r) => path.startsWith(r.startsWith));
        if (!resolver)
            return path;
        return `${resolver.replaceWith}${path.slice(resolver.startsWith.length)}`;
    },
};
exports.tsConfigFileService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY29uZmlnLWZpbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1jb25maWctZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRDtBQUMvRCw0Q0FBOEM7QUFTOUMsSUFBSSxrQkFBa0IsR0FBaUMsU0FBUyxDQUFBO0FBRWhFLE1BQU0sS0FBSyxHQUFHO0lBQ1osSUFBSSxFQUFFLEtBQUssSUFBbUIsRUFBRTtRQUM5QixJQUFJLGtCQUFrQjtZQUFFLE9BQU07UUFDOUIsTUFBTSxlQUFlLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekYsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMseURBQXlEO0lBQ3pHLENBQUM7SUFDRCxZQUFZLEVBQUUsR0FBcUIsRUFBRTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sa0JBQWtCLENBQUE7SUFDM0IsQ0FBQztJQUNELGtCQUFrQixFQUFFLEdBQWtELEVBQUU7UUFDdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFBO1FBQy9ELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDekIsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsV0FBVyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RSxDQUFDLENBQUM7YUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3RFLE9BQU8sSUFBSSxtQ0FBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEscUJBQVksR0FBRSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNsRyxDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMzQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDdEYsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMzRSxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsZVBhdGhTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1wYXRoLXNlcnZpY2UnXG5pbXBvcnQgeyB2aXNpb25Db25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbnR5cGUgVHNDb25maWdGaWxlVHlwZSA9IHtcbiAgY29tcGlsZXJPcHRpb25zPzoge1xuICAgIHBhdGhzPzoge1xuICAgICAgW2s6IHN0cmluZ106IHN0cmluZ1tdXG4gICAgfVxuICB9XG59XG5sZXQgX190c0NvbmZpZ0ZpbGVKc29uOiBUc0NvbmZpZ0ZpbGVUeXBlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG5cbmNvbnN0IF9zZWxmID0ge1xuICBpbml0OiBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKF9fdHNDb25maWdGaWxlSnNvbikgcmV0dXJuXG4gICAgY29uc3QgdHNDb25maWdBYnNQYXRoID0gZmlsZVBhdGhTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKHZpc2lvbkNvbmZpZygpLnRzLnRzY29uZmlnUGF0aClcbiAgICBfX3RzQ29uZmlnRmlsZUpzb24gPSByZXF1aXJlKHRzQ29uZmlnQWJzUGF0aCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIH0sXG4gIF9nZXRGaWxlSnNvbjogKCk6IFRzQ29uZmlnRmlsZVR5cGUgPT4ge1xuICAgIGlmICghX190c0NvbmZpZ0ZpbGVKc29uKSB0aHJvdyBuZXcgRXJyb3IoJ3RzY29uZmlnLmpzb24gaXMgbm90IGZvdW5kJylcbiAgICByZXR1cm4gX190c0NvbmZpZ0ZpbGVKc29uXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VQYXRoczogKCk6IHsgc3RhcnRzV2l0aDogc3RyaW5nOyByZXBsYWNlV2l0aDogc3RyaW5nIH1bXSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBfc2VsZi5fZ2V0RmlsZUpzb24oKS5jb21waWxlck9wdGlvbnM/LnBhdGhzID8/IHt9XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHBhdGhzKVxuICAgICAgLm1hcCgoW3JlZlBhdGgsIFtyZXBsYWNlUGF0aHMsIC4uLl9wYXRoc11dKSA9PiAoe1xuICAgICAgICBzdGFydHNXaXRoOiByZWZQYXRoLnNwbGl0KCcqJykuam9pbignJyksXG4gICAgICAgIHJlcGxhY2VXaXRoOiBfc2VsZi5fY2xlYW5SZXBsYWNlV2l0aChyZXBsYWNlUGF0aHMuc3BsaXQoJyonKS5qb2luKCcnKSksXG4gICAgICB9KSlcbiAgICAgIC5maWx0ZXIoKHIpID0+IHIuc3RhcnRzV2l0aClcbiAgfSxcbiAgX2NsZWFuUmVwbGFjZVdpdGg6IChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKHZpc2lvbkNvbmZpZygpLnByb2plY3RTcmNGb2xkZXJQYXRoKSkgcmV0dXJuIHBhdGhcbiAgICByZXR1cm4gYC4ke2ZpbGVQYXRoU2VydmljZS5jbGVhbnVwUGF0aChwYXRoLnNsaWNlKHZpc2lvbkNvbmZpZygpLnByb2plY3RTcmNGb2xkZXJQYXRoLmxlbmd0aCkpfWBcbiAgfSxcbiAgbW9kdWxlQWxpYXNSZXNvbHZlOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByZXNvbHZlciA9IF9zZWxmLl9jbGVhblJlcGxhY2VQYXRocygpLmZpbmQoKHIpID0+IHBhdGguc3RhcnRzV2l0aChyLnN0YXJ0c1dpdGgpKVxuICAgIGlmICghcmVzb2x2ZXIpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAke3Jlc29sdmVyLnJlcGxhY2VXaXRofSR7cGF0aC5zbGljZShyZXNvbHZlci5zdGFydHNXaXRoLmxlbmd0aCl9YFxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzQ29uZmlnRmlsZVNlcnZpY2UgPSBfc2VsZlxuIl19