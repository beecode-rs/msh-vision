"use strict";
// import { PumlEntity } from '../puml-entity'
// import { Entity } from 'src/model/entity'
// import { ImportReference } from 'src/model/import-reference'
// import { PumlRelation } from 'src/service/print/puml/relation/puml-relation'
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumlRelationService = void 0;
exports.pumlRelationService = {
// generateRelations: (entities: Entity[]): PumlEntity[] => {
// return entities.map((entity) => pumlRelationService._findRelations({ entity, entities })).flat()
// },
// _findRelations: ({ entity, entities }: { entity: Entity; entities: Entity[] }): PumlRelation[] => {
// return entity.importReferences
//   .map((imp) => pumlRelationService._findImportedExports({ imp, entities, entityId: entity.Id }))
//   .flat()
// },
// _findImportedExports: ({
//   imp,
//   entities,
//   entityId,
// }: {
//   imp: ImportReference
//   entities: Entity[]
//   entityId: string
// }): PumlRelation[] => {
//   return entities.filter((ex) => ex.Id === imp.Id).map((ex) => new PumlRelation({ from: entityId, to: ex.Id }))
// },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVtbC1yZWxhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2UvcHJpbnQvcHVtbC9yZWxhdGlvbi9wdW1sLXJlbGF0aW9uLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDhDQUE4QztBQUM5Qyw0Q0FBNEM7QUFDNUMsK0RBQStEO0FBQy9ELCtFQUErRTs7O0FBRWxFLFFBQUEsbUJBQW1CLEdBQUc7QUFDakMsNkRBQTZEO0FBQzdELG1HQUFtRztBQUNuRyxLQUFLO0FBQ0wsc0dBQXNHO0FBQ3RHLGlDQUFpQztBQUNqQyxvR0FBb0c7QUFDcEcsWUFBWTtBQUNaLEtBQUs7QUFDTCwyQkFBMkI7QUFDM0IsU0FBUztBQUNULGNBQWM7QUFDZCxjQUFjO0FBQ2QsT0FBTztBQUNQLHlCQUF5QjtBQUN6Qix1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLDBCQUEwQjtBQUMxQixrSEFBa0g7QUFDbEgsS0FBSztDQUNOLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBQdW1sRW50aXR5IH0gZnJvbSAnLi4vcHVtbC1lbnRpdHknXG4vLyBpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICdzcmMvbW9kZWwvZW50aXR5J1xuLy8gaW1wb3J0IHsgSW1wb3J0UmVmZXJlbmNlIH0gZnJvbSAnc3JjL21vZGVsL2ltcG9ydC1yZWZlcmVuY2UnXG4vLyBpbXBvcnQgeyBQdW1sUmVsYXRpb24gfSBmcm9tICdzcmMvc2VydmljZS9wcmludC9wdW1sL3JlbGF0aW9uL3B1bWwtcmVsYXRpb24nXG5cbmV4cG9ydCBjb25zdCBwdW1sUmVsYXRpb25TZXJ2aWNlID0ge1xuICAvLyBnZW5lcmF0ZVJlbGF0aW9uczogKGVudGl0aWVzOiBFbnRpdHlbXSk6IFB1bWxFbnRpdHlbXSA9PiB7XG4gIC8vIHJldHVybiBlbnRpdGllcy5tYXAoKGVudGl0eSkgPT4gcHVtbFJlbGF0aW9uU2VydmljZS5fZmluZFJlbGF0aW9ucyh7IGVudGl0eSwgZW50aXRpZXMgfSkpLmZsYXQoKVxuICAvLyB9LFxuICAvLyBfZmluZFJlbGF0aW9uczogKHsgZW50aXR5LCBlbnRpdGllcyB9OiB7IGVudGl0eTogRW50aXR5OyBlbnRpdGllczogRW50aXR5W10gfSk6IFB1bWxSZWxhdGlvbltdID0+IHtcbiAgLy8gcmV0dXJuIGVudGl0eS5pbXBvcnRSZWZlcmVuY2VzXG4gIC8vICAgLm1hcCgoaW1wKSA9PiBwdW1sUmVsYXRpb25TZXJ2aWNlLl9maW5kSW1wb3J0ZWRFeHBvcnRzKHsgaW1wLCBlbnRpdGllcywgZW50aXR5SWQ6IGVudGl0eS5JZCB9KSlcbiAgLy8gICAuZmxhdCgpXG4gIC8vIH0sXG4gIC8vIF9maW5kSW1wb3J0ZWRFeHBvcnRzOiAoe1xuICAvLyAgIGltcCxcbiAgLy8gICBlbnRpdGllcyxcbiAgLy8gICBlbnRpdHlJZCxcbiAgLy8gfToge1xuICAvLyAgIGltcDogSW1wb3J0UmVmZXJlbmNlXG4gIC8vICAgZW50aXRpZXM6IEVudGl0eVtdXG4gIC8vICAgZW50aXR5SWQ6IHN0cmluZ1xuICAvLyB9KTogUHVtbFJlbGF0aW9uW10gPT4ge1xuICAvLyAgIHJldHVybiBlbnRpdGllcy5maWx0ZXIoKGV4KSA9PiBleC5JZCA9PT0gaW1wLklkKS5tYXAoKGV4KSA9PiBuZXcgUHVtbFJlbGF0aW9uKHsgZnJvbTogZW50aXR5SWQsIHRvOiBleC5JZCB9KSlcbiAgLy8gfSxcbn1cbiJdfQ==