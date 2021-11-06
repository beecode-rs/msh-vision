"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const puml_document_1 = require("./printable-entity/puml-document");
const fs_1 = __importDefault(require("fs"));
const node_plantuml_1 = __importDefault(require("node-plantuml"));
const puml_group_type_1 = require("src/enum/puml-group-type");
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print-puml/group/puml-group");
const puml_printable_wrapper_1 = require("src/service/print-puml/printable-entity/puml-printable-wrapper");
const puml_service_1 = require("src/service/print-puml/puml-service");
const constant_1 = require("src/util/constant");
class PumlPrint {
    _destinationPath;
    _fileName = 'vision.puml'; // TODO implement export file name variable
    _rootGroup;
    _pumlRelationStrings = [];
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    constructor(params) {
        const { appName, destinationPath } = params;
        const fallbackAppName = appName ?? '';
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({
            name: fallbackAppName,
            type: appName ? puml_group_type_1.PumlGroupType.RECTANGLE : puml_group_type_1.PumlGroupType.FICTIVE,
            groupPath: fallbackAppName,
        });
    }
    get FilePath() {
        return file_service_1.fileService.joinPaths(this._destinationPath, this._fileName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxvRUFBK0Q7QUFDL0QsNENBQW1CO0FBQ25CLGtFQUFvQztBQUNwQyw4REFBd0Q7QUFDeEQsMkRBQXNEO0FBRXRELHdFQUFtRTtBQUNuRSwyR0FBcUc7QUFDckcsc0VBQWlFO0FBQ2pFLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFDRCxnQkFBZ0IsQ0FBUTtJQUN4QixTQUFTLEdBQUcsYUFBYSxDQUFBLENBQUMsMkNBQTJDO0lBQzlFLFVBQVUsQ0FBVztJQUNaLG9CQUFvQixHQUFhLEVBQUUsQ0FBQTtJQUU1QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFFRCxZQUFZLE1BQXFEO1FBQy9ELE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzNDLE1BQU0sZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxPQUFPO1lBQy9ELFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyww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LENBQUMsQ0FBQTtnQkFDdkMsSUFBSSxNQUFNO29CQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTTtTQUNQO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDO1lBQzVELElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5RCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUF6R0QsOEJBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJy4uL3ByaW50LXNlcnZpY2UnXG5pbXBvcnQgeyBQdW1sRG9jdW1lbnQgfSBmcm9tICcuL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1kb2N1bWVudCdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwbGFudHVtbCBmcm9tICdub2RlLXBsYW50dW1sJ1xuaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IGZpbGVTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvZmlsZS1zZXJ2aWNlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUHVtbEdyb3VwIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVdyYXBwZXIgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtd3JhcHBlcidcbmltcG9ydCB7IHB1bWxTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UnXG5pbXBvcnQgeyBjb25zdGFudCB9IGZyb20gJ3NyYy91dGlsL2NvbnN0YW50J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZSA9ICd2aXNpb24ucHVtbCcgLy8gVE9ETyBpbXBsZW1lbnQgZXhwb3J0IGZpbGUgbmFtZSB2YXJpYWJsZVxuICBwcm90ZWN0ZWQgX3Jvb3RHcm91cDogUHVtbEdyb3VwXG4gIHByb3RlY3RlZCByZWFkb25seSBfcHVtbFJlbGF0aW9uU3RyaW5nczogc3RyaW5nW10gPSBbXVxuXG4gIHByb3RlY3RlZCBhc3luYyBfd3JpdGVUb0ZpbGUoZGF0YTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZmlsZVNlcnZpY2UubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgYXBwTmFtZT86IHN0cmluZzsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHsgYXBwTmFtZSwgZGVzdGluYXRpb25QYXRoIH0gPSBwYXJhbXNcbiAgICBjb25zdCBmYWxsYmFja0FwcE5hbWUgPSBhcHBOYW1lID8/ICcnXG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gICAgdGhpcy5fcm9vdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgICB0eXBlOiBhcHBOYW1lID8gUHVtbEdyb3VwVHlwZS5SRUNUQU5HTEUgOiBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUsXG4gICAgICBncm91cFBhdGg6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldCBGaWxlUGF0aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlU2VydmljZS5qb2luUGF0aHModGhpcy5fZGVzdGluYXRpb25QYXRoLCB0aGlzLl9maWxlTmFtZSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmludChwYXJhbXM6IHsgZW50aXRpZXM6IEVudGl0eVtdIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGVudGl0aWVzIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllcylcbiAgICB0aGlzLl9mbGF0dGVuR3JvdXBzKHRoaXMuX3Jvb3RHcm91cClcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IG5ldyBQdW1sRG9jdW1lbnQoKVxuICAgIHRlbXBsYXRlLmFkZENoaWxkcmVuKHRoaXMuX3Jvb3RHcm91cClcbiAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLmZvckVhY2goKHMpID0+IHRlbXBsYXRlLmFkZENoaWxkcmVuKG5ldyBQdW1sUHJpbnRhYmxlV3JhcHBlcihzKSkpXG4gICAgY29uc3QgcHVtbEJvZHkgPSB0ZW1wbGF0ZS5wcmludCgpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUocHVtbEJvZHkpXG4gICAgLy8gYXdhaXQgdGhpcy5fZXhwb3J0RmlsZSgpIC8vIFRPRE8gYWRkIHBhcmFtZXRlciBmbGFnXG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgX2V4cG9ydEZpbGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZXhwb3J0RmlsZVBhdGggPSBgJHt0aGlzLkZpbGVQYXRoLnNwbGl0KCcuJylbMF19LnN2Z2BcbiAgICBhd2FpdCB0aGlzLl9zdmdQcm9taXNlR2VuZXJhdG9yKHRoaXMuRmlsZVBhdGgsIGV4cG9ydEZpbGVQYXRoKVxuICAgIC8vIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIC8vICAgY29uc3QgZ2VuID0gcGxhbnR1bWwuZ2VuZXJhdGUodGhpcy5GaWxlUGF0aCwgeyBmb3JtYXQ6ICdzdmcnIH0pXG4gICAgLy8gICBnZW4ub3V0LnBpcGUoZnMuY3JlYXRlV3JpdGVTdHJlYW0oZXhwb3J0RmlsZVBhdGgpKVxuICAgIC8vICAgZ2VuLm91dC5vbignZW5kJywgcmVzb2x2ZSlcbiAgICAvLyB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdmdQcm9taXNlR2VuZXJhdG9yKHNvdXJjZSwgZGVzdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBnZW5lcmF0b3IgPSBwbGFudHVtbC5nZW5lcmF0ZShzb3VyY2UsIHsgZm9ybWF0OiAnc3ZnJyB9KVxuICAgICAgY29uc3QgZmlsZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGRlc3QpXG5cbiAgICAgIGZpbGVTdHJlYW0ub24oJ2Vycm9yJywgcmVqZWN0KVxuICAgICAgZ2VuZXJhdG9yLm91dC5vbignZXJyb3InLCByZWplY3QpXG5cbiAgICAgIGdlbmVyYXRvci5vdXQucGlwZShmaWxlU3RyZWFtKVxuXG4gICAgICBmaWxlU3RyZWFtLm9uKCdmaW5pc2gnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllczogRW50aXR5W10pOiB2b2lkIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBjb25zdCBwYXRocyA9IGUuSW5Qcm9qZWN0UGF0aC5zcGxpdChjb25zdGFudC5mb2xkZXJTZXApXG4gICAgICBsZXQgcHJldkdyb3VwOiBQdW1sR3JvdXAgfCB1bmRlZmluZWRcbiAgICAgIHBhdGhzLmZvckVhY2goKHAsIGl4LCBsaXN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudEdyb3VwID0gcHJldkdyb3VwID8/IHRoaXMuX3Jvb3RHcm91cFxuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGNvbnN0IHByaW50YWJsZUVudGl0eSA9IHB1bWxTZXJ2aWNlLnByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eShlKVxuICAgICAgICAgIGlmIChwcmludGFibGVFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MucHVzaChwcmludGFibGVFbnRpdHkucHJpbnRSZWxhdGlvbnMoKSlcbiAgICAgICAgICAgIHBhcmVudEdyb3VwLmFkZENoaWxkcmVuKHByaW50YWJsZUVudGl0eSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSByZXR1cm5cbiAgICAgICAgY29uc3QgZ3JvdXBQYXRoID0gW3BhcmVudEdyb3VwLkdyb3VwUGF0aCwgcF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IHBhcmVudEdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgZ3JvdXBQYXRoLCB0eXBlOiBQdW1sR3JvdXBUeXBlLkZPTERFUiB9KVxuICAgICAgICBwYXJlbnRHcm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9mbGF0dGVuR3JvdXBzKGdyb3VwOiBQdW1sR3JvdXApOiBQdW1sR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwcyA9IE9iamVjdC52YWx1ZXMoZ3JvdXAuZ3JvdXBzKVxuICAgIGlmIChncm91cC5UeXBlID09PSBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUgfHwgZ3JvdXAuQ2hpbGRyZW4ubGVuZ3RoID4gMCB8fCBncm91cHMubGVuZ3RoID4gMSkge1xuICAgICAgT2JqZWN0LmVudHJpZXMoZ3JvdXAuZ3JvdXBzKS5mb3JFYWNoKChbbmFtZSwgZ3JwXSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9mbGF0dGVuR3JvdXBzKGdycClcbiAgICAgICAgaWYgKHJlc3VsdCkgZ3JvdXAuZ3JvdXBzW25hbWVdID0gcmVzdWx0XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChncm91cHMubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBjb25zdCBjaGlsZEdyb3VwID0gZ3JvdXBzWzBdXG4gICAgY29uc3QgZmxhdEdyb3VwID0gbmV3IFB1bWxHcm91cCh7XG4gICAgICBuYW1lOiBbZ3JvdXAuTmFtZSwgY2hpbGRHcm91cC5OYW1lXS5qb2luKGNvbnN0YW50LmZvbGRlclNlcCksXG4gICAgICB0eXBlOiBncm91cC5UeXBlLFxuICAgICAgZ3JvdXBQYXRoOiBjaGlsZEdyb3VwLkdyb3VwUGF0aCxcbiAgICB9KVxuICAgIGNoaWxkR3JvdXAuQ2hpbGRyZW4uZm9yRWFjaCgoY2cpID0+IGZsYXRHcm91cC5hZGRDaGlsZHJlbihjZykpXG4gICAgcmV0dXJuIGZsYXRHcm91cFxuICB9XG59XG4iXX0=