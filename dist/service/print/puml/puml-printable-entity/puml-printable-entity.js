"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableEntity = void 0;
const printable_1 = require("../../printable");
class PumlPrintableEntity extends printable_1.Printable {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `class ${this._entity.name} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableEntity = PumlPrintableEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLXByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUEyQztBQUczQyxNQUFhLG1CQUFvQixTQUFRLHFCQUFTO0lBVWhELFlBQVksRUFBRSxNQUFNLEVBQXNCO1FBQ3hDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQVZTLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUN2QyxDQUFDO0lBT1MsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBbEJELGtEQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJy4uLy4uL3ByaW50YWJsZSdcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlRW50aXR5IGV4dGVuZHMgUHJpbnRhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9lbnRpdHk6IEVudGl0eVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBjbGFzcyAke3RoaXMuX2VudGl0eS5uYW1lfSB7YFxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eSB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==