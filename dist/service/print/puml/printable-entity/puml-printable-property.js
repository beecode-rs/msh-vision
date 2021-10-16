"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableProperty = void 0;
const property_1 = require("src/model/property");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlPrintableProperty extends puml_entity_1.PumlEntity {
    constructor({ property }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQXNFO0FBQ3RFLG9FQUErRDtBQUUvRCxNQUFhLHFCQUFzQixTQUFRLHdCQUFVO0lBV25ELFlBQVksRUFBRSxRQUFRLEVBQTBCO1FBQzlDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7SUFDM0IsQ0FBQztJQVhTLFlBQVk7UUFDcEIsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBQ1MsY0FBYztRQUN0QixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pILE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFPUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBRVMsYUFBYTtRQUNyQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7UUFDckcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsa0JBQWtCO0lBRVIsWUFBWTtRQUNwQixRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ2xDLEtBQUssa0NBQXVCLENBQUMsTUFBTTtnQkFDakMsT0FBTyxHQUFHLENBQUE7WUFDWixLQUFLLGtDQUF1QixDQUFDLE9BQU87Z0JBQ2xDLE9BQU8sR0FBRyxDQUFBO1lBQ1osS0FBSyxrQ0FBdUIsQ0FBQyxTQUFTO2dCQUNwQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLEtBQUssa0NBQXVCLENBQUMsV0FBVyxDQUFDO1lBQ3pDO2dCQUNFLE9BQU8sRUFBRSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBQ0Y7QUE1Q0Qsc0RBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHksIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL21vZGVsL3Byb3BlcnR5J1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sUHJpbnRhYmxlUHJvcGVydHkgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9wcm9wZXJ0eTogUHJvcGVydHlcblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICcnXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBbdGhpcy5fYWNjZXNzTGV2ZWwoKSwgdGhpcy5fYWJzdHJhY3RBdHRyaWJ1dGUoKSwgdGhpcy5fcHJvcGVydHlOYW1lKCldLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJylcbiAgICByZXR1cm4gW3RlbXBsYXRlLCB0aGlzLl9wcm9wZXJ0eS5SZXR1cm5UeXBlXS5maWx0ZXIoQm9vbGVhbikuam9pbignOiAnKVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBwcm9wZXJ0eSB9OiB7IHByb3BlcnR5OiBQcm9wZXJ0eSB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX3Byb3BlcnR5ID0gcHJvcGVydHlcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcm9wZXJ0eU5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBmblByb3BlcnRpZXMgPSB0aGlzLl9wcm9wZXJ0eS5GdW5jdGlvblBhcmFtcyA/IGAoJHt0aGlzLl9wcm9wZXJ0eS5GdW5jdGlvblBhcmFtc30pYCA6IHVuZGVmaW5lZFxuICAgIHJldHVybiBbdGhpcy5fcHJvcGVydHkuTmFtZSwgZm5Qcm9wZXJ0aWVzXS5maWx0ZXIoQm9vbGVhbikuam9pbignJylcbiAgfVxuXG4gIHByb3RlY3RlZCBfYWJzdHJhY3RBdHRyaWJ1dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydHkuSXNBYnN0cmFjdCA/ICd7YWJzdHJhY3R9JyA6ICcnXG4gIH1cblxuICAvLyBUT0RPIGFkZCBzdGF0aWNcblxuICBwcm90ZWN0ZWQgX2FjY2Vzc0xldmVsKCk6IHN0cmluZyB7XG4gICAgc3dpdGNoICh0aGlzLl9wcm9wZXJ0eS5BY2Nlc3NMZXZlbCkge1xuICAgICAgY2FzZSBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QVUJMSUM6XG4gICAgICAgIHJldHVybiAnKydcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJJVkFURTpcbiAgICAgICAgcmV0dXJuICctJ1xuICAgICAgY2FzZSBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5QUk9URUNURUQ6XG4gICAgICAgIHJldHVybiAnIydcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuTk9fTU9ESUZJRVI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cbn1cbiJdfQ==