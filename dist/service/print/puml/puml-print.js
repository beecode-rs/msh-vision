"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/printable-entity/puml-printable-entity-service");
const puml_template_1 = require("src/service/print/puml/puml-template");
const puml_relation_service_1 = require("src/service/print/puml/relation/puml-relation-service");
class PumlPrint {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml';
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({ name: appName, level: 0 });
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.filePath.split('/');
            let prevGroup;
            paths.forEach((p, ix, list) => {
                const group = prevGroup ? prevGroup : this._rootGroup;
                if (ix === list.length - 1) {
                    group.addChildren(puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }));
                    return;
                }
                if (list.length === 1)
                    return;
                const newGroup = group.groups[p] ?? new puml_group_1.PumlGroup({ name: p, level: ix + 1 });
                group.groups[p] = newGroup;
                prevGroup = newGroup;
            });
        });
    }
    async print({ entities }) {
        const template = new puml_template_1.PumlTemplate();
        this._generateGroups(entities);
        template.addChildren(this._rootGroup);
        puml_relation_service_1.pumlRelationService.generateRelations(entities).forEach((r) => template.addChildren(r));
        await this._writeToFile(template.print());
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsd0VBQW1FO0FBQ25FLHlIQUFrSDtBQUNsSCx3RUFBbUU7QUFDbkUsaUdBQTJGO0FBRTNGLE1BQWEsU0FBUztJQVNwQixZQUFZLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBZ0Q7UUFQbkUsY0FBUyxHQUFHLGFBQWEsQ0FBQTtRQVExQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBUFMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sMEJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUM5RyxDQUFDO0lBT1MsZUFBZSxDQUFDLFFBQWtCO1FBQzFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNuQyxJQUFJLFNBQW9CLENBQUE7WUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO2dCQUNyRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQywwREFBMEIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQ3hGLE9BQU07aUJBQ1A7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsT0FBTTtnQkFDN0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLHNCQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDN0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQzFCLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUEwQjtRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3JDLDJDQUFtQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUF2Q0QsOEJBdUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sVGVtcGxhdGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtdGVtcGxhdGUnXG5pbXBvcnQgeyBwdW1sUmVsYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9yZWxhdGlvbi9wdW1sLXJlbGF0aW9uLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lID0gJ3Zpc2lvbi5wdW1sJ1xuICBwcm90ZWN0ZWQgX3Jvb3RHcm91cDogUHVtbEdyb3VwXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoIH06IHsgYXBwTmFtZTogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7IG5hbWU6IGFwcE5hbWUsIGxldmVsOiAwIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5maWxlUGF0aC5zcGxpdCgnLycpXG4gICAgICBsZXQgcHJldkdyb3VwOiBQdW1sR3JvdXBcbiAgICAgIHBhdGhzLmZvckVhY2goKHAsIGl4LCBsaXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gcHJldkdyb3VwID8gcHJldkdyb3VwIDogdGhpcy5fcm9vdEdyb3VwXG4gICAgICAgIGlmIChpeCA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ2hpbGRyZW4ocHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UucHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KHsgZW50aXR5OiBlIH0pKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IG5ld0dyb3VwID0gZ3JvdXAuZ3JvdXBzW3BdID8/IG5ldyBQdW1sR3JvdXAoeyBuYW1lOiBwLCBsZXZlbDogaXggKyAxIH0pXG4gICAgICAgIGdyb3VwLmdyb3Vwc1twXSA9IG5ld0dyb3VwXG4gICAgICAgIHByZXZHcm91cCA9IG5ld0dyb3VwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQoeyBlbnRpdGllcyB9OiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbFRlbXBsYXRlKClcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllcylcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgcHVtbFJlbGF0aW9uU2VydmljZS5nZW5lcmF0ZVJlbGF0aW9ucyhlbnRpdGllcykuZm9yRWFjaCgocikgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4ocikpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxufVxuIl19