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
        const cleanCurrFolder = file_service_1.fileService.removeDotSlashFromRelativePath(filePath);
        return `${cleanCurrFolder}.ts`;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4dHJhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHlwZXNjcmlwdC1wYXJzZXIvaW1wb3J0LWV4dHJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBSXpDLFFBQUEsZUFBZSxHQUFHO0lBQzdCLE9BQU8sRUFBRSxDQUFDLElBQVUsRUFBcUIsRUFBRTtRQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDL0QsQ0FBQztJQUNELGFBQWEsRUFBRSxDQUFDLEdBQVcsRUFBcUIsRUFBRTtRQUNoRCwrR0FBK0c7UUFDL0csTUFBTSxVQUFVLEdBQUksR0FBbUIsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFBO1FBQ3hELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLE9BQU8sdUJBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELHVCQUF1QixFQUFFLENBQUMsRUFDeEIsR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQ3BCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FJM0IsRUFBbUIsRUFBRTtRQUNwQixPQUFPLElBQUksa0NBQWUsQ0FBQztZQUN6QixRQUFRLEVBQUUsdUJBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQ25ELElBQUksRUFBRSxTQUFTO1lBQ2YsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxZQUFZLEVBQUUsQ0FBQyxRQUFnQixFQUFVLEVBQUU7UUFDekMsTUFBTSxlQUFlLEdBQUcsMEJBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM1RSxPQUFPLEdBQUcsZUFBZSxLQUFLLENBQUE7SUFDaEMsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbXBvcnRSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvaW1wb3J0LXJlZmVyZW5jZSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgRmlsZSwgSW1wb3J0IH0gZnJvbSAndHlwZXNjcmlwdC1wYXJzZXInXG5pbXBvcnQgeyBOYW1lZEltcG9ydCB9IGZyb20gJ3R5cGVzY3JpcHQtcGFyc2VyL2ltcG9ydHMvTmFtZWRJbXBvcnQnXG5cbmV4cG9ydCBjb25zdCBpbXBvcnRFeHRyYWN0b3IgPSB7XG4gIGV4dHJhY3Q6IChmaWxlOiBGaWxlKTogSW1wb3J0UmVmZXJlbmNlW10gPT4ge1xuICAgIHJldHVybiBmaWxlLmltcG9ydHMubWFwKGltcG9ydEV4dHJhY3Rvci5fcGFyc2VJbXBvcnRzKS5mbGF0KClcbiAgfSxcbiAgX3BhcnNlSW1wb3J0czogKGltcDogSW1wb3J0KTogSW1wb3J0UmVmZXJlbmNlW10gPT4ge1xuICAgIC8vIHJldHVybiAoaW1wIGFzIE5hbWVkSW1wb3J0KS5zcGVjaWZpZXJzLm1hcCgoc3BlYykgPT4gaW1wb3J0RXh0cmFjdG9yLl9pbXBvcnRSZWZGcm9tU3BlY2lmaWVyKHsgaW1wLCBzcGVjIH0pKVxuICAgIGNvbnN0IHNwZWNpZmllcnMgPSAoaW1wIGFzIE5hbWVkSW1wb3J0KS5zcGVjaWZpZXJzID8/IFtdXG4gICAgcmV0dXJuIHNwZWNpZmllcnMubWFwKChzcGVjKSA9PiB7XG4gICAgICByZXR1cm4gaW1wb3J0RXh0cmFjdG9yLl9pbXBvcnRSZWZGcm9tU3BlY2lmaWVyKHsgaW1wLCBzcGVjIH0pXG4gICAgfSlcbiAgfSxcbiAgX2ltcG9ydFJlZkZyb21TcGVjaWZpZXI6ICh7XG4gICAgaW1wOiB7IGxpYnJhcnlOYW1lIH0sXG4gICAgc3BlYzogeyBzcGVjaWZpZXIsIGFsaWFzIH0sXG4gIH06IHtcbiAgICBpbXA6IHsgbGlicmFyeU5hbWU6IHN0cmluZyB9XG4gICAgc3BlYzogeyBzcGVjaWZpZXI6IHN0cmluZzsgYWxpYXM/OiBzdHJpbmcgfVxuICB9KTogSW1wb3J0UmVmZXJlbmNlID0+IHtcbiAgICByZXR1cm4gbmV3IEltcG9ydFJlZmVyZW5jZSh7XG4gICAgICBmaWxlUGF0aDogaW1wb3J0RXh0cmFjdG9yLl9wYXRoQ2xlYW51cChsaWJyYXJ5TmFtZSksXG4gICAgICBuYW1lOiBzcGVjaWZpZXIsXG4gICAgICAuLi4oYWxpYXMgJiYgeyBhbGlhcyB9KSxcbiAgICB9KVxuICB9LFxuICBfcGF0aENsZWFudXA6IChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBjbGVhbkN1cnJGb2xkZXIgPSBmaWxlU2VydmljZS5yZW1vdmVEb3RTbGFzaEZyb21SZWxhdGl2ZVBhdGgoZmlsZVBhdGgpXG4gICAgcmV0dXJuIGAke2NsZWFuQ3VyckZvbGRlcn0udHNgXG4gIH0sXG59XG4iXX0=