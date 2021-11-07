"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableObject = void 0;
const property_1 = require("src/model/property");
const puml_printable_property_1 = require("src/service/print-puml/printable-entity/puml-printable-property");
const puml_entity_1 = require("src/service/print-puml/puml-entity");
const puml_relation_1 = require("src/service/print-puml/puml-relation");
class PumlPrintableObject extends puml_entity_1.PumlEntity {
    _entity;
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `object "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    constructor(params) {
        const { entity } = params;
        super();
        this._entity = entity;
        this._relations = entity.References.map((r) => new puml_relation_1.PumlRelation({ reference: r, fromEntity: entity }));
    }
    _print() {
        return this._entity.Meta.Properties.sort(property_1.Property.SortByName)
            .map((p) => this._printProperty(p))
            .filter(Boolean);
    }
    _printProperty(property) {
        return new puml_printable_property_1.PumlPrintableProperty({ property }).print();
    }
}
exports.PumlPrintableObject = PumlPrintableObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtb2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLW9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxpREFBNkM7QUFDN0MsNkdBQXVHO0FBQ3ZHLG9FQUErRDtBQUMvRCx3RUFBbUU7QUFFbkUsTUFBYSxtQkFBb0IsU0FBUSx3QkFBVTtJQUM5QixPQUFPLENBQTRCO0lBRTVDLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNoRSxDQUFDO0lBRUQsWUFBWSxNQUE4QztRQUN4RCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSw0QkFBWSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3hHLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDO2FBQzFELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVTLGNBQWMsQ0FBQyxRQUFrQjtRQUN6QyxPQUFPLElBQUksK0NBQXFCLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3hELENBQUM7Q0FDRjtBQTFCRCxrREEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVQcm9wZXJ0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1wcm9wZXJ0eSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgUHVtbFJlbGF0aW9uIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXJlbGF0aW9uJ1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZU9iamVjdCBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VudGl0eTogRW50aXR5PEVudGl0eVR5cGVzLk9CSkVDVD5cblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgb2JqZWN0IFwiJHt0aGlzLl9lbnRpdHkuTmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBlbnRpdHk6IEVudGl0eTxFbnRpdHlUeXBlcy5PQkpFQ1Q+IH0pIHtcbiAgICBjb25zdCB7IGVudGl0eSB9ID0gcGFyYW1zXG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICAgIHRoaXMuX3JlbGF0aW9ucyA9IGVudGl0eS5SZWZlcmVuY2VzLm1hcCgocikgPT4gbmV3IFB1bWxSZWxhdGlvbih7IHJlZmVyZW5jZTogciwgZnJvbUVudGl0eTogZW50aXR5IH0pKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudGl0eS5NZXRhLlByb3BlcnRpZXMuc29ydChQcm9wZXJ0eS5Tb3J0QnlOYW1lKVxuICAgICAgLm1hcCgocCkgPT4gdGhpcy5fcHJpbnRQcm9wZXJ0eShwKSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnRQcm9wZXJ0eShwcm9wZXJ0eTogUHJvcGVydHkpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZVByb3BlcnR5KHsgcHJvcGVydHkgfSkucHJpbnQoKVxuICB9XG59XG4iXX0=