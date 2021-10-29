import { ReferenceType } from 'src/enum/reference-type'
import { Entity } from 'src/model/entity'
import { Reference } from 'src/model/reference'

export class PumlRelation {
  protected readonly _reference: Reference
  protected readonly _fromEntity: Entity

  constructor(params: { reference: Reference; fromEntity: Entity }) {
    const { reference, fromEntity } = params
    this._reference = reference
    this._fromEntity = fromEntity
  }

  public print(): string {
    return `${this._fromEntity.Id} ${this._linkByReferenceType()} ${this._reference.Id}`
  }

  protected _linkByReferenceType(): string {
    const { Direction: dir, Type } = this._reference
    switch (Type) {
      case ReferenceType.ASSOCIATION:
        return `-${dir ?? ''}->` //       -->
      case ReferenceType.INHERITANCE:
        return `-${dir ?? 'up'}-|>` //    -up-|>
      case ReferenceType.IMPLEMENTATION:
        return `.${dir ?? 'up'}.|>` //    .up.|>
      case ReferenceType.DEPENDENCY:
        return `.${dir ?? ''}.>` //       ..>
      case ReferenceType.AGGREGATION:
        return `-${dir ?? ''}-o` //       --o
      case ReferenceType.COMPOSITION:
        return `-${dir ?? ''}-*` //       --*
      default:
        return `-${dir ?? ''}-` //        --
    }
  }
}
