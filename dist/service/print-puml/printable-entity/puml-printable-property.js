"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableProperty = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
const puml_entity_1 = require("src/service/print-puml/puml-entity");
class PumlPrintableProperty extends puml_entity_1.PumlEntity {
    _property;
    _templateEnd() {
        return '';
    }
    _templateStart() {
        const template = [this._accessLevel(), this._abstractAttribute(), this._propertyName()].filter(Boolean).join(' ');
        return [template, this._addNewRows(this._property.ReturnType)].filter(Boolean).join(': ');
    }
    constructor(params) {
        const { property } = params;
        super();
        this._property = property;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBRTdFLG9FQUErRDtBQUUvRCxNQUFhLHFCQUFzQixTQUFRLHdCQUFVO0lBQ2hDLFNBQVMsQ0FBVTtJQUU1QixZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNTLGNBQWM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqSCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0YsQ0FBQztJQUVELFlBQW1CLE1BQThCO1FBQy9DLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDM0IsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtJQUMzQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVTLGFBQWE7UUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtRQUN2SCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNyRSxDQUFDO0lBRVMsa0JBQWtCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQ3RELENBQUM7SUFFRCx3Q0FBd0M7SUFDOUIsV0FBVyxDQUFDLFFBQWdCO1FBQ3BDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQTtRQUN6RixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0MsT0FBTyxRQUFRLENBQUE7SUFDakIsQ0FBQztJQUVELGtCQUFrQjtJQUNSLFlBQVk7UUFDcEIsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUNsQyxLQUFLLG9EQUF1QixDQUFDLE1BQU07Z0JBQ2pDLE9BQU8sR0FBRyxDQUFBO1lBQ1osS0FBSyxvREFBdUIsQ0FBQyxPQUFPO2dCQUNsQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLEtBQUssb0RBQXVCLENBQUMsU0FBUztnQkFDcEMsT0FBTyxHQUFHLENBQUE7WUFDWixLQUFLLG9EQUF1QixDQUFDLFdBQVcsQ0FBQztZQUN6QztnQkFDRSxPQUFPLEVBQUUsQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUNGO0FBdERELHNEQXNEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHJvcGVydHktYWNjZXNzLWxldmVsLXR5cGUnXG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtZW50aXR5J1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZVByb3BlcnR5IGV4dGVuZHMgUHVtbEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcHJvcGVydHk6IFByb3BlcnR5XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnJ1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gW3RoaXMuX2FjY2Vzc0xldmVsKCksIHRoaXMuX2Fic3RyYWN0QXR0cmlidXRlKCksIHRoaXMuX3Byb3BlcnR5TmFtZSgpXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpXG4gICAgcmV0dXJuIFt0ZW1wbGF0ZSwgdGhpcy5fYWRkTmV3Um93cyh0aGlzLl9wcm9wZXJ0eS5SZXR1cm5UeXBlKV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJzogJylcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHJvcGVydHk6IFByb3BlcnR5IH0pIHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwYXJhbXNcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fcHJvcGVydHkgPSBwcm9wZXJ0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm90ZWN0ZWQgX3Byb3BlcnR5TmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZuUHJvcGVydGllcyA9IHRoaXMuX3Byb3BlcnR5LkZ1bmN0aW9uUGFyYW1zID8gYCgke3RoaXMuX2FkZE5ld1Jvd3ModGhpcy5fcHJvcGVydHkuRnVuY3Rpb25QYXJhbXMpfSlgIDogdW5kZWZpbmVkXG4gICAgcmV0dXJuIFt0aGlzLl9wcm9wZXJ0eS5OYW1lLCBmblByb3BlcnRpZXNdLmZpbHRlcihCb29sZWFuKS5qb2luKCcnKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hYnN0cmFjdEF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eS5Jc0Fic3RyYWN0ID8gJ3thYnN0cmFjdH0nIDogJydcbiAgfVxuXG4gIC8vIFRPRE8gZmluZCBtb3JlIGVsZWdhbnQgd2F5IHRvIGRvIHRoaXNcbiAgcHJvdGVjdGVkIF9hZGROZXdSb3dzKHRlbXBsYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0ZW1wbGF0ZS5zcGxpdCgnOycpLmxlbmd0aCA9PT0gMSAmJiB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRlbXBsYXRlXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgneycpLmpvaW4oJ3tcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnfScpLmpvaW4oJ1xcXFxufScpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnOycpLmpvaW4oJztcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmpvaW4oJyxcXFxcbicpXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gIH1cblxuICAvLyBUT0RPIGFkZCBzdGF0aWNcbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbCgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fcHJvcGVydHkuQWNjZXNzTGV2ZWwpIHtcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDOlxuICAgICAgICByZXR1cm4gJysnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEU6XG4gICAgICAgIHJldHVybiAnLSdcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEOlxuICAgICAgICByZXR1cm4gJyMnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLk5PX01PRElGSUVSOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=