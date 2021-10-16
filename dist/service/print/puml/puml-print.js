"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/printable-entity/puml-printable-entity-service");
const puml_template_1 = require("src/service/print/puml/puml-template");
const puml_relation_service_1 = require("src/service/print/puml/relation/puml-relation-service");
const constant_1 = require("src/util/constant");
class PumlPrint {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml'; // TODO implement export file name variable
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({ name: appName, type: puml_group_1.PumlGroupType.RECTANGLE, fullGroupPath: appName });
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.filePath.split(constant_1.constant.folderSep);
            let prevGroup;
            let fullGroupPath;
            paths.forEach((p, ix, list) => {
                const group = prevGroup ? prevGroup : this._rootGroup;
                if (ix === list.length - 1) {
                    group.addChildren(puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }));
                    return;
                }
                if (list.length === 1)
                    return;
                fullGroupPath = [fullGroupPath, p].filter(Boolean).join(constant_1.constant.folderSep);
                const newGroup = group.groups[p] ?? new puml_group_1.PumlGroup({ name: p, fullGroupPath });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsd0VBQWtGO0FBQ2xGLHlIQUFrSDtBQUNsSCx3RUFBbUU7QUFDbkUsaUdBQTJGO0FBQzNGLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFTcEIsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQWdEO1FBUG5FLGNBQVMsR0FBRyxhQUFhLENBQUEsQ0FBQywyQ0FBMkM7UUFRdEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLDBCQUFhLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzNHLENBQUM7SUFQUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFPUyxlQUFlLENBQUMsUUFBa0I7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDbEQsSUFBSSxTQUFvQixDQUFBO1lBQ3hCLElBQUksYUFBcUIsQ0FBQTtZQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7Z0JBQ3JELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixLQUFLLENBQUMsV0FBVyxDQUFDLDBEQUEwQixDQUFDLDJCQUEyQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDeEYsT0FBTTtpQkFDUDtnQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFBRSxPQUFNO2dCQUM3QixhQUFhLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUMzRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQTtnQkFDN0UsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQzFCLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUEwQjtRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3JDLDJDQUFtQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUF6Q0QsOEJBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbEdyb3VwLCBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sVGVtcGxhdGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtdGVtcGxhdGUnXG5pbXBvcnQgeyBwdW1sUmVsYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9yZWxhdGlvbi9wdW1sLXJlbGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZSA9ICd2aXNpb24ucHVtbCcgLy8gVE9ETyBpbXBsZW1lbnQgZXhwb3J0IGZpbGUgbmFtZSB2YXJpYWJsZVxuICBwcm90ZWN0ZWQgX3Jvb3RHcm91cDogUHVtbEdyb3VwXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoIH06IHsgYXBwTmFtZTogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7IG5hbWU6IGFwcE5hbWUsIHR5cGU6IFB1bWxHcm91cFR5cGUuUkVDVEFOR0xFLCBmdWxsR3JvdXBQYXRoOiBhcHBOYW1lIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5maWxlUGF0aC5zcGxpdChjb25zdGFudC5mb2xkZXJTZXApXG4gICAgICBsZXQgcHJldkdyb3VwOiBQdW1sR3JvdXBcbiAgICAgIGxldCBmdWxsR3JvdXBQYXRoOiBzdHJpbmdcbiAgICAgIHBhdGhzLmZvckVhY2goKHAsIGl4LCBsaXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gcHJldkdyb3VwID8gcHJldkdyb3VwIDogdGhpcy5fcm9vdEdyb3VwXG4gICAgICAgIGlmIChpeCA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgZ3JvdXAuYWRkQ2hpbGRyZW4ocHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UucHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KHsgZW50aXR5OiBlIH0pKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGZ1bGxHcm91cFBhdGggPSBbZnVsbEdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IGdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZnVsbEdyb3VwUGF0aCB9KVxuICAgICAgICBncm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxUZW1wbGF0ZSgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHB1bWxSZWxhdGlvblNlcnZpY2UuZ2VuZXJhdGVSZWxhdGlvbnMoZW50aXRpZXMpLmZvckVhY2goKHIpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKHIpKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHRlbXBsYXRlLnByaW50KCkpXG4gIH1cbn1cbiJdfQ==