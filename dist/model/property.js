"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = exports.PropertyAccessLevelType = void 0;
var PropertyAccessLevelType;
(function (PropertyAccessLevelType) {
    PropertyAccessLevelType["PUBLIC"] = "public";
    PropertyAccessLevelType["PRIVATE"] = "private";
    PropertyAccessLevelType["PROTECTED"] = "protected";
    PropertyAccessLevelType["NO_MODIFIER"] = "no-modifier";
})(PropertyAccessLevelType = exports.PropertyAccessLevelType || (exports.PropertyAccessLevelType = {}));
class Property {
    // TODO implement readonly
    // TODO implement getter/setter
    constructor({ name, returnType, accessLevel, isAbstract, functionParams, }) {
        this._name = name;
        this._returnType = returnType;
        this._accessLevel = accessLevel ?? PropertyAccessLevelType.NO_MODIFIER;
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
}
exports.Property = Property;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSx1QkFLWDtBQUxELFdBQVksdUJBQXVCO0lBQ2pDLDRDQUFpQixDQUFBO0lBQ2pCLDhDQUFtQixDQUFBO0lBQ25CLGtEQUF1QixDQUFBO0lBQ3ZCLHNEQUEyQixDQUFBO0FBQzdCLENBQUMsRUFMVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQUtsQztBQUVELE1BQWEsUUFBUTtJQU1uQiwwQkFBMEI7SUFDMUIsK0JBQStCO0lBRS9CLFlBQVksRUFDVixJQUFJLEVBQ0osVUFBVSxFQUNWLFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxHQU9mO1FBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUE7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLElBQUksdUJBQXVCLENBQUMsV0FBVyxDQUFBO1FBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxJQUFJLEtBQUssQ0FBQTtRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFBO0lBQzFCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFBO0lBQzdCLENBQUM7Q0FDRjtBQWhERCw0QkFnREMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB7XG4gIFBVQkxJQyA9ICdwdWJsaWMnLFxuICBQUklWQVRFID0gJ3ByaXZhdGUnLFxuICBQUk9URUNURUQgPSAncHJvdGVjdGVkJyxcbiAgTk9fTU9ESUZJRVIgPSAnbm8tbW9kaWZpZXInLFxufVxuXG5leHBvcnQgY2xhc3MgUHJvcGVydHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX25hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JldHVyblR5cGU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2FjY2Vzc0xldmVsOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2lzQWJzdHJhY3Q6IGJvb2xlYW5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9mdW5jdGlvblBhcmFtczogc3RyaW5nIHwgdW5kZWZpbmVkXG4gIC8vIFRPRE8gaW1wbGVtZW50IHJlYWRvbmx5XG4gIC8vIFRPRE8gaW1wbGVtZW50IGdldHRlci9zZXR0ZXJcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgbmFtZSxcbiAgICByZXR1cm5UeXBlLFxuICAgIGFjY2Vzc0xldmVsLFxuICAgIGlzQWJzdHJhY3QsXG4gICAgZnVuY3Rpb25QYXJhbXMsXG4gIH06IHtcbiAgICBuYW1lOiBzdHJpbmdcbiAgICByZXR1cm5UeXBlOiBzdHJpbmdcbiAgICBhY2Nlc3NMZXZlbD86IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlXG4gICAgaXNBYnN0cmFjdD86IGJvb2xlYW5cbiAgICBmdW5jdGlvblBhcmFtcz86IHN0cmluZ1xuICB9KSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWVcbiAgICB0aGlzLl9yZXR1cm5UeXBlID0gcmV0dXJuVHlwZVxuICAgIHRoaXMuX2FjY2Vzc0xldmVsID0gYWNjZXNzTGV2ZWwgPz8gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuTk9fTU9ESUZJRVJcbiAgICB0aGlzLl9pc0Fic3RyYWN0ID0gaXNBYnN0cmFjdCA/PyBmYWxzZVxuICAgIHRoaXMuX2Z1bmN0aW9uUGFyYW1zID0gZnVuY3Rpb25QYXJhbXNcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lXG4gIH1cblxuICBwdWJsaWMgZ2V0IFJldHVyblR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0dXJuVHlwZVxuICB9XG5cbiAgcHVibGljIGdldCBBY2Nlc3NMZXZlbCgpOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY2Vzc0xldmVsXG4gIH1cblxuICBwdWJsaWMgZ2V0IElzQWJzdHJhY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQWJzdHJhY3RcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRnVuY3Rpb25QYXJhbXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZnVuY3Rpb25QYXJhbXNcbiAgfVxufVxuIl19