"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableClass = void 0;
const printable_1 = require("../../printable");
class PumlPrintableClass extends printable_1.Printable {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `class "${this._entity.name}" as ${this._entity.Id} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableClass = PumlPrintableClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTJDO0FBRzNDLE1BQWEsa0JBQW1CLFNBQVEscUJBQVM7SUFVL0MsWUFBWSxFQUFFLE1BQU0sRUFBc0I7UUFDeEMsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtJQUN2QixDQUFDO0lBVlMsWUFBWTtRQUNwQixPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFBO0lBQy9ELENBQUM7SUFPUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFsQkQsZ0RBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSAnLi4vLi4vcHJpbnRhYmxlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVDbGFzcyBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHlcblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgY2xhc3MgXCIke3RoaXMuX2VudGl0eS5uYW1lfVwiIGFzICR7dGhpcy5fZW50aXR5LklkfSB7YFxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eSB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==