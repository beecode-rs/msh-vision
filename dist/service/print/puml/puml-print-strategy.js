"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintStrategy = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/printable-entity/puml-printable-entity-service");
const puml_template_1 = require("src/service/print/puml/puml-template");
class PumlPrintStrategy {
    constructor({ destinationPath }) {
        this._fileName = 'vision.puml';
        this._groups = {};
        this._destinationPath = destinationPath;
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.filePath.split('/');
            let prevGroup;
            paths.forEach((p, ix, list) => {
                if (list.length === 1)
                    return;
                const groups = prevGroup ? prevGroup.groups : this._groups;
                if (ix === list.length - 1) {
                    prevGroup.addChildren(puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }));
                    return;
                }
                const newGroup = groups[p] ?? new puml_group_1.PumlGroup({ name: p, level: ix });
                groups[p] = newGroup;
                prevGroup = newGroup;
            });
        });
    }
    async print({ entities }) {
        const template = new puml_template_1.PumlTemplate();
        this._generateGroups(entities);
        Object.values(this._groups).forEach((g) => template.addChildren(g));
        await this._writeToFile(template.print());
    }
}
exports.PumlPrintStrategy = PumlPrintStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsd0VBQW1FO0FBQ25FLHlIQUFrSDtBQUNsSCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBaUI7SUFTNUIsWUFBWSxFQUFFLGVBQWUsRUFBK0I7UUFQekMsY0FBUyxHQUFHLGFBQWEsQ0FBQTtRQUNsQyxZQUFPLEdBQStCLEVBQUUsQ0FBQTtRQU9oRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO0lBQ3pDLENBQUM7SUFOUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFNUyxlQUFlLENBQUMsUUFBa0I7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25DLElBQUksU0FBb0IsQ0FBQTtZQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsT0FBTTtnQkFDN0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO2dCQUMxRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsU0FBUyxDQUFDLFdBQVcsQ0FBQywwREFBMEIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzVGLE9BQU07aUJBQ1A7Z0JBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ25FLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUEwQjtRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUFyQ0QsOENBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sVGVtcGxhdGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtdGVtcGxhdGUnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRTdHJhdGVneSBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWUgPSAndmlzaW9uLnB1bWwnXG4gIHByb3RlY3RlZCBfZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBQdW1sR3JvdXAgfSA9IHt9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgZGVzdGluYXRpb25QYXRoIH06IHsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllczogRW50aXR5W10pOiB2b2lkIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBjb25zdCBwYXRocyA9IGUuZmlsZVBhdGguc3BsaXQoJy8nKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVyblxuICAgICAgICBjb25zdCBncm91cHMgPSBwcmV2R3JvdXAgPyBwcmV2R3JvdXAuZ3JvdXBzIDogdGhpcy5fZ3JvdXBzXG4gICAgICAgIGlmIChpeCA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcHJldkdyb3VwLmFkZENoaWxkcmVuKHB1bWxQcmludGFibGVFbnRpdHlTZXJ2aWNlLnByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eSh7IGVudGl0eTogZSB9KSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IGdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgbGV2ZWw6IGl4IH0pXG4gICAgICAgIGdyb3Vwc1twXSA9IG5ld0dyb3VwXG4gICAgICAgIHByZXZHcm91cCA9IG5ld0dyb3VwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQoeyBlbnRpdGllcyB9OiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbFRlbXBsYXRlKClcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllcylcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuX2dyb3VwcykuZm9yRWFjaCgoZykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4oZykpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxufVxuIl19