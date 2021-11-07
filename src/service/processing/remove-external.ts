import { Entity } from 'src/model/entity'
import { ProcessingStrategy } from 'src/service/processing/processing-service'

export class RemoveExternal implements ProcessingStrategy {
  public process(entities: Entity[]): Entity[] {
    entities.forEach((entity) => {
      if (entity.References.length === 0) return
      entity.References = entity.References.filter((r) => entities.find((e) => r.InProjectPath === e.InProjectPath))
    })
    return entities
  }
}
