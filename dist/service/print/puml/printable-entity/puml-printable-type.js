"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableType = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableType extends puml_entity_1.PumlEntity {
    constructor(params) {
        const { entity } = params;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtdHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG9FQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBVS9DLFlBQVksTUFBc0M7UUFDaEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ3ZCLENBQUM7SUFYUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNTLGNBQWM7UUFDdEIsT0FBTyxZQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDakUsQ0FBQztJQVFTLE1BQU07UUFDZCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQW5CRCw4Q0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktdHlwZSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZVR5cGUgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9lbnRpdHk6IEVudGl0eTxFbnRpdHlUeXBlPlxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBjYXJkIFwiVDogJHt0aGlzLl9lbnRpdHkuTmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBlbnRpdHk6IEVudGl0eTxFbnRpdHlUeXBlPiB9KSB7XG4gICAgY29uc3QgeyBlbnRpdHkgfSA9IHBhcmFtc1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=