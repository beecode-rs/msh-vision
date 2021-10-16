"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFile = void 0;
const reference_type_1 = require("src/enum/reference-type");
const entity_1 = require("src/model/entity");
const reference_1 = require("src/model/reference");
class EntityFile extends entity_1.Entity {
    constructor({ name, inProjectPath }) {
        super({ name, inProjectPath });
        this._references = [];
    }
    get References() {
        return this._references;
    }
    addAssociation({ name, inProjectPath }) {
        this._references.push(new reference_1.Reference({ name, inProjectPath, type: reference_type_1.ReferenceType.ASSOCIATION }));
    }
}
exports.EntityFile = EntityFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvZW50aXR5LWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQXVEO0FBQ3ZELDZDQUF5QztBQUV6QyxtREFBK0M7QUFFL0MsTUFBYSxVQUFXLFNBQVEsZUFBTTtJQUdwQyxZQUFZLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBMkM7UUFDMUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7UUFIYixnQkFBVyxHQUFnQixFQUFFLENBQUE7SUFJaEQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7SUFDekIsQ0FBQztJQUVNLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQTJDO1FBQ3BGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLDhCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hHLENBQUM7Q0FDRjtBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFJlZmVyZW5jYWJsZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2FibGUnXG5pbXBvcnQgeyBSZWZlcmVuY2UgfSBmcm9tICdzcmMvbW9kZWwvcmVmZXJlbmNlJ1xuXG5leHBvcnQgY2xhc3MgRW50aXR5RmlsZSBleHRlbmRzIEVudGl0eSBpbXBsZW1lbnRzIFJlZmVyZW5jYWJsZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlczogUmVmZXJlbmNlW10gPSBbXVxuXG4gIGNvbnN0cnVjdG9yKHsgbmFtZSwgaW5Qcm9qZWN0UGF0aCB9OiB7IG5hbWU6IHN0cmluZzsgaW5Qcm9qZWN0UGF0aDogc3RyaW5nIH0pIHtcbiAgICBzdXBlcih7IG5hbWUsIGluUHJvamVjdFBhdGggfSlcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUmVmZXJlbmNlcygpOiBSZWZlcmVuY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZmVyZW5jZXNcbiAgfVxuXG4gIHB1YmxpYyBhZGRBc3NvY2lhdGlvbih7IG5hbWUsIGluUHJvamVjdFBhdGggfTogeyBuYW1lOiBzdHJpbmc7IGluUHJvamVjdFBhdGg6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgdGhpcy5fcmVmZXJlbmNlcy5wdXNoKG5ldyBSZWZlcmVuY2UoeyBuYW1lLCBpblByb2plY3RQYXRoLCB0eXBlOiBSZWZlcmVuY2VUeXBlLkFTU09DSUFUSU9OIH0pKVxuICB9XG59XG4iXX0=