"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const fs_1 = __importDefault(require("fs"));
const node_plantuml_1 = __importDefault(require("node-plantuml"));
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
        // await this._exportFile() // TODO add parameter flag
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
    async _exportFile() {
        const exportFilePath = `${this.FilePath.split('.')[0]}.svg`;
        await this._svgPromiseGenerator(this.FilePath, exportFilePath);
        // return new Promise((resolve) => {
        //   const gen = plantuml.generate(this.FilePath, { format: 'svg' })
        //   gen.out.pipe(fs.createWriteStream(exportFilePath))
        //   gen.out.on('end', resolve)
        // })
    }
    _svgPromiseGenerator(source, dest) {
        return new Promise((resolve, reject) => {
            const generator = node_plantuml_1.default.generate(source, { format: 'svg' });
            const fileStream = fs_1.default.createWriteStream(dest);
            fileStream.on('error', reject);
            generator.out.on('error', reject);
            generator.out.pipe(fileStream);
            fileStream.on('finish', () => {
                resolve();
            });
        });
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
        });
        childGroup.Children.forEach((cg) => flatGroup.addChildren(cg));
        return flatGroup;
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsa0VBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx3REFBbUQ7QUFDbkQsOERBQXdEO0FBQ3hELDZDQUF5QztBQUN6QywyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHFFQUErRDtBQUMvRCx3RUFBbUU7QUFDbkUseUZBQW9GO0FBQ3BGLDJHQUFxRztBQUNyRyxzRUFBaUU7QUFFakUsZ0RBQTRDO0FBRTVDLE1BQWEsU0FBUztJQUNELGdCQUFnQixDQUFRO0lBQ3hCLFNBQVMsQ0FBUTtJQUMxQixVQUFVLENBQVc7SUFDWixvQkFBb0IsR0FBYSxFQUFFLENBQUE7SUFFNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sa0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMxRyxDQUFDO0lBRUQsWUFBWSxNQUF1RTtRQUNqRixNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxRQUFRLE9BQU8sQ0FBQTtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxD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LENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZDLElBQUksTUFBTTtvQkFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQTtZQUN6QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE9BQU07U0FDUDtRQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQztZQUM1RCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO1NBQ2hDLENBQUMsQ0FBQTtRQUNGLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUQsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztDQUNGO0FBN0hELDhCQTZIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwbGFudHVtbCBmcm9tICdub2RlLXBsYW50dW1sJ1xuaW1wb3J0IHsgZmlsZURhbyB9IGZyb20gJ3NyYy9kYWwvZmlsZS1kYW8nXG5pbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5T2JqZWN0IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1vYmplY3QnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB7IGZpbGVQYXRoU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtcGF0aC1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgUHVtbERvY3VtZW50IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtZG9jdW1lbnQnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlV3JhcHBlciB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS13cmFwcGVyJ1xuaW1wb3J0IHsgcHVtbFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtc2VydmljZSdcbmltcG9ydCB7IFByaW50U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1zZXJ2aWNlJ1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludCBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgX3Jvb3RHcm91cDogUHVtbEdyb3VwXG4gIHByb3RlY3RlZCByZWFkb25seSBfcHVtbFJlbGF0aW9uU3RyaW5nczogc3RyaW5nW10gPSBbXVxuXG4gIHByb3RlY3RlZCBhc3luYyBfd3JpdGVUb0ZpbGUoZGF0YTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZmlsZURhby5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZzsgZmlsZU5hbWU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lIH0gPSBwYXJhbXNcbiAgICBjb25zdCBmYWxsYmFja0FwcE5hbWUgPSBhcHBOYW1lID8/ICcnXG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fZmlsZU5hbWUgPSBgJHtmaWxlTmFtZX0ucHVtbGBcbiAgICB0aGlzLl9yb290R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICAgIHR5cGU6IGFwcE5hbWUgPyBQdW1sR3JvdXBUeXBlLlJFQ1RBTkdMRSA6IFB1bWxHcm91cFR5cGUuRklDVElWRSxcbiAgICAgIGdyb3VwUGF0aDogZmFsbGJhY2tBcHBOYW1lLFxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZ2V0IEZpbGVQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGVQYXRoU2VydmljZS5qb2luUGF0aHModGhpcy5fZGVzdGluYXRpb25QYXRoLCB0aGlzLl9maWxlTmFtZSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmludChwYXJhbXM6IHsgZW50aXRpZXM6IEVudGl0eVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGVudGl0aWVzIH0gPSBwYXJhbXNcbiAgICBjb25zdCB3aXRoTWlzc2luZ0VudGl0aWVzID0gdGhpcy5fbWlzc2luZ0VudGl0aWVzKGVudGl0aWVzKVxuICAgIHRoaXMuX2dlbmVyYXRlR3JvdXBzKHdpdGhNaXNzaW5nRW50aXRpZXMpXG4gICAgdGhpcy5fZmxhdHRlbkdyb3Vwcyh0aGlzLl9yb290R3JvdXApXG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbERvY3VtZW50KClcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5mb3JFYWNoKChzKSA9PiB0ZW1wbGF0ZS5hZGRDaGlsZHJlbihuZXcgUHVtbFByaW50YWJsZVdyYXBwZXIocykpKVxuICAgIGNvbnN0IHB1bWxCb2R5ID0gdGVtcGxhdGUucHJpbnQoKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHB1bWxCb2R5KVxuICAgIC8vIGF3YWl0IHRoaXMuX2V4cG9ydEZpbGUoKSAvLyBUT0RPIGFkZCBwYXJhbWV0ZXIgZmxhZ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9taXNzaW5nRW50aXRpZXMoZW50aXRpZXM6IEVudGl0eVtdKTogRW50aXR5W10ge1xuICAgIGNvbnN0IGFsbFJlZmVyZW5jZXMgPSBlbnRpdGllcy5tYXAoKGUpID0+IGUuUmVmZXJlbmNlcykuZmxhdCgpXG4gICAgY29uc3QgbmV3RW50aXRpZXMgPSBhbGxSZWZlcmVuY2VzLnJlZHVjZTxFbnRpdHlbXT4oKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoWy4uLmVudGl0aWVzLCAuLi5hY2NdLmZpbmQoKGUpID0+IGUuTmFtZSA9PT0gY3VyLk5hbWUgJiYgZS5JblByb2plY3RQYXRoID09PSBjdXIuSW5Qcm9qZWN0UGF0aCkpIHJldHVybiBhY2NcbiAgICAgIGFjYy5wdXNoKFxuICAgICAgICBuZXcgRW50aXR5KHtcbiAgICAgICAgICB0eXBlOiBFbnRpdHlUeXBlcy5PQkpFQ1QsXG4gICAgICAgICAgbmFtZTogY3VyLk5hbWUsXG4gICAgICAgICAgaW5Qcm9qZWN0UGF0aDogY3VyLkluUHJvamVjdFBhdGgsXG4gICAgICAgICAgaXNFeHBvcnRlZDogZmFsc2UsXG4gICAgICAgICAgbWV0YTogbmV3IEVudGl0eU9iamVjdCh7IHByb3BlcnRpZXM6IFtuZXcgUHJvcGVydHkoeyBuYW1lOiBjdXIuSW5Qcm9qZWN0UGF0aCwgcmV0dXJuVHlwZTogJycgfSldIH0pLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKVxuICAgIHJldHVybiBbLi4uZW50aXRpZXMsIC4uLm5ld0VudGl0aWVzXVxuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIF9leHBvcnRGaWxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4cG9ydEZpbGVQYXRoID0gYCR7dGhpcy5GaWxlUGF0aC5zcGxpdCgnLicpWzBdfS5zdmdgXG4gICAgYXdhaXQgdGhpcy5fc3ZnUHJvbWlzZUdlbmVyYXRvcih0aGlzLkZpbGVQYXRoLCBleHBvcnRGaWxlUGF0aClcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAvLyAgIGNvbnN0IGdlbiA9IHBsYW50dW1sLmdlbmVyYXRlKHRoaXMuRmlsZVBhdGgsIHsgZm9ybWF0OiAnc3ZnJyB9KVxuICAgIC8vICAgZ2VuLm91dC5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGV4cG9ydEZpbGVQYXRoKSlcbiAgICAvLyAgIGdlbi5vdXQub24oJ2VuZCcsIHJlc29sdmUpXG4gICAgLy8gfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3ZnUHJvbWlzZUdlbmVyYXRvcihzb3VyY2UsIGRlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZ2VuZXJhdG9yID0gcGxhbnR1bWwuZ2VuZXJhdGUoc291cmNlLCB7IGZvcm1hdDogJ3N2ZycgfSlcbiAgICAgIGNvbnN0IGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0KVxuXG4gICAgICBmaWxlU3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgIGdlbmVyYXRvci5vdXQub24oJ2Vycm9yJywgcmVqZWN0KVxuXG4gICAgICBnZW5lcmF0b3Iub3V0LnBpcGUoZmlsZVN0cmVhbSlcblxuICAgICAgZmlsZVN0cmVhbS5vbignZmluaXNoJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/PyB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSBwdW1sU2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmxhdHRlbkdyb3Vwcyhncm91cDogUHVtbEdyb3VwKTogUHVtbEdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3QudmFsdWVzKGdyb3VwLmdyb3VwcylcbiAgICBpZiAoZ3JvdXAuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFIHx8IGdyb3VwLkNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwLmdyb3VwcykuZm9yRWFjaCgoW25hbWUsIGdycF0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZmxhdHRlbkdyb3VwcyhncnApXG4gICAgICAgIGlmIChyZXN1bHQpIGdyb3VwLmdyb3Vwc1tuYW1lXSA9IHJlc3VsdFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgY2hpbGRHcm91cCA9IGdyb3Vwc1swXVxuICAgIGNvbnN0IGZsYXRHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogW2dyb3VwLk5hbWUsIGNoaWxkR3JvdXAuTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApLFxuICAgICAgdHlwZTogZ3JvdXAuVHlwZSxcbiAgICAgIGdyb3VwUGF0aDogY2hpbGRHcm91cC5Hcm91cFBhdGgsXG4gICAgfSlcbiAgICBjaGlsZEdyb3VwLkNoaWxkcmVuLmZvckVhY2goKGNnKSA9PiBmbGF0R3JvdXAuYWRkQ2hpbGRyZW4oY2cpKVxuICAgIHJldHVybiBmbGF0R3JvdXBcbiAgfVxufVxuIl19