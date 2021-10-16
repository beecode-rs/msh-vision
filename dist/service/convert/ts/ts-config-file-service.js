"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfigFileService = void 0;
const file_service_1 = require("src/service/file-service");
const config_1 = require("src/util/config");
let __tsConfigFileJson = {};
const self = {
    init: async () => {
        const tsConfigAbsPath = file_service_1.fileService.relativeToAbsPath(config_1.visionConfig().ts.tsconfigPath);
        __tsConfigFileJson = require(tsConfigAbsPath); // eslint-disable-line @typescript-eslint/no-var-requires
    },
    _getFileJson: () => {
        if (!__tsConfigFileJson)
            throw new Error('tsconfig.json is not found');
        return __tsConfigFileJson;
    },
    _cleanReplacePaths: () => {
        const paths = self._getFileJson().compilerOptions?.paths ?? {};
        return Object.entries(paths)
            .map(([refPath, [replacePaths, ..._paths]]) => ({
            startsWith: refPath.split('*').join(''),
            replaceWith: self._cleanReplaceWith(replacePaths.split('*').join('')),
        }))
            .filter((r) => r.startsWith);
    },
    _cleanReplaceWith: (path) => {
        if (!path.startsWith(config_1.visionConfig().projectSrcFolderPath))
            return path;
        return `.${file_service_1.fileService.cleanupPath(path.slice(config_1.visionConfig().projectSrcFolderPath.length))}`;
    },
    moduleAliasResolve: (path) => {
        const resolver = self._cleanReplacePaths().find((r) => path.startsWith(r.startsWith));
        if (!resolver)
            return path;
        return `${resolver.replaceWith}${path.slice(resolver.startsWith.length)}`;
    },
};
exports.tsConfigFileService = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY29uZmlnLWZpbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHMvdHMtY29uZmlnLWZpbGUtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBc0Q7QUFDdEQsNENBQThDO0FBUzlDLElBQUksa0JBQWtCLEdBQXFCLEVBQUUsQ0FBQTtBQUU3QyxNQUFNLElBQUksR0FBRztJQUNYLElBQUksRUFBRSxLQUFLLElBQW1CLEVBQUU7UUFDOUIsTUFBTSxlQUFlLEdBQUcsMEJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JGLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDLHlEQUF5RDtJQUN6RyxDQUFDO0lBQ0QsWUFBWSxFQUFFLEdBQXFCLEVBQUU7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQjtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtRQUN0RSxPQUFPLGtCQUFrQixDQUFBO0lBQzNCLENBQUM7SUFDRCxrQkFBa0IsRUFBRSxHQUFrRCxFQUFFO1FBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQTtRQUM5RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2FBQ3pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxVQUFVLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEUsQ0FBQyxDQUFDO2FBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUNELGlCQUFpQixFQUFFLENBQUMsSUFBWSxFQUFVLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFDdEUsT0FBTyxJQUFJLDBCQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUM5RixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxJQUFZLEVBQVUsRUFBRTtRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDckYsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUMzRSxDQUFDO0NBQ0YsQ0FBQTtBQUNZLFFBQUEsbUJBQW1CLEdBQUcsSUFBSSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyB2aXNpb25Db25maWcgfSBmcm9tICdzcmMvdXRpbC9jb25maWcnXG5cbnR5cGUgVHNDb25maWdGaWxlVHlwZSA9IHtcbiAgY29tcGlsZXJPcHRpb25zPzoge1xuICAgIHBhdGhzPzoge1xuICAgICAgW2s6IHN0cmluZ106IHN0cmluZ1tdXG4gICAgfVxuICB9XG59XG5sZXQgX190c0NvbmZpZ0ZpbGVKc29uOiBUc0NvbmZpZ0ZpbGVUeXBlID0ge31cblxuY29uc3Qgc2VsZiA9IHtcbiAgaW5pdDogYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHRzQ29uZmlnQWJzUGF0aCA9IGZpbGVTZXJ2aWNlLnJlbGF0aXZlVG9BYnNQYXRoKHZpc2lvbkNvbmZpZygpLnRzLnRzY29uZmlnUGF0aClcbiAgICBfX3RzQ29uZmlnRmlsZUpzb24gPSByZXF1aXJlKHRzQ29uZmlnQWJzUGF0aCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIH0sXG4gIF9nZXRGaWxlSnNvbjogKCk6IFRzQ29uZmlnRmlsZVR5cGUgPT4ge1xuICAgIGlmICghX190c0NvbmZpZ0ZpbGVKc29uKSB0aHJvdyBuZXcgRXJyb3IoJ3RzY29uZmlnLmpzb24gaXMgbm90IGZvdW5kJylcbiAgICByZXR1cm4gX190c0NvbmZpZ0ZpbGVKc29uXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VQYXRoczogKCk6IHsgc3RhcnRzV2l0aDogc3RyaW5nOyByZXBsYWNlV2l0aDogc3RyaW5nIH1bXSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBzZWxmLl9nZXRGaWxlSnNvbigpLmNvbXBpbGVyT3B0aW9ucz8ucGF0aHMgPz8ge31cbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMocGF0aHMpXG4gICAgICAubWFwKChbcmVmUGF0aCwgW3JlcGxhY2VQYXRocywgLi4uX3BhdGhzXV0pID0+ICh7XG4gICAgICAgIHN0YXJ0c1dpdGg6IHJlZlBhdGguc3BsaXQoJyonKS5qb2luKCcnKSxcbiAgICAgICAgcmVwbGFjZVdpdGg6IHNlbGYuX2NsZWFuUmVwbGFjZVdpdGgocmVwbGFjZVBhdGhzLnNwbGl0KCcqJykuam9pbignJykpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyKSA9PiByLnN0YXJ0c1dpdGgpXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VXaXRoOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCh2aXNpb25Db25maWcoKS5wcm9qZWN0U3JjRm9sZGVyUGF0aCkpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAuJHtmaWxlU2VydmljZS5jbGVhbnVwUGF0aChwYXRoLnNsaWNlKHZpc2lvbkNvbmZpZygpLnByb2plY3RTcmNGb2xkZXJQYXRoLmxlbmd0aCkpfWBcbiAgfSxcbiAgbW9kdWxlQWxpYXNSZXNvbHZlOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByZXNvbHZlciA9IHNlbGYuX2NsZWFuUmVwbGFjZVBhdGhzKCkuZmluZCgocikgPT4gcGF0aC5zdGFydHNXaXRoKHIuc3RhcnRzV2l0aCkpXG4gICAgaWYgKCFyZXNvbHZlcikgcmV0dXJuIHBhdGhcbiAgICByZXR1cm4gYCR7cmVzb2x2ZXIucmVwbGFjZVdpdGh9JHtwYXRoLnNsaWNlKHJlc29sdmVyLnN0YXJ0c1dpdGgubGVuZ3RoKX1gXG4gIH0sXG59XG5leHBvcnQgY29uc3QgdHNDb25maWdGaWxlU2VydmljZSA9IHNlbGZcbiJdfQ==