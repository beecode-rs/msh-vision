"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintStrategy = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/printable-entity/puml-printable-entity-service");
const puml_template_1 = require("src/service/print/puml/puml-template");
class PumlPrintStrategy {
    constructor({ appName, destinationPath }) {
        this._fileName = 'vision.puml';
        this._destinationPath = destinationPath;
        this._rootGroup = new puml_group_1.PumlGroup({ name: appName, level: 0 });
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.filePath.split('/');
            let prevGroup;
            paths.forEach((p, ix, list) => {
                const group = prevGroup ? prevGroup : this._rootGroup;
                if (ix === list.length - 1) {
                    group.addChildren(puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }));
                    return;
                }
                if (list.length === 1)
                    return;
                const newGroup = group.groups[p] ?? new puml_group_1.PumlGroup({ name: p, level: ix + 1 });
                group.groups[p] = newGroup;
                prevGroup = newGroup;
            });
        });
    }
    async print({ entities }) {
        const template = new puml_template_1.PumlTemplate();
        this._generateGroups(entities);
        // Object.values(this._rootGroup.groups).forEach((g) => template.addChildren(g))
        template.addChildren(this._rootGroup);
        await this._writeToFile(template.print());
    }
}
exports.PumlPrintStrategy = PumlPrintStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsd0VBQW1FO0FBQ25FLHlIQUFrSDtBQUNsSCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBaUI7SUFTNUIsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQWdEO1FBUG5FLGNBQVMsR0FBRyxhQUFhLENBQUE7UUFRMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQVBTLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBWTtRQUN2QyxNQUFNLDBCQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDOUcsQ0FBQztJQU9TLGVBQWUsQ0FBQyxRQUFrQjtRQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbkMsSUFBSSxTQUFvQixDQUFBO1lBQ3hCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUM1QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQTtnQkFDckQsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzFCLEtBQUssQ0FBQyxXQUFXLENBQUMsMERBQTBCLENBQUMsMkJBQTJCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO29CQUN4RixPQUFNO2lCQUNQO2dCQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDO29CQUFFLE9BQU07Z0JBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxzQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQzdFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFBO2dCQUMxQixTQUFTLEdBQUcsUUFBUSxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBMEI7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUE7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QixnRkFBZ0Y7UUFDaEYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDckMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7Q0FDRjtBQXZDRCw4Q0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgZmlsZVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9maWxlLXNlcnZpY2UnXG5pbXBvcnQgeyBQcmludFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnQtc3RyYXRlZ3knXG5pbXBvcnQgeyBQdW1sR3JvdXAgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL2dyb3VwL3B1bWwtZ3JvdXAnXG5pbXBvcnQgeyBwdW1sUHJpbnRhYmxlRW50aXR5U2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnRpdHktc2VydmljZSdcbmltcG9ydCB7IFB1bWxUZW1wbGF0ZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC10ZW1wbGF0ZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludFN0cmF0ZWd5IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZSA9ICd2aXNpb24ucHVtbCdcbiAgcHJvdGVjdGVkIF9yb290R3JvdXA6IFB1bWxHcm91cFxuXG4gIHByb3RlY3RlZCBhc3luYyBfd3JpdGVUb0ZpbGUoZGF0YTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZmlsZVNlcnZpY2UubWtkaXJBbmRXcml0ZVRvRmlsZSh7IGZvbGRlclBhdGg6IHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCwgZmlsZU5hbWU6IHRoaXMuX2ZpbGVOYW1lLCBkYXRhIH0pXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IGFwcE5hbWUsIGRlc3RpbmF0aW9uUGF0aCB9OiB7IGFwcE5hbWU6IHN0cmluZzsgZGVzdGluYXRpb25QYXRoOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2Rlc3RpbmF0aW9uUGF0aCA9IGRlc3RpbmF0aW9uUGF0aFxuICAgIHRoaXMuX3Jvb3RHcm91cCA9IG5ldyBQdW1sR3JvdXAoeyBuYW1lOiBhcHBOYW1lLCBsZXZlbDogMCB9KVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllczogRW50aXR5W10pOiB2b2lkIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICBjb25zdCBwYXRocyA9IGUuZmlsZVBhdGguc3BsaXQoJy8nKVxuICAgICAgbGV0IHByZXZHcm91cDogUHVtbEdyb3VwXG4gICAgICBwYXRocy5mb3JFYWNoKChwLCBpeCwgbGlzdCkgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IHByZXZHcm91cCA/IHByZXZHcm91cCA6IHRoaXMuX3Jvb3RHcm91cFxuICAgICAgICBpZiAoaXggPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGdyb3VwLmFkZENoaWxkcmVuKHB1bWxQcmludGFibGVFbnRpdHlTZXJ2aWNlLnByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eSh7IGVudGl0eTogZSB9KSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVyblxuICAgICAgICBjb25zdCBuZXdHcm91cCA9IGdyb3VwLmdyb3Vwc1twXSA/PyBuZXcgUHVtbEdyb3VwKHsgbmFtZTogcCwgbGV2ZWw6IGl4ICsgMSB9KVxuICAgICAgICBncm91cC5ncm91cHNbcF0gPSBuZXdHcm91cFxuICAgICAgICBwcmV2R3JvdXAgPSBuZXdHcm91cFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByaW50KHsgZW50aXRpZXMgfTogeyBlbnRpdGllczogRW50aXR5W10gfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gbmV3IFB1bWxUZW1wbGF0ZSgpXG4gICAgdGhpcy5fZ2VuZXJhdGVHcm91cHMoZW50aXRpZXMpXG4gICAgLy8gT2JqZWN0LnZhbHVlcyh0aGlzLl9yb290R3JvdXAuZ3JvdXBzKS5mb3JFYWNoKChnKSA9PiB0ZW1wbGF0ZS5hZGRDaGlsZHJlbihnKSlcbiAgICB0ZW1wbGF0ZS5hZGRDaGlsZHJlbih0aGlzLl9yb290R3JvdXApXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxufVxuIl19