"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableProperty = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
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
        return [template, this._addNewRows(this._property.ReturnType)].filter(Boolean).join(': ');
    }
    _print() {
        return [];
    }
    _propertyName() {
        const fnProperties = this._property.FunctionParams ? `(${this._addNewRows(this._property.FunctionParams)})` : undefined;
        return [this._property.Name, fnProperties].filter(Boolean).join('');
    }
    _abstractAttribute() {
        return this._property.IsAbstract ? '{abstract}' : '';
    }
    // TODO find more elegant way to do this
    _addNewRows(template) {
        if (template.split(';').length === 1 && template.split(',').length === 1)
            return template;
        template = template.split('{').join('{\\n');
        template = template.split('}').join('\\n}');
        template = template.split(';').join(';\\n');
        template = template.split(',').join(',\\n');
        return template;
    }
    // TODO add static
    _accessLevel() {
        switch (this._property.AccessLevel) {
            case property_access_level_type_1.PropertyAccessLevelType.PUBLIC:
                return '+';
            case property_access_level_type_1.PropertyAccessLevelType.PRIVATE:
                return '-';
            case property_access_level_type_1.PropertyAccessLevelType.PROTECTED:
                return '#';
            case property_access_level_type_1.PropertyAccessLevelType.NO_MODIFIER:
            default:
                return '';
        }
    }
}
exports.PumlPrintableProperty = PumlPrintableProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBRTdFLG9FQUErRDtBQUUvRCxNQUFhLHFCQUFzQixTQUFRLHdCQUFVO0lBV25ELFlBQVksTUFBOEI7UUFDeEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMzQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzNCLENBQUM7SUFaUyxZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNTLGNBQWM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqSCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0YsQ0FBQztJQVFTLE1BQU07UUFDZCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFUyxhQUFhO1FBQ3JCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7UUFDdkgsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDckUsQ0FBQztJQUVTLGtCQUFrQjtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsd0NBQXdDO0lBQzlCLFdBQVcsQ0FBQyxRQUFnQjtRQUNwQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUE7UUFDekYsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLE9BQU8sUUFBUSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxrQkFBa0I7SUFDUixZQUFZO1FBQ3BCLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDbEMsS0FBSyxvREFBdUIsQ0FBQyxNQUFNO2dCQUNqQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLEtBQUssb0RBQXVCLENBQUMsT0FBTztnQkFDbEMsT0FBTyxHQUFHLENBQUE7WUFDWixLQUFLLG9EQUF1QixDQUFDLFNBQVM7Z0JBQ3BDLE9BQU8sR0FBRyxDQUFBO1lBQ1osS0FBSyxvREFBdUIsQ0FBQyxXQUFXLENBQUM7WUFDekM7Z0JBQ0UsT0FBTyxFQUFFLENBQUE7U0FDWjtJQUNILENBQUM7Q0FDRjtBQXRERCxzREFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3Byb3BlcnR5LWFjY2Vzcy1sZXZlbC10eXBlJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVQcm9wZXJ0eSBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Byb3BlcnR5OiBQcm9wZXJ0eVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJydcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFt0aGlzLl9hY2Nlc3NMZXZlbCgpLCB0aGlzLl9hYnN0cmFjdEF0dHJpYnV0ZSgpLCB0aGlzLl9wcm9wZXJ0eU5hbWUoKV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKVxuICAgIHJldHVybiBbdGVtcGxhdGUsIHRoaXMuX2FkZE5ld1Jvd3ModGhpcy5fcHJvcGVydHkuUmV0dXJuVHlwZSldLmZpbHRlcihCb29sZWFuKS5qb2luKCc6ICcpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHJvcGVydHk6IFByb3BlcnR5IH0pIHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwYXJhbXNcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fcHJvcGVydHkgPSBwcm9wZXJ0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm90ZWN0ZWQgX3Byb3BlcnR5TmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZuUHJvcGVydGllcyA9IHRoaXMuX3Byb3BlcnR5LkZ1bmN0aW9uUGFyYW1zID8gYCgke3RoaXMuX2FkZE5ld1Jvd3ModGhpcy5fcHJvcGVydHkuRnVuY3Rpb25QYXJhbXMpfSlgIDogdW5kZWZpbmVkXG4gICAgcmV0dXJuIFt0aGlzLl9wcm9wZXJ0eS5OYW1lLCBmblByb3BlcnRpZXNdLmZpbHRlcihCb29sZWFuKS5qb2luKCcnKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hYnN0cmFjdEF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eS5Jc0Fic3RyYWN0ID8gJ3thYnN0cmFjdH0nIDogJydcbiAgfVxuXG4gIC8vIFRPRE8gZmluZCBtb3JlIGVsZWdhbnQgd2F5IHRvIGRvIHRoaXNcbiAgcHJvdGVjdGVkIF9hZGROZXdSb3dzKHRlbXBsYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0ZW1wbGF0ZS5zcGxpdCgnOycpLmxlbmd0aCA9PT0gMSAmJiB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRlbXBsYXRlXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgneycpLmpvaW4oJ3tcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnfScpLmpvaW4oJ1xcXFxufScpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnOycpLmpvaW4oJztcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmpvaW4oJyxcXFxcbicpXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gIH1cblxuICAvLyBUT0RPIGFkZCBzdGF0aWNcbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbCgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fcHJvcGVydHkuQWNjZXNzTGV2ZWwpIHtcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDOlxuICAgICAgICByZXR1cm4gJysnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEU6XG4gICAgICAgIHJldHVybiAnLSdcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEOlxuICAgICAgICByZXR1cm4gJyMnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLk5PX01PRElGSUVSOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=