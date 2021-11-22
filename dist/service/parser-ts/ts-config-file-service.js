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
        const tsConfigAbsPath = file_path_service_1.filePathService.relativeToAbsPath((0, config_1.config)().vision.ts.tsconfigPath);
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
        if (!path.startsWith((0, config_1.config)().vision.projectSrcFolderPath))
            return path;
        return `.${file_path_service_1.filePathService.cleanupPath(path.slice((0, config_1.config)().vision.projectSrcFolderPath.length))}`;
    },
    moduleAliasResolve: (path) => {
        const resolver = _self._cleanReplacePaths().find((r) => path.startsWith(r.startsWith));
        if (!resolver)
            return path;
        return `${resolver.replaceWith}${path.slice(resolver.startsWith.length)}`;
    },
};
exports.tsConfigFileService = _self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY29uZmlnLWZpbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1jb25maWctZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRDtBQUMvRCw0Q0FBd0M7QUFTeEMsSUFBSSxrQkFBa0IsR0FBaUMsU0FBUyxDQUFBO0FBRWhFLE1BQU0sS0FBSyxHQUFHO0lBQ1osSUFBSSxFQUFFLEtBQUssSUFBbUIsRUFBRTtRQUM5QixJQUFJLGtCQUFrQjtZQUFFLE9BQU07UUFDOUIsTUFBTSxlQUFlLEdBQUcsbUNBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFBLGVBQU0sR0FBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDMUYsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUMseURBQXlEO0lBQ3pHLENBQUM7SUFDRCxZQUFZLEVBQUUsR0FBcUIsRUFBRTtRQUNuQyxJQUFJLENBQUMsa0JBQWtCO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sa0JBQWtCLENBQUE7SUFDM0IsQ0FBQztJQUNELGtCQUFrQixFQUFFLEdBQWtELEVBQUU7UUFDdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFBO1FBQy9ELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDekIsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkMsV0FBVyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN2RSxDQUFDLENBQUM7YUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBQ0QsaUJBQWlCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFBLGVBQU0sR0FBRSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQ3ZFLE9BQU8sSUFBSSxtQ0FBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsZUFBTSxHQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUNuRyxDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMzQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDdEYsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMzRSxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsbUJBQW1CLEdBQUcsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsZVBhdGhTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1wYXRoLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbnR5cGUgVHNDb25maWdGaWxlVHlwZSA9IHtcbiAgY29tcGlsZXJPcHRpb25zPzoge1xuICAgIHBhdGhzPzoge1xuICAgICAgW2s6IHN0cmluZ106IHN0cmluZ1tdXG4gICAgfVxuICB9XG59XG5sZXQgX190c0NvbmZpZ0ZpbGVKc29uOiBUc0NvbmZpZ0ZpbGVUeXBlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG5cbmNvbnN0IF9zZWxmID0ge1xuICBpbml0OiBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKF9fdHNDb25maWdGaWxlSnNvbikgcmV0dXJuXG4gICAgY29uc3QgdHNDb25maWdBYnNQYXRoID0gZmlsZVBhdGhTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKGNvbmZpZygpLnZpc2lvbi50cy50c2NvbmZpZ1BhdGgpXG4gICAgX190c0NvbmZpZ0ZpbGVKc29uID0gcmVxdWlyZSh0c0NvbmZpZ0Fic1BhdGgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICB9LFxuICBfZ2V0RmlsZUpzb246ICgpOiBUc0NvbmZpZ0ZpbGVUeXBlID0+IHtcbiAgICBpZiAoIV9fdHNDb25maWdGaWxlSnNvbikgdGhyb3cgbmV3IEVycm9yKCd0c2NvbmZpZy5qc29uIGlzIG5vdCBmb3VuZCcpXG4gICAgcmV0dXJuIF9fdHNDb25maWdGaWxlSnNvblxuICB9LFxuICBfY2xlYW5SZXBsYWNlUGF0aHM6ICgpOiB7IHN0YXJ0c1dpdGg6IHN0cmluZzsgcmVwbGFjZVdpdGg6IHN0cmluZyB9W10gPT4ge1xuICAgIGNvbnN0IHBhdGhzID0gX3NlbGYuX2dldEZpbGVKc29uKCkuY29tcGlsZXJPcHRpb25zPy5wYXRocyA/PyB7fVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhwYXRocylcbiAgICAgIC5tYXAoKFtyZWZQYXRoLCBbcmVwbGFjZVBhdGhzLCAuLi5fcGF0aHNdXSkgPT4gKHtcbiAgICAgICAgc3RhcnRzV2l0aDogcmVmUGF0aC5zcGxpdCgnKicpLmpvaW4oJycpLFxuICAgICAgICByZXBsYWNlV2l0aDogX3NlbGYuX2NsZWFuUmVwbGFjZVdpdGgocmVwbGFjZVBhdGhzLnNwbGl0KCcqJykuam9pbignJykpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyKSA9PiByLnN0YXJ0c1dpdGgpXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VXaXRoOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aChjb25maWcoKS52aXNpb24ucHJvamVjdFNyY0ZvbGRlclBhdGgpKSByZXR1cm4gcGF0aFxuICAgIHJldHVybiBgLiR7ZmlsZVBhdGhTZXJ2aWNlLmNsZWFudXBQYXRoKHBhdGguc2xpY2UoY29uZmlnKCkudmlzaW9uLnByb2plY3RTcmNGb2xkZXJQYXRoLmxlbmd0aCkpfWBcbiAgfSxcbiAgbW9kdWxlQWxpYXNSZXNvbHZlOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByZXNvbHZlciA9IF9zZWxmLl9jbGVhblJlcGxhY2VQYXRocygpLmZpbmQoKHIpID0+IHBhdGguc3RhcnRzV2l0aChyLnN0YXJ0c1dpdGgpKVxuICAgIGlmICghcmVzb2x2ZXIpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAke3Jlc29sdmVyLnJlcGxhY2VXaXRofSR7cGF0aC5zbGljZShyZXNvbHZlci5zdGFydHNXaXRoLmxlbmd0aCl9YFxuICB9LFxufVxuZXhwb3J0IGNvbnN0IHRzQ29uZmlnRmlsZVNlcnZpY2UgPSBfc2VsZlxuIl19