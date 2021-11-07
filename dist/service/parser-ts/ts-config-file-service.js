"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsConfigFileService = void 0;
const file_path_service_1 = require("src/service/file-path-service");
const config_1 = require("src/util/config");
let __tsConfigFileJson = {};
const _self = {
    init: async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY29uZmlnLWZpbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3BhcnNlci10cy90cy1jb25maWctZmlsZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRDtBQUMvRCw0Q0FBOEM7QUFTOUMsSUFBSSxrQkFBa0IsR0FBcUIsRUFBRSxDQUFBO0FBRTdDLE1BQU0sS0FBSyxHQUFHO0lBQ1osSUFBSSxFQUFFLEtBQUssSUFBbUIsRUFBRTtRQUM5QixNQUFNLGVBQWUsR0FBRyxtQ0FBZSxDQUFDLGlCQUFpQixDQUFDLElBQUEscUJBQVksR0FBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUN6RixrQkFBa0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQyx5REFBeUQ7SUFDekcsQ0FBQztJQUNELFlBQVksRUFBRSxHQUFxQixFQUFFO1FBQ25DLElBQUksQ0FBQyxrQkFBa0I7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFDdEUsT0FBTyxrQkFBa0IsQ0FBQTtJQUMzQixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsR0FBa0QsRUFBRTtRQUN0RSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUE7UUFDL0QsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxXQUFXLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZFLENBQUMsQ0FBQzthQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFDRCxpQkFBaUIsRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUEscUJBQVksR0FBRSxDQUFDLG9CQUFvQixDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUE7UUFDdEUsT0FBTyxJQUFJLG1DQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBQSxxQkFBWSxHQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQ2xHLENBQUM7SUFDRCxrQkFBa0IsRUFBRSxDQUFDLElBQVksRUFBVSxFQUFFO1FBQzNDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtRQUN0RixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFBO1FBQzFCLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO0lBQzNFLENBQUM7Q0FDRixDQUFBO0FBQ1ksUUFBQSxtQkFBbUIsR0FBRyxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWxlUGF0aFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZSdcbmltcG9ydCB7IHZpc2lvbkNvbmZpZyB9IGZyb20gJ3NyYy91dGlsL2NvbmZpZydcblxudHlwZSBUc0NvbmZpZ0ZpbGVUeXBlID0ge1xuICBjb21waWxlck9wdGlvbnM/OiB7XG4gICAgcGF0aHM/OiB7XG4gICAgICBbazogc3RyaW5nXTogc3RyaW5nW11cbiAgICB9XG4gIH1cbn1cbmxldCBfX3RzQ29uZmlnRmlsZUpzb246IFRzQ29uZmlnRmlsZVR5cGUgPSB7fVxuXG5jb25zdCBfc2VsZiA9IHtcbiAgaW5pdDogYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IHRzQ29uZmlnQWJzUGF0aCA9IGZpbGVQYXRoU2VydmljZS5yZWxhdGl2ZVRvQWJzUGF0aCh2aXNpb25Db25maWcoKS50cy50c2NvbmZpZ1BhdGgpXG4gICAgX190c0NvbmZpZ0ZpbGVKc29uID0gcmVxdWlyZSh0c0NvbmZpZ0Fic1BhdGgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICB9LFxuICBfZ2V0RmlsZUpzb246ICgpOiBUc0NvbmZpZ0ZpbGVUeXBlID0+IHtcbiAgICBpZiAoIV9fdHNDb25maWdGaWxlSnNvbikgdGhyb3cgbmV3IEVycm9yKCd0c2NvbmZpZy5qc29uIGlzIG5vdCBmb3VuZCcpXG4gICAgcmV0dXJuIF9fdHNDb25maWdGaWxlSnNvblxuICB9LFxuICBfY2xlYW5SZXBsYWNlUGF0aHM6ICgpOiB7IHN0YXJ0c1dpdGg6IHN0cmluZzsgcmVwbGFjZVdpdGg6IHN0cmluZyB9W10gPT4ge1xuICAgIGNvbnN0IHBhdGhzID0gX3NlbGYuX2dldEZpbGVKc29uKCkuY29tcGlsZXJPcHRpb25zPy5wYXRocyA/PyB7fVxuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhwYXRocylcbiAgICAgIC5tYXAoKFtyZWZQYXRoLCBbcmVwbGFjZVBhdGhzLCAuLi5fcGF0aHNdXSkgPT4gKHtcbiAgICAgICAgc3RhcnRzV2l0aDogcmVmUGF0aC5zcGxpdCgnKicpLmpvaW4oJycpLFxuICAgICAgICByZXBsYWNlV2l0aDogX3NlbGYuX2NsZWFuUmVwbGFjZVdpdGgocmVwbGFjZVBhdGhzLnNwbGl0KCcqJykuam9pbignJykpLFxuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChyKSA9PiByLnN0YXJ0c1dpdGgpXG4gIH0sXG4gIF9jbGVhblJlcGxhY2VXaXRoOiAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCh2aXNpb25Db25maWcoKS5wcm9qZWN0U3JjRm9sZGVyUGF0aCkpIHJldHVybiBwYXRoXG4gICAgcmV0dXJuIGAuJHtmaWxlUGF0aFNlcnZpY2UuY2xlYW51cFBhdGgocGF0aC5zbGljZSh2aXNpb25Db25maWcoKS5wcm9qZWN0U3JjRm9sZGVyUGF0aC5sZW5ndGgpKX1gXG4gIH0sXG4gIG1vZHVsZUFsaWFzUmVzb2x2ZTogKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZXIgPSBfc2VsZi5fY2xlYW5SZXBsYWNlUGF0aHMoKS5maW5kKChyKSA9PiBwYXRoLnN0YXJ0c1dpdGgoci5zdGFydHNXaXRoKSlcbiAgICBpZiAoIXJlc29sdmVyKSByZXR1cm4gcGF0aFxuICAgIHJldHVybiBgJHtyZXNvbHZlci5yZXBsYWNlV2l0aH0ke3BhdGguc2xpY2UocmVzb2x2ZXIuc3RhcnRzV2l0aC5sZW5ndGgpfWBcbiAgfSxcbn1cbmV4cG9ydCBjb25zdCB0c0NvbmZpZ0ZpbGVTZXJ2aWNlID0gX3NlbGZcbiJdfQ==