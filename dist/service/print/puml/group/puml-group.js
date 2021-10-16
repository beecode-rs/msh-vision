"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const puml_group_service_1 = require("src/service/print/puml/group/puml-group-service");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
const string_util_1 = require("src/util/string-util");
class PumlGroup extends puml_entity_1.PumlEntity {
    constructor({ name, type, groupPath }) {
        super();
        this.groups = {};
        this._name = name;
        this._type = type;
        this._groupPath = groupPath;
    }
    _templateEnd() {
        if (this.Type === puml_group_type_1.PumlGroupType.FICTIVE)
            return '';
        return '}';
    }
    _templateStart() {
        if (this.Type === puml_group_type_1.PumlGroupType.FICTIVE)
            return '';
        return `${this._type} "${this.Name}" as ${this.Id} {`;
    }
    _print() {
        return [puml_group_service_1.pumlGroupService.printGroups(this.groups)];
    }
    get Id() {
        return string_util_1.stringUtil.uniqueEntityHash(this.Name, this._groupPath);
    }
    get Name() {
        return this._name;
    }
    get GroupPath() {
        return this._groupPath;
    }
    get Type() {
        return this._type;
    }
}
exports.PumlGroup = PumlGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvZ3JvdXAvcHVtbC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFDeEQsd0ZBQWtGO0FBQ2xGLG9FQUErRDtBQUMvRCxzREFBaUQ7QUFFakQsTUFBYSxTQUFVLFNBQVEsd0JBQVU7SUFvQnZDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBNEQ7UUFDN0YsS0FBSyxFQUFFLENBQUE7UUFqQkYsV0FBTSxHQUErQixFQUFFLENBQUE7UUFrQjVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO0lBQzdCLENBQUM7SUFuQlMsWUFBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRVMsY0FBYztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDdkQsQ0FBQztJQUVTLE1BQU07UUFDZCxPQUFPLENBQUMscUNBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFTRCxJQUFXLEVBQUU7UUFDWCxPQUFPLHdCQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDaEUsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRUQsSUFBVyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7Q0FDRjtBQTFDRCw4QkEwQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sR3JvdXBUeXBlIH0gZnJvbSAnc3JjL2VudW0vcHVtbC1ncm91cC10eXBlJ1xuaW1wb3J0IHsgcHVtbEdyb3VwU2VydmljZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvZ3JvdXAvcHVtbC1ncm91cC1zZXJ2aWNlJ1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1lbnRpdHknXG5pbXBvcnQgeyBzdHJpbmdVdGlsIH0gZnJvbSAnc3JjL3V0aWwvc3RyaW5nLXV0aWwnXG5cbmV4cG9ydCBjbGFzcyBQdW1sR3JvdXAgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90eXBlOiBQdW1sR3JvdXBUeXBlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZ3JvdXBQYXRoOiBzdHJpbmdcbiAgcHVibGljIGdyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0gPSB7fVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5UeXBlID09PSBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUpIHJldHVybiAnJ1xuICAgIHJldHVybiAnfSdcbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLlR5cGUgPT09IFB1bWxHcm91cFR5cGUuRklDVElWRSkgcmV0dXJuICcnXG4gICAgcmV0dXJuIGAke3RoaXMuX3R5cGV9IFwiJHt0aGlzLk5hbWV9XCIgYXMgJHt0aGlzLklkfSB7YFxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtwdW1sR3JvdXBTZXJ2aWNlLnByaW50R3JvdXBzKHRoaXMuZ3JvdXBzKV1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHsgbmFtZSwgdHlwZSwgZ3JvdXBQYXRoIH06IHsgbmFtZTogc3RyaW5nOyB0eXBlOiBQdW1sR3JvdXBUeXBlOyBncm91cFBhdGg6IHN0cmluZyB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX25hbWUgPSBuYW1lXG4gICAgdGhpcy5fdHlwZSA9IHR5cGVcbiAgICB0aGlzLl9ncm91cFBhdGggPSBncm91cFBhdGhcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyaW5nVXRpbC51bmlxdWVFbnRpdHlIYXNoKHRoaXMuTmFtZSwgdGhpcy5fZ3JvdXBQYXRoKVxuICB9XG5cbiAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVcbiAgfVxuXG4gIHB1YmxpYyBnZXQgR3JvdXBQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUGF0aFxuICB9XG5cbiAgcHVibGljIGdldCBUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVcbiAgfVxufVxuIl19