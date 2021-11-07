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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQW1EO0FBRW5ELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBRS9GLDRDQUF3QztBQUUzQixRQUFBLFdBQVcsR0FBRztJQUN6QiwyQkFBMkIsRUFBRSxDQUFDLE1BQWMsRUFBMEIsRUFBRTtRQUN0RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSywwQkFBVyxDQUFDLEtBQUs7Z0JBQ3BCLE9BQU8sSUFBSSx5Q0FBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDM0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLE1BQU07Z0JBQ3JCLE9BQU8sSUFBSSwyQ0FBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDNUMsS0FBSywwQkFBVyxDQUFDLFNBQVM7Z0JBQ3hCLE9BQU8sSUFBSSxpREFBc0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDL0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUM7Z0JBQ0UsZUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9ELG1DQUFtQztTQUNwQztJQUNILENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5VHlwZXMgfSBmcm9tICdzcmMvZW51bS9lbnRpdHktdHlwZXMnXG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUNsYXNzIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWNsYXNzJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUVudW0gfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtZW51bSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVGaWxlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWZpbGUnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlSW50ZXJmYWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWludGVyZmFjZSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVPYmplY3QgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtb2JqZWN0J1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZVR5cGUgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3ByaW50YWJsZS1lbnRpdHkvcHVtbC1wcmludGFibGUtdHlwZSdcbmltcG9ydCB7IFB1bWxFbnRpdHkgfSBmcm9tICdzcmMvc2VydmljZS9wcmludC1wdW1sL3B1bWwtZW50aXR5J1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnc3JjL3V0aWwvbG9nZ2VyJ1xuXG5leHBvcnQgY29uc3QgcHVtbFNlcnZpY2UgPSB7XG4gIHByaW50YWJsZVN0cmF0ZWd5RnJvbUVudGl0eTogKGVudGl0eTogRW50aXR5KTogUHVtbEVudGl0eSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgc3dpdGNoIChlbnRpdHkuVHlwZSkge1xuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5DTEFTUzpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlQ2xhc3MoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuRklMRTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlRmlsZSh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5PQkpFQ1Q6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZU9iamVjdCh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5JTlRFUkZBQ0U6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUludGVyZmFjZSh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5UWVBFOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVUeXBlKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGVzLkVOVU06XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUVudW0oeyBlbnRpdHkgfSlcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvZ2dlci53YXJuKGBVbmtub3duIGVudGl0eSB0eXBlICR7ZW50aXR5LmNvbnN0cnVjdG9yLm5hbWV9YClcbiAgICAgIC8vIHR5cGVVdGlsLmV4aGF1c3RpdmVDaGVjayhlbnRpdHkpXG4gICAgfVxuICB9LFxufVxuIl19