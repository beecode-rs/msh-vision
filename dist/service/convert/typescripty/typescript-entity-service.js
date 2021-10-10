"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptEntityService = void 0;
const entity_1 = require("src/model/entity");
const file_service_1 = require("src/service/file-service");
exports.typescriptEntityService = {
    extractEntitiesFromFile: (file, filePath) => {
        const entities = [];
        const exportedConsts = file.declarations.filter((d) => d.isExported && d.isConst);
        if (exportedConsts.length > 0) {
            entities.push(...exportedConsts.map((ec) => new entity_1.Entity({ filePath, name: ec.name })));
        }
        else {
            const name = file_service_1.fileService.fileNameFromPath(filePath);
            entities.push(new entity_1.Entity({ filePath, name }));
        }
        return entities;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC1lbnRpdHktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbnZlcnQvdHlwZXNjcmlwdHkvdHlwZXNjcmlwdC1lbnRpdHktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBR3pDLFFBQUEsdUJBQXVCLEdBQUc7SUFDckMsdUJBQXVCLEVBQUUsQ0FBQyxJQUFVLEVBQUUsUUFBZ0IsRUFBWSxFQUFFO1FBQ2xFLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQTtRQUM3QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdEYsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxlQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0RjthQUFNO1lBQ0wsTUFBTSxJQUFJLEdBQUcsMEJBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksZUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUM5QztRQUNELE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgRmlsZSB9IGZyb20gJ3R5cGVzY3JpcHQtcGFyc2VyJ1xuXG5leHBvcnQgY29uc3QgdHlwZXNjcmlwdEVudGl0eVNlcnZpY2UgPSB7XG4gIGV4dHJhY3RFbnRpdGllc0Zyb21GaWxlOiAoZmlsZTogRmlsZSwgZmlsZVBhdGg6IHN0cmluZyk6IEVudGl0eVtdID0+IHtcbiAgICBjb25zdCBlbnRpdGllczogRW50aXR5W10gPSBbXVxuICAgIGNvbnN0IGV4cG9ydGVkQ29uc3RzID0gZmlsZS5kZWNsYXJhdGlvbnMuZmlsdGVyKChkOiBhbnkpID0+IGQuaXNFeHBvcnRlZCAmJiBkLmlzQ29uc3QpXG4gICAgaWYgKGV4cG9ydGVkQ29uc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVudGl0aWVzLnB1c2goLi4uZXhwb3J0ZWRDb25zdHMubWFwKChlYykgPT4gbmV3IEVudGl0eSh7IGZpbGVQYXRoLCBuYW1lOiBlYy5uYW1lIH0pKSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmFtZSA9IGZpbGVTZXJ2aWNlLmZpbGVOYW1lRnJvbVBhdGgoZmlsZVBhdGgpXG4gICAgICBlbnRpdGllcy5wdXNoKG5ldyBFbnRpdHkoeyBmaWxlUGF0aCwgbmFtZSB9KSlcbiAgICB9XG4gICAgcmV0dXJuIGVudGl0aWVzXG4gIH0sXG59XG4iXX0=