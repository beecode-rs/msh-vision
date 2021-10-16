import { EntityClass } from 'src/model/entity-class'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableClass extends PumlEntity {
  protected readonly _entity: EntityClass

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `class "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor({ entity }: { entity: EntityClass }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
