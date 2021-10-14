"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importExtractor = void 0;
const import_reference_1 = require("src/model/import-reference");
const file_service_1 = require("src/service/file-service");
exports.importExtractor = {
    extract: (file) => {
        return file.imports.map(exports.importExtractor._parseImports).flat();
    },
    _parseImports: (imp) => {
        // return (imp as NamedImport).specifiers.map((spec) => importExtractor._importRefFromSpecifier({ imp, spec }))
        const specifiers = imp.specifiers ?? [];
        return specifiers.map((spec) => {
            return exports.importExtractor._importRefFromSpecifier({ imp, spec });
        });
    },
    _importRefFromSpecifier: ({ imp: { libraryName }, spec: { specifier, alias }, }) => {
        return new import_reference_1.ImportReference({
            filePath: exports.importExtractor._pathCleanup(libraryName),
            name: specifier,
            ...(alias && { alias }),
        });
    },
    _pathCleanup: (filePath) => {
        const cleanCurrFolder = file_service_1.fileService.cleanupPath(filePath);
        return `${cleanCurrFolder}.ts`;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4dHJhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHlwZXNjcmlwdC1wYXJzZXIvaW1wb3J0LWV4dHJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBSXpDLFFBQUEsZUFBZSxHQUFHO0lBQzdCLE9BQU8sRUFBRSxDQUFDLElBQVUsRUFBcUIsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDL0QsQ0FBQztJQUNELGFBQWEsRUFBRSxDQUFDLEdBQVcsRUFBcUIsRUFBRTtRQUNoRCwrR0FBK0c7UUFDL0csTUFBTSxVQUFVLEdBQUksR0FBbUIsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFBO1FBQ3hELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLE9BQU8sdUJBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELHVCQUF1QixFQUFFLENBQUMsRUFDeEIsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQ3BCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FJM0IsRUFBbUIsRUFBRTtRQUNwQixPQUFPLElBQUksa0NBQWUsQ0FBQztZQUN6QixRQUFRLEVBQUUsdUJBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQ25ELElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxRQUFnQixFQUFVLEVBQUU7UUFDekMsTUFBTSxlQUFlLEdBQUcsMEJBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDekQsT0FBTyxHQUFHLGVBQWUsS0FBSyxDQUFBO0lBQ2hDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW1wb3J0UmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL2ltcG9ydC1yZWZlcmVuY2UnXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB7IEZpbGUsIEltcG9ydCB9IGZyb20gJ3R5cGVzY3JpcHQtcGFyc2VyJ1xuaW1wb3J0IHsgTmFtZWRJbXBvcnQgfSBmcm9tICd0eXBlc2NyaXB0LXBhcnNlci9pbXBvcnRzL05hbWVkSW1wb3J0J1xuXG5leHBvcnQgY29uc3QgaW1wb3J0RXh0cmFjdG9yID0ge1xuICBleHRyYWN0OiAoZmlsZTogRmlsZSk6IEltcG9ydFJlZmVyZW5jZVtdID0+IHtcbiAgICByZXR1cm4gZmlsZS5pbXBvcnRzLm1hcChpbXBvcnRFeHRyYWN0b3IuX3BhcnNlSW1wb3J0cykuZmxhdCgpXG4gIH0sXG4gIF9wYXJzZUltcG9ydHM6IChpbXA6IEltcG9ydCk6IEltcG9ydFJlZmVyZW5jZVtdID0+IHtcbiAgICAvLyByZXR1cm4gKGltcCBhcyBOYW1lZEltcG9ydCkuc3BlY2lmaWVycy5tYXAoKHNwZWMpID0+IGltcG9ydEV4dHJhY3Rvci5faW1wb3J0UmVmRnJvbVNwZWNpZmllcih7IGltcCwgc3BlYyB9KSlcbiAgICBjb25zdCBzcGVjaWZpZXJzID0gKGltcCBhcyBOYW1lZEltcG9ydCkuc3BlY2lmaWVycyA/PyBbXVxuICAgIHJldHVybiBzcGVjaWZpZXJzLm1hcCgoc3BlYykgPT4ge1xuICAgICAgcmV0dXJuIGltcG9ydEV4dHJhY3Rvci5faW1wb3J0UmVmRnJvbVNwZWNpZmllcih7IGltcCwgc3BlYyB9KVxuICAgIH0pXG4gIH0sXG4gIF9pbXBvcnRSZWZGcm9tU3BlY2lmaWVyOiAoe1xuICAgIGltcDogeyBsaWJyYXJ5TmFtZSB9LFxuICAgIHNwZWM6IHsgc3BlY2lmaWVyLCBhbGlhcyB9LFxuICB9OiB7XG4gICAgaW1wOiB7IGxpYnJhcnlOYW1lOiBzdHJpbmcgfVxuICAgIHNwZWM6IHsgc3BlY2lmaWVyOiBzdHJpbmc7IGFsaWFzPzogc3RyaW5nIH1cbiAgfSk6IEltcG9ydFJlZmVyZW5jZSA9PiB7XG4gICAgcmV0dXJuIG5ldyBJbXBvcnRSZWZlcmVuY2Uoe1xuICAgICAgZmlsZVBhdGg6IGltcG9ydEV4dHJhY3Rvci5fcGF0aENsZWFudXAobGlicmFyeU5hbWUpLFxuICAgICAgbmFtZTogc3BlY2lmaWVyLFxuICAgICAgLi4uKGFsaWFzICYmIHsgYWxpYXMgfSksXG4gICAgfSlcbiAgfSxcbiAgX3BhdGhDbGVhbnVwOiAoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgY2xlYW5DdXJyRm9sZGVyID0gZmlsZVNlcnZpY2UuY2xlYW51cFBhdGgoZmlsZVBhdGgpXG4gICAgcmV0dXJuIGAke2NsZWFuQ3VyckZvbGRlcn0udHNgXG4gIH0sXG59XG4iXX0=