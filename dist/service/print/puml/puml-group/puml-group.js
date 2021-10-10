"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = void 0;
const printable_1 = require("src/service/print/printable");
const puml_group_service_1 = require("src/service/print/puml/puml-group/puml-group-service");
class PumlGroup extends printable_1.Printable {
    constructor({ name, level }) {
        super();
        this.groups = {};
        this._level = level ?? 0;
        this._name = name;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `folder ${this._name} {`;
    }
    get Name() {
        return this._name;
    }
    _print() {
        return [puml_group_service_1.pumlGroupService.printGroups(this.groups)];
    }
}
exports.PumlGroup = PumlGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cC9wdW1sLWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUF1RDtBQUN2RCw2RkFBdUY7QUFFdkYsTUFBYSxTQUFVLFNBQVEscUJBQVM7SUFldEMsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQW9DO1FBQzNELEtBQUssRUFBRSxDQUFBO1FBZEYsV0FBTSxHQUErQixFQUFFLENBQUE7UUFlNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ25CLENBQUM7SUFmUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUNTLGNBQWM7UUFDdEIsT0FBTyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQTtJQUNqQyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFRUyxNQUFNO1FBQ2QsT0FBTyxDQUFDLHFDQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0Y7QUF4QkQsOEJBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpbnRhYmxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHJpbnRhYmxlJ1xuaW1wb3J0IHsgcHVtbEdyb3VwU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cC9wdW1sLWdyb3VwLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyBQdW1sR3JvdXAgZXh0ZW5kcyBQcmludGFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX25hbWU6IHN0cmluZ1xuICBwdWJsaWMgZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBQdW1sR3JvdXAgfSA9IHt9XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGZvbGRlciAke3RoaXMuX25hbWV9IHtgXG4gIH1cblxuICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBuYW1lLCBsZXZlbCB9OiB7IG5hbWU6IHN0cmluZzsgbGV2ZWw/OiBudW1iZXIgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9sZXZlbCA9IGxldmVsID8/IDBcbiAgICB0aGlzLl9uYW1lID0gbmFtZVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtwdW1sR3JvdXBTZXJ2aWNlLnByaW50R3JvdXBzKHRoaXMuZ3JvdXBzKV1cbiAgfVxufVxuIl19