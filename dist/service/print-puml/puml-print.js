"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const fs_1 = __importDefault(require("fs"));
const node_plantuml_1 = __importDefault(require("node-plantuml"));
const file_dao_1 = require("src/dal/file-dao");
const puml_group_type_1 = require("src/enum/puml-group-type");
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
        this._generateGroups(entities);
        this._flattenGroups(this._rootGroup);
        const template = new puml_document_1.PumlDocument();
        template.addChildren(this._rootGroup);
        this._pumlRelationStrings.forEach((s) => template.addChildren(new puml_printable_wrapper_1.PumlPrintableWrapper(s)));
        const pumlBody = template.print();
        await this._writeToFile(pumlBody);
        // await this._exportFile() // TODO add parameter flag
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsa0VBQW9DO0FBQ3BDLCtDQUEwQztBQUMxQyw4REFBd0Q7QUFFeEQscUVBQStEO0FBQy9ELHdFQUFtRTtBQUNuRSx5RkFBb0Y7QUFDcEYsMkdBQXFHO0FBQ3JHLHNFQUFpRTtBQUVqRSxnREFBNEM7QUFFNUMsTUFBYSxTQUFTO0lBQ0QsZ0JBQWdCLENBQVE7SUFDeEIsU0FBUyxDQUFRO0lBQzFCLFVBQVUsQ0FBVztJQUNaLG9CQUFvQixHQUFhLEVBQUUsQ0FBQTtJQUU1QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSxrQkFBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzFHLENBQUM7SUFFRCxZQUFZLE1BQXVFO1FBQ2pGLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUNyRCxNQUFNLGVBQWUsR0FBRyxPQUFPLElBQUksRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUE7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLFFBQVEsT0FBTyxDQUFBO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBUyxDQUFDO1lBQzlCLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLCtCQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLE9BQU87WUFDL0QsU0FBUyxFQUFFLGVBQWU7U0FDM0Is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O2dCQUNuRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUN2QyxJQUFJLE1BQU07b0JBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUE7WUFDRixPQUFNO1NBQ1A7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU07UUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVCLE1BQU0sU0FBUyxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxTQUFTLENBQUM7WUFDNUQsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1lBQ2hCLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztTQUNoQyxDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlELE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUM7Q0FDRjtBQTFHRCw4QkEwR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGxhbnR1bWwgZnJvbSAnbm9kZS1wbGFudHVtbCdcbmltcG9ydCB7IGZpbGVEYW8gfSBmcm9tICdzcmMvZGFsL2ZpbGUtZGFvJ1xuaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBmaWxlUGF0aFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXBhdGgtc2VydmljZSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cCdcbmltcG9ydCB7IFB1bWxEb2N1bWVudCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLWRvY3VtZW50J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IHB1bWxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtc2VydmljZSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVEYW8ubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgYXBwTmFtZT86IHN0cmluZzsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmc7IGZpbGVOYW1lOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZSB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX2ZpbGVOYW1lID0gYCR7ZmlsZU5hbWV9LnB1bWxgXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgICB0eXBlOiBhcHBOYW1lID8gUHVtbEdyb3VwVHlwZS5SRUNUQU5HTEUgOiBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUsXG4gICAgICBncm91cFBhdGg6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldCBGaWxlUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlUGF0aFNlcnZpY2Uuam9pblBhdGhzKHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgdGhpcy5fZmlsZU5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQocGFyYW1zOiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBlbnRpdGllcyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGhpcy5fZmxhdHRlbkdyb3Vwcyh0aGlzLl9yb290R3JvdXApXG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbERvY3VtZW50KClcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5mb3JFYWNoKChzKSA9PiB0ZW1wbGF0ZS5hZGRDaGlsZHJlbihuZXcgUHVtbFByaW50YWJsZVdyYXBwZXIocykpKVxuICAgIGNvbnN0IHB1bWxCb2R5ID0gdGVtcGxhdGUucHJpbnQoKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHB1bWxCb2R5KVxuICAgIC8vIGF3YWl0IHRoaXMuX2V4cG9ydEZpbGUoKSAvLyBUT0RPIGFkZCBwYXJhbWV0ZXIgZmxhZ1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIF9leHBvcnRGaWxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4cG9ydEZpbGVQYXRoID0gYCR7dGhpcy5GaWxlUGF0aC5zcGxpdCgnLicpWzBdfS5zdmdgXG4gICAgYXdhaXQgdGhpcy5fc3ZnUHJvbWlzZUdlbmVyYXRvcih0aGlzLkZpbGVQYXRoLCBleHBvcnRGaWxlUGF0aClcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAvLyAgIGNvbnN0IGdlbiA9IHBsYW50dW1sLmdlbmVyYXRlKHRoaXMuRmlsZVBhdGgsIHsgZm9ybWF0OiAnc3ZnJyB9KVxuICAgIC8vICAgZ2VuLm91dC5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGV4cG9ydEZpbGVQYXRoKSlcbiAgICAvLyAgIGdlbi5vdXQub24oJ2VuZCcsIHJlc29sdmUpXG4gICAgLy8gfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3ZnUHJvbWlzZUdlbmVyYXRvcihzb3VyY2UsIGRlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZ2VuZXJhdG9yID0gcGxhbnR1bWwuZ2VuZXJhdGUoc291cmNlLCB7IGZvcm1hdDogJ3N2ZycgfSlcbiAgICAgIGNvbnN0IGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0KVxuXG4gICAgICBmaWxlU3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgIGdlbmVyYXRvci5vdXQub24oJ2Vycm9yJywgcmVqZWN0KVxuXG4gICAgICBnZW5lcmF0b3Iub3V0LnBpcGUoZmlsZVN0cmVhbSlcblxuICAgICAgZmlsZVN0cmVhbS5vbignZmluaXNoJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/PyB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSBwdW1sU2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmxhdHRlbkdyb3Vwcyhncm91cDogUHVtbEdyb3VwKTogUHVtbEdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3QudmFsdWVzKGdyb3VwLmdyb3VwcylcbiAgICBpZiAoZ3JvdXAuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFIHx8IGdyb3VwLkNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwLmdyb3VwcykuZm9yRWFjaCgoW25hbWUsIGdycF0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZmxhdHRlbkdyb3VwcyhncnApXG4gICAgICAgIGlmIChyZXN1bHQpIGdyb3VwLmdyb3Vwc1tuYW1lXSA9IHJlc3VsdFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgY2hpbGRHcm91cCA9IGdyb3Vwc1swXVxuICAgIGNvbnN0IGZsYXRHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogW2dyb3VwLk5hbWUsIGNoaWxkR3JvdXAuTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApLFxuICAgICAgdHlwZTogZ3JvdXAuVHlwZSxcbiAgICAgIGdyb3VwUGF0aDogY2hpbGRHcm91cC5Hcm91cFBhdGgsXG4gICAgfSlcbiAgICBjaGlsZEdyb3VwLkNoaWxkcmVuLmZvckVhY2goKGNnKSA9PiBmbGF0R3JvdXAuYWRkQ2hpbGRyZW4oY2cpKVxuICAgIHJldHVybiBmbGF0R3JvdXBcbiAgfVxufVxuIl19