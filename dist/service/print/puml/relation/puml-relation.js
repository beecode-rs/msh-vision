"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const puml_entity_1 = require("../puml-entity");
class PumlRelation extends puml_entity_1.PumlEntity {
    constructor({ from, to }) {
        super();
        this._from = from;
        this._to = to;
    }
    get _TemplateStart() {
        return `${this._from} -up-> ${this._to}`;
    }
    get _TemplateEnd() {
        return '';
    }
    get _Print() {
        return [];
    }
}
exports.PumlRelation = PumlRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcmVsYXRpb24vcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBMkM7QUFFM0MsTUFBYSxZQUFhLFNBQVEsd0JBQVU7SUFJMUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQStDO1FBQ25FLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQsSUFBYyxjQUFjO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsSUFBYyxZQUFZO1FBQ3hCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVELElBQWMsTUFBTTtRQUNsQixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQXJCRCxvQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnLi4vcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUmVsYXRpb24gZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9mcm9tOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90bzogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IoeyBmcm9tLCB0byB9OiB7IGZyb206IHN0cmluZzsgdG86IHN0cmluZzsgdHlwZT86IHN0cmluZyB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2Zyb20gPSBmcm9tXG4gICAgdGhpcy5fdG8gPSB0b1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBfVGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9mcm9tfSAtdXAtPiAke3RoaXMuX3RvfWBcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgX1RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IF9QcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==