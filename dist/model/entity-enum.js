"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityEnum = void 0;
const entity_1 = require("src/model/entity");
class EntityEnum extends entity_1.Entity {
    constructor({ name, inProjectPath, isExported }) {
        super({ name, inProjectPath });
        this._isExported = isExported ?? false;
    }
    get IsExported() {
        return this._isExported;
    }
}
exports.EntityEnum = EntityEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvZW50aXR5LWVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlDO0FBR3pDLE1BQWEsVUFBVyxTQUFRLGVBQU07SUFFcEMsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFpRTtRQUM1RyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxLQUFLLENBQUE7SUFDeEMsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBVkQsZ0NBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRXhwb3J0YWJsZSB9IGZyb20gJ3NyYy9tb2RlbC9leHBvcnRhYmxlJ1xuXG5leHBvcnQgY2xhc3MgRW50aXR5RW51bSBleHRlbmRzIEVudGl0eSBpbXBsZW1lbnRzIEV4cG9ydGFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2lzRXhwb3J0ZWQ6IGJvb2xlYW5cbiAgY29uc3RydWN0b3IoeyBuYW1lLCBpblByb2plY3RQYXRoLCBpc0V4cG9ydGVkIH06IHsgbmFtZTogc3RyaW5nOyBpblByb2plY3RQYXRoOiBzdHJpbmc7IGlzRXhwb3J0ZWQ/OiBib29sZWFuIH0pIHtcbiAgICBzdXBlcih7IG5hbWUsIGluUHJvamVjdFBhdGggfSlcbiAgICB0aGlzLl9pc0V4cG9ydGVkID0gaXNFeHBvcnRlZCA/PyBmYWxzZVxuICB9XG5cbiAgcHVibGljIGdldCBJc0V4cG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0V4cG9ydGVkXG4gIH1cbn1cbiJdfQ==