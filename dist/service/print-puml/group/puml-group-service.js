"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlGroupService = void 0;
const type_util_1 = require("@beecode/msh-node-util/lib/type-util");
const puml_group_type_1 = require("src/enum/puml-group-type");
const puml_group_fictive_1 = require("src/service/print-puml/group/puml-group-fictive");
const puml_group_folder_1 = require("src/service/print-puml/group/puml-group-folder");
const puml_group_rectangle_1 = require("src/service/print-puml/group/puml-group-rectangle");
exports.pumlGroupService = {
    strategyFromGroup: (group) => {
        switch (group.Type) {
            case puml_group_type_1.PumlGroupType.FOLDER:
                return new puml_group_folder_1.PumlGroupFolder(group);
            case puml_group_type_1.PumlGroupType.RECTANGLE:
                return new puml_group_rectangle_1.PumlGroupRectangle(group);
            case puml_group_type_1.PumlGroupType.FICTIVE:
                return new puml_group_fictive_1.PumlGroupFictive();
            default:
                throw type_util_1.typeUtil.exhaustiveCheck('Unknown group strategy', group.Type);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9ncm91cC9wdW1sLWdyb3VwLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQStEO0FBQy9ELDhEQUF3RDtBQUV4RCx3RkFBa0Y7QUFDbEYsc0ZBQWdGO0FBQ2hGLDRGQUFzRjtBQUV6RSxRQUFBLGdCQUFnQixHQUFHO0lBQzlCLGlCQUFpQixFQUFFLENBQUMsS0FBZ0IsRUFBcUIsRUFBRTtRQUN6RCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbEIsS0FBSywrQkFBYSxDQUFDLE1BQU07Z0JBQ3ZCLE9BQU8sSUFBSSxtQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ25DLEtBQUssK0JBQWEsQ0FBQyxTQUFTO2dCQUMxQixPQUFPLElBQUkseUNBQWtCLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEMsS0FBSywrQkFBYSxDQUFDLE9BQU87Z0JBQ3hCLE9BQU8sSUFBSSxxQ0FBZ0IsRUFBRSxDQUFBO1lBQy9CO2dCQUNFLE1BQU0sb0JBQVEsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ3ZFO0lBQ0gsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlVXRpbCB9IGZyb20gJ0BiZWVjb2RlL21zaC1ub2RlLXV0aWwvbGliL3R5cGUtdXRpbCdcbmltcG9ydCB7IFB1bWxHcm91cFR5cGUgfSBmcm9tICdzcmMvZW51bS9wdW1sLWdyb3VwLXR5cGUnXG5pbXBvcnQgeyBQdW1sR3JvdXAsIFB1bWxHcm91cFN0cmF0ZWd5IH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9ncm91cC9wdW1sLWdyb3VwJ1xuaW1wb3J0IHsgUHVtbEdyb3VwRmljdGl2ZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cC1maWN0aXZlJ1xuaW1wb3J0IHsgUHVtbEdyb3VwRm9sZGVyIH0gZnJvbSAnc3JjL3NlcnZpY2UvcHJpbnQtcHVtbC9ncm91cC9wdW1sLWdyb3VwLWZvbGRlcidcbmltcG9ydCB7IFB1bWxHcm91cFJlY3RhbmdsZSB9IGZyb20gJ3NyYy9zZXJ2aWNlL3ByaW50LXB1bWwvZ3JvdXAvcHVtbC1ncm91cC1yZWN0YW5nbGUnXG5cbmV4cG9ydCBjb25zdCBwdW1sR3JvdXBTZXJ2aWNlID0ge1xuICBzdHJhdGVneUZyb21Hcm91cDogKGdyb3VwOiBQdW1sR3JvdXApOiBQdW1sR3JvdXBTdHJhdGVneSA9PiB7XG4gICAgc3dpdGNoIChncm91cC5UeXBlKSB7XG4gICAgICBjYXNlIFB1bWxHcm91cFR5cGUuRk9MREVSOlxuICAgICAgICByZXR1cm4gbmV3IFB1bWxHcm91cEZvbGRlcihncm91cClcbiAgICAgIGNhc2UgUHVtbEdyb3VwVHlwZS5SRUNUQU5HTEU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbEdyb3VwUmVjdGFuZ2xlKGdyb3VwKVxuICAgICAgY2FzZSBQdW1sR3JvdXBUeXBlLkZJQ1RJVkU6XG4gICAgICAgIHJldHVybiBuZXcgUHVtbEdyb3VwRmljdGl2ZSgpXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyB0eXBlVXRpbC5leGhhdXN0aXZlQ2hlY2soJ1Vua25vd24gZ3JvdXAgc3RyYXRlZ3knLCBncm91cC5UeXBlKVxuICAgIH1cbiAgfSxcbn1cbiJdfQ==