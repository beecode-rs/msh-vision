import { Printable } from '../../printable'
import { Entity, EntityType } from 'src/model/entity'

export class PumlPrintableEntity extends Printable {
  protected readonly _entity: Entity

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `${this._entityType()} "${this._entity.name}" as ${this._entity.Id} {`
  }

  protected _entityType(): string {
    switch (this._entity.Type) {
      case EntityType.CLASS:
        return 'class'
      default:
        return 'object'
    }
  }

  constructor({ entity }: { entity: Entity }) {
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return []
  }
}
