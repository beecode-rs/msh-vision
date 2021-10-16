"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableWrapper = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableWrapper extends puml_entity_1.PumlEntity {
    constructor(_string) {
        super();
        this._string = _string;
    }
    _templateEnd() {
        return '';
    }
    _templateStart() {
        return this._string;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableWrapper = PumlPrintableWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQUUvRCxNQUFhLG9CQUFxQixTQUFRLHdCQUFVO0lBUWxELFlBQStCLE9BQWU7UUFDNUMsS0FBSyxFQUFFLENBQUE7UUFEc0IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUU5QyxDQUFDO0lBVFMsWUFBWTtRQUNwQixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBTVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBZkQsb0RBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVXcmFwcGVyIGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJydcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0cmluZzogc3RyaW5nKSB7XG4gICAgc3VwZXIoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==