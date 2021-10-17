"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableType = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableType extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `card "T: ${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableType = PumlPrintableType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9FQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBVS9DLFlBQVksRUFBRSxNQUFNLEVBQTBCO1FBQzVDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQVZTLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNqRSxDQUFDO0lBT1MsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBbEJELDhDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LXR5cGUnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVUeXBlIGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHlUeXBlXG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGNhcmQgXCJUOiAke3RoaXMuX2VudGl0eS5OYW1lfVwiIGFzICR7dGhpcy5fZW50aXR5LklkfSB7YFxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eVR5cGUgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=