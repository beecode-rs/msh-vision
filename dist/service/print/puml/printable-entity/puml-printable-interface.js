"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableInterface = void 0;
const puml_printable_property_1 = require("src/service/print/puml/printable-entity/puml-printable-property");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableInterface extends puml_entity_1.PumlEntity {
    constructor(params) {
        const { entity } = params;
        super();
        this._entity = entity;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `interface "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return this._entity.Meta.Properties.map((p) => this._printProperty(p)).filter(Boolean);
    }
    _printProperty(property) {
        return new puml_printable_property_1.PumlPrintableProperty({ property }).print();
    }
}
exports.PumlPrintableInterface = PumlPrintableInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSw2R0FBdUc7QUFDdkcsb0VBQStEO0FBRS9ELE1BQWEsc0JBQXVCLFNBQVEsd0JBQVU7SUFVcEQsWUFBWSxNQUEyQztRQUNyRCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQVhTLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLGNBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNuRSxDQUFDO0lBUVMsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4RixDQUFDO0lBRVMsY0FBYyxDQUFDLFFBQWtCO1FBQ3pDLE9BQU8sSUFBSSwrQ0FBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDeEQsQ0FBQztDQUNGO0FBdkJELHdEQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVByb3BlcnR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXByb3BlcnR5J1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlIGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZW50aXR5OiBFbnRpdHk8RW50aXR5SW50ZXJmYWNlPlxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBpbnRlcmZhY2UgXCIke3RoaXMuX2VudGl0eS5OYW1lfVwiIGFzICR7dGhpcy5fZW50aXR5LklkfSB7YFxuICB9XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IGVudGl0eTogRW50aXR5PEVudGl0eUludGVyZmFjZT4gfSkge1xuICAgIGNvbnN0IHsgZW50aXR5IH0gPSBwYXJhbXNcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fZW50aXR5ID0gZW50aXR5XG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZW50aXR5Lk1ldGEuUHJvcGVydGllcy5tYXAoKHApID0+IHRoaXMuX3ByaW50UHJvcGVydHkocCkpLmZpbHRlcihCb29sZWFuKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludFByb3BlcnR5KHByb3BlcnR5OiBQcm9wZXJ0eSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlUHJvcGVydHkoeyBwcm9wZXJ0eSB9KS5wcmludCgpXG4gIH1cbn1cbiJdfQ==