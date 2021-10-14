"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.EntityType = void 0;
const string_util_1 = require("src/util/string-util");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash');
var EntityType;
(function (EntityType) {
    EntityType["FILE"] = "file";
    EntityType["IMPORT"] = "import";
    EntityType["OBJECT"] = "object";
    EntityType["CLASS"] = "class";
    EntityType["ENUM"] = "enum";
    EntityType["TYPE"] = "type";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
class Entity {
    constructor(partialEntity, type) {
        this.importReferences = [];
        if (partialEntity)
            Object.assign(this, partialEntity, this);
        this._type = type ?? EntityType.OBJECT;
    }
    get Id() {
        return `${string_util_1.stringUtil.snakeCase(this.name)}_${shortHash(this.filePath)}`;
    }
    get Type() {
        return this._type;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBaUQ7QUFFakQsOERBQThEO0FBQzlELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV2QyxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDcEIsMkJBQWEsQ0FBQTtJQUNiLCtCQUFpQixDQUFBO0lBQ2pCLCtCQUFpQixDQUFBO0lBQ2pCLDZCQUFlLENBQUE7SUFDZiwyQkFBYSxDQUFBO0lBQ2IsMkJBQWEsQ0FBQTtBQUNmLENBQUMsRUFQVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU9yQjtBQUVELE1BQWEsTUFBTTtJQUdqQixZQUFZLGFBQStCLEVBQUUsSUFBaUI7UUFrQnZELHFCQUFnQixHQUFzQixFQUFFLENBQUE7UUFqQjdDLElBQUksYUFBYTtZQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFBO0lBQ3hDLENBQUM7SUFFRCxJQUFXLEVBQUU7UUFDWCxPQUFPLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUN6RSxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7Q0FRRjtBQXRCRCx3QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbXBvcnRSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvaW1wb3J0LXJlZmVyZW5jZSdcbmltcG9ydCB7IHN0cmluZ1V0aWwgfSBmcm9tICdzcmMvdXRpbC9zdHJpbmctdXRpbCdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbmNvbnN0IHNob3J0SGFzaCA9IHJlcXVpcmUoJ3Nob3J0LWhhc2gnKVxuXG5leHBvcnQgZW51bSBFbnRpdHlUeXBlIHtcbiAgRklMRSA9ICdmaWxlJyxcbiAgSU1QT1JUID0gJ2ltcG9ydCcsXG4gIE9CSkVDVCA9ICdvYmplY3QnLFxuICBDTEFTUyA9ICdjbGFzcycsXG4gIEVOVU0gPSAnZW51bScsXG4gIFRZUEUgPSAndHlwZScsXG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3R5cGU6IEVudGl0eVR5cGVcblxuICBjb25zdHJ1Y3RvcihwYXJ0aWFsRW50aXR5PzogUGFydGlhbDxFbnRpdHk+LCB0eXBlPzogRW50aXR5VHlwZSkge1xuICAgIGlmIChwYXJ0aWFsRW50aXR5KSBPYmplY3QuYXNzaWduKHRoaXMsIHBhcnRpYWxFbnRpdHksIHRoaXMpXG4gICAgdGhpcy5fdHlwZSA9IHR5cGUgPz8gRW50aXR5VHlwZS5PQkpFQ1RcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7c3RyaW5nVXRpbC5zbmFrZUNhc2UodGhpcy5uYW1lKX1fJHtzaG9ydEhhc2godGhpcy5maWxlUGF0aCl9YFxuICB9XG5cbiAgcHVibGljIGdldCBUeXBlKCk6IEVudGl0eVR5cGUge1xuICAgIHJldHVybiB0aGlzLl90eXBlXG4gIH1cblxuICBwdWJsaWMgbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBmaWxlUGF0aDogc3RyaW5nXG5cbiAgcHVibGljIGVudGl0aWVzOiBFbnRpdHlbXVxuXG4gIHB1YmxpYyBpbXBvcnRSZWZlcmVuY2VzOiBJbXBvcnRSZWZlcmVuY2VbXSA9IFtdXG59XG4iXX0=