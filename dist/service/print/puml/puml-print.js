"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/printable-entity/puml-printable-entity-service");
const puml_document_1 = require("src/service/print/puml/puml-document");
const constant_1 = require("src/util/constant");
class PumlPrint {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml'; // TODO implement export file name variable
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({ name: appName, type: puml_group_type_1.PumlGroupType.FICTIVE, groupPath: appName });
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.InProjectPath.split(constant_1.constant.folderSep);
            let prevGroup;
            // let fullGroupPath: string
            paths.forEach((p, ix, list) => {
                const parentGroup = prevGroup ? prevGroup : this._rootGroup;
                if (ix === list.length - 1) {
                    const printableEntity = puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e });
                    if (printableEntity)
                        parentGroup.addChildren(printableEntity);
                    return;
                }
                if (list.length === 1)
                    return;
                const groupPath = [parentGroup.GroupPath, p].filter(Boolean).join(constant_1.constant.folderSep);
                const newGroup = parentGroup.groups[p] ?? new puml_group_1.PumlGroup({ name: p, groupPath, type: puml_group_type_1.PumlGroupType.FOLDER });
                parentGroup.groups[p] = newGroup;
                prevGroup = newGroup;
            });
        });
    }
    async print({ entities }) {
        const template = new puml_document_1.PumlDocument();
        this._generateGroups(entities);
        template.addChildren(this._rootGroup);
        // pumlRelationService.generateRelations(entities).forEach((r) => template.addChildren(r))
        await this._writeToFile(template.print());
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQsMkRBQXNEO0FBRXRELHdFQUFtRTtBQUNuRSx5SEFBa0g7QUFDbEgsd0VBQW1FO0FBRW5FLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFTcEIsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQWdEO1FBUG5FLGNBQVMsR0FBRyxhQUFhLENBQUEsQ0FBQywyQ0FBMkM7UUFRdEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLCtCQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3JHLENBQUM7SUFQUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFPUyxlQUFlLENBQUMsUUFBa0I7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkQsSUFBSSxTQUFnQyxDQUFBO1lBQ3BDLDRCQUE0QjtZQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7Z0JBQzNELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixNQUFNLGVBQWUsR0FBRywwREFBMEIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUM3RixJQUFJLGVBQWU7d0JBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtvQkFDN0QsT0FBTTtpQkFDUDtnQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFBRSxPQUFNO2dCQUM3QixNQUFNLFNBQVMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUNyRixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSwrQkFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7Z0JBQzNHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFBO2dCQUNoQyxTQUFTLEdBQUcsUUFBUSxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBMEI7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUE7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNyQywwRkFBMEY7UUFDMUYsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7Q0FDRjtBQTFDRCw4QkEwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sRG9jdW1lbnQgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZG9jdW1lbnQnXG5pbXBvcnQgeyBwdW1sUmVsYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9yZWxhdGlvbi9wdW1sLXJlbGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZSA9ICd2aXNpb24ucHVtbCcgLy8gVE9ETyBpbXBsZW1lbnQgZXhwb3J0IGZpbGUgbmFtZSB2YXJpYWJsZVxuICBwcm90ZWN0ZWQgX3Jvb3RHcm91cDogUHVtbEdyb3VwXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoIH06IHsgYXBwTmFtZTogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7IG5hbWU6IGFwcE5hbWUsIHR5cGU6IFB1bWxHcm91cFR5cGUuRklDVElWRSwgZ3JvdXBQYXRoOiBhcHBOYW1lIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5JblByb2plY3RQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cCB8IHVuZGVmaW5lZFxuICAgICAgLy8gbGV0IGZ1bGxHcm91cFBhdGg6IHN0cmluZ1xuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50R3JvdXAgPSBwcmV2R3JvdXAgPyBwcmV2R3JvdXAgOiB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSBwdW1sUHJpbnRhYmxlRW50aXR5U2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoeyBlbnRpdHk6IGUgfSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXRoID0gW3BhcmVudEdyb3VwLkdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IHBhcmVudEdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZ3JvdXBQYXRoLCB0eXBlOiBQdW1sR3JvdXBUeXBlLkZPTERFUiB9KVxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIC8vIHB1bWxSZWxhdGlvblNlcnZpY2UuZ2VuZXJhdGVSZWxhdGlvbnMoZW50aXRpZXMpLmZvckVhY2goKHIpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKHIpKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHRlbXBsYXRlLnByaW50KCkpXG4gIH1cbn1cbiJdfQ==