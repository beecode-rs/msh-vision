"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlTemplate = void 0;
const printable_1 = require("src/service/print/printable");
class PumlTemplate extends printable_1.Printable {
    _templateStart() {
        return '@startuml';
    }
    _templateEnd() {
        return '@enduml';
    }
    _print() {
        return [];
    }
}
exports.PumlTemplate = PumlTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC10ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBdUQ7QUFFdkQsTUFBYSxZQUFhLFNBQVEscUJBQVM7SUFDL0IsY0FBYztRQUN0QixPQUFPLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBQ1MsWUFBWTtRQUNwQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBWEQsb0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmludGFibGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludGFibGUnXG5cbmV4cG9ydCBjbGFzcyBQdW1sVGVtcGxhdGUgZXh0ZW5kcyBQcmludGFibGUge1xuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0BzdGFydHVtbCdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdAZW5kdW1sJ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==