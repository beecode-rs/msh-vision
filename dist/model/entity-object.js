"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityObject = void 0;
const entity_1 = require("src/model/entity");
class EntityObject extends entity_1.Entity {
    constructor({ name, inProjectPath, isExported, properties, }) {
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
exports.EntityObject = EntityObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LW9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF5QztBQUl6QyxNQUFhLFlBQWEsU0FBUSxlQUFNO0lBSXRDLFlBQVksRUFDVixJQUFJLEVBQ0osYUFBYSxFQUNiLFVBQVUsRUFDVixVQUFVLEdBTVg7UUFDQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxLQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFBO0lBQ3JDLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7Q0FDRjtBQTNCRCxvQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgRXhwb3J0YWJsZSB9IGZyb20gJ3NyYy9tb2RlbC9leHBvcnRhYmxlJ1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tICdzcmMvbW9kZWwvcHJvcGVydHknXG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlPYmplY3QgZXh0ZW5kcyBFbnRpdHkgaW1wbGVtZW50cyBFeHBvcnRhYmxlIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pc0V4cG9ydGVkOiBib29sZWFuXG4gIHByb3RlY3RlZCByZWFkb25seSBfcHJvcGVydGllczogUHJvcGVydHlbXVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBuYW1lLFxuICAgIGluUHJvamVjdFBhdGgsXG4gICAgaXNFeHBvcnRlZCxcbiAgICBwcm9wZXJ0aWVzLFxuICB9OiB7XG4gICAgbmFtZTogc3RyaW5nXG4gICAgaW5Qcm9qZWN0UGF0aDogc3RyaW5nXG4gICAgaXNFeHBvcnRlZD86IGJvb2xlYW5cbiAgICBwcm9wZXJ0aWVzPzogUHJvcGVydHlbXVxuICB9KSB7XG4gICAgc3VwZXIoeyBuYW1lLCBpblByb2plY3RQYXRoIH0pXG4gICAgdGhpcy5faXNFeHBvcnRlZCA9IGlzRXhwb3J0ZWQgPz8gZmFsc2VcbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gcHJvcGVydGllcyA/PyBbXVxuICB9XG5cbiAgcHVibGljIGdldCBJc0V4cG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0V4cG9ydGVkXG4gIH1cblxuICBwdWJsaWMgZ2V0IFByb3BlcnRpZXMoKTogUHJvcGVydHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNcbiAgfVxufVxuIl19