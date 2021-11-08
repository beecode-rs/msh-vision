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
            groups: childGroup.groups,
        });
        childGroup.Children.forEach((cg) => flatGroup.addChildren(cg));
        return Object.keys(flatGroup.groups).length > 0 ? this._flattenGroups(flatGroup) : flatGroup;
    }
}
exports.PumlPrint = PumlPrint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsa0VBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyx3REFBbUQ7QUFDbkQsOERBQXdEO0FBQ3hELDZDQUF5QztBQUN6QywyREFBc0Q7QUFDdEQsaURBQTZDO0FBQzdDLHFFQUErRDtBQUMvRCx3RUFBbUU7QUFDbkUseUZBQW9GO0FBQ3BGLDJHQUFxRztBQUNyRyxzRUFBaUU7QUFFakUsZ0RBQTRDO0FBRTVDLE1BQWEsU0FBUztJQUNELGdCQUFnQixDQUFRO0lBQ3hCLFNBQVMsQ0FBUTtJQUMxQixVQUFVLENBQVc7SUFDWixvQkFBb0IsR0FBYSxFQUFFLENBQUE7SUFFNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sa0JBQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMxRyxDQUFDO0lBRUQsWUFBWSxNQUF1RTtRQUNqRixNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDckQsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxRQUFRLE9BQU8sQ0FBQTtRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxD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LENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZDLElBQUksTUFBTTtvQkFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQTtZQUN6QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE9BQU07U0FDUDtRQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTTtRQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLFNBQVMsQ0FBQztZQUM1RCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTO1lBQy9CLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtTQUMxQixDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0lBQzlGLENBQUM7Q0FDRjtBQTlIRCw4QkE4SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGxhbnR1bWwgZnJvbSAnbm9kZS1wbGFudHVtbCdcbmltcG9ydCB7IGZpbGVEYW8gfSBmcm9tICdzcmMvZGFsL2ZpbGUtZGFvJ1xuaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgeyBmaWxlUGF0aFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cCdcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLWRvY3VtZW50J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IHB1bWxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVEYW8ubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgYXBwTmFtZT86IHN0cmluZzsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmc7IGZpbGVOYW1lOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZSB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX2ZpbGVOYW1lID0gYCR7ZmlsZU5hbWV9LnB1bWxgXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgICB0eXBlOiBhcHBOYW1lID8gUHVtbEdyb3VwVHlwZS5SRUNUQU5HTEUgOiBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUsXG4gICAgICBncm91cFBhdGg6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldCBGaWxlUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgdGhpcy5fZmlsZU5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQocGFyYW1zOiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBlbnRpdGllcyB9ID0gcGFyYW1zXG4gICAgY29uc3Qgd2l0aE1pc3NpbmdFbnRpdGllcyA9IHRoaXMuX21pc3NpbmdFbnRpdGllcyhlbnRpdGllcylcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3Vwcyh3aXRoTWlzc2luZ0VudGl0aWVzKVxuICAgIHRoaXMuX2ZsYXR0ZW5Hcm91cHModGhpcy5fcm9vdEdyb3VwKVxuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBjb25zdCBwdW1sQm9keSA9IHRlbXBsYXRlLnByaW50KClcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZShwdW1sQm9keSlcbiAgICAvLyBhd2FpdCB0aGlzLl9leHBvcnRGaWxlKCkgLy8gVE9ETyBhZGQgcGFyYW1ldGVyIGZsYWdcbiAgfVxuXG4gIHByb3RlY3RlZCBfbWlzc2luZ0VudGl0aWVzKGVudGl0aWVzOiBFbnRpdHlbXSk6IEVudGl0eVtdIHtcbiAgICBjb25zdCBhbGxSZWZlcmVuY2VzID0gZW50aXRpZXMubWFwKChlKSA9PiBlLlJlZmVyZW5jZXMpLmZsYXQoKVxuICAgIGNvbnN0IG5ld0VudGl0aWVzID0gYWxsUmVmZXJlbmNlcy5yZWR1Y2U8RW50aXR5W10+KChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKFsuLi5lbnRpdGllcywgLi4uYWNjXS5maW5kKChlKSA9PiBlLk5hbWUgPT09IGN1ci5OYW1lICYmIGUuSW5Qcm9qZWN0UGF0aCA9PT0gY3VyLkluUHJvamVjdFBhdGgpKSByZXR1cm4gYWNjXG4gICAgICBhY2MucHVzaChcbiAgICAgICAgbmV3IEVudGl0eSh7XG4gICAgICAgICAgdHlwZTogRW50aXR5VHlwZXMuT0JKRUNULFxuICAgICAgICAgIG5hbWU6IGN1ci5OYW1lLFxuICAgICAgICAgIGluUHJvamVjdFBhdGg6IGN1ci5JblByb2plY3RQYXRoLFxuICAgICAgICAgIGlzRXhwb3J0ZWQ6IGZhbHNlLFxuICAgICAgICAgIG1ldGE6IG5ldyBFbnRpdHlPYmplY3QoeyBwcm9wZXJ0aWVzOiBbbmV3IFByb3BlcnR5KHsgbmFtZTogY3VyLkluUHJvamVjdFBhdGgsIHJldHVyblR5cGU6ICcnIH0pXSB9KSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSlcbiAgICByZXR1cm4gWy4uLmVudGl0aWVzLCAuLi5uZXdFbnRpdGllc11cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBfZXhwb3J0RmlsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleHBvcnRGaWxlUGF0aCA9IGAke3RoaXMuRmlsZVBhdGguc3BsaXQoJy4nKVswXX0uc3ZnYFxuICAgIGF3YWl0IHRoaXMuX3N2Z1Byb21pc2VHZW5lcmF0b3IodGhpcy5GaWxlUGF0aCwgZXhwb3J0RmlsZVBhdGgpXG4gICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgLy8gICBjb25zdCBnZW4gPSBwbGFudHVtbC5nZW5lcmF0ZSh0aGlzLkZpbGVQYXRoLCB7IGZvcm1hdDogJ3N2ZycgfSlcbiAgICAvLyAgIGdlbi5vdXQucGlwZShmcy5jcmVhdGVXcml0ZVN0cmVhbShleHBvcnRGaWxlUGF0aCkpXG4gICAgLy8gICBnZW4ub3V0Lm9uKCdlbmQnLCByZXNvbHZlKVxuICAgIC8vIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3N2Z1Byb21pc2VHZW5lcmF0b3Ioc291cmNlLCBkZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRvciA9IHBsYW50dW1sLmdlbmVyYXRlKHNvdXJjZSwgeyBmb3JtYXQ6ICdzdmcnIH0pXG4gICAgICBjb25zdCBmaWxlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdClcblxuICAgICAgZmlsZVN0cmVhbS5vbignZXJyb3InLCByZWplY3QpXG4gICAgICBnZW5lcmF0b3Iub3V0Lm9uKCdlcnJvcicsIHJlamVjdClcblxuICAgICAgZ2VuZXJhdG9yLm91dC5waXBlKGZpbGVTdHJlYW0pXG5cbiAgICAgIGZpbGVTdHJlYW0ub24oJ2ZpbmlzaCcsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5JblByb2plY3RQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cCB8IHVuZGVmaW5lZFxuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50R3JvdXAgPSBwcmV2R3JvdXAgPz8gdGhpcy5fcm9vdEdyb3VwXG4gICAgICAgIGlmIChpeCA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgY29uc3QgcHJpbnRhYmxlRW50aXR5ID0gcHVtbFNlcnZpY2UucHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KGUpXG4gICAgICAgICAgaWYgKHByaW50YWJsZUVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5wdXNoKHByaW50YWJsZUVudGl0eS5wcmludFJlbGF0aW9ucygpKVxuICAgICAgICAgICAgcGFyZW50R3JvdXAuYWRkQ2hpbGRyZW4ocHJpbnRhYmxlRW50aXR5KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVyblxuICAgICAgICBjb25zdCBncm91cFBhdGggPSBbcGFyZW50R3JvdXAuR3JvdXBQYXRoLCBwXS5maWx0ZXIoQm9vbGVhbikuam9pbihjb25zdGFudC5mb2xkZXJTZXApXG4gICAgICAgIGNvbnN0IG5ld0dyb3VwID0gcGFyZW50R3JvdXAuZ3JvdXBzW3BdID8/IG5ldyBQdW1sR3JvdXAoeyBuYW1lOiBwLCBncm91cFBhdGgsIHR5cGU6IFB1bWxHcm91cFR5cGUuRk9MREVSIH0pXG4gICAgICAgIHBhcmVudEdyb3VwLmdyb3Vwc1twXSA9IG5ld0dyb3VwXG4gICAgICAgIHByZXZHcm91cCA9IG5ld0dyb3VwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZsYXR0ZW5Hcm91cHMoZ3JvdXA6IFB1bWxHcm91cCk6IFB1bWxHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LnZhbHVlcyhncm91cC5ncm91cHMpXG4gICAgaWYgKGdyb3VwLlR5cGUgPT09IFB1bWxHcm91cFR5cGUuRklDVElWRSB8fCBncm91cC5DaGlsZHJlbi5sZW5ndGggPiAwIHx8IGdyb3Vwcy5sZW5ndGggPiAxKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhncm91cC5ncm91cHMpLmZvckVhY2goKFtuYW1lLCBncnBdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2ZsYXR0ZW5Hcm91cHMoZ3JwKVxuICAgICAgICBpZiAocmVzdWx0KSBncm91cC5ncm91cHNbbmFtZV0gPSByZXN1bHRcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IGNoaWxkR3JvdXAgPSBncm91cHNbMF1cbiAgICBjb25zdCBmbGF0R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IFtncm91cC5OYW1lLCBjaGlsZEdyb3VwLk5hbWVdLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKSxcbiAgICAgIHR5cGU6IGdyb3VwLlR5cGUsXG4gICAgICBncm91cFBhdGg6IGNoaWxkR3JvdXAuR3JvdXBQYXRoLFxuICAgICAgZ3JvdXBzOiBjaGlsZEdyb3VwLmdyb3VwcyxcbiAgICB9KVxuICAgIGNoaWxkR3JvdXAuQ2hpbGRyZW4uZm9yRWFjaCgoY2cpID0+IGZsYXRHcm91cC5hZGRDaGlsZHJlbihjZykpXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZsYXRHcm91cC5ncm91cHMpLmxlbmd0aCA+IDAgPyB0aGlzLl9mbGF0dGVuR3JvdXBzKGZsYXRHcm91cCkgOiBmbGF0R3JvdXBcbiAgfVxufVxuIl19