"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const file_dao_1 = require("src/dal/file-dao");
const entity_types_1 = require("src/enum/entity-types");
const puml_group_type_1 = require("src/enum/puml-group-type");
const entity_1 = require("src/model/entity");
const entity_object_1 = require("src/model/entity-object");
const property_1 = require("src/model/property");
const file_path_service_1 = require("src/service/file-path-service");
const puml_group_1 = require("src/service/print-puml/group/puml-group");
const puml_document_1 = require("src/service/print-puml/printable-entity/puml-document");
const puml_printable_wrapper_1 = require("src/service/print-puml/printable-entity/puml-printable-wrapper");
const puml_service_1 = require("src/service/print-puml/puml-service");
const constant_1 = require("src/util/constant");
class PumlPrint {
    _destinationPath;
    _fileName;
    _rootGroup;
    _pumlRelationStrings = [];
    async _writeToFile(data) {
        await file_dao_1.fileDao.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    constructor(params) {
        const { appName, destinationPath, fileName } = params;
        const fallbackAppName = appName ?? '';
        this._destinationPath = destinationPath;
        this._fileName = `${fileName}.puml`;
        this._rootGroup = new puml_group_1.PumlGroup({
            name: fallbackAppName,
            type: appName ? puml_group_type_1.PumlGroupType.RECTANGLE : puml_group_type_1.PumlGroupType.FICTIVE,
            groupPath: fallbackAppName,
        });
    }
    get FilePath() {
        return file_path_service_1.filePathService.joinPaths(this._destinationPath, this._fileName);
    }
    async print(params) {
        const { entities } = params;
        const withMissingEntities = this._missingEntities(entities);
        this._generateGroups(withMissingEntities);
        this._flattenGroups(this._rootGroup);
        const template = new puml_document_1.PumlDocument();
        template.addChildren(this._rootGroup);
        this._pumlRelationStrings.forEach((s) => template.addChildren(new puml_printable_wrapper_1.PumlPrintableWrapper(s)));
        const pumlBody = template.print();
        await this._writeToFile(pumlBody);
    }
    _missingEntities(entities) {
        const allReferences = entities.map((e) => e.References).flat();
        const newEntities = allReferences.reduce((acc, cur) => {
            if ([...entities, ...acc].find((e) => e.Name === cur.Name && e.InProjectPath === cur.InProjectPath))
                return acc;
            acc.push(new entity_1.Entity({
                type: entity_types_1.EntityTypes.OBJECT,
                name: cur.Name,
                inProjectPath: cur.InProjectPath,
                isExported: false,
                meta: new entity_object_1.EntityObject({ properties: [new property_1.Property({ name: cur.InProjectPath, returnType: '' })] }),
            }));
            return acc;
        }, []);
        return [...entities, ...newEntities];
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.InProjectPath.split(constant_1.constant.folderSep);
            let prevGroup;
            paths.forEach((p, ix, list) => {
                const parentGroup = prevGroup ?? this._rootGroup;
                if (ix === list.length - 1) {
                    const printableEntity = puml_service_1.pumlService.printableStrategyFromEntity(e);
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
            groups: childGroup.groups,
        });
        childGroup.Children.forEach((cg) => flatGroup.addChildren(cg));
        return Object.keys(flatGroup.groups).length > 0 ? this._flattenGroups(flatGroup) : flatGroup;
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEM7QUFDMUMsd0RBQW1EO0FBQ25ELDhEQUF3RDtBQUN4RCw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELGlEQUE2QztBQUM3QyxxRUFBK0Q7QUFDL0Qsd0VBQW1FO0FBQ25FLHlGQUFvRjtBQUNwRiwyR0FBcUc7QUFDckcsc0VBQWlFO0FBRWpFLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFDRCxnQkFBZ0IsQ0FBUTtJQUN4QixTQUFTLENBQVE7SUFDMUIsVUFBVSxDQUFXO0lBQ1osb0JBQW9CLEdBQWEsRUFBRSxDQUFBO0lBRTVDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBWTtRQUN2QyxNQUFNLGtCQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDMUcsQ0FBQztJQUVELFlBQW1CLE1BQXVFO1FBQ3hGLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNyRCxNQUFNLGVBQWUsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUE7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLFFBQVEsT0FBTyxDQUFBO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLE9BQU87WUFD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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWxlRGFvIH0gZnJvbSAnc3JjL2RhbC9maWxlLWRhbydcbmltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlPYmplY3QgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LW9iamVjdCdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHsgZmlsZVBhdGhTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1wYXRoLXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sR3JvdXAgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL2dyb3VwL3B1bWwtZ3JvdXAnXG5pbXBvcnQgeyBQdW1sRG9jdW1lbnQgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1kb2N1bWVudCdcbmltcG9ydCB7IFB1bWxQcmludGFibGVXcmFwcGVyIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXdyYXBwZXInXG5pbXBvcnQgeyBwdW1sU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCBfcm9vdEdyb3VwOiBQdW1sR3JvdXBcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wdW1sUmVsYXRpb25TdHJpbmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlRGFvLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmFtczogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZzsgZmlsZU5hbWU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lIH0gPSBwYXJhbXNcbiAgICBjb25zdCBmYWxsYmFja0FwcE5hbWUgPSBhcHBOYW1lID8/ICcnXG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBgJHtmaWxlTmFtZX0ucHVtbGBcbiAgICB0aGlzLl9yb290R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICAgIHR5cGU6IGFwcE5hbWUgPyBQdW1sR3JvdXBUeXBlLlJFQ1RBTkdMRSA6IFB1bWxHcm91cFR5cGUuRklDVElWRSxcbiAgICAgIGdyb3VwUGF0aDogZmFsbGJhY2tBcHBOYW1lLFxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZ2V0IEZpbGVQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHModGhpcy5fZGVzdGluYXRpb25QYXRoLCB0aGlzLl9maWxlTmFtZSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmludChwYXJhbXM6IHsgZW50aXRpZXM6IEVudGl0eVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGVudGl0aWVzIH0gPSBwYXJhbXNcbiAgICBjb25zdCB3aXRoTWlzc2luZ0VudGl0aWVzID0gdGhpcy5fbWlzc2luZ0VudGl0aWVzKGVudGl0aWVzKVxuICAgIHRoaXMuX2dlbmVyYXRlR3JvdXBzKHdpdGhNaXNzaW5nRW50aXRpZXMpXG4gICAgdGhpcy5fZmxhdHRlbkdyb3Vwcyh0aGlzLl9yb290R3JvdXApXG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbERvY3VtZW50KClcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5mb3JFYWNoKChzKSA9PiB0ZW1wbGF0ZS5hZGRDaGlsZHJlbihuZXcgUHVtbFByaW50YWJsZVdyYXBwZXIocykpKVxuICAgIGNvbnN0IHB1bWxCb2R5ID0gdGVtcGxhdGUucHJpbnQoKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHB1bWxCb2R5KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9taXNzaW5nRW50aXRpZXMoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGFsbFJlZmVyZW5jZXMgPSBlbnRpdGllcy5tYXAoKGUpID0+IGUuUmVmZXJlbmNlcykuZmxhdCgpXG4gICAgY29uc3QgbmV3RW50aXRpZXMgPSBhbGxSZWZlcmVuY2VzLnJlZHVjZTxFbnRpdHlbXT4oKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoWy4uLmVudGl0aWVzLCAuLi5hY2NdLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gY3VyLk5hbWUgJiYgZS5JblByb2plY3RQYXRoID09PSBjdXIuSW5Qcm9qZWN0UGF0aCkpIHJldHVybiBhY2NcbiAgICAgIGFjYy5wdXNoKFxuICAgICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5PQkpFQ1QsXG4gICAgICAgICAgbmFtZTogY3VyLk5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogY3VyLkluUHJvamVjdFBhdGgsXG4gICAgICAgICAgaXNFeHBvcnRlZDogZmFsc2UsXG4gICAgICAgICAgbWV0YTogbmV3IEVudGl0eU9iamVjdCh7IHByb3BlcnRpZXM6IFtuZXcgUHJvcGVydHkoeyBuYW1lOiBjdXIuSW5Qcm9qZWN0UGF0aCwgcmV0dXJuVHlwZTogJycgfSldIH0pLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICAgIHJldHVybiBbLi4uZW50aXRpZXMsIC4uLm5ld0VudGl0aWVzXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllczogRW50aXR5W10pOiB2b2lkIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBjb25zdCBwYXRocyA9IGUuSW5Qcm9qZWN0UGF0aC5zcGxpdChjb25zdGFudC5mb2xkZXJTZXApXG4gICAgICBsZXQgcHJldkdyb3VwOiBQdW1sR3JvdXAgfCB1bmRlZmluZWRcbiAgICAgIHBhdGhzLmZvckVhY2goKHAsIGl4LCBsaXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudEdyb3VwID0gcHJldkdyb3VwID8/IHRoaXMuX3Jvb3RHcm91cFxuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGNvbnN0IHByaW50YWJsZUVudGl0eSA9IHB1bWxTZXJ2aWNlLnByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eShlKVxuICAgICAgICAgIGlmIChwcmludGFibGVFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MucHVzaChwcmludGFibGVFbnRpdHkucHJpbnRSZWxhdGlvbnMoKSlcbiAgICAgICAgICAgIHBhcmVudEdyb3VwLmFkZENoaWxkcmVuKHByaW50YWJsZUVudGl0eSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXRoID0gW3BhcmVudEdyb3VwLkdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IHBhcmVudEdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZ3JvdXBQYXRoLCB0eXBlOiBQdW1sR3JvdXBUeXBlLkZPTERFUiB9KVxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9mbGF0dGVuR3JvdXBzKGdyb3VwOiBQdW1sR3JvdXApOiBQdW1sR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwcyA9IE9iamVjdC52YWx1ZXMoZ3JvdXAuZ3JvdXBzKVxuICAgIGlmIChncm91cC5UeXBlID09PSBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUgfHwgZ3JvdXAuQ2hpbGRyZW4ubGVuZ3RoID4gMCB8fCBncm91cHMubGVuZ3RoID4gMSkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoZ3JvdXAuZ3JvdXBzKS5mb3JFYWNoKChbbmFtZSwgZ3JwXSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9mbGF0dGVuR3JvdXBzKGdycClcbiAgICAgICAgaWYgKHJlc3VsdCkgZ3JvdXAuZ3JvdXBzW25hbWVdID0gcmVzdWx0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChncm91cHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBjb25zdCBjaGlsZEdyb3VwID0gZ3JvdXBzWzBdXG4gICAgY29uc3QgZmxhdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBbZ3JvdXAuTmFtZSwgY2hpbGRHcm91cC5OYW1lXS5qb2luKGNvbnN0YW50LmZvbGRlclNlcCksXG4gICAgICB0eXBlOiBncm91cC5UeXBlLFxuICAgICAgZ3JvdXBQYXRoOiBjaGlsZEdyb3VwLkdyb3VwUGF0aCxcbiAgICAgIGdyb3VwczogY2hpbGRHcm91cC5ncm91cHMsXG4gICAgfSlcbiAgICBjaGlsZEdyb3VwLkNoaWxkcmVuLmZvckVhY2goKGNnKSA9PiBmbGF0R3JvdXAuYWRkQ2hpbGRyZW4oY2cpKVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmbGF0R3JvdXAuZ3JvdXBzKS5sZW5ndGggPiAwID8gdGhpcy5fZmxhdHRlbkdyb3VwcyhmbGF0R3JvdXApIDogZmxhdEdyb3VwXG4gIH1cbn1cbiJdfQ==