"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlService = void 0;
const entity_types_1 = require("src/enum/entity-types");
const puml_printable_class_1 = require("src/service/print-puml/printable-entity/puml-printable-class");
const puml_printable_enum_1 = require("src/service/print-puml/printable-entity/puml-printable-enum");
const puml_printable_file_1 = require("src/service/print-puml/printable-entity/puml-printable-file");
const puml_printable_interface_1 = require("src/service/print-puml/printable-entity/puml-printable-interface");
const puml_printable_object_1 = require("src/service/print-puml/printable-entity/puml-printable-object");
const puml_printable_type_1 = require("src/service/print-puml/printable-entity/puml-printable-type");
const logger_1 = require("src/util/logger");
exports.pumlService = {
    printableStrategyFromEntity: (entity) => {
        switch (entity.Type) {
            case entity_types_1.EntityTypes.CLASS:
                return new puml_printable_class_1.PumlPrintableClass({ entity });
            case entity_types_1.EntityTypes.FILE:
                return new puml_printable_file_1.PumlPrintableFile({ entity });
            case entity_types_1.EntityTypes.OBJECT:
                return new puml_printable_object_1.PumlPrintableObject({ entity });
            case entity_types_1.EntityTypes.INTERFACE:
                return new puml_printable_interface_1.PumlPrintableInterface({ entity });
            case entity_types_1.EntityTypes.TYPE:
                return new puml_printable_type_1.PumlPrintableType({ entity });
            case entity_types_1.EntityTypes.ENUM:
                return new puml_printable_enum_1.PumlPrintableEnum({ entity });
            default:
                logger_1.logger.warn(`Unknown entity type ${entity.constructor.name}`);
            // typeUtil.exhaustiveCheck(entity)
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQW1EO0FBRW5ELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBRS9GLDRDQUF3QztBQUUzQixRQUFBLFdBQVcsR0FBRztJQUN6QiwyQkFBMkIsRUFBRSxDQUFDLE1BQWMsRUFBMEIsRUFBRTtRQUN0RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSywwQkFBVyxDQUFDLEtBQUs7Z0JBQ3BCLE9BQU8sSUFBSSx5Q0FBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDM0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLE1BQU07Z0JBQ3JCLE9BQU8sSUFBSSwyQ0FBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDNUMsS0FBSywwQkFBVyxDQUFDLFNBQVM7Z0JBQ3hCLE9BQU8sSUFBSSxpREFBc0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDL0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUM7Z0JBQ0UsZUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9ELG1DQUFtQztTQUNwQztJQUNILENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9tb2RlbC9lbnRpdHknXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlQ2xhc3MgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtY2xhc3MnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRW51bSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1lbnVtJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUZpbGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZmlsZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVJbnRlcmZhY2UgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtaW50ZXJmYWNlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZU9iamVjdCB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1vYmplY3QnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlVHlwZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS10eXBlJ1xuaW1wb3J0IHsgUHVtbEVudGl0eSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHVtbC1lbnRpdHknXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdzcmMvdXRpbC9sb2dnZXInXG5cbmV4cG9ydCBjb25zdCBwdW1sU2VydmljZSA9IHtcbiAgcHJpbnRhYmxlU3RyYXRlZ3lGcm9tRW50aXR5OiAoZW50aXR5OiBFbnRpdHkpOiBQdW1sRW50aXR5IHwgdW5kZWZpbmVkID0+IHtcbiAgICBzd2l0Y2ggKGVudGl0eS5UeXBlKSB7XG4gICAgICBjYXNlIEVudGl0eVR5cGVzLkNMQVNTOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVDbGFzcyh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5GSUxFOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVGaWxlKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGVzLk9CSkVDVDpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlT2JqZWN0KHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGVzLklOVEVSRkFDRTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGVzLlRZUEU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZVR5cGUoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuRU5VTTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlRW51bSh7IGVudGl0eSB9KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nZ2VyLndhcm4oYFVua25vd24gZW50aXR5IHR5cGUgJHtlbnRpdHkuY29uc3RydWN0b3IubmFtZX1gKVxuICAgICAgLy8gdHlwZVV0aWwuZXhoYXVzdGl2ZUNoZWNrKGVudGl0eSlcbiAgICB9XG4gIH0sXG59XG4iXX0=