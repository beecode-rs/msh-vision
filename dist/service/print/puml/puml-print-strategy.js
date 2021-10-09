"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintStrategy = void 0;
const file_service_1 = require("src/service/file-service");
const puml_group_1 = require("src/service/print/puml/puml-group/puml-group");
const puml_printable_entity_service_1 = require("src/service/print/puml/puml-printable-entity/puml-printable-entity-service");
const puml_template_1 = require("src/service/print/puml/puml-template");
class PumlPrintStrategy {
    constructor({ destinationPath }) {
        this._fileName = 'vision.puml';
        this._groups = {};
        this._destinationPath = destinationPath;
    }
    async _writeToFile(data) {
        await file_service_1.fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data });
    }
    _generateGroups(entities) {
        entities.forEach((e) => {
            const paths = e.filePath.split('/');
            let prevGroup;
            paths.forEach((p, ix, list) => {
                if (list.length === 1)
                    return;
                const groups = prevGroup ? prevGroup.groups : this._groups;
                if (ix === list.length - 1) {
                    prevGroup.addChildren(puml_printable_entity_service_1.pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }));
                    return;
                }
                const newGroup = groups[p] ?? new puml_group_1.PumlGroup({ name: p });
                groups[p] = newGroup;
                prevGroup = newGroup;
            });
        });
    }
    async print({ entities }) {
        const template = new puml_template_1.PumlTemplate();
        this._generateGroups(entities);
        Object.values(this._groups).forEach((g) => template.addChildren(g));
        await this._writeToFile(template.print());
    }
}
exports.PumlPrintStrategy = PumlPrintStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1wcmludC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyREFBc0Q7QUFFdEQsNkVBQXdFO0FBQ3hFLDhIQUF1SDtBQUN2SCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBaUI7SUFTNUIsWUFBWSxFQUFFLGVBQWUsRUFBK0I7UUFQekMsY0FBUyxHQUFHLGFBQWEsQ0FBQTtRQUNsQyxZQUFPLEdBQStCLEVBQUUsQ0FBQTtRQU9oRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO0lBQ3pDLENBQUM7SUFOUyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQVk7UUFDdkMsTUFBTSwwQkFBVyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzlHLENBQUM7SUFNUyxlQUFlLENBQUMsUUFBa0I7UUFDMUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ25DLElBQUksU0FBb0IsQ0FBQTtZQUN4QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsT0FBTTtnQkFDN0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO2dCQUMxRCxJQUFJLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDMUIsU0FBUyxDQUFDLFdBQVcsQ0FBQywwREFBMEIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzVGLE9BQU07aUJBQ1A7Z0JBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksc0JBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN4RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFBO2dCQUNwQixTQUFTLEdBQUcsUUFBUSxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBMEI7UUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUE7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGO0FBckNELDhDQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBmaWxlU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL2ZpbGUtc2VydmljZSdcbmltcG9ydCB7IFByaW50U3RyYXRlZ3kgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludC1zdHJhdGVneSdcbmltcG9ydCB7IFB1bWxHcm91cCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnRpdHktc2VydmljZSdcbmltcG9ydCB7IFB1bWxUZW1wbGF0ZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC10ZW1wbGF0ZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludFN0cmF0ZWd5IGltcGxlbWVudHMgUHJpbnRTdHJhdGVneSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZGVzdGluYXRpb25QYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWxlTmFtZSA9ICd2aXNpb24ucHVtbCdcbiAgcHJvdGVjdGVkIF9ncm91cHM6IHsgW2s6IHN0cmluZ106IFB1bWxHcm91cCB9ID0ge31cblxuICBwcm90ZWN0ZWQgYXN5bmMgX3dyaXRlVG9GaWxlKGRhdGE6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZpbGVTZXJ2aWNlLm1rZGlyQW5kV3JpdGVUb0ZpbGUoeyBmb2xkZXJQYXRoOiB0aGlzLl9kZXN0aW5hdGlvblBhdGgsIGZpbGVOYW1lOiB0aGlzLl9maWxlTmFtZSwgZGF0YSB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBkZXN0aW5hdGlvblBhdGggfTogeyBkZXN0aW5hdGlvblBhdGg6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fZGVzdGluYXRpb25QYXRoID0gZGVzdGluYXRpb25QYXRoXG4gIH1cblxuICBwcm90ZWN0ZWQgX2dlbmVyYXRlR3JvdXBzKGVudGl0aWVzOiBFbnRpdHlbXSk6IHZvaWQge1xuICAgIGVudGl0aWVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhzID0gZS5maWxlUGF0aC5zcGxpdCgnLycpXG4gICAgICBsZXQgcHJldkdyb3VwOiBQdW1sR3JvdXBcbiAgICAgIHBhdGhzLmZvckVhY2goKHAsIGl4LCBsaXN0KSA9PiB7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IHByZXZHcm91cCA/IHByZXZHcm91cC5ncm91cHMgOiB0aGlzLl9ncm91cHNcbiAgICAgICAgaWYgKGl4ID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBwcmV2R3JvdXAuYWRkQ2hpbGRyZW4ocHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UucHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5KHsgZW50aXR5OiBlIH0pKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0dyb3VwID0gZ3JvdXBzW3BdID8/IG5ldyBQdW1sR3JvdXAoeyBuYW1lOiBwIH0pXG4gICAgICAgIGdyb3Vwc1twXSA9IG5ld0dyb3VwXG4gICAgICAgIHByZXZHcm91cCA9IG5ld0dyb3VwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJpbnQoeyBlbnRpdGllcyB9OiB7IGVudGl0aWVzOiBFbnRpdHlbXSB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBuZXcgUHVtbFRlbXBsYXRlKClcbiAgICB0aGlzLl9nZW5lcmF0ZUdyb3VwcyhlbnRpdGllcylcbiAgICBPYmplY3QudmFsdWVzKHRoaXMuX2dyb3VwcykuZm9yRWFjaCgoZykgPT4gdGVtcGxhdGUuYWRkQ2hpbGRyZW4oZykpXG4gICAgYXdhaXQgdGhpcy5fd3JpdGVUb0ZpbGUodGVtcGxhdGUucHJpbnQoKSlcbiAgfVxufVxuIl19