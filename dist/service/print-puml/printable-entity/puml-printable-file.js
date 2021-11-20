"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableFile = void 0;
const puml_entity_1 = require("src/service/print-puml/puml-entity");
const puml_relation_1 = require("src/service/print-puml/puml-relation");
class PumlPrintableFile extends puml_entity_1.PumlEntity {
    _entity;
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `artifact "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    constructor(params) {
        const { entity } = params;
        super();
        this._entity = entity;
        this._relations = entity.References.map((r) => new puml_relation_1.PumlRelation({ reference: r, fromEntity: entity }));
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableFile = PumlPrintableFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG9FQUErRDtBQUMvRCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBa0IsU0FBUSx3QkFBVTtJQUM1QixPQUFPLENBQTBCO0lBRTFDLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNsRSxDQUFDO0lBRUQsWUFBWSxNQUE0QztRQUN0RCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3pCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSw0QkFBWSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3hHLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFwQkQsOENBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1lbnRpdHknXG5pbXBvcnQgeyBQdW1sUmVsYXRpb24gfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtcmVsYXRpb24nXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlRmlsZSBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2VudGl0eTogRW50aXR5PEVudGl0eVR5cGVzLkZJTEU+XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnfSdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGFydGlmYWN0IFwiJHt0aGlzLl9lbnRpdHkuTmFtZX1cIiBhcyAke3RoaXMuX2VudGl0eS5JZH0ge2BcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBlbnRpdHk6IEVudGl0eTxFbnRpdHlUeXBlcy5GSUxFPiB9KSB7XG4gICAgY29uc3QgeyBlbnRpdHkgfSA9IHBhcmFtc1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbnRpdHkgPSBlbnRpdHlcbiAgICB0aGlzLl9yZWxhdGlvbnMgPSBlbnRpdHkuUmVmZXJlbmNlcy5tYXAoKHIpID0+IG5ldyBQdW1sUmVsYXRpb24oeyByZWZlcmVuY2U6IHIsIGZyb21FbnRpdHk6IGVudGl0eSB9KSlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=