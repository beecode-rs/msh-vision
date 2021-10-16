import { EntityInterface } from 'src/model/entity-interface'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableInterface extends PumlEntity {
  protected readonly _entity: EntityInterface

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `interface "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor({ entity }: { entity: EntityInterface }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
