"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlGroup = exports.PumlGroupType = void 0;
const printable_1 = require("src/service/print/printable");
const puml_group_service_1 = require("src/service/print/puml/group/puml-group-service");
const string_util_1 = require("src/util/string-util");
var PumlGroupType;
(function (PumlGroupType) {
    PumlGroupType["FOLDER"] = "folder";
    PumlGroupType["RECTANGLE"] = "rectangle";
})(PumlGroupType = exports.PumlGroupType || (exports.PumlGroupType = {}));
class PumlGroup extends printable_1.Printable {
    constructor({ name, type, fullGroupPath }) {
        super();
        this.groups = {};
        this._name = name;
        this._type = type ?? PumlGroupType.FOLDER;
        this._fullGroupPath = fullGroupPath;
    }
    _templateEnd() {
        return '}';
    }
    _templateStart() {
        return `${this._type} "${this.Name}" as ${this.Id} {`;
    }
    _print() {
        return [puml_group_service_1.pumlGroupService.printGroups(this.groups)];
    }
    get Id() {
        return `${string_util_1.stringUtil.snakeCase(this._name)}_${string_util_1.stringUtil.stringToHash(this._fullGroupPath)}`;
    }
    get Name() {
        return this._name;
    }
}
exports.PumlGroup = PumlGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvZ3JvdXAvcHVtbC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBdUQ7QUFDdkQsd0ZBQWtGO0FBQ2xGLHNEQUFpRDtBQUVqRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsa0NBQWlCLENBQUE7SUFDakIsd0NBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBRUQsTUFBYSxTQUFVLFNBQVEscUJBQVM7SUFpQnRDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBaUU7UUFDdEcsS0FBSyxFQUFFLENBQUE7UUFoQkYsV0FBTSxHQUErQixFQUFFLENBQUE7UUFpQjVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUE7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7SUFDckMsQ0FBQztJQWpCUyxZQUFZO1FBQ3BCLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUE7SUFDdkQsQ0FBQztJQUVTLE1BQU07UUFDZCxPQUFPLENBQUMscUNBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFTRCxJQUFXLEVBQUU7UUFDWCxPQUFPLEdBQUcsd0JBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLHdCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFBO0lBQzlGLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQUNGO0FBL0JELDhCQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50YWJsZSdcbmltcG9ydCB7IHB1bWxHcm91cFNlcnZpY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL2dyb3VwL3B1bWwtZ3JvdXAtc2VydmljZSdcbmltcG9ydCB7IHN0cmluZ1V0aWwgfSBmcm9tICdzcmMvdXRpbC9zdHJpbmctdXRpbCdcblxuZXhwb3J0IGVudW0gUHVtbEdyb3VwVHlwZSB7XG4gIEZPTERFUiA9ICdmb2xkZXInLFxuICBSRUNUQU5HTEUgPSAncmVjdGFuZ2xlJyxcbn1cblxuZXhwb3J0IGNsYXNzIFB1bWxHcm91cCBleHRlbmRzIFByaW50YWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfbmFtZTogc3RyaW5nXG4gIHB1YmxpYyBncm91cHM6IHsgW2s6IHN0cmluZ106IFB1bWxHcm91cCB9ID0ge31cbiAgcHVibGljIHJlYWRvbmx5IF90eXBlOiBQdW1sR3JvdXBUeXBlXG4gIHB1YmxpYyByZWFkb25seSBfZnVsbEdyb3VwUGF0aDogc3RyaW5nXG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ30nXG4gIH1cblxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fdHlwZX0gXCIke3RoaXMuTmFtZX1cIiBhcyAke3RoaXMuSWR9IHtgXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW3B1bWxHcm91cFNlcnZpY2UucHJpbnRHcm91cHModGhpcy5ncm91cHMpXVxuICB9XG5cbiAgY29uc3RydWN0b3IoeyBuYW1lLCB0eXBlLCBmdWxsR3JvdXBQYXRoIH06IHsgbmFtZTogc3RyaW5nOyB0eXBlPzogUHVtbEdyb3VwVHlwZTsgZnVsbEdyb3VwUGF0aDogc3RyaW5nIH0pIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5fbmFtZSA9IG5hbWVcbiAgICB0aGlzLl90eXBlID0gdHlwZSA/PyBQdW1sR3JvdXBUeXBlLkZPTERFUlxuICAgIHRoaXMuX2Z1bGxHcm91cFBhdGggPSBmdWxsR3JvdXBQYXRoXG4gIH1cblxuICBwdWJsaWMgZ2V0IElkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3N0cmluZ1V0aWwuc25ha2VDYXNlKHRoaXMuX25hbWUpfV8ke3N0cmluZ1V0aWwuc3RyaW5nVG9IYXNoKHRoaXMuX2Z1bGxHcm91cFBhdGgpfWBcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lXG4gIH1cbn1cbiJdfQ==