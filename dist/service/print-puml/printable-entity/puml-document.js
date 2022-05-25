"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumlDocument = void 0;
const puml_entity_1 = require("src/service/print-puml/puml-entity");
class PumlDocument extends puml_entity_1.PumlEntity {
    _templateStart() {
        return '@startuml';
        // return ['@startuml', '!define TYPE <T,lightblue>'].join(constant().newRow) // TODO IF WE NEED COLOR TO SOME ENTITIES
    }
    _templateEnd() {
        return '@enduml';
    }
    _print() {
        return [];
    }
}
exports.PumlDocument = PumlDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLWRvY3VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUErRDtBQUUvRCxNQUFhLFlBQWEsU0FBUSx3QkFBVTtJQUNoQyxjQUFjO1FBQ3RCLE9BQU8sV0FBVyxDQUFBO1FBQ2xCLHVIQUF1SDtJQUN6SCxDQUFDO0lBQ1MsWUFBWTtRQUNwQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRVMsTUFBTTtRQUNkLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztDQUNGO0FBWkQsb0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLWVudGl0eSdcblxuZXhwb3J0IGNsYXNzIFB1bWxEb2N1bWVudCBleHRlbmRzIFB1bWxFbnRpdHkge1xuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU3RhcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0BzdGFydHVtbCdcbiAgICAvLyByZXR1cm4gWydAc3RhcnR1bWwnLCAnIWRlZmluZSBUWVBFIDxULGxpZ2h0Ymx1ZT4nXS5qb2luKGNvbnN0YW50KCkubmV3Um93KSAvLyBUT0RPIElGIFdFIE5FRUQgQ09MT1IgVE8gU09NRSBFTlRJVElFU1xuICB9XG4gIHByb3RlY3RlZCBfdGVtcGxhdGVFbmQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ0BlbmR1bWwnXG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByaW50KCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gW11cbiAgfVxufVxuIl19