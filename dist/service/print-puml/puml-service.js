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
                (0, logger_1.logger)().warn(`Unknown entity type ${entity.constructor.name}`);
            // typeUtil.exhaustiveCheck(entity)
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQW1EO0FBRW5ELHVHQUFpRztBQUNqRyxxR0FBK0Y7QUFDL0YscUdBQStGO0FBQy9GLCtHQUF5RztBQUN6Ryx5R0FBbUc7QUFDbkcscUdBQStGO0FBRS9GLDRDQUF3QztBQUUzQixRQUFBLFdBQVcsR0FBRztJQUN6QiwyQkFBMkIsRUFBRSxDQUFDLE1BQWMsRUFBMEIsRUFBRTtRQUN0RSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSywwQkFBVyxDQUFDLEtBQUs7Z0JBQ3BCLE9BQU8sSUFBSSx5Q0FBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDM0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLE1BQU07Z0JBQ3JCLE9BQU8sSUFBSSwyQ0FBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDNUMsS0FBSywwQkFBVyxDQUFDLFNBQVM7Z0JBQ3hCLE9BQU8sSUFBSSxpREFBc0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDL0MsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUMsS0FBSywwQkFBVyxDQUFDLElBQUk7Z0JBQ25CLE9BQU8sSUFBSSx1Q0FBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDMUM7Z0JBQ0UsSUFBQSxlQUFNLEdBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNqRSxtQ0FBbUM7U0FDcEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVR5cGVzIH0gZnJvbSAnc3JjL2VudW0vZW50aXR5LXR5cGVzJ1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnc3JjL21vZGVsL2VudGl0eSdcbmltcG9ydCB7IFB1bWxQcmludGFibGVDbGFzcyB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1jbGFzcydcbmltcG9ydCB7IFB1bWxQcmludGFibGVFbnVtIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLWVudW0nXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlRmlsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1maWxlJ1xuaW1wb3J0IHsgUHVtbFByaW50YWJsZUludGVyZmFjZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvcHJpbnRhYmxlLWVudGl0eS9wdW1sLXByaW50YWJsZS1pbnRlcmZhY2UnXG5pbXBvcnQgeyBQdW1sUHJpbnRhYmxlT2JqZWN0IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLW9iamVjdCdcbmltcG9ydCB7IFB1bWxQcmludGFibGVUeXBlIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wcmludGFibGUtZW50aXR5L3B1bWwtcHJpbnRhYmxlLXR5cGUnXG5pbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9wdW1sLWVudGl0eSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3NyYy91dGlsL2xvZ2dlcidcblxuZXhwb3J0IGNvbnN0IHB1bWxTZXJ2aWNlID0ge1xuICBwcmludGFibGVTdHJhdGVneUZyb21FbnRpdHk6IChlbnRpdHk6IEVudGl0eSk6IFB1bWxFbnRpdHkgfCB1bmRlZmluZWQgPT4ge1xuICAgIHN3aXRjaCAoZW50aXR5LlR5cGUpIHtcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuQ0xBU1M6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUNsYXNzKHsgZW50aXR5IH0pXG4gICAgICBjYXNlIEVudGl0eVR5cGVzLkZJTEU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbFByaW50YWJsZUZpbGUoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuT0JKRUNUOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVPYmplY3QoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuSU5URVJGQUNFOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVJbnRlcmZhY2UoeyBlbnRpdHkgfSlcbiAgICAgIGNhc2UgRW50aXR5VHlwZXMuVFlQRTpcbiAgICAgICAgcmV0dXJuIG5ldyBQdW1sUHJpbnRhYmxlVHlwZSh7IGVudGl0eSB9KVxuICAgICAgY2FzZSBFbnRpdHlUeXBlcy5FTlVNOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxQcmludGFibGVFbnVtKHsgZW50aXR5IH0pXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsb2dnZXIoKS53YXJuKGBVbmtub3duIGVudGl0eSB0eXBlICR7ZW50aXR5LmNvbnN0cnVjdG9yLm5hbWV9YClcbiAgICAgIC8vIHR5cGVVdGlsLmV4aGF1c3RpdmVDaGVjayhlbnRpdHkpXG4gICAgfVxuICB9LFxufVxuIl19