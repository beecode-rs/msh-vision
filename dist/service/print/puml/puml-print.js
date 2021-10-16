"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const entity_class_1 = require("src/model/entity-class");
const entity_file_1 = require("src/model/entity-file");
const entity_interface_1 = require("src/model/entity-interface");
const entity_object_1 = require("src/model/entity-object");
const file_service_1 = require("src/service/file-service");
const puml_printable_class_1 = require("src/service/print/puml/printable-entity/puml-printable-class");
const puml_printable_file_1 = require("src/service/print/puml/printable-entity/puml-printable-file");
const puml_printable_interface_1 = require("src/service/print/puml/printable-entity/puml-printable-interface");
const puml_printable_object_1 = require("src/service/print/puml/printable-entity/puml-printable-object");
const puml_printable_wrapper_1 = require("src/service/print/puml/printable-entity/puml-printable-wrapper");
const puml_document_1 = require("src/service/print/puml/puml-document");
const puml_group_1 = require("src/service/print/puml/puml-group");
const constant_1 = require("src/util/constant");
const logger_1 = require("src/util/logger");
class PumlPrint {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml'; // TODO implement export file name variable
        this._pumlRelationStrings = [];
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
                    const printableEntity = this._printableStrategyFromEntity({ entity: e });
                    if (printableEntity) {
                        this._pumlRelationStrings.push(printableEntity.printRelations());
                        parentGroup.addChildren(printableEntity);
                    }
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
    _printableStrategyFromEntity({ entity }) {
        switch (true) {
            case entity instanceof entity_class_1.EntityClass:
                return new puml_printable_class_1.PumlPrintableClass({ entity: entity });
            case entity instanceof entity_file_1.EntityFile:
                return new puml_printable_file_1.PumlPrintableFile({ entity: entity });
            case entity instanceof entity_object_1.EntityObject:
                return new puml_printable_object_1.PumlPrintableObject({ entity: entity });
            case entity instanceof entity_interface_1.EntityInterface:
                return new puml_printable_interface_1.PumlPrintableInterface({ entity: entity });
            default:
                logger_1.logger.warn(`Unknown entity type ${entity.constructor.name}`);
        }
    }
    async print({ entities }) {
        const template = new puml_document_1.PumlDocument();
        this._generateGroups(entities);
        template.addChildren(this._rootGroup);
        this._pumlRelationStrings.forEach((s) => template.addChildren(new puml_printable_wrapper_1.PumlPrintableWrapper(s)));
        await this._writeToFile(template.print());
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQseURBQW9EO0FBQ3BELHVEQUFrRDtBQUNsRCxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELDJEQUFzRDtBQUV0RCx1R0FBaUc7QUFDakcscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcsMkdBQXFHO0FBQ3JHLHdFQUFtRTtBQUVuRSxrRUFBNkQ7QUFDN0QsZ0RBQTRDO0FBQzVDLDRDQUF3QztBQUV4QyxNQUFhLFNBQVM7SUFVcEIsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQWdEO1FBUm5FLGNBQVMsR0FBRyxhQUFhLENBQUEsQ0FBQywyQ0FBMkM7UUFFckUseUJBQW9CLEdBQWEsRUFBRSxDQUFBO1FBT3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUE7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHNCQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSwrQkFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUNyRyxDQUFDO0lBUFMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sMEJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUM5RyxDQUFDO0lBT1MsZUFBZSxDQUFDLFFBQWtCO1FBQzFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3ZELElBQUksU0FBZ0MsQ0FBQTtZQUNwQyw0QkFBNEI7WUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzVCLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFBO2dCQUMzRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ3hFLElBQUksZUFBZSxFQUFFO3dCQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO3dCQUNoRSxXQUFXLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFBO3FCQUN6QztvQkFDRCxPQUFNO2lCQUNQO2dCQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDO29CQUFFLE9BQU07Z0JBQzdCLE1BQU0sU0FBUyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JGLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxzQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLCtCQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtnQkFDM0csV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUE7Z0JBQ2hDLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFUyw0QkFBNEIsQ0FBQyxFQUFFLE1BQU0sRUFBc0I7UUFDbkUsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLE1BQU0sWUFBWSwwQkFBVztnQkFDaEMsT0FBTyxJQUFJLHlDQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQXFCLEVBQUUsQ0FBQyxDQUFBO1lBQ2xFLEtBQUssTUFBTSxZQUFZLHdCQUFVO2dCQUMvQixPQUFPLElBQUksdUNBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBb0IsRUFBRSxDQUFDLENBQUE7WUFDaEUsS0FBSyxNQUFNLFlBQVksNEJBQVk7Z0JBQ2pDLE9BQU8sSUFBSSwyQ0FBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFzQixFQUFFLENBQUMsQ0FBQTtZQUNwRSxLQUFLLE1BQU0sWUFBWSxrQ0FBZTtnQkFDcEMsT0FBTyxJQUFJLGlEQUFzQixDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQXlCLEVBQUUsQ0FBQyxDQUFBO1lBQzFFO2dCQUNFLGVBQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtTQUNoRTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUEwQjtRQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSw2Q0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0YsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7Q0FDRjtBQTdERCw4QkE2REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eUNsYXNzIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1jbGFzcydcbmltcG9ydCB7IEVudGl0eUZpbGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWZpbGUnXG5pbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRmlsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1pbnRlcmZhY2UnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlT2JqZWN0IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLW9iamVjdCdcbmltcG9ydCB7IFB1bWxQcmludGFibGVXcmFwcGVyIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXdyYXBwZXInXG5pbXBvcnQgeyBQdW1sRG9jdW1lbnQgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZG9jdW1lbnQnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cCdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lID0gJ3Zpc2lvbi5wdW1sJyAvLyBUT0RPIGltcGxlbWVudCBleHBvcnQgZmlsZSBuYW1lIHZhcmlhYmxlXG4gIHByb3RlY3RlZCBfcm9vdEdyb3VwOiBQdW1sR3JvdXBcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wdW1sUmVsYXRpb25TdHJpbmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoIH06IHsgYXBwTmFtZTogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7IG5hbWU6IGFwcE5hbWUsIHR5cGU6IFB1bWxHcm91cFR5cGUuRklDVElWRSwgZ3JvdXBQYXRoOiBhcHBOYW1lIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5JblByb2plY3RQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cCB8IHVuZGVmaW5lZFxuICAgICAgLy8gbGV0IGZ1bGxHcm91cFBhdGg6IHN0cmluZ1xuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50R3JvdXAgPSBwcmV2R3JvdXAgPyBwcmV2R3JvdXAgOiB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSB0aGlzLl9wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoeyBlbnRpdHk6IGUgfSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KHsgZW50aXR5IH06IHsgZW50aXR5OiBFbnRpdHkgfSk6IFB1bWxFbnRpdHkgfCB1bmRlZmluZWQge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlDbGFzczpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlQ2xhc3MoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlDbGFzcyB9KVxuICAgICAgY2FzZSBlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlGaWxlOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVGaWxlKHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5RmlsZSB9KVxuICAgICAgY2FzZSBlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlPYmplY3Q6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZU9iamVjdCh7IGVudGl0eTogZW50aXR5IGFzIEVudGl0eU9iamVjdCB9KVxuICAgICAgY2FzZSBlbnRpdHkgaW5zdGFuY2VvZiBFbnRpdHlJbnRlcmZhY2U6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUludGVyZmFjZSh7IGVudGl0eTogZW50aXR5IGFzIEVudGl0eUludGVyZmFjZSB9KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gZW50aXR5IHR5cGUgJHtlbnRpdHkuY29uc3RydWN0b3IubmFtZX1gKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmludCh7IGVudGl0aWVzIH06IHsgZW50aXRpZXM6IEVudGl0eVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IG5ldyBQdW1sRG9jdW1lbnQoKVxuICAgIHRoaXMuX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzKVxuICAgIHRlbXBsYXRlLmFkZENoaWxkcmVuKHRoaXMuX3Jvb3RHcm91cClcbiAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLmZvckVhY2goKHMpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKG5ldyBQdW1sUHJpbnRhYmxlV3JhcHBlcihzKSkpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxufVxuIl19