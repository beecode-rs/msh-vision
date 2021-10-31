import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/service/model/entity'
import { PumlEntity } from 'src/service/print-puml/puml-entity'

export class PumlPrintableEnum extends PumlEntity {
  protected readonly _entity: Entity<EntityTypes.ENUM>

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `enum "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: Entity<EntityTypes.ENUM> }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return this._entity.Meta.Properties.sort()
  }
}
