"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
const constant_1 = require("src/util/constant");
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
        return [this._printGroups(this.groups)];
    }
    _printGroups(groups) {
        return Object.values(groups)
            .map((pg) => pg.print())
            .join(constant_1.constant.newRow);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFDeEQsb0VBQStEO0FBQy9ELGdEQUE0QztBQUM1QyxzREFBaUQ7QUFFakQsTUFBYSxTQUFVLFNBQVEsd0JBQVU7SUEwQnZDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBNEQ7UUFDN0YsS0FBSyxFQUFFLENBQUE7UUF2QkYsV0FBTSxHQUErQixFQUFFLENBQUE7UUF3QjVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO0lBQzdCLENBQUM7SUF6QlMsWUFBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRVMsY0FBYztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDdkQsQ0FBQztJQUVTLE1BQU07UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRVMsWUFBWSxDQUFDLE1BQWtDO1FBQ3ZELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDekIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDdkIsSUFBSSxDQUFDLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQVNELElBQVcsRUFBRTtRQUNYLE9BQU8sd0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQUNGO0FBaERELDhCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcbmltcG9ydCB7IGNvbnN0YW50IH0gZnJvbSAnc3JjL3V0aWwvY29uc3RhbnQnXG5pbXBvcnQgeyBzdHJpbmdVdGlsIH0gZnJvbSAnc3JjL3V0aWwvc3RyaW5nLXV0aWwnXG5cbmV4cG9ydCBjbGFzcyBQdW1sR3JvdXAgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90eXBlOiBQdW1sR3JvdXBUeXBlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZ3JvdXBQYXRoOiBzdHJpbmdcbiAgcHVibGljIGdyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0gPSB7fVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5UeXBlID09PSBQdW1sR3JvdXBUeXBlLkZJQ1RJVkUpIHJldHVybiAnJ1xuICAgIHJldHVybiAnfSdcbiAgfVxuXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVTdGFydCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLlR5cGUgPT09IFB1bWxHcm91cFR5cGUuRklDVElWRSkgcmV0dXJuICcnXG4gICAgcmV0dXJuIGAke3RoaXMuX3R5cGV9IFwiJHt0aGlzLk5hbWV9XCIgYXMgJHt0aGlzLklkfSB7YFxuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9wcmludEdyb3Vwcyh0aGlzLmdyb3VwcyldXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50R3JvdXBzKGdyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGdyb3VwcylcbiAgICAgIC5tYXAoKHBnKSA9PiBwZy5wcmludCgpKVxuICAgICAgLmpvaW4oY29uc3RhbnQubmV3Um93KVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBuYW1lLCB0eXBlLCBncm91cFBhdGggfTogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IFB1bWxHcm91cFR5cGU7IGdyb3VwUGF0aDogc3RyaW5nIH0pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fbmFtZSA9IG5hbWVcbiAgICB0aGlzLl90eXBlID0gdHlwZVxuICAgIHRoaXMuX2dyb3VwUGF0aCA9IGdyb3VwUGF0aFxuICB9XG5cbiAgcHVibGljIGdldCBJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHJpbmdVdGlsLnVuaXF1ZUVudGl0eUhhc2godGhpcy5OYW1lLCB0aGlzLl9ncm91cFBhdGgpXG4gIH1cblxuICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZVxuICB9XG5cbiAgcHVibGljIGdldCBHcm91cFBhdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBQYXRoXG4gIH1cblxuICBwdWJsaWMgZ2V0IFR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZVxuICB9XG59XG4iXX0=