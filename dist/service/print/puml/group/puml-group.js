"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = void 0;
const printable_1 = require("src/service/print/printable");
const puml_group_service_1 = require("src/service/print/puml/group/puml-group-service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvZ3JvdXAvcHVtbC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBdUQ7QUFDdkQsd0ZBQWtGO0FBRWxGLE1BQWEsU0FBVSxTQUFRLHFCQUFTO0lBZXRDLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFvQztRQUMzRCxLQUFLLEVBQUUsQ0FBQTtRQWRGLFdBQU0sR0FBK0IsRUFBRSxDQUFBO1FBZTVDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQTtRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtJQUNuQixDQUFDO0lBZlMsWUFBWTtRQUNwQixPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUE7SUFDakMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBUVMsTUFBTTtRQUNkLE9BQU8sQ0FBQyxxQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDcEQsQ0FBQztDQUNGO0FBeEJELDhCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50YWJsZSdcbmltcG9ydCB7IHB1bWxHcm91cFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL2dyb3VwL3B1bWwtZ3JvdXAtc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxHcm91cCBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBncm91cHM6IHsgW2s6IHN0cmluZ106IFB1bWxHcm91cCB9ID0ge31cblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgZm9sZGVyICR7dGhpcy5fbmFtZX0ge2BcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGxldmVsIH06IHsgbmFtZTogc3RyaW5nOyBsZXZlbD86IG51bWJlciB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2xldmVsID0gbGV2ZWwgPz8gMFxuICAgIHRoaXMuX25hbWUgPSBuYW1lXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW3B1bWxHcm91cFNlcnZpY2UucHJpbnRHcm91cHModGhpcy5ncm91cHMpXVxuICB9XG59XG4iXX0=