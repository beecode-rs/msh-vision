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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0ZBQTZFO0FBRTdFLE1BQWEsUUFBUTtJQUNBLEtBQUssQ0FBUTtJQUNiLFdBQVcsQ0FBUTtJQUNuQixZQUFZLENBQXlCO0lBQ3JDLFdBQVcsQ0FBUztJQUNwQixlQUFlLENBQW9CO0lBQ3RELDBCQUEwQjtJQUMxQiwrQkFBK0I7SUFFL0IsWUFBWSxNQU1YO1FBQ0MsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDNUUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUE7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLElBQUksb0RBQXVCLENBQUMsV0FBVyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxJQUFJLEtBQUssQ0FBQTtRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQzFCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFBO0lBQzdCLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQVcsRUFBRSxDQUFXO1FBQy9DLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDOUIsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUE7UUFDN0IsT0FBTyxDQUFDLENBQUE7SUFDVixDQUFDO0NBQ0Y7QUFqREQsNEJBaURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUgfSBmcm9tICdzcmMvZW51bS9wcm9wZXJ0eS1hY2Nlc3MtbGV2ZWwtdHlwZSdcblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZXR1cm5UeXBlOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9hY2Nlc3NMZXZlbDogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pc0Fic3RyYWN0OiBib29sZWFuXG4gIHByb3RlY3RlZCByZWFkb25seSBfZnVuY3Rpb25QYXJhbXM6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAvLyBUT0RPIGltcGxlbWVudCByZWFkb25seVxuICAvLyBUT0RPIGltcGxlbWVudCBnZXR0ZXIvc2V0dGVyXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgbmFtZTogc3RyaW5nXG4gICAgcmV0dXJuVHlwZTogc3RyaW5nXG4gICAgYWNjZXNzTGV2ZWw/OiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZVxuICAgIGlzQWJzdHJhY3Q/OiBib29sZWFuXG4gICAgZnVuY3Rpb25QYXJhbXM/OiBzdHJpbmdcbiAgfSkge1xuICAgIGNvbnN0IHsgbmFtZSwgcmV0dXJuVHlwZSwgYWNjZXNzTGV2ZWwsIGlzQWJzdHJhY3QsIGZ1bmN0aW9uUGFyYW1zIH0gPSBwYXJhbXNcbiAgICB0aGlzLl9uYW1lID0gbmFtZVxuICAgIHRoaXMuX3JldHVyblR5cGUgPSByZXR1cm5UeXBlXG4gICAgdGhpcy5fYWNjZXNzTGV2ZWwgPSBhY2Nlc3NMZXZlbCA/PyBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZS5OT19NT0RJRklFUlxuICAgIHRoaXMuX2lzQWJzdHJhY3QgPSBpc0Fic3RyYWN0ID8/IGZhbHNlXG4gICAgdGhpcy5fZnVuY3Rpb25QYXJhbXMgPSBmdW5jdGlvblBhcmFtc1xuICB9XG5cbiAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUmV0dXJuVHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZXR1cm5UeXBlXG4gIH1cblxuICBwdWJsaWMgZ2V0IEFjY2Vzc0xldmVsKCk6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fYWNjZXNzTGV2ZWxcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNBYnN0cmFjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNBYnN0cmFjdFxuICB9XG5cbiAgcHVibGljIGdldCBGdW5jdGlvblBhcmFtcygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mdW5jdGlvblBhcmFtc1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBTb3J0QnlOYW1lKGE6IFByb3BlcnR5LCBiOiBQcm9wZXJ0eSk6IG51bWJlciB7XG4gICAgaWYgKGEuTmFtZSA8IGIuTmFtZSkgcmV0dXJuIC0xXG4gICAgaWYgKGEuTmFtZSA+IGIuTmFtZSkgcmV0dXJuIDFcbiAgICByZXR1cm4gMFxuICB9XG59XG4iXX0=