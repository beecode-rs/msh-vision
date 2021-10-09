import { Printable } from '../../printable'
import { Entity } from 'src/model/entity'

export class PumlPrintableEntity implements Printable {
  protected readonly _entity: Entity

  constructor({ entity }: { entity: Entity }) {
    this._entity = entity
  }

  public addChildren(_printable: Printable): void {
    throw new Error('not implemented')
  }

  public print(): string {
    return `class ${this._entity.name} {
}`
  }
}
