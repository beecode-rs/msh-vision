"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlPrintableEntityService = void 0;
const entity_1 = require("src/model/entity");
const puml_printable_class_1 = require("src/service/print/puml/printable-entity/puml-printable-class");
const puml_printable_object_1 = require("src/service/print/puml/printable-entity/puml-printable-object");
exports.pumlPrintableEntityService = {
    printableStrategyFromEntity: ({ entity }) => {
        switch (entity.Type) {
            case entity_1.EntityType.CLASS:
                return new puml_printable_class_1.PumlPrintableClass({ entity });
            case entity_1.EntityType.OBJECT:
            default:
                return new puml_printable_object_1.PumlPrintableObject({ entity });
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFEO0FBRXJELHVHQUFpRztBQUNqRyx5R0FBbUc7QUFFdEYsUUFBQSwwQkFBMEIsR0FBRztJQUN4QywyQkFBMkIsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFzQixFQUFhLEVBQUU7UUFDekUsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ25CLEtBQUssbUJBQVUsQ0FBQyxLQUFLO2dCQUNuQixPQUFPLElBQUkseUNBQWtCLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQzNDLEtBQUssbUJBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdkI7Z0JBQ0UsT0FBTyxJQUFJLDJDQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtTQUM3QztJQUNILENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBFbnRpdHlUeXBlIH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3ByaW50YWJsZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVDbGFzcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1jbGFzcydcbmltcG9ydCB7IFB1bWxQcmludGFibGVPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtb2JqZWN0J1xuXG5leHBvcnQgY29uc3QgcHVtbFByaW50YWJsZUVudGl0eVNlcnZpY2UgPSB7XG4gIHByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eTogKHsgZW50aXR5IH06IHsgZW50aXR5OiBFbnRpdHkgfSk6IFByaW50YWJsZSA9PiB7XG4gICAgc3dpdGNoIChlbnRpdHkuVHlwZSkge1xuICAgICAgY2FzZSBFbnRpdHlUeXBlLkNMQVNTOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVDbGFzcyh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlLk9CSkVDVDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZU9iamVjdCh7IGVudGl0eSB9KVxuICAgIH1cbiAgfSxcbn1cbiJdfQ==