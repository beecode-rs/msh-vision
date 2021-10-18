"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableEnum = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableEnum extends puml_entity_1.PumlEntity {
    constructor(params) {
        const { entity } = params;
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
        return this._entity.Properties.sort();
    }
}
exports.PumlPrintableEnum = PumlPrintableEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9FQUErRDtBQUUvRCxNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBVS9DLFlBQVksTUFBOEI7UUFDeEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ3ZCLENBQUM7SUFYUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNTLGNBQWM7UUFDdEIsT0FBTyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDOUQsQ0FBQztJQVFTLE1BQU07UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQW5CRCw4Q0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlFbnVtIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1lbnVtJ1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlRW51bSBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VudGl0eTogRW50aXR5RW51bVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBlbnVtIFwiJHt0aGlzLl9lbnRpdHkuTmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBlbnRpdHk6IEVudGl0eUVudW0gfSkge1xuICAgIGNvbnN0IHsgZW50aXR5IH0gPSBwYXJhbXNcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fZW50aXR5ID0gZW50aXR5XG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZW50aXR5LlByb3BlcnRpZXMuc29ydCgpXG4gIH1cbn1cbiJdfQ==