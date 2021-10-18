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
    constructor(params) {
        const { name, returnType, accessLevel, isAbstract, functionParams } = params;
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
    static SortByName(a, b) {
        if (a.Name < b.Name)
            return -1;
        if (a.Name > b.Name)
            return 1;
        return 0;
    }
}
exports.Property = Property;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSx1QkFLWDtBQUxELFdBQVksdUJBQXVCO0lBQ2pDLDRDQUFpQixDQUFBO0lBQ2pCLDhDQUFtQixDQUFBO0lBQ25CLGtEQUF1QixDQUFBO0lBQ3ZCLHNEQUEyQixDQUFBO0FBQzdCLENBQUMsRUFMVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQUtsQztBQUVELE1BQWEsUUFBUTtJQU1uQiwwQkFBMEI7SUFDMUIsK0JBQStCO0lBRS9CLFlBQVksTUFNWDtRQUNDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzVFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFBO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxJQUFJLHVCQUF1QixDQUFDLFdBQVcsQ0FBQTtRQUN0RSxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxLQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUE7SUFDdkMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtJQUN6QixDQUFDO0lBRUQsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQTtJQUM3QixDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFXLEVBQUUsQ0FBVztRQUMvQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLE9BQU8sQ0FBQyxDQUFBO0lBQ1YsQ0FBQztDQUNGO0FBakRELDRCQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlIHtcbiAgUFVCTElDID0gJ3B1YmxpYycsXG4gIFBSSVZBVEUgPSAncHJpdmF0ZScsXG4gIFBST1RFQ1RFRCA9ICdwcm90ZWN0ZWQnLFxuICBOT19NT0RJRklFUiA9ICduby1tb2RpZmllcicsXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbmFtZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfcmV0dXJuVHlwZTogc3RyaW5nXG4gIHByb3RlY3RlZCByZWFkb25seSBfYWNjZXNzTGV2ZWw6IFByb3BlcnR5QWNjZXNzTGV2ZWxUeXBlXG4gIHByb3RlY3RlZCByZWFkb25seSBfaXNBYnN0cmFjdDogYm9vbGVhblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Z1bmN0aW9uUGFyYW1zOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgLy8gVE9ETyBpbXBsZW1lbnQgcmVhZG9ubHlcbiAgLy8gVE9ETyBpbXBsZW1lbnQgZ2V0dGVyL3NldHRlclxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczoge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHJldHVyblR5cGU6IHN0cmluZ1xuICAgIGFjY2Vzc0xldmVsPzogUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGVcbiAgICBpc0Fic3RyYWN0PzogYm9vbGVhblxuICAgIGZ1bmN0aW9uUGFyYW1zPzogc3RyaW5nXG4gIH0pIHtcbiAgICBjb25zdCB7IG5hbWUsIHJldHVyblR5cGUsIGFjY2Vzc0xldmVsLCBpc0Fic3RyYWN0LCBmdW5jdGlvblBhcmFtcyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fbmFtZSA9IG5hbWVcbiAgICB0aGlzLl9yZXR1cm5UeXBlID0gcmV0dXJuVHlwZVxuICAgIHRoaXMuX2FjY2Vzc0xldmVsID0gYWNjZXNzTGV2ZWwgPz8gUHJvcGVydHlBY2Nlc3NMZXZlbFR5cGUuTk9fTU9ESUZJRVJcbiAgICB0aGlzLl9pc0Fic3RyYWN0ID0gaXNBYnN0cmFjdCA/PyBmYWxzZVxuICAgIHRoaXMuX2Z1bmN0aW9uUGFyYW1zID0gZnVuY3Rpb25QYXJhbXNcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lXG4gIH1cblxuICBwdWJsaWMgZ2V0IFJldHVyblR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0dXJuVHlwZVxuICB9XG5cbiAgcHVibGljIGdldCBBY2Nlc3NMZXZlbCgpOiBQcm9wZXJ0eUFjY2Vzc0xldmVsVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY2Vzc0xldmVsXG4gIH1cblxuICBwdWJsaWMgZ2V0IElzQWJzdHJhY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQWJzdHJhY3RcbiAgfVxuXG4gIHB1YmxpYyBnZXQgRnVuY3Rpb25QYXJhbXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fZnVuY3Rpb25QYXJhbXNcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgU29ydEJ5TmFtZShhOiBQcm9wZXJ0eSwgYjogUHJvcGVydHkpOiBudW1iZXIge1xuICAgIGlmIChhLk5hbWUgPCBiLk5hbWUpIHJldHVybiAtMVxuICAgIGlmIChhLk5hbWUgPiBiLk5hbWUpIHJldHVybiAxXG4gICAgcmV0dXJuIDBcbiAgfVxufVxuIl19