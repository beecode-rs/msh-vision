"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlPrintableFile = void 0;
const puml_entity_1 = require("src/service/print-puml/puml-entity");
const puml_relation_1 = require("src/service/print-puml/puml-relation");
class PumlPrintableFile extends puml_entity_1.PumlEntity {
    _entity;
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `artifact "${this._entity.Name}" as ${this._entity.Id} {`;
    }
    constructor(params) {
        const { entity } = params;
        super();
        this._entity = entity;
        this._relations = entity.References.map((r) => new puml_relation_1.PumlRelation({ reference: r, fromEntity: entity }));
    }
    _print() {
        return [];
    }
}
exports.PumlPrintableFile = PumlPrintableFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG9FQUErRDtBQUMvRCx3RUFBbUU7QUFFbkUsTUFBYSxpQkFBa0IsU0FBUSx3QkFBVTtJQUM1QixPQUFPLENBQTBCO0lBRTFDLFlBQVk7UUFDcEIsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBQ1MsY0FBYztRQUN0QixPQUFPLGFBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQTtJQUNsRSxDQUFDO0lBRUQsWUFBbUIsTUFBNEM7UUFDN0QsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN6QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksNEJBQVksQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN4RyxDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBcEJELDhDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgUHVtbFJlbGF0aW9uIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXJlbGF0aW9uJ1xuXG5leHBvcnQgY2xhc3MgUHVtbFByaW50YWJsZUZpbGUgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9lbnRpdHk6IEVudGl0eTxFbnRpdHlUeXBlcy5GSUxFPlxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBhcnRpZmFjdCBcIiR7dGhpcy5fZW50aXR5Lk5hbWV9XCIgYXMgJHt0aGlzLl9lbnRpdHkuSWR9IHtgXG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1zOiB7IGVudGl0eTogRW50aXR5PEVudGl0eVR5cGVzLkZJTEU+IH0pIHtcbiAgICBjb25zdCB7IGVudGl0eSB9ID0gcGFyYW1zXG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX2VudGl0eSA9IGVudGl0eVxuICAgIHRoaXMuX3JlbGF0aW9ucyA9IGVudGl0eS5SZWZlcmVuY2VzLm1hcCgocikgPT4gbmV3IFB1bWxSZWxhdGlvbih7IHJlZmVyZW5jZTogciwgZnJvbUVudGl0eTogZW50aXR5IH0pKVxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==