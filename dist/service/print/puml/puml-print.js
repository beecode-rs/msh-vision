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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQseURBQW9EO0FBQ3BELHVEQUFrRDtBQUNsRCxpRUFBNEQ7QUFDNUQsMkRBQXNEO0FBQ3RELDJEQUFzRDtBQUV0RCx1R0FBaUc7QUFDakcscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcsMkdBQXFHO0FBQ3JHLHdFQUFtRTtBQUVuRSxrRUFBNkQ7QUFDN0QsZ0RBQTRDO0FBQzVDLDRDQUF3QztBQUV4QyxNQUFhLFNBQVM7SUFVcEIsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQWlEO1FBUnBFLGNBQVMsR0FBRyxhQUFhLENBQUEsQ0FBQywyQ0FBMkM7UUFFckUseUJBQW9CLEdBQWEsRUFBRSxDQUFBO1FBT3BELE1BQU0sZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxPQUFPO1lBQy9ELFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFaUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFZUyxlQUFlLENB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LENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGO0FBbEVELDhCQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgRW50aXR5RmlsZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktZmlsZSdcbmltcG9ydCB7IEVudGl0eUludGVyZmFjZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktaW50ZXJmYWNlJ1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB7IFByaW50U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludC1zdHJhdGVneSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVDbGFzcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1jbGFzcydcbmltcG9ydCB7IFB1bWxQcmludGFibGVGaWxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWZpbGUnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWludGVyZmFjZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtb2JqZWN0J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1kb2N1bWVudCdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludCBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWUgPSAndmlzaW9uLnB1bWwnIC8vIFRPRE8gaW1wbGVtZW50IGV4cG9ydCBmaWxlIG5hbWUgdmFyaWFibGVcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGggfTogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX3Jvb3RHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogZmFsbGJhY2tBcHBOYW1lLFxuICAgICAgdHlwZTogYXBwTmFtZSA/IFB1bWxHcm91cFR5cGUuUkVDVEFOR0xFIDogUHVtbEdyb3VwVHlwZS5GSUNUSVZFLFxuICAgICAgZ3JvdXBQYXRoOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICAvLyBsZXQgZnVsbEdyb3VwUGF0aDogc3RyaW5nXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/IHByZXZHcm91cCA6IHRoaXMuX3Jvb3RHcm91cFxuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGNvbnN0IHByaW50YWJsZUVudGl0eSA9IHRoaXMuX3ByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eSh7IGVudGl0eTogZSB9KVxuICAgICAgICAgIGlmIChwcmludGFibGVFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MucHVzaChwcmludGFibGVFbnRpdHkucHJpbnRSZWxhdGlvbnMoKSlcbiAgICAgICAgICAgIHBhcmVudEdyb3VwLmFkZENoaWxkcmVuKHByaW50YWJsZUVudGl0eSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXRoID0gW3BhcmVudEdyb3VwLkdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IHBhcmVudEdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZ3JvdXBQYXRoLCB0eXBlOiBQdW1sR3JvdXBUeXBlLkZPTERFUiB9KVxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eSB9KTogUHVtbEVudGl0eSB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUNsYXNzOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVDbGFzcyh7IGVudGl0eTogZW50aXR5IGFzIEVudGl0eUNsYXNzIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUZpbGU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUZpbGUoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlGaWxlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdDpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlT2JqZWN0KHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5T2JqZWN0IH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUludGVyZmFjZTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlKHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5SW50ZXJmYWNlIH0pXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIud2FybihgVW5rbm93biBlbnRpdHkgdHlwZSAke2VudGl0eS5jb25zdHJ1Y3Rvci5uYW1lfWApXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZSh0ZW1wbGF0ZS5wcmludCgpKVxuICB9XG59XG4iXX0=