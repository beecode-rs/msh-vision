import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { PumlEntity } from 'src/service/print-puml/puml-entity'
import { PumlRelation } from 'src/service/print-puml/puml-relation'

export class PumlPrintableFile extends PumlEntity {
  protected readonly _entity: Entity<EntityTypes.FILE>

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `artifact "${this._entity.Name}" as ${this._entity.Id} {`
  }

  public constructor(params: { entity: Entity<EntityTypes.FILE> }) {
    const { entity } = params
    super()
    this._entity = entity
    this._relations = entity.References.map((r) => new PumlRelation({ reference: r, fromEntity: entity }))
  }

  protected _print(): string[] {
    return []
  }
}
