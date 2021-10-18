"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityEnum = void 0;
const entity_1 = require("src/model/entity");
class EntityEnum extends entity_1.Entity {
    constructor(params) {
        const { name, inProjectPath, isExported, properties } = params;
        super({ name, inProjectPath });
        this._isExported = isExported ?? false;
        this._properties = properties ?? [];
    }
    get IsExported() {
        return this._isExported;
    }
    get Properties() {
        return this._properties;
    }
}
exports.EntityEnum = EntityEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvZW50aXR5LWVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlDO0FBR3pDLE1BQWEsVUFBVyxTQUFRLGVBQU07SUFJcEMsWUFBWSxNQUEyRjtRQUNyRyxNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzlELEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxJQUFJLEtBQUssQ0FBQTtRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUE7SUFDckMsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztJQUNELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBakJELGdDQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBFeHBvcnRhYmxlIH0gZnJvbSAnc3JjL21vZGVsL2V4cG9ydGFibGUnXG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlFbnVtIGV4dGVuZHMgRW50aXR5IGltcGxlbWVudHMgRXhwb3J0YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfaXNFeHBvcnRlZDogYm9vbGVhblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3Byb3BlcnRpZXM6IHN0cmluZ1tdXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IG5hbWU6IHN0cmluZzsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nOyBpc0V4cG9ydGVkPzogYm9vbGVhbjsgcHJvcGVydGllczogc3RyaW5nW10gfSkge1xuICAgIGNvbnN0IHsgbmFtZSwgaW5Qcm9qZWN0UGF0aCwgaXNFeHBvcnRlZCwgcHJvcGVydGllcyB9ID0gcGFyYW1zXG4gICAgc3VwZXIoeyBuYW1lLCBpblByb2plY3RQYXRoIH0pXG4gICAgdGhpcy5faXNFeHBvcnRlZCA9IGlzRXhwb3J0ZWQgPz8gZmFsc2VcbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gcHJvcGVydGllcyA/PyBbXVxuICB9XG5cbiAgcHVibGljIGdldCBJc0V4cG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0V4cG9ydGVkXG4gIH1cbiAgcHVibGljIGdldCBQcm9wZXJ0aWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1xuICB9XG59XG4iXX0=