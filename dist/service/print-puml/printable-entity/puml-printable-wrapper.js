"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableWrapper = void 0;
const puml_entity_1 = require("src/service/print-puml/puml-entity");
class PumlPrintableWrapper extends puml_entity_1.PumlEntity {
    _string;
    _templateEnd() {
        return '';
    }
    _templateStart() {
        return this._string;
    }
    constructor(_string) {
        super();
        this._string = _string;
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableWrapper = PumlPrintableWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQUUvRCxNQUFhLG9CQUFxQixTQUFRLHdCQUFVO0lBUVo7SUFQNUIsWUFBWTtRQUNwQixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsWUFBc0MsT0FBZTtRQUNuRCxLQUFLLEVBQUUsQ0FBQTtRQUQ2QixZQUFPLEdBQVAsT0FBTyxDQUFRO0lBRXJELENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFmRCxvREFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZVdyYXBwZXIgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJ1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgX3N0cmluZzogc3RyaW5nKSB7XG4gICAgc3VwZXIoKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==