"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintStrategy = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/puml-group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/puml-printable-entity/puml-printable-entity-service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsNkVBQXdFO0FBQ3hFLDhIQUF1SDtBQUN2SCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBaUI7SUFTNUIsWUFBWSxFQUFFLGVBQWUsRUFBK0I7UUFQekMsY0FBUyxHQUFHLGFBQWEsQ0FBQTtRQUNsQyxZQUFPLEdBQStCLEVBQUUsQ0FBQTtRQU9oRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO0lBQ3pDLENBQUM7SUFOUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFNUyxlQUFlLENBQUMsUUFBa0I7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25DLElBQUksU0FBb0IsQ0FBQTtZQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsT0FBTTtnQkFDN0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO2dCQUMxRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsU0FBUyxDQUFDLFdBQVcsQ0FBQywwREFBMEIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzVGLE9BQU07aUJBQ1A7Z0JBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ25FLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQ3BCLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUEwQjtRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUFyQ0QsOENBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwL3B1bWwtZ3JvdXAnXG5pbXBvcnQgeyBwdW1sUHJpbnRhYmxlRW50aXR5U2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWVudGl0eS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHVtbFRlbXBsYXRlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLXRlbXBsYXRlJ1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50U3RyYXRlZ3kgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lID0gJ3Zpc2lvbi5wdW1sJ1xuICBwcm90ZWN0ZWQgX2dyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0gPSB7fVxuXG4gIHByb3RlY3RlZCBhc3luYyBfd3JpdGVUb0ZpbGUoZGF0YTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZmlsZVNlcnZpY2UubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IGRlc3RpbmF0aW9uUGF0aCB9OiB7IGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9kZXN0aW5hdGlvblBhdGggPSBkZXN0aW5hdGlvblBhdGhcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLmZpbGVQYXRoLnNwbGl0KCcvJylcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cFxuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBzID0gcHJldkdyb3VwID8gcHJldkdyb3VwLmdyb3VwcyA6IHRoaXMuX2dyb3Vwc1xuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHByZXZHcm91cC5hZGRDaGlsZHJlbihwdW1sUHJpbnRhYmxlRW50aXR5U2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoeyBlbnRpdHk6IGUgfSkpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGxldmVsOiBpeCB9KVxuICAgICAgICBncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxUZW1wbGF0ZSgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9ncm91cHMpLmZvckVhY2goKGcpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKGcpKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHRlbXBsYXRlLnByaW50KCkpXG4gIH1cbn1cbiJdfQ==