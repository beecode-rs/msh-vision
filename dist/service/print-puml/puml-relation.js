"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlRelation = void 0;
const reference_type_1 = require("src/enum/reference-type");
class PumlRelation {
    _reference;
    _fromEntity;
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
                return `-${dir ?? 'up'}->`; //       -->
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBdUQ7QUFJdkQsTUFBYSxZQUFZO0lBQ0osVUFBVSxDQUFXO0lBQ3JCLFdBQVcsQ0FBUTtJQUV0QyxZQUFZLE1BQW9EO1FBQzlELE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFBO0lBQy9CLENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUE7SUFDdEYsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQ2hELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUEsQ0FBQyxZQUFZO1lBQ3pDLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFBLENBQUMsWUFBWTtZQUMxQyxLQUFLLDhCQUFhLENBQUMsY0FBYztnQkFDL0IsT0FBTyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQSxDQUFDLFlBQVk7WUFDMUMsS0FBSyw4QkFBYSxDQUFDLFVBQVU7Z0JBQzNCLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUEsQ0FBQyxZQUFZO1lBQ3ZDLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFBLENBQUMsWUFBWTtZQUN2QyxLQUFLLDhCQUFhLENBQUMsV0FBVztnQkFDNUIsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQSxDQUFDLFlBQVk7WUFDdkM7Z0JBQ0UsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQSxDQUFDLFlBQVk7U0FDdkM7SUFDSCxDQUFDO0NBQ0Y7QUFqQ0Qsb0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFJlZmVyZW5jZSB9IGZyb20gJ3NyYy9tb2RlbC9yZWZlcmVuY2UnXG5cbmV4cG9ydCBjbGFzcyBQdW1sUmVsYXRpb24ge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlZmVyZW5jZTogUmVmZXJlbmNlXG4gIHByb3RlY3RlZCByZWFkb25seSBfZnJvbUVudGl0eTogRW50aXR5XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHJlZmVyZW5jZTogUmVmZXJlbmNlOyBmcm9tRW50aXR5OiBFbnRpdHkgfSkge1xuICAgIGNvbnN0IHsgcmVmZXJlbmNlLCBmcm9tRW50aXR5IH0gPSBwYXJhbXNcbiAgICB0aGlzLl9yZWZlcmVuY2UgPSByZWZlcmVuY2VcbiAgICB0aGlzLl9mcm9tRW50aXR5ID0gZnJvbUVudGl0eVxuICB9XG5cbiAgcHVibGljIHByaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuX2Zyb21FbnRpdHkuSWR9ICR7dGhpcy5fbGlua0J5UmVmZXJlbmNlVHlwZSgpfSAke3RoaXMuX3JlZmVyZW5jZS5JZH1gXG4gIH1cblxuICBwcm90ZWN0ZWQgX2xpbmtCeVJlZmVyZW5jZVR5cGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IERpcmVjdGlvbjogZGlyLCBUeXBlIH0gPSB0aGlzLl9yZWZlcmVuY2VcbiAgICBzd2l0Y2ggKFR5cGUpIHtcbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5BU1NPQ0lBVElPTjpcbiAgICAgICAgcmV0dXJuIGAtJHtkaXIgPz8gJ3VwJ30tPmAgLy8gICAgICAgLS0+XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuSU5IRVJJVEFOQ0U6XG4gICAgICAgIHJldHVybiBgLSR7ZGlyID8/ICd1cCd9LXw+YCAvLyAgICAtdXAtfD5cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5JTVBMRU1FTlRBVElPTjpcbiAgICAgICAgcmV0dXJuIGAuJHtkaXIgPz8gJ3VwJ30ufD5gIC8vICAgIC51cC58PlxuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkRFUEVOREVOQ1k6XG4gICAgICAgIHJldHVybiBgLiR7ZGlyID8/ICcnfS4+YCAvLyAgICAgICAuLj5cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5BR0dSRUdBVElPTjpcbiAgICAgICAgcmV0dXJuIGAtJHtkaXIgPz8gJyd9LW9gIC8vICAgICAgIC0tb1xuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLkNPTVBPU0lUSU9OOlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAnJ30tKmAgLy8gICAgICAgLS0qXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAnJ30tYCAvLyAgICAgICAgLS1cbiAgICB9XG4gIH1cbn1cbiJdfQ==