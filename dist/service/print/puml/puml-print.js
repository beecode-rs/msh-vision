"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const entity_class_1 = require("src/model/entity-class");
const entity_enum_1 = require("src/model/entity-enum");
const entity_file_1 = require("src/model/entity-file");
const entity_interface_1 = require("src/model/entity-interface");
const entity_object_1 = require("src/model/entity-object");
const entity_type_1 = require("src/model/entity-type");
const file_service_1 = require("src/service/file-service");
const puml_printable_class_1 = require("src/service/print/puml/printable-entity/puml-printable-class");
const puml_printable_enum_1 = require("src/service/print/puml/printable-entity/puml-printable-enum");
const puml_printable_file_1 = require("src/service/print/puml/printable-entity/puml-printable-file");
const puml_printable_interface_1 = require("src/service/print/puml/printable-entity/puml-printable-interface");
const puml_printable_object_1 = require("src/service/print/puml/printable-entity/puml-printable-object");
const puml_printable_type_1 = require("src/service/print/puml/printable-entity/puml-printable-type");
const puml_printable_wrapper_1 = require("src/service/print/puml/printable-entity/puml-printable-wrapper");
const puml_document_1 = require("src/service/print/puml/puml-document");
const puml_group_1 = require("src/service/print/puml/puml-group");
const constant_1 = require("src/util/constant");
const logger_1 = require("src/util/logger");
class PumlPrint {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml'; // TODO implement export file name variable
        this._pumlRelationStrings = [];
        const fallbackAppName = appName ?? '';
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({
            name: fallbackAppName,
            type: appName ? puml_group_type_1.PumlGroupType.RECTANGLE : puml_group_type_1.PumlGroupType.FICTIVE,
            groupPath: fallbackAppName,
        });
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
            case entity instanceof entity_type_1.EntityType:
                return new puml_printable_type_1.PumlPrintableType({ entity: entity });
            case entity instanceof entity_enum_1.EntityEnum:
                return new puml_printable_enum_1.PumlPrintableEnum({ entity: entity });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQseURBQW9EO0FBQ3BELHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQsaUVBQTREO0FBQzVELDJEQUFzRDtBQUN0RCx1REFBa0Q7QUFDbEQsMkRBQXNEO0FBRXRELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBQy9GLDJHQUFxRztBQUNyRyx3RUFBbUU7QUFFbkUsa0VBQTZEO0FBQzdELGdEQUE0QztBQUM1Qyw0Q0FBd0M7QUFFeEMsTUFBYSxTQUFTO0lBVXBCLFlBQVksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFpRDtRQVJwRSxjQUFTLEdBQUcsYUFBYSxDQUFBLENBQUMsMkNBQTJDO1FBRXJFLHlCQUFvQixHQUFhLEVBQUUsQ0FBQTtRQU9wRCxNQUFNLGVBQWUsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUE7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsT0FBTztZQUMvRCxTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQUE7SUFDSixDQUFDO0lBWlMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sMEJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxT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QUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBMEI7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUE7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksNkNBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNGLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUF0RUQsOEJBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlDbGFzcyB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgeyBFbnRpdHlFbnVtIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1lbnVtJ1xuaW1wb3J0IHsgRW50aXR5RmlsZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktZmlsZSdcbmltcG9ydCB7IEVudGl0eUludGVyZmFjZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktaW50ZXJmYWNlJ1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS10eXBlJ1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnVtJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUZpbGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZmlsZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtaW50ZXJmYWNlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZU9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1vYmplY3QnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS10eXBlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1kb2N1bWVudCdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludCBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWUgPSAndmlzaW9uLnB1bWwnIC8vIFRPRE8gaW1wbGVtZW50IGV4cG9ydCBmaWxlIG5hbWUgdmFyaWFibGVcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGggfTogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX3Jvb3RHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogZmFsbGJhY2tBcHBOYW1lLFxuICAgICAgdHlwZTogYXBwTmFtZSA/IFB1bWxHcm91cFR5cGUuUkVDVEFOR0xFIDogUHVtbEdyb3VwVHlwZS5GSUNUSVZFLFxuICAgICAgZ3JvdXBQYXRoOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICAvLyBsZXQgZnVsbEdyb3VwUGF0aDogc3RyaW5nXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/IHByZXZHcm91cCA6IHRoaXMuX3Jvb3RHcm91cFxuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGNvbnN0IHByaW50YWJsZUVudGl0eSA9IHRoaXMuX3ByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eSh7IGVudGl0eTogZSB9KVxuICAgICAgICAgIGlmIChwcmludGFibGVFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MucHVzaChwcmludGFibGVFbnRpdHkucHJpbnRSZWxhdGlvbnMoKSlcbiAgICAgICAgICAgIHBhcmVudEdyb3VwLmFkZENoaWxkcmVuKHByaW50YWJsZUVudGl0eSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXRoID0gW3BhcmVudEdyb3VwLkdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IHBhcmVudEdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZ3JvdXBQYXRoLCB0eXBlOiBQdW1sR3JvdXBUeXBlLkZPTERFUiB9KVxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eSB9KTogUHVtbEVudGl0eSB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUNsYXNzOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVDbGFzcyh7IGVudGl0eTogZW50aXR5IGFzIEVudGl0eUNsYXNzIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUZpbGU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUZpbGUoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlGaWxlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdDpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlT2JqZWN0KHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5T2JqZWN0IH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUludGVyZmFjZTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlKHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5SW50ZXJmYWNlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eVR5cGU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZVR5cGUoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlUeXBlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUVudW06XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUVudW0oeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlFbnVtIH0pXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIud2FybihgVW5rbm93biBlbnRpdHkgdHlwZSAke2VudGl0eS5jb25zdHJ1Y3Rvci5uYW1lfWApXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZSh0ZW1wbGF0ZS5wcmludCgpKVxuICB9XG59XG4iXX0=