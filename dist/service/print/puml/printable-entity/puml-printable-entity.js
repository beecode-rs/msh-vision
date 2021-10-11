"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableEntity = void 0;
const printable_1 = require("../../printable");
const entity_1 = require("src/model/entity");
class PumlPrintableEntity extends printable_1.Printable {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `${this._entityType()} "${this._entity.name}" as ${this._entity.Id} {`;
    }
    _entityType() {
        switch (this._entity.Type) {
            case entity_1.EntityType.CLASS:
                return 'class';
            default:
                return 'object';
        }
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableEntity = PumlPrintableEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMkM7QUFDM0MsNkNBQXFEO0FBRXJELE1BQWEsbUJBQW9CLFNBQVEscUJBQVM7SUFtQmhELFlBQVksRUFBRSxNQUFNLEVBQXNCO1FBQ3hDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQW5CUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNTLGNBQWM7UUFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFBO0lBQy9FLENBQUM7SUFFUyxXQUFXO1FBQ25CLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxtQkFBVSxDQUFDLEtBQUs7Z0JBQ25CLE9BQU8sT0FBTyxDQUFBO1lBQ2hCO2dCQUNFLE9BQU8sUUFBUSxDQUFBO1NBQ2xCO0lBQ0gsQ0FBQztJQU9TLE1BQU07UUFDZCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQTNCRCxrREEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmludGFibGUgfSBmcm9tICcuLi8uLi9wcmludGFibGUnXG5pbXBvcnQgeyBFbnRpdHksIEVudGl0eVR5cGUgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZUVudGl0eSBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHlcblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9lbnRpdHlUeXBlKCl9IFwiJHt0aGlzLl9lbnRpdHkubmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIHByb3RlY3RlZCBfZW50aXR5VHlwZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fZW50aXR5LlR5cGUpIHtcbiAgICAgIGNhc2UgRW50aXR5VHlwZS5DTEFTUzpcbiAgICAgICAgcmV0dXJuICdjbGFzcydcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnb2JqZWN0J1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgZW50aXR5IH06IHsgZW50aXR5OiBFbnRpdHkgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=