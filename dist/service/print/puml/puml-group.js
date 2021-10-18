"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = void 0;
const puml_group_type_1 = require("src/enum/puml-group-type");
const puml_entity_1 = require("src/service/print/puml/puml-entity");
const constant_1 = require("src/util/constant");
const string_util_1 = require("src/util/string-util");
class PumlGroup extends puml_entity_1.PumlEntity {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    constructor(params) {
        const { name, type, groupPath } = params;
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
        return [this._printGroups(this.groups)].filter(Boolean);
    }
    _printGroups(groups) {
        return Object.values(groups)
            .map((pg) => pg.print())
            .filter(Boolean)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBd0Q7QUFDeEQsb0VBQStEO0FBQy9ELGdEQUE0QztBQUM1QyxzREFBaUQ7QUFFakQsTUFBYSxTQUFVLFNBQVEsd0JBQVU7SUEyQnZDLDZEQUE2RDtJQUM3RCxhQUFhO0lBQ2IsWUFBWSxNQUFnRTtRQUMxRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDeEMsS0FBSyxFQUFFLENBQUE7UUEzQkYsV0FBTSxHQUErQixFQUFFLENBQUE7UUE0QjVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO0lBQzdCLENBQUM7SUE3QlMsWUFBWTtRQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0lBRVMsY0FBYztRQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQWEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDdkQsQ0FBQztJQUVTLE1BQU07UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVTLFlBQVksQ0FBQyxNQUFrQztRQUN2RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3pCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsbUJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBWUQsSUFBVyxFQUFFO1FBQ1gsT0FBTyx3QkFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFwREQsOEJBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEdyb3VwVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3B1bWwtZ3JvdXAtdHlwZSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgY29uc3RhbnQgfSBmcm9tICdzcmMvdXRpbC9jb25zdGFudCdcbmltcG9ydCB7IHN0cmluZ1V0aWwgfSBmcm9tICdzcmMvdXRpbC9zdHJpbmctdXRpbCdcblxuZXhwb3J0IGNsYXNzIFB1bWxHcm91cCBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX25hbWU6IHN0cmluZ1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3R5cGU6IFB1bWxHcm91cFR5cGVcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9ncm91cFBhdGg6IHN0cmluZ1xuICBwdWJsaWMgZ3JvdXBzOiB7IFtrOiBzdHJpbmddOiBQdW1sR3JvdXAgfSA9IHt9XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLlR5cGUgPT09IFB1bWxHcm91cFR5cGUuRklDVElWRSkgcmV0dXJuICcnXG4gICAgcmV0dXJuICd9J1xuICB9XG5cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuVHlwZSA9PT0gUHVtbEdyb3VwVHlwZS5GSUNUSVZFKSByZXR1cm4gJydcbiAgICByZXR1cm4gYCR7dGhpcy5fdHlwZX0gXCIke3RoaXMuTmFtZX1cIiBhcyAke3RoaXMuSWR9IHtgXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW3RoaXMuX3ByaW50R3JvdXBzKHRoaXMuZ3JvdXBzKV0uZmlsdGVyKEJvb2xlYW4pXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50R3JvdXBzKGdyb3VwczogeyBbazogc3RyaW5nXTogUHVtbEdyb3VwIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKGdyb3VwcylcbiAgICAgIC5tYXAoKHBnKSA9PiBwZy5wcmludCgpKVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oY29uc3RhbnQubmV3Um93KVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAvLyBAdHMtaWdub3JlXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyBuYW1lOiBzdHJpbmc7IHR5cGU6IFB1bWxHcm91cFR5cGU7IGdyb3VwUGF0aDogc3RyaW5nIH0pIHtcbiAgICBjb25zdCB7IG5hbWUsIHR5cGUsIGdyb3VwUGF0aCB9ID0gcGFyYW1zXG4gICAgc3VwZXIoKVxuICAgIHRoaXMuX25hbWUgPSBuYW1lXG4gICAgdGhpcy5fdHlwZSA9IHR5cGVcbiAgICB0aGlzLl9ncm91cFBhdGggPSBncm91cFBhdGhcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyaW5nVXRpbC51bmlxdWVFbnRpdHlIYXNoKHRoaXMuTmFtZSwgdGhpcy5fZ3JvdXBQYXRoKVxuICB9XG5cbiAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVcbiAgfVxuXG4gIHB1YmxpYyBnZXQgR3JvdXBQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwUGF0aFxuICB9XG5cbiAgcHVibGljIGdldCBUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGVcbiAgfVxufVxuIl19