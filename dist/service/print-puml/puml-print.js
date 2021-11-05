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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRUFBK0Q7QUFDL0QsNENBQW1CO0FBQ25CLGtFQUFvQztBQUNwQyw4REFBd0Q7QUFDeEQsMkRBQXNEO0FBRXRELHdFQUFtRTtBQUNuRSwyR0FBcUc7QUFDckcsc0VBQWlFO0FBRWpFLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFDRCxnQkFBZ0IsQ0FBUTtJQUN4QixTQUFTLEdBQUcsYUFBYSxDQUFBLENBQUMsMkNBQTJDO0lBQzlFLFVBQVUsQ0FBVztJQUNaLG9CQUFvQixHQUFhLEVBQUUsQ0FBQTtJQUU1QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFFRCxZQUFZLE1BQXFEO1FBQy9ELE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzNDLE1BQU0sZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxPQUFPO1lBQy9ELFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyww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LENBQUMsQ0FBQTtnQkFDdkMsSUFBSSxNQUFNO29CQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTTtTQUNQO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDO1lBQzVELElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5RCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUF6R0QsOEJBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbERvY3VtZW50IH0gZnJvbSAnLi9wcmludGFibGUtZW50aXR5L3B1bWwtZG9jdW1lbnQnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGxhbnR1bWwgZnJvbSAnbm9kZS1wbGFudHVtbCdcbmltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cCdcbmltcG9ydCB7IFB1bWxQcmludGFibGVXcmFwcGVyIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXdyYXBwZXInXG5pbXBvcnQgeyBwdW1sU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHJpbnRTdHJhdGVneSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXN0cmF0ZWd5J1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludCBpbXBsZW1lbnRzIFByaW50U3RyYXRlZ3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Rlc3RpbmF0aW9uUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsZU5hbWUgPSAndmlzaW9uLnB1bWwnIC8vIFRPRE8gaW1wbGVtZW50IGV4cG9ydCBmaWxlIG5hbWUgdmFyaWFibGVcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3B1bWxSZWxhdGlvblN0cmluZ3M6IHN0cmluZ1tdID0gW11cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IGFwcE5hbWU/OiBzdHJpbmc7IGRlc3RpbmF0aW9uUGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IGFwcE5hbWUsIGRlc3RpbmF0aW9uUGF0aCB9ID0gcGFyYW1zXG4gICAgY29uc3QgZmFsbGJhY2tBcHBOYW1lID0gYXBwTmFtZSA/PyAnJ1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX3Jvb3RHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogZmFsbGJhY2tBcHBOYW1lLFxuICAgICAgdHlwZTogYXBwTmFtZSA/IFB1bWxHcm91cFR5cGUuUkVDVEFOR0xFIDogUHVtbEdyb3VwVHlwZS5GSUNUSVZFLFxuICAgICAgZ3JvdXBQYXRoOiBmYWxsYmFja0FwcE5hbWUsXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRmlsZVBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmlsZVNlcnZpY2Uuam9pblBhdGhzKHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgdGhpcy5fZmlsZU5hbWUpXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQocGFyYW1zOiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBlbnRpdGllcyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgdGhpcy5fZmxhdHRlbkdyb3Vwcyh0aGlzLl9yb290R3JvdXApXG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbERvY3VtZW50KClcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5mb3JFYWNoKChzKSA9PiB0ZW1wbGF0ZS5hZGRDaGlsZHJlbihuZXcgUHVtbFByaW50YWJsZVdyYXBwZXIocykpKVxuICAgIGNvbnN0IHB1bWxCb2R5ID0gdGVtcGxhdGUucHJpbnQoKVxuICAgIGF3YWl0IHRoaXMuX3dyaXRlVG9GaWxlKHB1bWxCb2R5KVxuICAgIC8vIGF3YWl0IHRoaXMuX2V4cG9ydEZpbGUoKSAvLyBUT0RPIGFkZCBwYXJhbWV0ZXIgZmxhZ1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIF9leHBvcnRGaWxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGV4cG9ydEZpbGVQYXRoID0gYCR7dGhpcy5GaWxlUGF0aC5zcGxpdCgnLicpWzBdfS5zdmdgXG4gICAgYXdhaXQgdGhpcy5fc3ZnUHJvbWlzZUdlbmVyYXRvcih0aGlzLkZpbGVQYXRoLCBleHBvcnRGaWxlUGF0aClcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAvLyAgIGNvbnN0IGdlbiA9IHBsYW50dW1sLmdlbmVyYXRlKHRoaXMuRmlsZVBhdGgsIHsgZm9ybWF0OiAnc3ZnJyB9KVxuICAgIC8vICAgZ2VuLm91dC5waXBlKGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGV4cG9ydEZpbGVQYXRoKSlcbiAgICAvLyAgIGdlbi5vdXQub24oJ2VuZCcsIHJlc29sdmUpXG4gICAgLy8gfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3ZnUHJvbWlzZUdlbmVyYXRvcihzb3VyY2UsIGRlc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZ2VuZXJhdG9yID0gcGxhbnR1bWwuZ2VuZXJhdGUoc291cmNlLCB7IGZvcm1hdDogJ3N2ZycgfSlcbiAgICAgIGNvbnN0IGZpbGVTdHJlYW0gPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0KVxuXG4gICAgICBmaWxlU3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdClcbiAgICAgIGdlbmVyYXRvci5vdXQub24oJ2Vycm9yJywgcmVqZWN0KVxuXG4gICAgICBnZW5lcmF0b3Iub3V0LnBpcGUoZmlsZVN0cmVhbSlcblxuICAgICAgZmlsZVN0cmVhbS5vbignZmluaXNoJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2VuZXJhdGVHcm91cHMoZW50aXRpZXM6IEVudGl0eVtdKTogdm9pZCB7XG4gICAgZW50aXRpZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgY29uc3QgcGF0aHMgPSBlLkluUHJvamVjdFBhdGguc3BsaXQoY29uc3RhbnQuZm9sZGVyU2VwKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwIHwgdW5kZWZpbmVkXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRHcm91cCA9IHByZXZHcm91cCA/PyB0aGlzLl9yb290R3JvdXBcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBjb25zdCBwcmludGFibGVFbnRpdHkgPSBwdW1sU2VydmljZS5wcmludGFibGVTdHJhdGVneUZyb21FbnRpdHkoZSlcbiAgICAgICAgICBpZiAocHJpbnRhYmxlRW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9wdW1sUmVsYXRpb25TdHJpbmdzLnB1c2gocHJpbnRhYmxlRW50aXR5LnByaW50UmVsYXRpb25zKCkpXG4gICAgICAgICAgICBwYXJlbnRHcm91cC5hZGRDaGlsZHJlbihwcmludGFibGVFbnRpdHkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwUGF0aCA9IFtwYXJlbnRHcm91cC5Hcm91cFBhdGgsIHBdLmZpbHRlcihCb29sZWFuKS5qb2luKGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgICAgY29uc3QgbmV3R3JvdXAgPSBwYXJlbnRHcm91cC5ncm91cHNbcF0gPz8gbmV3IFB1bWxHcm91cCh7IG5hbWU6IHAsIGdyb3VwUGF0aCwgdHlwZTogUHVtbEdyb3VwVHlwZS5GT0xERVIgfSlcbiAgICAgICAgcGFyZW50R3JvdXAuZ3JvdXBzW3BdID0gbmV3R3JvdXBcbiAgICAgICAgcHJldkdyb3VwID0gbmV3R3JvdXBcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfZmxhdHRlbkdyb3Vwcyhncm91cDogUHVtbEdyb3VwKTogUHVtbEdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cHMgPSBPYmplY3QudmFsdWVzKGdyb3VwLmdyb3VwcylcbiAgICBpZiAoZ3JvdXAuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFIHx8IGdyb3VwLkNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgIE9iamVjdC5lbnRyaWVzKGdyb3VwLmdyb3VwcykuZm9yRWFjaCgoW25hbWUsIGdycF0pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fZmxhdHRlbkdyb3VwcyhncnApXG4gICAgICAgIGlmIChyZXN1bHQpIGdyb3VwLmdyb3Vwc1tuYW1lXSA9IHJlc3VsdFxuICAgICAgfSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZ3JvdXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgY2hpbGRHcm91cCA9IGdyb3Vwc1swXVxuICAgIGNvbnN0IGZsYXRHcm91cCA9IG5ldyBQdW1sR3JvdXAoe1xuICAgICAgbmFtZTogW2dyb3VwLk5hbWUsIGNoaWxkR3JvdXAuTmFtZV0uam9pbihjb25zdGFudC5mb2xkZXJTZXApLFxuICAgICAgdHlwZTogZ3JvdXAuVHlwZSxcbiAgICAgIGdyb3VwUGF0aDogY2hpbGRHcm91cC5Hcm91cFBhdGgsXG4gICAgfSlcbiAgICBjaGlsZEdyb3VwLkNoaWxkcmVuLmZvckVhY2goKGNnKSA9PiBmbGF0R3JvdXAuYWRkQ2hpbGRyZW4oY2cpKVxuICAgIHJldHVybiBmbGF0R3JvdXBcbiAgfVxufVxuIl19