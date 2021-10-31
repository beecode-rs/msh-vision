import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/service/model/entity'
import { PumlEntity } from 'src/service/print-puml/puml-entity'

export class PumlPrintableType extends PumlEntity {
  protected readonly _entity: Entity<EntityTypes.TYPE>

  protected _templateEnd(): string {
    return ']'
  }
  protected _templateStart(): string {
    return `card ${this._entity.Id} [`
  }

  constructor(params: { entity: Entity<EntityTypes.TYPE> }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return [this._entity.Name, '---', this._entity.Meta.ReturnType]
  }
}
