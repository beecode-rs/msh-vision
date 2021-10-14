"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlPrintableEntityService = void 0;
const entity_1 = require("src/model/entity");
const puml_printable_class_1 = require("src/service/print/puml/printable-entity/puml-printable-class");
const puml_printable_file_1 = require("src/service/print/puml/printable-entity/puml-printable-file");
const puml_printable_object_1 = require("src/service/print/puml/printable-entity/puml-printable-object");
exports.pumlPrintableEntityService = {
    printableStrategyFromEntity: ({ entity }) => {
        switch (entity.Type) {
            case entity_1.EntityType.CLASS:
                return new puml_printable_class_1.PumlPrintableClass({ entity });
            case entity_1.EntityType.FILE:
                return new puml_printable_file_1.PumlPrintableFile({ entity });
            case entity_1.EntityType.OBJECT:
            default:
                return new puml_printable_object_1.PumlPrintableObject({ entity });
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW50aXR5LXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXFEO0FBRXJELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YseUdBQW1HO0FBRXRGLFFBQUEsMEJBQTBCLEdBQUc7SUFDeEMsMkJBQTJCLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBc0IsRUFBYSxFQUFFO1FBQ3pFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLG1CQUFVLENBQUMsS0FBSztnQkFDbkIsT0FBTyxJQUFJLHlDQUFrQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUMzQyxLQUFLLG1CQUFVLENBQUMsSUFBSTtnQkFDbEIsT0FBTyxJQUFJLHVDQUFpQixDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUMxQyxLQUFLLG1CQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3ZCO2dCQUNFLE9BQU8sSUFBSSwyQ0FBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7U0FDN0M7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eSwgRW50aXR5VHlwZSB9IGZyb20gJ3NyYy9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wcmludGFibGUnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRmlsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZU9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50L3B1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1vYmplY3QnXG5cbmV4cG9ydCBjb25zdCBwdW1sUHJpbnRhYmxlRW50aXR5U2VydmljZSA9IHtcbiAgcHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5OiAoeyBlbnRpdHkgfTogeyBlbnRpdHk6IEVudGl0eSB9KTogUHJpbnRhYmxlID0+IHtcbiAgICBzd2l0Y2ggKGVudGl0eS5UeXBlKSB7XG4gICAgICBjYXNlIEVudGl0eVR5cGUuQ0xBU1M6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUNsYXNzKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGUuRklMRTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlRmlsZSh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlLk9CSkVDVDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZU9iamVjdCh7IGVudGl0eSB9KVxuICAgIH1cbiAgfSxcbn1cbiJdfQ==