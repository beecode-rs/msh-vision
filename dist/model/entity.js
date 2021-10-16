"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.EntityType = void 0;
const string_util_1 = require("src/util/string-util");
var EntityType;
(function (EntityType) {
    EntityType["FILE"] = "file";
    EntityType["IMPORT"] = "import";
    EntityType["OBJECT"] = "object";
    EntityType["CLASS"] = "class";
    EntityType["ENUM"] = "enum";
    EntityType["TYPE"] = "type";
    EntityType["INTERFACE"] = "interface";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
class Entity {
    constructor(partialEntity, type) {
        this.importReferences = [];
        if (partialEntity)
            Object.assign(this, partialEntity, this);
        this._type = type ?? EntityType.OBJECT;
    }
    get Id() {
        return `${string_util_1.stringUtil.snakeCase(this.name)}_${string_util_1.stringUtil.stringToHash(this.filePath)}`;
    }
    get Type() {
        return this._type;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBaUQ7QUFFakQsSUFBWSxVQVFYO0FBUkQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtJQUNqQiwrQkFBaUIsQ0FBQTtJQUNqQiw2QkFBZSxDQUFBO0lBQ2YsMkJBQWEsQ0FBQTtJQUNiLDJCQUFhLENBQUE7SUFDYixxQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBUlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFRckI7QUFFRCxNQUFhLE1BQU07SUFHakIsWUFBWSxhQUErQixFQUFFLElBQWlCO1FBZ0J2RCxxQkFBZ0IsR0FBc0IsRUFBRSxDQUFBO1FBZjdDLElBQUksYUFBYTtZQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFBO0lBQ3hDLENBQUM7SUFFRCxJQUFXLEVBQUU7UUFDWCxPQUFPLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHdCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFBO0lBQ3ZGLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQU1GO0FBcEJELHdCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltcG9ydFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9pbXBvcnQtcmVmZXJlbmNlJ1xuaW1wb3J0IHsgc3RyaW5nVXRpbCB9IGZyb20gJ3NyYy91dGlsL3N0cmluZy11dGlsJ1xuXG5leHBvcnQgZW51bSBFbnRpdHlUeXBlIHtcbiAgRklMRSA9ICdmaWxlJyxcbiAgSU1QT1JUID0gJ2ltcG9ydCcsXG4gIE9CSkVDVCA9ICdvYmplY3QnLFxuICBDTEFTUyA9ICdjbGFzcycsXG4gIEVOVU0gPSAnZW51bScsXG4gIFRZUEUgPSAndHlwZScsXG4gIElOVEVSRkFDRSA9ICdpbnRlcmZhY2UnLFxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90eXBlOiBFbnRpdHlUeXBlXG5cbiAgY29uc3RydWN0b3IocGFydGlhbEVudGl0eT86IFBhcnRpYWw8RW50aXR5PiwgdHlwZT86IEVudGl0eVR5cGUpIHtcbiAgICBpZiAocGFydGlhbEVudGl0eSkgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJ0aWFsRW50aXR5LCB0aGlzKVxuICAgIHRoaXMuX3R5cGUgPSB0eXBlID8/IEVudGl0eVR5cGUuT0JKRUNUXG4gIH1cblxuICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3N0cmluZ1V0aWwuc25ha2VDYXNlKHRoaXMubmFtZSl9XyR7c3RyaW5nVXRpbC5zdHJpbmdUb0hhc2godGhpcy5maWxlUGF0aCl9YFxuICB9XG5cbiAgcHVibGljIGdldCBUeXBlKCk6IEVudGl0eVR5cGUge1xuICAgIHJldHVybiB0aGlzLl90eXBlXG4gIH1cblxuICBwdWJsaWMgbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBmaWxlUGF0aDogc3RyaW5nXG5cbiAgcHVibGljIGltcG9ydFJlZmVyZW5jZXM6IEltcG9ydFJlZmVyZW5jZVtdID0gW11cbn1cbiJdfQ==