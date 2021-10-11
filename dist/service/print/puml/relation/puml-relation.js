"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const printable_1 = require("src/service/print/printable");
class PumlRelation extends printable_1.Printable {
    // protected readonly _note: string | undefined
    // protected _type: string
    constructor({ from, to }) {
        super();
        this._from = from;
        this._to = to;
    }
    _print() {
        return [`${this._from} --> ${this._to}`];
    }
    _templateEnd() {
        return '';
    }
    _templateStart() {
        return '';
    }
}
exports.PumlRelation = PumlRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcmVsYXRpb24vcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBdUQ7QUFFdkQsTUFBYSxZQUFhLFNBQVEscUJBQVM7SUFHekMsK0NBQStDO0lBQy9DLDBCQUEwQjtJQUUxQixZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBK0M7UUFDbkUsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRVMsWUFBWTtRQUNwQixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFUyxjQUFjO1FBQ3RCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBdkJELG9DQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50YWJsZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxSZWxhdGlvbiBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZnJvbTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfdG86IHN0cmluZ1xuICAvLyBwcm90ZWN0ZWQgcmVhZG9ubHkgX25vdGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAvLyBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKHsgZnJvbSwgdG8gfTogeyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmc7IHR5cGU/OiBzdHJpbmcgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9mcm9tID0gZnJvbVxuICAgIHRoaXMuX3RvID0gdG9cbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbYCR7dGhpcy5fZnJvbX0gLS0+ICR7dGhpcy5fdG99YF1cbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJ1xuICB9XG59XG4iXX0=