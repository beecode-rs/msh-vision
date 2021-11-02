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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1kb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvRUFBK0Q7QUFFL0QsTUFBYSxZQUFhLFNBQVEsd0JBQVU7SUFDaEMsY0FBYztRQUN0QixPQUFPLFdBQVcsQ0FBQTtRQUNsQixxSEFBcUg7SUFDdkgsQ0FBQztJQUNTLFlBQVk7UUFDcEIsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztJQUVTLE1BQU07UUFDZCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQVpELG9DQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1lbnRpdHknXG5cbmV4cG9ydCBjbGFzcyBQdW1sRG9jdW1lbnQgZXh0ZW5kcyBQdW1sRW50aXR5IHtcbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZVN0YXJ0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdAc3RhcnR1bWwnXG4gICAgLy8gcmV0dXJuIFsnQHN0YXJ0dW1sJywgJyFkZWZpbmUgVFlQRSA8VCxsaWdodGJsdWU+J10uam9pbihjb25zdGFudC5uZXdSb3cpIC8vIFRPRE8gSUYgV0UgTkVFRCBDT0xPUiBUTyBTT01FIEVOVElUSUVTXG4gIH1cbiAgcHJvdGVjdGVkIF90ZW1wbGF0ZUVuZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnQGVuZHVtbCdcbiAgfVxuXG4gIHByb3RlY3RlZCBfcHJpbnQoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBbXVxuICB9XG59XG4iXX0=