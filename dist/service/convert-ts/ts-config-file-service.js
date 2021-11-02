"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfigFileService = void 0;
const file_service_1 = require("src/service/file-service");
const config_1 = require("src/util/config");
let __tsConfigFileJson = {};
const _self = {
    init: async () => {
        const tsConfigAbsPath = file_service_1.fileService.relativeToAbsPath((0, config_1.visionConfig)().ts.tsconfigPath);
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
        return `.${file_service_1.fileService.cleanupPath(path.slice((0, config_1.visionConfig)().projectSrcFolderPath.length))}`;
    },
    moduleAliasResolve: (path) => {
        const resolver = _self._cleanReplacePaths().find((r) => path.startsWith(r.startsWith));
        if (!resolver)
            return path;
        return `${resolver.replaceWith}${path.slice(resolver.startsWith.length)}`;
    },
};
exports.tsConfigFileService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY29uZmlnLWZpbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQtdHMvdHMtY29uZmlnLWZpbGUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBc0Q7QUFDdEQsNENBQThDO0FBUzlDLElBQUksa0JBQWtCLEdBQXFCLEVBQUUsQ0FBQTtBQUU3QyxNQUFNLEtBQUssR0FBRztJQUNaLElBQUksRUFBRSxLQUFLLElBQW1CLEVBQUU7UUFDOUIsTUFBTSxlQUFlLEdBQUcsMEJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDckYsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMseURBQXlEO0lBQ3pHLENBQUM7SUFDRCxZQUFZLEVBQUUsR0FBcUIsRUFBRTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sa0JBQWtCLENBQUE7SUFDM0IsQ0FBQztJQUNELGtCQUFrQixFQUFFLEdBQWtELEVBQUU7UUFDdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFBO1FBQy9ELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDekIsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsV0FBVyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RSxDQUFDLENBQUM7YUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFBLHFCQUFZLEdBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3RFLE9BQU8sSUFBSSwwQkFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEscUJBQVksR0FBRSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUM5RixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMzQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDdEYsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMzRSxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyB2aXNpb25Db25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbnR5cGUgVHNDb25maWdGaWxlVHlwZSA9IHtcbiAgY29tcGlsZXJPcHRpb25zPzoge1xuICAgIHBhdGhzPzoge1xuICAgICAgW2s6IHN0cmluZ106IHN0cmluZ1tdXG4gICAgfVxuICB9XG59XG5sZXQgX190c0NvbmZpZ0ZpbGVKc29uOiBUc0NvbmZpZ0ZpbGVUeXBlID0ge31cblxuY29uc3QgX3NlbGYgPSB7XG4gIGluaXQ6IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB0c0NvbmZpZ0Fic1BhdGggPSBmaWxlU2VydmljZS5yZWxhdGl2ZVRvQWJzUGF0aCh2aXNpb25Db25maWcoKS50cy50c2NvbmZpZ1BhdGgpXG4gICAgX190c0NvbmZpZ0ZpbGVKc29uID0gcmVxdWlyZSh0c0NvbmZpZ0Fic1BhdGgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICB9LFxuICBfZ2V0RmlsZUpzb246ICgpOiBUc0NvbmZpZ0ZpbGVUeXBlID0+IHtcbiAgICBpZiAoIV9fdHNDb25maWdGaWxlSnNvbikgdGhyb3cgbmV3IEVycm9yKCd0c2NvbmZpZy5qc29uIGlzIG5vdCBmb3VuZCcpXG4gICAgcmV0dXJuIF9fdHNDb25maWdGaWxlSnNvblxuICB9LFxuICBfY2xlYW5SZXBsYWNlUGF0aHM6ICgpOiB7IHN0YXJ0c1dpdGg6IHN0cmluZzsgcmVwbGFjZVdpdGg6IHN0cmluZyB9W10gPT4ge1xuICAgIGNvbnN0IHBhdGhzID0gX3NlbGYuX2dldEZpbGVKc29uKCkuY29tcGlsZXJPcHRpb25zPy5wYXRocyA/PyB7fVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhwYXRocylcbiAgICAgIC5tYXAoKFtyZWZQYXRoLCBbcmVwbGFjZVBhdGhzLCAuLi5fcGF0aHNdXSkgPT4gKHtcbiAgICAgICAgc3RhcnRzV2l0aDogcmVmUGF0aC5zcGxpdCgnKicpLmpvaW4oJycpLFxuICAgICAgICByZXBsYWNlV2l0aDogX3NlbGYuX2NsZWFuUmVwbGFjZVdpdGgocmVwbGFjZVBhdGhzLnNwbGl0KCcqJykuam9pbignJykpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyKSA9PiByLnN0YXJ0c1dpdGgpXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VXaXRoOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCh2aXNpb25Db25maWcoKS5wcm9qZWN0U3JjRm9sZGVyUGF0aCkpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAuJHtmaWxlU2VydmljZS5jbGVhbnVwUGF0aChwYXRoLnNsaWNlKHZpc2lvbkNvbmZpZygpLnByb2plY3RTcmNGb2xkZXJQYXRoLmxlbmd0aCkpfWBcbiAgfSxcbiAgbW9kdWxlQWxpYXNSZXNvbHZlOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByZXNvbHZlciA9IF9zZWxmLl9jbGVhblJlcGxhY2VQYXRocygpLmZpbmQoKHIpID0+IHBhdGguc3RhcnRzV2l0aChyLnN0YXJ0c1dpdGgpKVxuICAgIGlmICghcmVzb2x2ZXIpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAke3Jlc29sdmVyLnJlcGxhY2VXaXRofSR7cGF0aC5zbGljZShyZXNvbHZlci5zdGFydHNXaXRoLmxlbmd0aCl9YFxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzQ29uZmlnRmlsZVNlcnZpY2UgPSBfc2VsZlxuIl19