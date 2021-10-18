"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableProperty = void 0;
const property_1 = require("src/model/property");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableProperty extends puml_entity_1.PumlEntity {
    constructor(params) {
        const { property } = params;
        super();
        this._property = property;
    }
    _templateEnd() {
        return '';
    }
    _templateStart() {
        const template = [this._accessLevel(), this._abstractAttribute(), this._propertyName()].filter(Boolean).join(' ');
        return [template, this._property.ReturnType].filter(Boolean).join(': ');
    }
    _print() {
        return [];
    }
    _propertyName() {
        const fnProperties = this._property.FunctionParams ? `(${this._property.FunctionParams})` : undefined;
        return [this._property.Name, fnProperties].filter(Boolean).join('');
    }
    _abstractAttribute() {
        return this._property.IsAbstract ? '{abstract}' : '';
    }
    // TODO add static
    _accessLevel() {
        switch (this._property.AccessLevel) {
            case property_1.PropertyAccessLevelType.PUBLIC:
                return '+';
            case property_1.PropertyAccessLevelType.PRIVATE:
                return '-';
            case property_1.PropertyAccessLevelType.PROTECTED:
                return '#';
            case property_1.PropertyAccessLevelType.NO_MODIFIER:
            default:
                return '';
        }
    }
}
exports.PumlPrintableProperty = PumlPrintableProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQXNFO0FBQ3RFLG9FQUErRDtBQUUvRCxNQUFhLHFCQUFzQixTQUFRLHdCQUFVO0lBV25ELFlBQVksTUFBOEI7UUFDeEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMzQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzNCLENBQUM7SUFaUyxZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNTLGNBQWM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqSCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBUVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVTLGFBQWE7UUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ3JHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDdEQsQ0FBQztJQUVELGtCQUFrQjtJQUVSLFlBQVk7UUFDcEIsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUNsQyxLQUFLLGtDQUF1QixDQUFDLE1BQU07Z0JBQ2pDLE9BQU8sR0FBRyxDQUFBO1lBQ1osS0FBSyxrQ0FBdUIsQ0FBQyxPQUFPO2dCQUNsQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLEtBQUssa0NBQXVCLENBQUMsU0FBUztnQkFDcEMsT0FBTyxHQUFHLENBQUE7WUFDWixLQUFLLGtDQUF1QixDQUFDLFdBQVcsQ0FBQztZQUN6QztnQkFDRSxPQUFPLEVBQUUsQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUNGO0FBN0NELHNEQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BlcnR5LCBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZVByb3BlcnR5IGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcHJvcGVydHk6IFByb3BlcnR5XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJ1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gW3RoaXMuX2FjY2Vzc0xldmVsKCksIHRoaXMuX2Fic3RyYWN0QXR0cmlidXRlKCksIHRoaXMuX3Byb3BlcnR5TmFtZSgpXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpXG4gICAgcmV0dXJuIFt0ZW1wbGF0ZSwgdGhpcy5fcHJvcGVydHkuUmV0dXJuVHlwZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJzogJylcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwcm9wZXJ0eTogUHJvcGVydHkgfSkge1xuICAgIGNvbnN0IHsgcHJvcGVydHkgfSA9IHBhcmFtc1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9wcm9wZXJ0eSA9IHByb3BlcnR5XG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJvcGVydHlOYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZm5Qcm9wZXJ0aWVzID0gdGhpcy5fcHJvcGVydHkuRnVuY3Rpb25QYXJhbXMgPyBgKCR7dGhpcy5fcHJvcGVydHkuRnVuY3Rpb25QYXJhbXN9KWAgOiB1bmRlZmluZWRcbiAgICByZXR1cm4gW3RoaXMuX3Byb3BlcnR5Lk5hbWUsIGZuUHJvcGVydGllc10uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJycpXG4gIH1cblxuICBwcm90ZWN0ZWQgX2Fic3RyYWN0QXR0cmlidXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnR5LklzQWJzdHJhY3QgPyAne2Fic3RyYWN0fScgOiAnJ1xuICB9XG5cbiAgLy8gVE9ETyBhZGQgc3RhdGljXG5cbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbCgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fcHJvcGVydHkuQWNjZXNzTGV2ZWwpIHtcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDOlxuICAgICAgICByZXR1cm4gJysnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEU6XG4gICAgICAgIHJldHVybiAnLSdcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEOlxuICAgICAgICByZXR1cm4gJyMnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLk5PX01PRElGSUVSOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=