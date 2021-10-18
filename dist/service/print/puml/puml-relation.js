"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const reference_type_1 = require("src/enum/reference-type");
class PumlRelation {
    constructor(params) {
        const { reference, fromEntity } = params;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBdUQ7QUFJdkQsTUFBYSxZQUFZO0lBSXZCLFlBQVksTUFBb0Q7UUFDOUQsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUE7SUFDL0IsQ0FBQztJQUVNLEtBQUs7UUFDVixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUN0RixDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFDNUIsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sT0FBTyxDQUFBO1lBQ2hCLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLFFBQVEsQ0FBQTtZQUNqQixLQUFLLDhCQUFhLENBQUMsY0FBYztnQkFDL0IsT0FBTyxRQUFRLENBQUE7WUFDakIsS0FBSyw4QkFBYSxDQUFDLFVBQVU7Z0JBQzNCLE9BQU8sT0FBTyxDQUFBO1lBQ2hCLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLEtBQUssQ0FBQTtZQUNkLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLEtBQUssQ0FBQTtZQUNkO2dCQUNFLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7SUFDSCxDQUFDO0NBQ0Y7QUFoQ0Qsb0NBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2UnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUmVsYXRpb24ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlZmVyZW5jZTogUmVmZXJlbmNlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZnJvbUVudGl0eTogRW50aXR5XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHJlZmVyZW5jZTogUmVmZXJlbmNlOyBmcm9tRW50aXR5OiBFbnRpdHkgfSkge1xuICAgIGNvbnN0IHsgcmVmZXJlbmNlLCBmcm9tRW50aXR5IH0gPSBwYXJhbXNcbiAgICB0aGlzLl9yZWZlcmVuY2UgPSByZWZlcmVuY2VcbiAgICB0aGlzLl9mcm9tRW50aXR5ID0gZnJvbUVudGl0eVxuICB9XG5cbiAgcHVibGljIHByaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuX2Zyb21FbnRpdHkuSWR9ICR7dGhpcy5fbGlua0J5UmVmZXJlbmNlVHlwZSgpfSAke3RoaXMuX3JlZmVyZW5jZS5JZH1gXG4gIH1cblxuICBwcm90ZWN0ZWQgX2xpbmtCeVJlZmVyZW5jZVR5cGUoKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHRoaXMuX3JlZmVyZW5jZS5UeXBlKSB7XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuQVNTT0NJQVRJT046XG4gICAgICAgIHJldHVybiAnLXVwLT4nXG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuSU5IRVJJVEFOQ0U6XG4gICAgICAgIHJldHVybiAnLXVwLXw+J1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLklNUExFTUVOVEFUSU9OOlxuICAgICAgICByZXR1cm4gJy51cC58PidcbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5ERVBFTkRFTkNZOlxuICAgICAgICByZXR1cm4gJy51cC4+J1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkFHR1JFR0FUSU9OOlxuICAgICAgICByZXR1cm4gJy0tbydcbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5DT01QT1NJVElPTjpcbiAgICAgICAgcmV0dXJuICctLSonXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJy0tJ1xuICAgIH1cbiAgfVxufVxuIl19