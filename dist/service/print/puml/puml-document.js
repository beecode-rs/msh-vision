"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlDocument = void 0;
const puml_entity_1 = require("src/service/print/puml/puml-entity");
class PumlDocument extends puml_entity_1.PumlEntity {
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
exports.PumlDocument = PumlDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHVtbC1kb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvRUFBK0Q7QUFFL0QsTUFBYSxZQUFhLFNBQVEsd0JBQVU7SUFDaEMsY0FBYztRQUN0QixPQUFPLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBQ1MsWUFBWTtRQUNwQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBWEQsb0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxEb2N1bWVudCBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0BzdGFydHVtbCdcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdAZW5kdW1sJ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==