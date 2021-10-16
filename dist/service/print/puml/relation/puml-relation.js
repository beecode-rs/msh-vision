"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const printable_1 = require("src/service/print/printable");
class PumlRelation extends printable_1.Printable {
    constructor({ from, to }) {
        super();
        this._from = from;
        this._to = to;
    }
    _templateStart() {
        return `${this._from} -up-> ${this._to}`;
    }
    _templateEnd() {
        return '';
    }
    _print() {
        return [];
    }
}
exports.PumlRelation = PumlRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcmVsYXRpb24vcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBdUQ7QUFFdkQsTUFBYSxZQUFhLFNBQVEscUJBQVM7SUFJekMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQStDO1FBQ25FLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDZixDQUFDO0lBRVMsY0FBYztRQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDMUMsQ0FBQztJQUVTLFlBQVk7UUFDcEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBckJELG9DQXFCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50YWJsZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxSZWxhdGlvbiBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZnJvbTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfdG86IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHsgZnJvbSwgdG8gfTogeyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmc7IHR5cGU/OiBzdHJpbmcgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9mcm9tID0gZnJvbVxuICAgIHRoaXMuX3RvID0gdG9cbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9mcm9tfSAtdXAtPiAke3RoaXMuX3RvfWBcbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=