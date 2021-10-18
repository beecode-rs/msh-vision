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
    constructor(params) {
        this._fileName = 'vision.puml'; // TODO implement export file name variable
        this._pumlRelationStrings = [];
        const { appName, destinationPath } = params;
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
                    const printableEntity = this._printableStrategyFromEntity(e);
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
    _printableStrategyFromEntity(entity) {
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
    async print(params) {
        const { entities } = params;
        const template = new puml_document_1.PumlDocument();
        this._generateGroups(entities);
        template.addChildren(this._rootGroup);
        this._pumlRelationStrings.forEach((s) => template.addChildren(new puml_printable_wrapper_1.PumlPrintableWrapper(s)));
        await this._writeToFile(template.print());
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQseURBQW9EO0FBQ3BELHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQsaUVBQTREO0FBQzVELDJEQUFzRDtBQUN0RCx1REFBa0Q7QUFDbEQsMkRBQXNEO0FBRXRELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBQy9GLDJHQUFxRztBQUNyRyx3RUFBbUU7QUFFbkUsa0VBQTZEO0FBQzdELGdEQUE0QztBQUM1Qyw0Q0FBd0M7QUFFeEMsTUFBYSxTQUFTO0lBVXBCLFlBQVksTUFBcUQ7UUFSOUMsY0FBUyxHQUFHLGFBQWEsQ0FBQSxDQUFDLDJDQUEyQztRQUVyRSx5QkFBb0IsR0FBYSxFQUFFLENBQUE7UUFPcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDM0MsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLE9BQU87WUFDL0QsU0FBUyxFQUFFLGVBQWU7U0FDM0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQWJTLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBWTtRQUN2QyxNQUFNLDBCQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGdC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QUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUE4QjtRQUMvQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksNEJBQVksRUFBRSxDQUFBO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGO0FBeEVELDhCQXdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgRW50aXR5RW51bSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktZW51bSdcbmltcG9ydCB7IEVudGl0eUZpbGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWZpbGUnXG5pbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktdHlwZSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWNsYXNzJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUVudW0gfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW51bSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVGaWxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWZpbGUnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWludGVyZmFjZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtb2JqZWN0J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtdHlwZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVXcmFwcGVyIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXdyYXBwZXInXG5pbXBvcnQgeyBQdW1sRG9jdW1lbnQgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZG9jdW1lbnQnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cCdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lID0gJ3Zpc2lvbi5wdW1sJyAvLyBUT0RPIGltcGxlbWVudCBleHBvcnQgZmlsZSBuYW1lIHZhcmlhYmxlXG4gIHByb3RlY3RlZCBfcm9vdEdyb3VwOiBQdW1sR3JvdXBcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wdW1sUmVsYXRpb25TdHJpbmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGggfSA9IHBhcmFtc1xuICAgIGNvbnN0IGZhbGxiYWNrQXBwTmFtZSA9IGFwcE5hbWUgPz8gJydcbiAgICB0aGlzLl9kZXN0aW5hdGlvblBhdGggPSBkZXN0aW5hdGlvblBhdGhcbiAgICB0aGlzLl9yb290R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICAgIHR5cGU6IGFwcE5hbWUgPyBQdW1sR3JvdXBUeXBlLlJFQ1RBTkdMRSA6IFB1bWxHcm91cFR5cGUuRklDVElWRSxcbiAgICAgIGdyb3VwUGF0aDogZmFsbGJhY2tBcHBOYW1lLFxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5JblByb2plY3RQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cCB8IHVuZGVmaW5lZFxuICAgICAgLy8gbGV0IGZ1bGxHcm91cFBhdGg6IHN0cmluZ1xuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50R3JvdXAgPSBwcmV2R3JvdXAgPyBwcmV2R3JvdXAgOiB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSB0aGlzLl9wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KGVudGl0eTogRW50aXR5KTogUHVtbEVudGl0eSB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUNsYXNzOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVDbGFzcyh7IGVudGl0eTogZW50aXR5IGFzIEVudGl0eUNsYXNzIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUZpbGU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUZpbGUoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlGaWxlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdDpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlT2JqZWN0KHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5T2JqZWN0IH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUludGVyZmFjZTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlKHsgZW50aXR5OiBlbnRpdHkgYXMgRW50aXR5SW50ZXJmYWNlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eVR5cGU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZVR5cGUoeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlUeXBlIH0pXG4gICAgICBjYXNlIGVudGl0eSBpbnN0YW5jZW9mIEVudGl0eUVudW06XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUVudW0oeyBlbnRpdHk6IGVudGl0eSBhcyBFbnRpdHlFbnVtIH0pXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIud2FybihgVW5rbm93biBlbnRpdHkgdHlwZSAke2VudGl0eS5jb25zdHJ1Y3Rvci5uYW1lfWApXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHBhcmFtczogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgZW50aXRpZXMgfSA9IHBhcmFtc1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZSh0ZW1wbGF0ZS5wcmludCgpKVxuICB9XG59XG4iXX0=