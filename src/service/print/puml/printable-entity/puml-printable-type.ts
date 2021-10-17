import { EntityType } from 'src/model/entity-type'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableType extends PumlEntity {
  protected readonly _entity: EntityType

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `card "T: ${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor({ entity }: { entity: EntityType }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
