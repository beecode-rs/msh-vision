"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.EntityType = void 0;
const string_util_1 = require("src/util/string-util");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash');
var EntityType;
(function (EntityType) {
    EntityType["OBJECT"] = "object";
    EntityType["CLASS"] = "class";
    EntityType["TYPE"] = "type";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
class Entity {
    constructor(partialEntity, type) {
        this.importReference = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBaUQ7QUFFakQsOERBQThEO0FBQzlELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV2QyxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsNkJBQWUsQ0FBQTtJQUNmLDJCQUFhLENBQUE7QUFDZixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRCxNQUFhLE1BQU07SUFHakIsWUFBWSxhQUErQixFQUFFLElBQWlCO1FBa0J2RCxvQkFBZSxHQUFzQixFQUFFLENBQUE7UUFqQjVDLElBQUksYUFBYTtZQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFBO0lBQ3hDLENBQUM7SUFFRCxJQUFXLEVBQUU7UUFDWCxPQUFPLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUN6RSxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7Q0FRRjtBQXRCRCx3QkFzQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbXBvcnRSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvaW1wb3J0LXJlZmVyZW5jZSdcbmltcG9ydCB7IHN0cmluZ1V0aWwgfSBmcm9tICdzcmMvdXRpbC9zdHJpbmctdXRpbCdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbmNvbnN0IHNob3J0SGFzaCA9IHJlcXVpcmUoJ3Nob3J0LWhhc2gnKVxuXG5leHBvcnQgZW51bSBFbnRpdHlUeXBlIHtcbiAgT0JKRUNUID0gJ29iamVjdCcsXG4gIENMQVNTID0gJ2NsYXNzJyxcbiAgVFlQRSA9ICd0eXBlJyxcbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfdHlwZTogRW50aXR5VHlwZVxuXG4gIGNvbnN0cnVjdG9yKHBhcnRpYWxFbnRpdHk/OiBQYXJ0aWFsPEVudGl0eT4sIHR5cGU/OiBFbnRpdHlUeXBlKSB7XG4gICAgaWYgKHBhcnRpYWxFbnRpdHkpIE9iamVjdC5hc3NpZ24odGhpcywgcGFydGlhbEVudGl0eSwgdGhpcylcbiAgICB0aGlzLl90eXBlID0gdHlwZSA/PyBFbnRpdHlUeXBlLk9CSkVDVFxuICB9XG5cbiAgcHVibGljIGdldCBJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtzdHJpbmdVdGlsLnNuYWtlQ2FzZSh0aGlzLm5hbWUpfV8ke3Nob3J0SGFzaCh0aGlzLmZpbGVQYXRoKX1gXG4gIH1cblxuICBwdWJsaWMgZ2V0IFR5cGUoKTogRW50aXR5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVcbiAgfVxuXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmdcbiAgcHVibGljIGZpbGVQYXRoOiBzdHJpbmdcblxuICBwdWJsaWMgZW50aXRpZXM6IEVudGl0eVtdXG5cbiAgcHVibGljIGltcG9ydFJlZmVyZW5jZTogSW1wb3J0UmVmZXJlbmNlW10gPSBbXVxufVxuIl19