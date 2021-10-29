"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityClass = void 0;
class EntityClass {
    constructor(params) {
        const { isAbstract, properties } = params;
        this._isAbstract = isAbstract ?? false;
        this._properties = properties ?? [];
    }
    get IsAbstract() {
        return this._isAbstract;
    }
    get Properties() {
        return this._properties;
    }
}
exports.EntityClass = EntityClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFdBQVc7SUFJdEIsWUFBWSxNQUF5RDtRQUNuRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxLQUFLLENBQUE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFBO0lBQ3JDLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7Q0FDRjtBQWpCRCxrQ0FpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gJ3NyYy9tb2RlbC9wcm9wZXJ0eSdcblxuZXhwb3J0IGNsYXNzIEVudGl0eUNsYXNzIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pc0Fic3RyYWN0OiBib29sZWFuXG4gIHByb3RlY3RlZCByZWFkb25seSBfcHJvcGVydGllczogUHJvcGVydHlbXVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBpc0Fic3RyYWN0PzogYm9vbGVhbjsgcHJvcGVydGllcz86IFByb3BlcnR5W10gfSkge1xuICAgIGNvbnN0IHsgaXNBYnN0cmFjdCwgcHJvcGVydGllcyB9ID0gcGFyYW1zXG4gICAgdGhpcy5faXNBYnN0cmFjdCA9IGlzQWJzdHJhY3QgPz8gZmFsc2VcbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gcHJvcGVydGllcyA/PyBbXVxuICB9XG5cbiAgcHVibGljIGdldCBJc0Fic3RyYWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0Fic3RyYWN0XG4gIH1cblxuICBwdWJsaWMgZ2V0IFByb3BlcnRpZXMoKTogUHJvcGVydHlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNcbiAgfVxufVxuIl19