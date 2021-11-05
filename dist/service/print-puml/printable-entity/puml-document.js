"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlDocument = void 0;
const puml_entity_1 = require("src/service/print-puml/puml-entity");
class PumlDocument extends puml_entity_1.PumlEntity {
    _templateStart() {
        return '@startuml';
        // return ['@startuml', '!define TYPE <T,lightblue>'].join(constant.newRow) // TODO IF WE NEED COLOR TO SOME ENTITIES
    }
    _templateEnd() {
        return '@enduml';
    }
    _print() {
        return [];
    }
}
exports.PumlDocument = PumlDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLWRvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQUUvRCxNQUFhLFlBQWEsU0FBUSx3QkFBVTtJQUNoQyxjQUFjO1FBQ3RCLE9BQU8sV0FBVyxDQUFBO1FBQ2xCLHFIQUFxSDtJQUN2SCxDQUFDO0lBQ1MsWUFBWTtRQUNwQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBWkQsb0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxEb2N1bWVudCBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0BzdGFydHVtbCdcbiAgICAvLyByZXR1cm4gWydAc3RhcnR1bWwnLCAnIWRlZmluZSBUWVBFIDxULGxpZ2h0Ymx1ZT4nXS5qb2luKGNvbnN0YW50Lm5ld1JvdykgLy8gVE9ETyBJRiBXRSBORUVEIENPTE9SIFRPIFNPTUUgRU5USVRJRVNcbiAgfVxuICBwcm90ZWN0ZWQgX3RlbXBsYXRlRW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdAZW5kdW1sJ1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wcmludCgpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn1cbiJdfQ==