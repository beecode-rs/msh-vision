// import { PumlEntity } from '../puml-entity'
// import { Entity } from 'src/model/entity'
// import { ImportReference } from 'src/model/import-reference'
// import { PumlRelation } from 'src/service/print/puml/relation/puml-relation'

export const pumlRelationService = {
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
}
