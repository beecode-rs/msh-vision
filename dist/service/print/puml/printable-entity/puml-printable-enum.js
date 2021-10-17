"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableEnum = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableEnum extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `enum "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return this._entity.Properties;
    }
}
exports.PumlPrintableEnum = PumlPrintableEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9FQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBVS9DLFlBQVksRUFBRSxNQUFNLEVBQTBCO1FBQzVDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQVZTLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUM5RCxDQUFDO0lBT1MsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUE7SUFDaEMsQ0FBQztDQUNGO0FBbEJELDhDQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eUVudW0gfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWVudW0nXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVFbnVtIGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHlFbnVtXG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGVudW0gXCIke3RoaXMuX2VudGl0eS5OYW1lfVwiIGFzICR7dGhpcy5fZW50aXR5LklkfSB7YFxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eUVudW0gfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9lbnRpdHkuUHJvcGVydGllc1xuICB9XG59XG4iXX0=