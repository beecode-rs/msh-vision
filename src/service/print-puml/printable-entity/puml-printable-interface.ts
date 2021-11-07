import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { Property } from 'src/model/property'
import { PumlPrintableProperty } from 'src/service/print-puml/printable-entity/puml-printable-property'
import { PumlEntity } from 'src/service/print-puml/puml-entity'

export class PumlPrintableInterface extends PumlEntity {
  protected readonly _entity: Entity<EntityTypes.INTERFACE>

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `interface "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: Entity<EntityTypes.INTERFACE> }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return this._entity.Meta.Properties.map((p) => this._printProperty(p)).filter(Boolean)
  }

  protected _printProperty(property: Property): string {
    return new PumlPrintableProperty({ property }).print()
  }
}
