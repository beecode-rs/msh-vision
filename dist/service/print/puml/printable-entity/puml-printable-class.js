"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableClass = void 0;
const puml_printable_property_1 = require("src/service/print/puml/printable-entity/puml-printable-property");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
const puml_relation_1 = require("src/service/print/puml/puml-relation");
class PumlPrintableClass extends puml_entity_1.PumlEntity {
    constructor({ entity }) {
        super();
        this._entity = entity;
        this._relations = entity.References.map((r) => new puml_relation_1.PumlRelation({ reference: r, fromEntity: entity }));
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `${this._entity.IsAbstract ? 'abstract' : 'class'} "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    _print() {
        return this._entity.Properties.map((p) => this._printProperty(p)).filter(Boolean);
    }
    _printProperty(property) {
        return new puml_printable_property_1.PumlPrintableProperty({ property }).print();
    }
}
exports.PumlPrintableClass = PumlPrintableClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkdBQXVHO0FBQ3ZHLG9FQUErRDtBQUMvRCx3RUFBbUU7QUFFbkUsTUFBYSxrQkFBbUIsU0FBUSx3QkFBVTtJQVVoRCxZQUFZLEVBQUUsTUFBTSxFQUEyQjtRQUM3QyxLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksNEJBQVksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0lBWFMsWUFBWTtRQUNwQixPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFDUyxjQUFjO1FBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUMzRyxDQUFDO0lBUVMsTUFBTTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25GLENBQUM7SUFFUyxjQUFjLENBQUMsUUFBa0I7UUFDekMsT0FBTyxJQUFJLCtDQUFxQixDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN4RCxDQUFDO0NBQ0Y7QUF2QkQsZ0RBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5Q2xhc3MgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWNsYXNzJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlUHJvcGVydHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHknXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcbmltcG9ydCB7IFB1bWxSZWxhdGlvbiB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1yZWxhdGlvbidcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVDbGFzcyBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VudGl0eTogRW50aXR5Q2xhc3NcblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICd9J1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9lbnRpdHkuSXNBYnN0cmFjdCA/ICdhYnN0cmFjdCcgOiAnY2xhc3MnfSBcIiR7dGhpcy5fZW50aXR5Lk5hbWV9XCIgYXMgJHt0aGlzLl9lbnRpdHkuSWR9IHtgXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7IGVudGl0eSB9OiB7IGVudGl0eTogRW50aXR5Q2xhc3MgfSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgICB0aGlzLl9yZWxhdGlvbnMgPSBlbnRpdHkuUmVmZXJlbmNlcy5tYXAoKHIpID0+IG5ldyBQdW1sUmVsYXRpb24oeyByZWZlcmVuY2U6IHIsIGZyb21FbnRpdHk6IGVudGl0eSB9KSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9lbnRpdHkuUHJvcGVydGllcy5tYXAoKHApID0+IHRoaXMuX3ByaW50UHJvcGVydHkocCkpLmZpbHRlcihCb29sZWFuKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludFByb3BlcnR5KHByb3BlcnR5OiBQcm9wZXJ0eSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlUHJvcGVydHkoeyBwcm9wZXJ0eSB9KS5wcmludCgpXG4gIH1cbn1cbiJdfQ==