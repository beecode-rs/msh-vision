"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const reference_type_1 = require("src/enum/reference-type");
class PumlRelation {
    constructor({ reference, fromEntity }) {
        this._reference = reference;
        this._fromEntity = fromEntity;
    }
    print() {
        return `${this._fromEntity.Id} ${this._linkByReferenceType()} ${this._reference.Id}`;
    }
    _linkByReferenceType() {
        switch (this._reference.Type) {
            case reference_type_1.ReferenceType.ASSOCIATION:
                return '-up->';
            case reference_type_1.ReferenceType.INHERITANCE:
                return '-up-|>';
            case reference_type_1.ReferenceType.IMPLEMENTATION:
                return '.up.|>';
            case reference_type_1.ReferenceType.DEPENDENCY:
                return '.up.>';
            case reference_type_1.ReferenceType.AGGREGATION:
                return '--o';
            case reference_type_1.ReferenceType.COMPOSITION:
                return '--*';
            default:
                return '--';
        }
    }
}
exports.PumlRelation = PumlRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBdUQ7QUFJdkQsTUFBYSxZQUFZO0lBSXZCLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFnRDtRQUNqRixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQTtJQUMvQixDQUFDO0lBRU0sS0FBSztRQUNWLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFBO0lBQ3RGLENBQUM7SUFFUyxvQkFBb0I7UUFDNUIsUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUM1QixLQUFLLDhCQUFhLENBQUMsV0FBVztnQkFDNUIsT0FBTyxPQUFPLENBQUE7WUFDaEIsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sUUFBUSxDQUFBO1lBQ2pCLEtBQUssOEJBQWEsQ0FBQyxjQUFjO2dCQUMvQixPQUFPLFFBQVEsQ0FBQTtZQUNqQixLQUFLLDhCQUFhLENBQUMsVUFBVTtnQkFDM0IsT0FBTyxPQUFPLENBQUE7WUFDaEIsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sS0FBSyxDQUFBO1lBQ2QsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sS0FBSyxDQUFBO1lBQ2Q7Z0JBQ0UsT0FBTyxJQUFJLENBQUE7U0FDZDtJQUNILENBQUM7Q0FDRjtBQS9CRCxvQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWZlcmVuY2VUeXBlIH0gZnJvbSAnc3JjL2VudW0vcmVmZXJlbmNlLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxSZWxhdGlvbiB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlOiBSZWZlcmVuY2VcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9mcm9tRW50aXR5OiBFbnRpdHlcblxuICBjb25zdHJ1Y3Rvcih7IHJlZmVyZW5jZSwgZnJvbUVudGl0eSB9OiB7IHJlZmVyZW5jZTogUmVmZXJlbmNlOyBmcm9tRW50aXR5OiBFbnRpdHkgfSkge1xuICAgIHRoaXMuX3JlZmVyZW5jZSA9IHJlZmVyZW5jZVxuICAgIHRoaXMuX2Zyb21FbnRpdHkgPSBmcm9tRW50aXR5XG4gIH1cblxuICBwdWJsaWMgcHJpbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fZnJvbUVudGl0eS5JZH0gJHt0aGlzLl9saW5rQnlSZWZlcmVuY2VUeXBlKCl9ICR7dGhpcy5fcmVmZXJlbmNlLklkfWBcbiAgfVxuXG4gIHByb3RlY3RlZCBfbGlua0J5UmVmZXJlbmNlVHlwZSgpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAodGhpcy5fcmVmZXJlbmNlLlR5cGUpIHtcbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5BU1NPQ0lBVElPTjpcbiAgICAgICAgcmV0dXJuICctdXAtPidcbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5JTkhFUklUQU5DRTpcbiAgICAgICAgcmV0dXJuICctdXAtfD4nXG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuSU1QTEVNRU5UQVRJT046XG4gICAgICAgIHJldHVybiAnLnVwLnw+J1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkRFUEVOREVOQ1k6XG4gICAgICAgIHJldHVybiAnLnVwLj4nXG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuQUdHUkVHQVRJT046XG4gICAgICAgIHJldHVybiAnLS1vJ1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkNPTVBPU0lUSU9OOlxuICAgICAgICByZXR1cm4gJy0tKidcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnLS0nXG4gICAgfVxuICB9XG59XG4iXX0=