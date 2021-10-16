"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableClass = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableClass extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `class "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableClass = PumlPrintableClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esb0VBQStEO0FBRS9ELE1BQWEsa0JBQW1CLFNBQVEsd0JBQVU7SUFVaEQsWUFBWSxFQUFFLE1BQU0sRUFBMkI7UUFDN0MsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtJQUN2QixDQUFDO0lBVlMsWUFBWTtRQUNwQixPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFBO0lBQy9ELENBQUM7SUFPUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFsQkQsZ0RBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlQ2xhc3MgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9lbnRpdHk6IEVudGl0eUNsYXNzXG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGNsYXNzIFwiJHt0aGlzLl9lbnRpdHkuTmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgZW50aXR5IH06IHsgZW50aXR5OiBFbnRpdHlDbGFzcyB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==