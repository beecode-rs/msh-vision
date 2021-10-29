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
        const { Direction: dir, Type } = this._reference;
        switch (Type) {
            case reference_type_1.ReferenceType.ASSOCIATION:
                return `-${dir ?? ''}->`; //       -->
            case reference_type_1.ReferenceType.INHERITANCE:
                return `-${dir ?? 'up'}-|>`; //    -up-|>
            case reference_type_1.ReferenceType.IMPLEMENTATION:
                return `.${dir ?? 'up'}.|>`; //    .up.|>
            case reference_type_1.ReferenceType.DEPENDENCY:
                return `.${dir ?? ''}.>`; //       ..>
            case reference_type_1.ReferenceType.AGGREGATION:
                return `-${dir ?? ''}-o`; //       --o
            case reference_type_1.ReferenceType.COMPOSITION:
                return `-${dir ?? ''}-*`; //       --*
            default:
                return `-${dir ?? ''}-`; //        --
        }
    }
}
exports.PumlRelation = PumlRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBdUQ7QUFJdkQsTUFBYSxZQUFZO0lBSXZCLFlBQVksTUFBb0Q7UUFDOUQsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUE7SUFDL0IsQ0FBQztJQUVNLEtBQUs7UUFDVixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtJQUN0RixDQUFDO0lBRVMsb0JBQW9CO1FBQzVCLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7UUFDaEQsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLDhCQUFhLENBQUMsV0FBVztnQkFDNUIsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQSxDQUFDLFlBQVk7WUFDdkMsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUEsQ0FBQyxZQUFZO1lBQzFDLEtBQUssOEJBQWEsQ0FBQyxjQUFjO2dCQUMvQixPQUFPLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFBLENBQUMsWUFBWTtZQUMxQyxLQUFLLDhCQUFhLENBQUMsVUFBVTtnQkFDM0IsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQSxDQUFDLFlBQVk7WUFDdkMsS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUEsQ0FBQyxZQUFZO1lBQ3ZDLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFBLENBQUMsWUFBWTtZQUN2QztnQkFDRSxPQUFPLElBQUksR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFBLENBQUMsWUFBWTtTQUN2QztJQUNILENBQUM7Q0FDRjtBQWpDRCxvQ0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWZlcmVuY2VUeXBlIH0gZnJvbSAnc3JjL2VudW0vcmVmZXJlbmNlLXR5cGUnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL3JlZmVyZW5jZSdcblxuZXhwb3J0IGNsYXNzIFB1bWxSZWxhdGlvbiB7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcmVmZXJlbmNlOiBSZWZlcmVuY2VcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9mcm9tRW50aXR5OiBFbnRpdHlcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcmVmZXJlbmNlOiBSZWZlcmVuY2U7IGZyb21FbnRpdHk6IEVudGl0eSB9KSB7XG4gICAgY29uc3QgeyByZWZlcmVuY2UsIGZyb21FbnRpdHkgfSA9IHBhcmFtc1xuICAgIHRoaXMuX3JlZmVyZW5jZSA9IHJlZmVyZW5jZVxuICAgIHRoaXMuX2Zyb21FbnRpdHkgPSBmcm9tRW50aXR5XG4gIH1cblxuICBwdWJsaWMgcHJpbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fZnJvbUVudGl0eS5JZH0gJHt0aGlzLl9saW5rQnlSZWZlcmVuY2VUeXBlKCl9ICR7dGhpcy5fcmVmZXJlbmNlLklkfWBcbiAgfVxuXG4gIHByb3RlY3RlZCBfbGlua0J5UmVmZXJlbmNlVHlwZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHsgRGlyZWN0aW9uOiBkaXIsIFR5cGUgfSA9IHRoaXMuX3JlZmVyZW5jZVxuICAgIHN3aXRjaCAoVHlwZSkge1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkFTU09DSUFUSU9OOlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAnJ30tPmAgLy8gICAgICAgLS0+XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuSU5IRVJJVEFOQ0U6XG4gICAgICAgIHJldHVybiBgLSR7ZGlyID8/ICd1cCd9LXw+YCAvLyAgICAtdXAtfD5cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5JTVBMRU1FTlRBVElPTjpcbiAgICAgICAgcmV0dXJuIGAuJHtkaXIgPz8gJ3VwJ30ufD5gIC8vICAgIC51cC58PlxuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkRFUEVOREVOQ1k6XG4gICAgICAgIHJldHVybiBgLiR7ZGlyID8/ICcnfS4+YCAvLyAgICAgICAuLj5cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5BR0dSRUdBVElPTjpcbiAgICAgICAgcmV0dXJuIGAtJHtkaXIgPz8gJyd9LW9gIC8vICAgICAgIC0tb1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkNPTVBPU0lUSU9OOlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAnJ30tKmAgLy8gICAgICAgLS0qXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAnJ30tYCAvLyAgICAgICAgLS1cbiAgICB9XG4gIH1cbn1cbiJdfQ==