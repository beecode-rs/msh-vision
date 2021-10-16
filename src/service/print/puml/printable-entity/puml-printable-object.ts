import { EntityObject } from 'src/model/entity-object'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableObject extends PumlEntity {
  protected readonly _entity: EntityObject

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `object "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor({ entity }: { entity: EntityObject }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
