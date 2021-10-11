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
})(EntityType = exports.EntityType || (exports.EntityType = {}));
class Entity {
    constructor(partialEntity, type) {
        this.exportReference = [];
        this.importReference = [];
        if (partialEntity)
            Object.assign(this, partialEntity, this);
        this._type = type ?? EntityType.OBJECT;
    }
    get Type() {
        return this._type;
    }
    get Id() {
        return `${string_util_1.stringUtil.snakeCase(this.name)}_${shortHash(this.filePath)}`;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxzREFBaUQ7QUFFakQsOERBQThEO0FBQzlELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUV2QyxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsNkJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRCxNQUFhLE1BQU07SUFNakIsWUFBWSxhQUErQixFQUFFLElBQWlCO1FBV3ZELG9CQUFlLEdBQXNCLEVBQUUsQ0FBQTtRQUN2QyxvQkFBZSxHQUFzQixFQUFFLENBQUE7UUFYNUMsSUFBSSxhQUFhO1lBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUE7SUFDeEMsQ0FBQztJQVBELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBU0QsSUFBVyxFQUFFO1FBQ1gsT0FBTyxHQUFHLHdCQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUE7SUFDekUsQ0FBQztDQUlGO0FBbkJELHdCQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4cG9ydFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9leHBvcnQtcmVmZXJlbmNlJ1xuaW1wb3J0IHsgSW1wb3J0UmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL2ltcG9ydC1yZWZlcmVuY2UnXG5pbXBvcnQgeyBzdHJpbmdVdGlsIH0gZnJvbSAnc3JjL3V0aWwvc3RyaW5nLXV0aWwnXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG5jb25zdCBzaG9ydEhhc2ggPSByZXF1aXJlKCdzaG9ydC1oYXNoJylcblxuZXhwb3J0IGVudW0gRW50aXR5VHlwZSB7XG4gIE9CSkVDVCA9ICdvYmplY3QnLFxuICBDTEFTUyA9ICdjbGFzcycsXG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3R5cGU6IEVudGl0eVR5cGVcbiAgcHVibGljIGdldCBUeXBlKCk6IEVudGl0eVR5cGUge1xuICAgIHJldHVybiB0aGlzLl90eXBlXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwYXJ0aWFsRW50aXR5PzogUGFydGlhbDxFbnRpdHk+LCB0eXBlPzogRW50aXR5VHlwZSkge1xuICAgIGlmIChwYXJ0aWFsRW50aXR5KSBPYmplY3QuYXNzaWduKHRoaXMsIHBhcnRpYWxFbnRpdHksIHRoaXMpXG4gICAgdGhpcy5fdHlwZSA9IHR5cGUgPz8gRW50aXR5VHlwZS5PQkpFQ1RcbiAgfVxuXG4gIHB1YmxpYyBmaWxlUGF0aDogc3RyaW5nXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmdcbiAgcHVibGljIGdldCBJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtzdHJpbmdVdGlsLnNuYWtlQ2FzZSh0aGlzLm5hbWUpfV8ke3Nob3J0SGFzaCh0aGlzLmZpbGVQYXRoKX1gXG4gIH1cblxuICBwdWJsaWMgZXhwb3J0UmVmZXJlbmNlOiBFeHBvcnRSZWZlcmVuY2VbXSA9IFtdXG4gIHB1YmxpYyBpbXBvcnRSZWZlcmVuY2U6IEltcG9ydFJlZmVyZW5jZVtdID0gW11cbn1cbiJdfQ==