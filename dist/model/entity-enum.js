"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityEnum = void 0;
class EntityEnum {
    constructor(params) {
        const { properties } = params;
        this._properties = properties ?? [];
    }
    get Properties() {
        return this._properties;
    }
}
exports.EntityEnum = EntityEnum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvZW50aXR5LWVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxVQUFVO0lBR3JCLFlBQVksTUFBZ0M7UUFDMUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUE7SUFDckMsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztDQUNGO0FBWEQsZ0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50aXR5RW51bSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcHJvcGVydGllczogc3RyaW5nW11cblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHJvcGVydGllczogc3RyaW5nW10gfSkge1xuICAgIGNvbnN0IHsgcHJvcGVydGllcyB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcHJvcGVydGllcyA9IHByb3BlcnRpZXMgPz8gW11cbiAgfVxuXG4gIHB1YmxpYyBnZXQgUHJvcGVydGllcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNcbiAgfVxufVxuIl19