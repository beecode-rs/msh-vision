import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import { PumlPrintableProperty } from 'src/service/print/puml/printable-entity/puml-printable-property'
import { PumlEntity } from 'src/service/print/puml/puml-entity'
import { PumlRelation } from 'src/service/print/puml/puml-relation'

export class PumlPrintableObject extends PumlEntity {
  protected readonly _entity: Entity<EntityObject>

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `object "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: Entity<EntityObject> }) {
    const { entity } = params
    super()
    this._entity = entity
    this._relations = entity.Meta.References.map((r) => new PumlRelation({ reference: r, fromEntity: entity }))
  }

  protected _print(): string[] {
    return this._entity.Meta.Properties.sort(Property.SortByName)
      .map((p) => this._printProperty(p))
      .filter(Boolean)
  }

  protected _printProperty(property: Property): string {
    return new PumlPrintableProperty({ property }).print()
  }
}
