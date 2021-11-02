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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtcHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBRTdFLG9FQUErRDtBQUUvRCxNQUFhLHFCQUFzQixTQUFRLHdCQUFVO0lBQ2hDLFNBQVMsQ0FBVTtJQUU1QixZQUFZO1FBQ3BCLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNTLGNBQWM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqSCxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0YsQ0FBQztJQUVELFlBQVksTUFBOEI7UUFDeEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMzQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzNCLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0lBRVMsYUFBYTtRQUNyQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ3ZILE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFUyxrQkFBa0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDdEQsQ0FBQztJQUVELHdDQUF3QztJQUM5QixXQUFXLENBQUMsUUFBZ0I7UUFDcEMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sUUFBUSxDQUFBO1FBQ3pGLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDM0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNDLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMzQyxPQUFPLFFBQVEsQ0FBQTtJQUNqQixDQUFDO0lBRUQsa0JBQWtCO0lBQ1IsWUFBWTtRQUNwQixRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ2xDLEtBQUssb0RBQXVCLENBQUMsTUFBTTtnQkFDakMsT0FBTyxHQUFHLENBQUE7WUFDWixLQUFLLG9EQUF1QixDQUFDLE9BQU87Z0JBQ2xDLE9BQU8sR0FBRyxDQUFBO1lBQ1osS0FBSyxvREFBdUIsQ0FBQyxTQUFTO2dCQUNwQyxPQUFPLEdBQUcsQ0FBQTtZQUNaLEtBQUssb0RBQXVCLENBQUMsV0FBVyxDQUFDO1lBQ3pDO2dCQUNFLE9BQU8sRUFBRSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBQ0Y7QUF0REQsc0RBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvZW51bS9wcm9wZXJ0eS1hY2Nlc3MtbGV2ZWwtdHlwZSdcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvcHJvcGVydHknXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxQcmludGFibGVQcm9wZXJ0eSBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Byb3BlcnR5OiBQcm9wZXJ0eVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJydcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IFt0aGlzLl9hY2Nlc3NMZXZlbCgpLCB0aGlzLl9hYnN0cmFjdEF0dHJpYnV0ZSgpLCB0aGlzLl9wcm9wZXJ0eU5hbWUoKV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKVxuICAgIHJldHVybiBbdGVtcGxhdGUsIHRoaXMuX2FkZE5ld1Jvd3ModGhpcy5fcHJvcGVydHkuUmV0dXJuVHlwZSldLmZpbHRlcihCb29sZWFuKS5qb2luKCc6ICcpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHJvcGVydHk6IFByb3BlcnR5IH0pIHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwYXJhbXNcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fcHJvcGVydHkgPSBwcm9wZXJ0eVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm90ZWN0ZWQgX3Byb3BlcnR5TmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZuUHJvcGVydGllcyA9IHRoaXMuX3Byb3BlcnR5LkZ1bmN0aW9uUGFyYW1zID8gYCgke3RoaXMuX2FkZE5ld1Jvd3ModGhpcy5fcHJvcGVydHkuRnVuY3Rpb25QYXJhbXMpfSlgIDogdW5kZWZpbmVkXG4gICAgcmV0dXJuIFt0aGlzLl9wcm9wZXJ0eS5OYW1lLCBmblByb3BlcnRpZXNdLmZpbHRlcihCb29sZWFuKS5qb2luKCcnKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9hYnN0cmFjdEF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eS5Jc0Fic3RyYWN0ID8gJ3thYnN0cmFjdH0nIDogJydcbiAgfVxuXG4gIC8vIFRPRE8gZmluZCBtb3JlIGVsZWdhbnQgd2F5IHRvIGRvIHRoaXNcbiAgcHJvdGVjdGVkIF9hZGROZXdSb3dzKHRlbXBsYXRlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0ZW1wbGF0ZS5zcGxpdCgnOycpLmxlbmd0aCA9PT0gMSAmJiB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRlbXBsYXRlXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgneycpLmpvaW4oJ3tcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnfScpLmpvaW4oJ1xcXFxufScpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnOycpLmpvaW4oJztcXFxcbicpXG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5zcGxpdCgnLCcpLmpvaW4oJyxcXFxcbicpXG4gICAgcmV0dXJuIHRlbXBsYXRlXG4gIH1cblxuICAvLyBUT0RPIGFkZCBzdGF0aWNcbiAgcHJvdGVjdGVkIF9hY2Nlc3NMZXZlbCgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fcHJvcGVydHkuQWNjZXNzTGV2ZWwpIHtcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFVCTElDOlxuICAgICAgICByZXR1cm4gJysnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLlBSSVZBVEU6XG4gICAgICAgIHJldHVybiAnLSdcbiAgICAgIGNhc2UgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuUFJPVEVDVEVEOlxuICAgICAgICByZXR1cm4gJyMnXG4gICAgICBjYXNlIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlLk5PX01PRElGSUVSOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iXX0=