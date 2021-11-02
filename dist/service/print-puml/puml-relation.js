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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1yZWxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0REFBdUQ7QUFJdkQsTUFBYSxZQUFZO0lBQ0osVUFBVSxDQUFXO0lBQ3JCLFdBQVcsQ0FBUTtJQUV0QyxZQUFZLE1BQW9EO1FBQzlELE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFBO0lBQy9CLENBQUM7SUFFTSxLQUFLO1FBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUE7SUFDdEYsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQ2hELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyw4QkFBYSxDQUFDLFdBQVc7Z0JBQzVCLE9BQU8sSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUEsQ0FBQyxZQUFZO1lBQ3pDLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFBLENBQUMsWUFBWTtZQUMxQyxLQUFLLDhCQUFhLENBQUMsY0FBYztnQkFDL0IsT0FBTyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQSxDQUFDLFlBQVk7WUFDMUMsS0FBSyw4QkFBYSxDQUFDLFVBQVU7Z0JBQzNCLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRSxJQUFJLENBQUEsQ0FBQyxZQUFZO1lBQ3ZDLEtBQUssOEJBQWEsQ0FBQyxXQUFXO2dCQUM1QixPQUFPLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFBLENBQUMsWUFBWTtZQUN2QyxLQUFLLDhCQUFhLENBQUMsV0FBVztnQkFDNUIsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQSxDQUFDLFlBQVk7WUFDdkM7Z0JBQ0UsT0FBTyxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQSxDQUFDLFlBQVk7U0FDdkM7SUFDSCxDQUFDO0NBQ0Y7QUFqQ0Qsb0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmZXJlbmNlVHlwZSB9IGZyb20gJ3NyYy9lbnVtL3JlZmVyZW5jZS10eXBlJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUmVmZXJlbmNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvbW9kZWwvcmVmZXJlbmNlJ1xuXG5leHBvcnQgY2xhc3MgUHVtbFJlbGF0aW9uIHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZWZlcmVuY2U6IFJlZmVyZW5jZVxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2Zyb21FbnRpdHk6IEVudGl0eVxuXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogeyByZWZlcmVuY2U6IFJlZmVyZW5jZTsgZnJvbUVudGl0eTogRW50aXR5IH0pIHtcbiAgICBjb25zdCB7IHJlZmVyZW5jZSwgZnJvbUVudGl0eSB9ID0gcGFyYW1zXG4gICAgdGhpcy5fcmVmZXJlbmNlID0gcmVmZXJlbmNlXG4gICAgdGhpcy5fZnJvbUVudGl0eSA9IGZyb21FbnRpdHlcbiAgfVxuXG4gIHB1YmxpYyBwcmludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLl9mcm9tRW50aXR5LklkfSAke3RoaXMuX2xpbmtCeVJlZmVyZW5jZVR5cGUoKX0gJHt0aGlzLl9yZWZlcmVuY2UuSWR9YFxuICB9XG5cbiAgcHJvdGVjdGVkIF9saW5rQnlSZWZlcmVuY2VUeXBlKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBEaXJlY3Rpb246IGRpciwgVHlwZSB9ID0gdGhpcy5fcmVmZXJlbmNlXG4gICAgc3dpdGNoIChUeXBlKSB7XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuQVNTT0NJQVRJT046XG4gICAgICAgIHJldHVybiBgLSR7ZGlyID8/ICd1cCd9LT5gIC8vICAgICAgIC0tPlxuICAgICAgY2FzZSBSZWZlcmVuY2VUeXBlLklOSEVSSVRBTkNFOlxuICAgICAgICByZXR1cm4gYC0ke2RpciA/PyAndXAnfS18PmAgLy8gICAgLXVwLXw+XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuSU1QTEVNRU5UQVRJT046XG4gICAgICAgIHJldHVybiBgLiR7ZGlyID8/ICd1cCd9Lnw+YCAvLyAgICAudXAufD5cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5ERVBFTkRFTkNZOlxuICAgICAgICByZXR1cm4gYC4ke2RpciA/PyAnJ30uPmAgLy8gICAgICAgLi4+XG4gICAgICBjYXNlIFJlZmVyZW5jZVR5cGUuQUdHUkVHQVRJT046XG4gICAgICAgIHJldHVybiBgLSR7ZGlyID8/ICcnfS1vYCAvLyAgICAgICAtLW9cbiAgICAgIGNhc2UgUmVmZXJlbmNlVHlwZS5DT01QT1NJVElPTjpcbiAgICAgICAgcmV0dXJuIGAtJHtkaXIgPz8gJyd9LSpgIC8vICAgICAgIC0tKlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGAtJHtkaXIgPz8gJyd9LWAgLy8gICAgICAgIC0tXG4gICAgfVxuICB9XG59XG4iXX0=