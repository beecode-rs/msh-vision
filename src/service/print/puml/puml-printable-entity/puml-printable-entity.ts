import { Printable } from '../../printable'
import { Entity } from 'src/model/entity'

export class PumlPrintableEntity extends Printable {
  protected readonly _entity: Entity

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `class ${this._entity.name} {`
  }

  constructor({ entity }: { entity: Entity }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
