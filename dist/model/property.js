"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const property_access_level_type_1 = require("src/enum/property-access-level-type");
class Property {
    _name;
    _returnType;
    _accessLevel;
    _isAbstract;
    _functionParams;
    // TODO implement readonly
    // TODO implement getter/setter
    constructor(params) {
        const { name, returnType, accessLevel, isAbstract, functionParams } = params;
        this._name = name;
        this._returnType = returnType;
        this._accessLevel = accessLevel ?? property_access_level_type_1.PropertyAccessLevelType.NO_MODIFIER;
        this._isAbstract = isAbstract ?? false;
        this._functionParams = functionParams;
    }
    get Name() {
        return this._name;
    }
    get ReturnType() {
        return this._returnType;
    }
    get AccessLevel() {
        return this._accessLevel;
    }
    get IsAbstract() {
        return this._isAbstract;
    }
    get FunctionParams() {
        return this._functionParams;
    }
    static SortByName(a, b) {
        if (a.Name < b.Name)
            return -1;
        if (a.Name > b.Name)
            return 1;
        return 0;
    }
}
exports.Property = Property;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBRTdFLE1BQWEsUUFBUTtJQUNBLEtBQUssQ0FBUTtJQUNiLFdBQVcsQ0FBUTtJQUNuQixZQUFZLENBQXlCO0lBQ3JDLFdBQVcsQ0FBUztJQUNwQixlQUFlLENBQW9CO0lBQ3RELDBCQUEwQjtJQUMxQiwrQkFBK0I7SUFFL0IsWUFBbUIsTUFNbEI7UUFDQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM1RSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQTtRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsSUFBSSxvREFBdUIsQ0FBQyxXQUFXLENBQUE7UUFDdEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksS0FBSyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7SUFDMUIsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztJQUVELElBQVcsY0FBYztRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUE7SUFDN0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBVyxFQUFFLENBQVc7UUFDL0MsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM3QixPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUM7Q0FDRjtBQWpERCw0QkFpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3Byb3BlcnR5LWFjY2Vzcy1sZXZlbC10eXBlJ1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX25hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JldHVyblR5cGU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2FjY2Vzc0xldmVsOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2lzQWJzdHJhY3Q6IGJvb2xlYW5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9mdW5jdGlvblBhcmFtczogc3RyaW5nIHwgdW5kZWZpbmVkXG4gIC8vIFRPRE8gaW1wbGVtZW50IHJlYWRvbmx5XG4gIC8vIFRPRE8gaW1wbGVtZW50IGdldHRlci9zZXR0ZXJcblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgbmFtZTogc3RyaW5nXG4gICAgcmV0dXJuVHlwZTogc3RyaW5nXG4gICAgYWNjZXNzTGV2ZWw/OiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZVxuICAgIGlzQWJzdHJhY3Q/OiBib29sZWFuXG4gICAgZnVuY3Rpb25QYXJhbXM/OiBzdHJpbmdcbiAgfSkge1xuICAgIGNvbnN0IHsgbmFtZSwgcmV0dXJuVHlwZSwgYWNjZXNzTGV2ZWwsIGlzQWJzdHJhY3QsIGZ1bmN0aW9uUGFyYW1zIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9uYW1lID0gbmFtZVxuICAgIHRoaXMuX3JldHVyblR5cGUgPSByZXR1cm5UeXBlXG4gICAgdGhpcy5fYWNjZXNzTGV2ZWwgPSBhY2Nlc3NMZXZlbCA/PyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5OT19NT0RJRklFUlxuICAgIHRoaXMuX2lzQWJzdHJhY3QgPSBpc0Fic3RyYWN0ID8/IGZhbHNlXG4gICAgdGhpcy5fZnVuY3Rpb25QYXJhbXMgPSBmdW5jdGlvblBhcmFtc1xuICB9XG5cbiAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUmV0dXJuVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZXR1cm5UeXBlXG4gIH1cblxuICBwdWJsaWMgZ2V0IEFjY2Vzc0xldmVsKCk6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fYWNjZXNzTGV2ZWxcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNBYnN0cmFjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNBYnN0cmFjdFxuICB9XG5cbiAgcHVibGljIGdldCBGdW5jdGlvblBhcmFtcygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mdW5jdGlvblBhcmFtc1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBTb3J0QnlOYW1lKGE6IFByb3BlcnR5LCBiOiBQcm9wZXJ0eSk6IG51bWJlciB7XG4gICAgaWYgKGEuTmFtZSA8IGIuTmFtZSkgcmV0dXJuIC0xXG4gICAgaWYgKGEuTmFtZSA+IGIuTmFtZSkgcmV0dXJuIDFcbiAgICByZXR1cm4gMFxuICB9XG59XG4iXX0=