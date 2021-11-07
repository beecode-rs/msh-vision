import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { ProcessingStrategy } from 'src/service/processing/processing-service'

export class RemoveTypes implements ProcessingStrategy {
  public process(entities: Entity[]): Entity[] {
    const { typeEntities, otherEntities } = entities.reduce<{ typeEntities: Entity[]; otherEntities: Entity[] }>(
      (agg, cur) => {
        if (cur.Type === EntityTypes.TYPE) agg.typeEntities.push(cur)
        else agg.otherEntities.push(cur)
        return agg
      },
      { typeEntities: [], otherEntities: [] }
    )

    otherEntities.forEach((entity) => {
      if (entity.References.length === 0) return
      entity.References = entity.References.filter(
        (r) => !typeEntities.find((e) => r.InProjectPath === e.InProjectPath && r.Name === e.Name)
      )
    })

    return otherEntities
  }
}
