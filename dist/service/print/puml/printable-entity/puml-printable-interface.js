"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableInterface = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableInterface extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `interface "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableInterface = PumlPrintableInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvRUFBK0Q7QUFFL0QsTUFBYSxzQkFBdUIsU0FBUSx3QkFBVTtJQVVwRCxZQUFZLEVBQUUsTUFBTSxFQUErQjtRQUNqRCxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ3ZCLENBQUM7SUFWUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNTLGNBQWM7UUFDdEIsT0FBTyxjQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDbkUsQ0FBQztJQU9TLE1BQU07UUFDZCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQWxCRCx3REFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZUludGVyZmFjZSBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VudGl0eTogRW50aXR5SW50ZXJmYWNlXG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGludGVyZmFjZSBcIiR7dGhpcy5fZW50aXR5Lk5hbWV9XCIgYXMgJHt0aGlzLl9lbnRpdHkuSWR9IHtgXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IGVudGl0eSB9OiB7IGVudGl0eTogRW50aXR5SW50ZXJmYWNlIH0pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fZW50aXR5ID0gZW50aXR5XG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW11cbiAgfVxufVxuIl19