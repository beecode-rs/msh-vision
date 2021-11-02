"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrint = void 0;
const fs_1 = __importDefault(require("fs"));
const node_plantuml_1 = __importDefault(require("node-plantuml"));
const puml_group_type_1 = require("src/enum/puml-group-type");
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print-puml/group/puml-group");
const puml_printable_wrapper_1 = require("src/service/print-puml/printable-entity/puml-printable-wrapper");
const puml_document_1 = require("src/service/print-puml/puml-document");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1wcmludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsa0VBQW9DO0FBQ3BDLDhEQUF3RDtBQUN4RCwyREFBc0Q7QUFFdEQsd0VBQW1FO0FBQ25FLDJHQUFxRztBQUNyRyx3RUFBbUU7QUFDbkUsc0VBQWlFO0FBRWpFLGdEQUE0QztBQUU1QyxNQUFhLFNBQVM7SUFDRCxnQkFBZ0IsQ0FBUTtJQUN4QixTQUFTLEdBQUcsYUFBYSxDQUFBLENBQUMsMkNBQTJDO0lBQzlFLFVBQVUsQ0FBVztJQUNaLG9CQUFvQixHQUFhLEVBQUUsQ0FBQTtJQUU1QyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFFRCxZQUFZLE1BQXFEO1FBQy9ELE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzNDLE1BQU0sZUFBZSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQztZQUM5QixJQUFJLEVBQUUsZUFBZTtZQUNyQixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQywrQkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsK0JBQWEsQ0FBQyxPQUFPO1lBQy9ELFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyww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LENBQUMsQ0FBQTtnQkFDdkMsSUFBSSxNQUFNO29CQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTTtTQUNQO1FBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFNO1FBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUM7WUFDOUIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsU0FBUyxDQUFDO1lBQzVELElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM5RCxPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0NBQ0Y7QUF6R0QsOEJBeUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBsYW50dW1sIGZyb20gJ25vZGUtcGxhbnR1bWwnXG5pbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQdW1sR3JvdXAgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL2dyb3VwL3B1bWwtZ3JvdXAnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlV3JhcHBlciB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS13cmFwcGVyJ1xuaW1wb3J0IHsgUHVtbERvY3VtZW50IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLWRvY3VtZW50J1xuaW1wb3J0IHsgcHVtbFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtc2VydmljZSdcbmltcG9ydCB7IFByaW50U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1zdHJhdGVneSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnQgaW1wbGVtZW50cyBQcmludFN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kZXN0aW5hdGlvblBhdGg6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbGVOYW1lID0gJ3Zpc2lvbi5wdW1sJyAvLyBUT0RPIGltcGxlbWVudCBleHBvcnQgZmlsZSBuYW1lIHZhcmlhYmxlXG4gIHByb3RlY3RlZCBfcm9vdEdyb3VwOiBQdW1sR3JvdXBcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wdW1sUmVsYXRpb25TdHJpbmdzOiBzdHJpbmdbXSA9IFtdXG5cbiAgcHJvdGVjdGVkIGFzeW5jIF93cml0ZVRvRmlsZShkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBmaWxlU2VydmljZS5ta2RpckFuZFdyaXRlVG9GaWxlKHsgZm9sZGVyUGF0aDogdGhpcy5fZGVzdGluYXRpb25QYXRoLCBmaWxlTmFtZTogdGhpcy5fZmlsZU5hbWUsIGRhdGEgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBhcHBOYW1lPzogc3RyaW5nOyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgeyBhcHBOYW1lLCBkZXN0aW5hdGlvblBhdGggfSA9IHBhcmFtc1xuICAgIGNvbnN0IGZhbGxiYWNrQXBwTmFtZSA9IGFwcE5hbWUgPz8gJydcbiAgICB0aGlzLl9kZXN0aW5hdGlvblBhdGggPSBkZXN0aW5hdGlvblBhdGhcbiAgICB0aGlzLl9yb290R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IGZhbGxiYWNrQXBwTmFtZSxcbiAgICAgIHR5cGU6IGFwcE5hbWUgPyBQdW1sR3JvdXBUeXBlLlJFQ1RBTkdMRSA6IFB1bWxHcm91cFR5cGUuRklDVElWRSxcbiAgICAgIGdyb3VwUGF0aDogZmFsbGJhY2tBcHBOYW1lLFxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZ2V0IEZpbGVQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGVTZXJ2aWNlLmpvaW5QYXRocyh0aGlzLl9kZXN0aW5hdGlvblBhdGgsIHRoaXMuX2ZpbGVOYW1lKVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHBhcmFtczogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgZW50aXRpZXMgfSA9IHBhcmFtc1xuICAgIHRoaXMuX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzKVxuICAgIHRoaXMuX2ZsYXR0ZW5Hcm91cHModGhpcy5fcm9vdEdyb3VwKVxuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxEb2N1bWVudCgpXG4gICAgdGVtcGxhdGUuYWRkQ2hpbGRyZW4odGhpcy5fcm9vdEdyb3VwKVxuICAgIHRoaXMuX3B1bWxSZWxhdGlvblN0cmluZ3MuZm9yRWFjaCgocykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4obmV3IFB1bWxQcmludGFibGVXcmFwcGVyKHMpKSlcbiAgICBjb25zdCBwdW1sQm9keSA9IHRlbXBsYXRlLnByaW50KClcbiAgICBhd2FpdCB0aGlzLl93cml0ZVRvRmlsZShwdW1sQm9keSlcbiAgICAvLyBhd2FpdCB0aGlzLl9leHBvcnRGaWxlKCkgLy8gVE9ETyBhZGQgcGFyYW1ldGVyIGZsYWdcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBfZXhwb3J0RmlsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBleHBvcnRGaWxlUGF0aCA9IGAke3RoaXMuRmlsZVBhdGguc3BsaXQoJy4nKVswXX0uc3ZnYFxuICAgIGF3YWl0IHRoaXMuX3N2Z1Byb21pc2VHZW5lcmF0b3IodGhpcy5GaWxlUGF0aCwgZXhwb3J0RmlsZVBhdGgpXG4gICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgLy8gICBjb25zdCBnZW4gPSBwbGFudHVtbC5nZW5lcmF0ZSh0aGlzLkZpbGVQYXRoLCB7IGZvcm1hdDogJ3N2ZycgfSlcbiAgICAvLyAgIGdlbi5vdXQucGlwZShmcy5jcmVhdGVXcml0ZVN0cmVhbShleHBvcnRGaWxlUGF0aCkpXG4gICAgLy8gICBnZW4ub3V0Lm9uKCdlbmQnLCByZXNvbHZlKVxuICAgIC8vIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3N2Z1Byb21pc2VHZW5lcmF0b3Ioc291cmNlLCBkZXN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGdlbmVyYXRvciA9IHBsYW50dW1sLmdlbmVyYXRlKHNvdXJjZSwgeyBmb3JtYXQ6ICdzdmcnIH0pXG4gICAgICBjb25zdCBmaWxlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdClcblxuICAgICAgZmlsZVN0cmVhbS5vbignZXJyb3InLCByZWplY3QpXG4gICAgICBnZW5lcmF0b3Iub3V0Lm9uKCdlcnJvcicsIHJlamVjdClcblxuICAgICAgZ2VuZXJhdG9yLm91dC5waXBlKGZpbGVTdHJlYW0pXG5cbiAgICAgIGZpbGVTdHJlYW0ub24oJ2ZpbmlzaCcsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5JblByb2plY3RQYXRoLnNwbGl0KGNvbnN0YW50LmZvbGRlclNlcClcbiAgICAgIGxldCBwcmV2R3JvdXA6IFB1bWxHcm91cCB8IHVuZGVmaW5lZFxuICAgICAgcGF0aHMuZm9yRWFjaCgocCwgaXgsIGxpc3QpID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50R3JvdXAgPSBwcmV2R3JvdXAgPz8gdGhpcy5fcm9vdEdyb3VwXG4gICAgICAgIGlmIChpeCA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgY29uc3QgcHJpbnRhYmxlRW50aXR5ID0gcHVtbFNlcnZpY2UucHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KGUpXG4gICAgICAgICAgaWYgKHByaW50YWJsZUVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5fcHVtbFJlbGF0aW9uU3RyaW5ncy5wdXNoKHByaW50YWJsZUVudGl0eS5wcmludFJlbGF0aW9ucygpKVxuICAgICAgICAgICAgcGFyZW50R3JvdXAuYWRkQ2hpbGRyZW4ocHJpbnRhYmxlRW50aXR5KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVyblxuICAgICAgICBjb25zdCBncm91cFBhdGggPSBbcGFyZW50R3JvdXAuR3JvdXBQYXRoLCBwXS5maWx0ZXIoQm9vbGVhbikuam9pbihjb25zdGFudC5mb2xkZXJTZXApXG4gICAgICAgIGNvbnN0IG5ld0dyb3VwID0gcGFyZW50R3JvdXAuZ3JvdXBzW3BdID8/IG5ldyBQdW1sR3JvdXAoeyBuYW1lOiBwLCBncm91cFBhdGgsIHR5cGU6IFB1bWxHcm91cFR5cGUuRk9MREVSIH0pXG4gICAgICAgIHBhcmVudEdyb3VwLmdyb3Vwc1twXSA9IG5ld0dyb3VwXG4gICAgICAgIHByZXZHcm91cCA9IG5ld0dyb3VwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ZsYXR0ZW5Hcm91cHMoZ3JvdXA6IFB1bWxHcm91cCk6IFB1bWxHcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gT2JqZWN0LnZhbHVlcyhncm91cC5ncm91cHMpXG4gICAgaWYgKGdyb3VwLlR5cGUgPT09IFB1bWxHcm91cFR5cGUuRklDVElWRSB8fCBncm91cC5DaGlsZHJlbi5sZW5ndGggPiAwIHx8IGdyb3Vwcy5sZW5ndGggPiAxKSB7XG4gICAgICBPYmplY3QuZW50cmllcyhncm91cC5ncm91cHMpLmZvckVhY2goKFtuYW1lLCBncnBdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2ZsYXR0ZW5Hcm91cHMoZ3JwKVxuICAgICAgICBpZiAocmVzdWx0KSBncm91cC5ncm91cHNbbmFtZV0gPSByZXN1bHRcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGdyb3Vwcy5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IGNoaWxkR3JvdXAgPSBncm91cHNbMF1cbiAgICBjb25zdCBmbGF0R3JvdXAgPSBuZXcgUHVtbEdyb3VwKHtcbiAgICAgIG5hbWU6IFtncm91cC5OYW1lLCBjaGlsZEdyb3VwLk5hbWVdLmpvaW4oY29uc3RhbnQuZm9sZGVyU2VwKSxcbiAgICAgIHR5cGU6IGdyb3VwLlR5cGUsXG4gICAgICBncm91cFBhdGg6IGNoaWxkR3JvdXAuR3JvdXBQYXRoLFxuICAgIH0pXG4gICAgY2hpbGRHcm91cC5DaGlsZHJlbi5mb3JFYWNoKChjZykgPT4gZmxhdEdyb3VwLmFkZENoaWxkcmVuKGNnKSlcbiAgICByZXR1cm4gZmxhdEdyb3VwXG4gIH1cbn1cbiJdfQ==