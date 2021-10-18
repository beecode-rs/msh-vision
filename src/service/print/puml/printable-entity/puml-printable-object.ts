import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import { PumlPrintableProperty } from 'src/service/print/puml/printable-entity/puml-printable-property'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableObject extends PumlEntity {
  protected readonly _entity: EntityObject

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `object "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: EntityObject }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return this._entity.Properties.sort(Property.SortByName)
      .map((p) => this._printProperty(p))
      .filter(Boolean)
  }

  protected _printProperty(property: Property): string {
    return new PumlPrintableProperty({ property }).print()
  }
}
