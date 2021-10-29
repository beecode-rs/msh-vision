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
            paths.forEach((p, ix, list) => {
                const parentGroup = prevGroup ?? this._rootGroup;
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
            case entity.Meta instanceof entity_class_1.EntityClass:
                return new puml_printable_class_1.PumlPrintableClass({ entity });
            case entity.Meta instanceof entity_file_1.EntityFile:
                return new puml_printable_file_1.PumlPrintableFile({ entity });
            case entity.Meta instanceof entity_object_1.EntityObject:
                return new puml_printable_object_1.PumlPrintableObject({ entity });
            case entity.Meta instanceof entity_interface_1.EntityInterface:
                return new puml_printable_interface_1.PumlPrintableInterface({ entity });
            case entity.Meta instanceof entity_type_1.EntityType:
                return new puml_printable_type_1.PumlPrintableType({ entity });
            case entity.Meta instanceof entity_enum_1.EntityEnum:
                return new puml_printable_enum_1.PumlPrintableEnum({ entity });
            default:
                logger_1.logger.warn(`Unknown entity type ${entity.constructor.name}`);
        }
    }
    async print(params) {
        const { entities } = params;
        this._generateGroups(entities);
        this._flattenGroups(this._rootGroup);
        const template = new puml_document_1.PumlDocument();
        template.addChildren(this._rootGroup);
        this._pumlRelationStrings.forEach((s) => template.addChildren(new puml_printable_wrapper_1.PumlPrintableWrapper(s)));
        await this._writeToFile(template.print());
    }
    _flattenGroups(group) {
        const groups = Object.values(group.groups);
        if (group.Type === puml_group_type_1.PumlGroupType.FICTIVE || group.Children.length > 0 || groups.length > 1) {
            Object.entries(group.groups).forEach(([name, grp]) => {
                const result = this._flattenGroups(grp);
                if (result)
                    group.groups[name] = result;
            });
            return;
        }
        if (groups.length === 0)
            return;
        const childGroup = groups[0];
        const flatGroup = new puml_group_1.PumlGroup({
            name: [group.Name, childGroup.Name].join(constant_1.constant.folderSep),
            type: group.Type,
            groupPath: childGroup.GroupPath,
        });
        childGroup.Children.forEach((cg) => flatGroup.addChildren(cg));
        return flatGroup;
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFFeEQseURBQW9EO0FBQ3BELHVEQUFrRDtBQUNsRCx1REFBa0Q7QUFDbEQsaUVBQTREO0FBQzVELDJEQUFzRDtBQUN0RCx1REFBa0Q7QUFDbEQsMkRBQXNEO0FBRXRELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBQy9GLDJHQUFxRztBQUNyRyx3RUFBbUU7QUFFbkUsa0VBQTZEO0FBQzdELGdEQUE0QztBQUM1Qyw0Q0FBd0M7QUFFeEMsTUFBYSxTQUFTO0lBVXBCLFlBQVksTUFBcUQ7UUFSOUMsY0FBUyxHQUFHLGFBQWEsQ0FBQSxDQUFDLDJDQUEyQztRQUVyRSx5QkFBb0IsR0FBYSxFQUFFLENBQUE7UUFPcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDM0MsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLE9BQU87WUFDL0QsU0FBUyxFQUFFLGVBQWU7U0FDM0IsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQWJTLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBWTtRQUN2QyxNQUFNLDBCQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGdC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TUFBTSxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDO1lBQzVELElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5RCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUE1RkQsOEJBNEZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlDbGFzcyB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktY2xhc3MnXG5pbXBvcnQgeyBFbnRpdHlFbnVtIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1lbnVtJ1xuaW1wb3J0IHsgRW50aXR5RmlsZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktZmlsZSdcbmltcG9ydCB7IEVudGl0eUludGVyZmFjZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktaW50ZXJmYWNlJ1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS10eXBlJ1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnVtJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUZpbGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZmlsZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtaW50ZXJmYWNlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZU9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1vYmplY3QnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS10eXBlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1kb2N1bWVudCdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludCBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWUgPSAndmlzaW9uLnB1bWwnIC8vIFRPRE8gaW1wbGVtZW50IGV4cG9ydCBmaWxlIG5hbWUgdmFyaWFibGVcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IGFwcE5hbWU/OiBzdHJpbmc7IGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IGFwcE5hbWUsIGRlc3RpbmF0aW9uUGF0aCB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX3Jvb3RHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogZmFsbGJhY2tBcHBOYW1lLFxuICAgICAgdHlwZTogYXBwTmFtZSA/IFB1bWxHcm91cFR5cGUuUkVDVEFOR0xFIDogUHVtbEdyb3VwVHlwZS5GSUNUSVZFLFxuICAgICAgZ3JvdXBQYXRoOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/PyB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSB0aGlzLl9wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KGVudGl0eTogRW50aXR5KTogUHVtbEVudGl0eSB8IHVuZGVmaW5lZCB7XG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGVudGl0eS5NZXRhIGluc3RhbmNlb2YgRW50aXR5Q2xhc3M6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUNsYXNzKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIGVudGl0eS5NZXRhIGluc3RhbmNlb2YgRW50aXR5RmlsZTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlRmlsZSh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBlbnRpdHkuTWV0YSBpbnN0YW5jZW9mIEVudGl0eU9iamVjdDpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlT2JqZWN0KHsgZW50aXR5IH0pXG4gICAgICBjYXNlIGVudGl0eS5NZXRhIGluc3RhbmNlb2YgRW50aXR5SW50ZXJmYWNlOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVJbnRlcmZhY2UoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgZW50aXR5Lk1ldGEgaW5zdGFuY2VvZiBFbnRpdHlUeXBlOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVUeXBlKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIGVudGl0eS5NZXRhIGluc3RhbmNlb2YgRW50aXR5RW51bTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlRW51bSh7IGVudGl0eSB9KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gZW50aXR5IHR5cGUgJHtlbnRpdHkuY29uc3RydWN0b3IubmFtZX1gKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmludChwYXJhbXM6IHsgZW50aXRpZXM6IEVudGl0eVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGVudGl0aWVzIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllcylcbiAgICB0aGlzLl9mbGF0dGVuR3JvdXBzKHRoaXMuX3Jvb3RHcm91cClcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IG5ldyBQdW1sRG9jdW1lbnQoKVxuICAgIHRlbXBsYXRlLmFkZENoaWxkcmVuKHRoaXMuX3Jvb3RHcm91cClcbiAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLmZvckVhY2goKHMpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKG5ldyBQdW1sUHJpbnRhYmxlV3JhcHBlcihzKSkpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmxhdHRlbkdyb3Vwcyhncm91cDogUHVtbEdyb3VwKTogUHVtbEdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3QudmFsdWVzKGdyb3VwLmdyb3VwcylcbiAgICBpZiAoZ3JvdXAuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFIHx8IGdyb3VwLkNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwLmdyb3VwcykuZm9yRWFjaCgoW25hbWUsIGdycF0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZmxhdHRlbkdyb3VwcyhncnApXG4gICAgICAgIGlmIChyZXN1bHQpIGdyb3VwLmdyb3Vwc1tuYW1lXSA9IHJlc3VsdFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgY2hpbGRHcm91cCA9IGdyb3Vwc1swXVxuICAgIGNvbnN0IGZsYXRHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogW2dyb3VwLk5hbWUsIGNoaWxkR3JvdXAuTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApLFxuICAgICAgdHlwZTogZ3JvdXAuVHlwZSxcbiAgICAgIGdyb3VwUGF0aDogY2hpbGRHcm91cC5Hcm91cFBhdGgsXG4gICAgfSlcbiAgICBjaGlsZEdyb3VwLkNoaWxkcmVuLmZvckVhY2goKGNnKSA9PiBmbGF0R3JvdXAuYWRkQ2hpbGRyZW4oY2cpKVxuICAgIHJldHVybiBmbGF0R3JvdXBcbiAgfVxufVxuIl19