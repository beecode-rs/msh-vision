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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEM7QUFDMUMsd0RBQW1EO0FBQ25ELDhEQUF3RDtBQUN4RCw2Q0FBeUM7QUFDekMsMkRBQXNEO0FBQ3RELGlEQUE2QztBQUM3QyxxRUFBK0Q7QUFDL0Qsd0VBQW1FO0FBQ25FLHlGQUFvRjtBQUNwRiwyR0FBcUc7QUFDckcsc0VBQWlFO0FBRWpFLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFDRCxnQkFBZ0IsQ0FBUTtJQUN4QixTQUFTLENBQVE7SUFDMUIsVUFBVSxDQUFXO0lBQ1osb0JBQW9CLEdBQWEsRUFBRSxDQUFBO0lBRTVDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBWTtRQUN2QyxNQUFNLGtCQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDMUcsQ0FBQztJQUVELFlBQVksTUFBdUU7UUFDakYsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3JELE1BQU0sZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsUUFBUSxPQUFPLENBQUE7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLGVBQWU7WUFDckIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsT0FBTztZQUMv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ZXNDb250ZW50IjpbImltcG9ydCB7IGZpbGVEYW8gfSBmcm9tICdzcmMvZGFsL2ZpbGUtZGFvJ1xuaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgeyBmaWxlUGF0aFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cCdcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLWRvY3VtZW50J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IHB1bWxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVEYW8ubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgYXBwTmFtZT86IHN0cmluZzsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmc7IGZpbGVOYW1lOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZSB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX2ZpbGVOYW1lID0gYCR7ZmlsZU5hbWV9LnB1bWxgXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgICB0eXBlOiBhcHBOYW1lID8gUHVtbEdyb3VwVHlwZS5SRUNUQU5HTEUgOiBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUsXG4gICAgICBncm91cFBhdGg6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldCBGaWxlUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgdGhpcy5fZmlsZU5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQocGFyYW1zOiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBlbnRpdGllcyB9ID0gcGFyYW1zXG4gICAgY29uc3Qgd2l0aE1pc3NpbmdFbnRpdGllcyA9IHRoaXMuX21pc3NpbmdFbnRpdGllcyhlbnRpdGllcylcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3Vwcyh3aXRoTWlzc2luZ0VudGl0aWVzKVxuICAgIHRoaXMuX2ZsYXR0ZW5Hcm91cHModGhpcy5fcm9vdEdyb3VwKVxuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBjb25zdCBwdW1sQm9keSA9IHRlbXBsYXRlLnByaW50KClcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZShwdW1sQm9keSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfbWlzc2luZ0VudGl0aWVzKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBhbGxSZWZlcmVuY2VzID0gZW50aXRpZXMubWFwKChlKSA9PiBlLlJlZmVyZW5jZXMpLmZsYXQoKVxuICAgIGNvbnN0IG5ld0VudGl0aWVzID0gYWxsUmVmZXJlbmNlcy5yZWR1Y2U8RW50aXR5W10+KChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKFsuLi5lbnRpdGllcywgLi4uYWNjXS5maW5kKChlKSA9PiBlLk5hbWUgPT09IGN1ci5OYW1lICYmIGUuSW5Qcm9qZWN0UGF0aCA9PT0gY3VyLkluUHJvamVjdFBhdGgpKSByZXR1cm4gYWNjXG4gICAgICBhY2MucHVzaChcbiAgICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgICAgdHlwZTogRW50aXR5VHlwZXMuT0JKRUNULFxuICAgICAgICAgIG5hbWU6IGN1ci5OYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGN1ci5JblByb2plY3RQYXRoLFxuICAgICAgICAgIGlzRXhwb3J0ZWQ6IGZhbHNlLFxuICAgICAgICAgIG1ldGE6IG5ldyBFbnRpdHlPYmplY3QoeyBwcm9wZXJ0aWVzOiBbbmV3IFByb3BlcnR5KHsgbmFtZTogY3VyLkluUHJvamVjdFBhdGgsIHJldHVyblR5cGU6ICcnIH0pXSB9KSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgICByZXR1cm4gWy4uLmVudGl0aWVzLCAuLi5uZXdFbnRpdGllc11cbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/PyB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSBwdW1sU2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmxhdHRlbkdyb3Vwcyhncm91cDogUHVtbEdyb3VwKTogUHVtbEdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3QudmFsdWVzKGdyb3VwLmdyb3VwcylcbiAgICBpZiAoZ3JvdXAuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFIHx8IGdyb3VwLkNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwLmdyb3VwcykuZm9yRWFjaCgoW25hbWUsIGdycF0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZmxhdHRlbkdyb3VwcyhncnApXG4gICAgICAgIGlmIChyZXN1bHQpIGdyb3VwLmdyb3Vwc1tuYW1lXSA9IHJlc3VsdFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgY2hpbGRHcm91cCA9IGdyb3Vwc1swXVxuICAgIGNvbnN0IGZsYXRHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogW2dyb3VwLk5hbWUsIGNoaWxkR3JvdXAuTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApLFxuICAgICAgdHlwZTogZ3JvdXAuVHlwZSxcbiAgICAgIGdyb3VwUGF0aDogY2hpbGRHcm91cC5Hcm91cFBhdGgsXG4gICAgICBncm91cHM6IGNoaWxkR3JvdXAuZ3JvdXBzLFxuICAgIH0pXG4gICAgY2hpbGRHcm91cC5DaGlsZHJlbi5mb3JFYWNoKChjZykgPT4gZmxhdEdyb3VwLmFkZENoaWxkcmVuKGNnKSlcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZmxhdEdyb3VwLmdyb3VwcykubGVuZ3RoID4gMCA/IHRoaXMuX2ZsYXR0ZW5Hcm91cHMoZmxhdEdyb3VwKSA6IGZsYXRHcm91cFxuICB9XG59XG4iXX0=