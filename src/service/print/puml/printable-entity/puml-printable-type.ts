import { Entity } from 'src/model/entity'
import { EntityType } from 'src/model/entity-type'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableType extends PumlEntity {
  protected readonly _entity: Entity<EntityType>

  protected _templateEnd(): string {
    return ']'
  }
  protected _templateStart(): string {
    return `card ${this._entity.Id} [`
  }

  constructor(params: { entity: Entity<EntityType> }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return [this._entity.Name, '---', this._entity.Meta.ReturnType]
  }
}
