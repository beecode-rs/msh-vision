import { ReferenceType } from 'src/enum/reference-type'
import { Entity } from 'src/model/entity'
import { Reference } from 'src/model/reference'

export class PumlRelation {
  protected readonly _reference: Reference
  protected readonly _fromEntity: Entity

  constructor({ reference, fromEntity }: { reference: Reference; fromEntity: Entity }) {
    this._reference = reference
    this._fromEntity = fromEntity
  }

  public print(): string {
    return `${this._fromEntity.Id} ${this._linkByReferenceType()} ${this._reference.Id}`
  }

  protected _linkByReferenceType(): string {
    switch (this._reference.Type) {
      case ReferenceType.ASSOCIATION:
        return '-up->'
      case ReferenceType.INHERITANCE:
        return '-up-|>'
      case ReferenceType.IMPLEMENTATION:
        return '.up.|>'
      case ReferenceType.DEPENDENCY:
        return '.up.>'
      case ReferenceType.AGGREGATION:
        return '--o'
      case ReferenceType.COMPOSITION:
        return '--*'
      default:
        return '--'
    }
  }
}
