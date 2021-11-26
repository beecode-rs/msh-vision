"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const reference_1 = require("src/model/reference");
const string_util_1 = require("src/util/string-util");
class Entity {
    _type;
    _name;
    _inProjectPath;
    _isExported;
    _references;
    _meta;
    constructor({ type, name, inProjectPath, isExported, references, meta }) {
        this._type = type;
        this._name = name;
        this._inProjectPath = inProjectPath;
        this._isExported = isExported;
        this._references = references ?? [];
        this._meta = meta;
    }
    get Id() {
        return string_util_1.stringUtil.uniqueEntityHash(this.Name, this.InProjectPath);
    }
    get Type() {
        return this._type;
    }
    get Name() {
        return this._name;
    }
    get InProjectPath() {
        return this._inProjectPath;
    }
    get IsExported() {
        return this._isExported;
    }
    get References() {
        return this._references;
    }
    set References(references) {
        this._references = references;
    }
    get Meta() {
        return this._meta;
    }
    removeIgnoredReferences(ignoredPaths) {
        this._references = this._references.filter((r) => !ignoredPaths.find((ip) => r.InProjectPath.startsWith(ip)));
    }
    static SortByName(a, b) {
        if (a.Name < b.Name)
            return -1;
        if (a.Name > b.Name)
            return 1;
        return 0;
    }
    static cloneAndModify(toClone, overrideParams = {}) {
        const params = {
            name: overrideParams.name ?? toClone._name,
            type: overrideParams.type ?? toClone._type,
            inProjectPath: overrideParams.inProjectPath ?? toClone._inProjectPath,
            isExported: overrideParams.isExported ?? toClone._isExported,
            meta: overrideParams.meta ?? toClone._meta,
            references: (overrideParams.references ?? toClone._references).map((ref) => reference_1.Reference.cloneAndModify(ref)),
        };
        return new Entity(params);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL2VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxtREFBK0M7QUFDL0Msc0RBQWlEO0FBcUJqRCxNQUFhLE1BQU07SUFDRSxLQUFLLENBQUc7SUFDakIsS0FBSyxDQUFRO0lBQ0osY0FBYyxDQUFRO0lBQ3RCLFdBQVcsQ0FBUztJQUM3QixXQUFXLENBQWE7SUFDZixLQUFLLENBQWU7SUFFdkMsWUFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBbUI7UUFDN0YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUE7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUE7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFBO1FBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLEVBQUU7UUFDWCxPQUFPLHdCQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFVBQVUsQ0FBQyxVQUF1QjtRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFFTSx1QkFBdUIsQ0FBQyxZQUFzQjtRQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvRyxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUMzQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUk7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSTtZQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLE9BQU8sQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVNLE1BQU0sQ0FBQyxjQUFjLENBQzFCLE9BQWtCLEVBQ2xCLGlCQUF3QyxFQUFFO1FBRTFDLE1BQU0sTUFBTSxHQUFpQjtZQUMzQixJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSztZQUMxQyxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSztZQUMxQyxhQUFhLEVBQUUsY0FBYyxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUMsY0FBYztZQUNyRSxVQUFVLEVBQUUsY0FBYyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsV0FBVztZQUM1RCxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSztZQUMxQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNHLENBQUE7UUFFRCxPQUFPLElBQUksTUFBTSxDQUFJLE1BQU0sQ0FBQyxDQUFBO0lBQzlCLENBQUM7Q0FDRjtBQTFFRCx3QkEwRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlcyB9IGZyb20gJ3NyYy9lbnVtL2VudGl0eS10eXBlcydcbmltcG9ydCB7IEVudGl0eUNsYXNzIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eS1jbGFzcydcbmltcG9ydCB7IEVudGl0eUVudW0gfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWVudW0nXG5pbXBvcnQgeyBFbnRpdHlJbnRlcmZhY2UgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5LWludGVyZmFjZSdcbmltcG9ydCB7IEVudGl0eU9iamVjdCB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktb2JqZWN0J1xuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHktdHlwZSdcbmltcG9ydCB7IExvY2F0YWJsZSB9IGZyb20gJ3NyYy9tb2RlbC9sb2NhdGFibGUnXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvcmVmZXJlbmNlJ1xuaW1wb3J0IHsgc3RyaW5nVXRpbCB9IGZyb20gJ3NyYy91dGlsL3N0cmluZy11dGlsJ1xuXG4vLyBwcmV0dGllci1pZ25vcmVcbmV4cG9ydCB0eXBlIEVudGl0eU1ldGE8VCBleHRlbmRzIEVudGl0eVR5cGVzPiA9XG4gICAgVCBleHRlbmRzIEVudGl0eVR5cGVzLkNMQVNTICAgICA/IEVudGl0eUNsYXNzXG4gIDogVCBleHRlbmRzIEVudGl0eVR5cGVzLkVOVU0gICAgICA/IEVudGl0eUVudW1cbiAgOiBUIGV4dGVuZHMgRW50aXR5VHlwZXMuSU5URVJGQUNFID8gRW50aXR5SW50ZXJmYWNlXG4gIDogVCBleHRlbmRzIEVudGl0eVR5cGVzLk9CSkVDVCAgICA/IEVudGl0eU9iamVjdFxuICA6IFQgZXh0ZW5kcyBFbnRpdHlUeXBlcy5UWVBFICAgICAgPyBFbnRpdHlUeXBlXG4gIDogVCBleHRlbmRzIEVudGl0eVR5cGVzLkZJTEUgICAgICA/IHVuZGVmaW5lZFxuICA6IG5ldmVyXG5cbmV4cG9ydCB0eXBlIEVudGl0eVBhcmFtczxUIGV4dGVuZHMgRW50aXR5VHlwZXMgPSBhbnk+ID0ge1xuICB0eXBlOiBUXG4gIG5hbWU6IHN0cmluZ1xuICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgaXNFeHBvcnRlZDogYm9vbGVhblxuICByZWZlcmVuY2VzPzogUmVmZXJlbmNlW11cbiAgbWV0YTogRW50aXR5TWV0YTxUPlxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5PFQgZXh0ZW5kcyBFbnRpdHlUeXBlcyA9IGFueT4gaW1wbGVtZW50cyBMb2NhdGFibGUge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3R5cGU6IFRcbiAgcHJvdGVjdGVkIF9uYW1lOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pblByb2plY3RQYXRoOiBzdHJpbmdcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9pc0V4cG9ydGVkOiBib29sZWFuXG4gIHByb3RlY3RlZCBfcmVmZXJlbmNlczogUmVmZXJlbmNlW11cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9tZXRhOiBFbnRpdHlNZXRhPFQ+XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHsgdHlwZSwgbmFtZSwgaW5Qcm9qZWN0UGF0aCwgaXNFeHBvcnRlZCwgcmVmZXJlbmNlcywgbWV0YSB9OiBFbnRpdHlQYXJhbXM8VD4pIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZVxuICAgIHRoaXMuX25hbWUgPSBuYW1lXG4gICAgdGhpcy5faW5Qcm9qZWN0UGF0aCA9IGluUHJvamVjdFBhdGhcbiAgICB0aGlzLl9pc0V4cG9ydGVkID0gaXNFeHBvcnRlZFxuICAgIHRoaXMuX3JlZmVyZW5jZXMgPSByZWZlcmVuY2VzID8/IFtdXG4gICAgdGhpcy5fbWV0YSA9IG1ldGFcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3RyaW5nVXRpbC51bmlxdWVFbnRpdHlIYXNoKHRoaXMuTmFtZSwgdGhpcy5JblByb2plY3RQYXRoKVxuICB9XG5cbiAgcHVibGljIGdldCBUeXBlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl90eXBlXG4gIH1cblxuICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZVxuICB9XG5cbiAgcHVibGljIGdldCBJblByb2plY3RQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2luUHJvamVjdFBhdGhcbiAgfVxuXG4gIHB1YmxpYyBnZXQgSXNFeHBvcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNFeHBvcnRlZFxuICB9XG5cbiAgcHVibGljIGdldCBSZWZlcmVuY2VzKCk6IFJlZmVyZW5jZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlc1xuICB9XG5cbiAgcHVibGljIHNldCBSZWZlcmVuY2VzKHJlZmVyZW5jZXM6IFJlZmVyZW5jZVtdKSB7XG4gICAgdGhpcy5fcmVmZXJlbmNlcyA9IHJlZmVyZW5jZXNcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTWV0YSgpOiBFbnRpdHlNZXRhPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbWV0YVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUlnbm9yZWRSZWZlcmVuY2VzKGlnbm9yZWRQYXRoczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZlcmVuY2VzID0gdGhpcy5fcmVmZXJlbmNlcy5maWx0ZXIoKHIpID0+ICFpZ25vcmVkUGF0aHMuZmluZCgoaXApID0+IHIuSW5Qcm9qZWN0UGF0aC5zdGFydHNXaXRoKGlwKSkpXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIFNvcnRCeU5hbWUoYTogRW50aXR5LCBiOiBFbnRpdHkpOiBudW1iZXIge1xuICAgIGlmIChhLk5hbWUgPCBiLk5hbWUpIHJldHVybiAtMVxuICAgIGlmIChhLk5hbWUgPiBiLk5hbWUpIHJldHVybiAxXG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY2xvbmVBbmRNb2RpZnk8VCBleHRlbmRzIEVudGl0eVR5cGVzID0gYW55PihcbiAgICB0b0Nsb25lOiBFbnRpdHk8VD4sXG4gICAgb3ZlcnJpZGVQYXJhbXM6IFBhcnRpYWw8RW50aXR5UGFyYW1zPiA9IHt9XG4gICk6IEVudGl0eTxUPiB7XG4gICAgY29uc3QgcGFyYW1zOiBFbnRpdHlQYXJhbXMgPSB7XG4gICAgICBuYW1lOiBvdmVycmlkZVBhcmFtcy5uYW1lID8/IHRvQ2xvbmUuX25hbWUsXG4gICAgICB0eXBlOiBvdmVycmlkZVBhcmFtcy50eXBlID8/IHRvQ2xvbmUuX3R5cGUsXG4gICAgICBpblByb2plY3RQYXRoOiBvdmVycmlkZVBhcmFtcy5pblByb2plY3RQYXRoID8/IHRvQ2xvbmUuX2luUHJvamVjdFBhdGgsXG4gICAgICBpc0V4cG9ydGVkOiBvdmVycmlkZVBhcmFtcy5pc0V4cG9ydGVkID8/IHRvQ2xvbmUuX2lzRXhwb3J0ZWQsXG4gICAgICBtZXRhOiBvdmVycmlkZVBhcmFtcy5tZXRhID8/IHRvQ2xvbmUuX21ldGEsXG4gICAgICByZWZlcmVuY2VzOiAob3ZlcnJpZGVQYXJhbXMucmVmZXJlbmNlcyA/PyB0b0Nsb25lLl9yZWZlcmVuY2VzKS5tYXAoKHJlZikgPT4gUmVmZXJlbmNlLmNsb25lQW5kTW9kaWZ5KHJlZikpLFxuICAgIH1cblxuICAgIHJldHVybiBuZXcgRW50aXR5PFQ+KHBhcmFtcylcbiAgfVxufVxuIl19