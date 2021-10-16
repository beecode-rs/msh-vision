"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableFile = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableFile extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `rectangle "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableFile = PumlPrintableFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9FQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBVS9DLFlBQVksRUFBRSxNQUFNLEVBQTBCO1FBQzVDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQVZTLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLGNBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNuRSxDQUFDO0lBT1MsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBbEJELDhDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eUZpbGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWZpbGUnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVGaWxlIGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHlGaWxlXG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYHJlY3RhbmdsZSBcIiR7dGhpcy5fZW50aXR5Lk5hbWV9XCIgYXMgJHt0aGlzLl9lbnRpdHkuSWR9IHtgXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IGVudGl0eSB9OiB7IGVudGl0eTogRW50aXR5RmlsZSB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==