import { Entity } from 'src/model/entity'
import { EntityClass } from 'src/model/entity-class'
import { Property } from 'src/model/property'
import { PumlPrintableProperty } from 'src/service/print/puml/printable-entity/puml-printable-property'
import { PumlEntity } from 'src/service/print/puml/puml-entity'
import { PumlRelation } from 'src/service/print/puml/puml-relation'

export class PumlPrintableClass extends PumlEntity {
  protected readonly _entity: Entity<EntityClass>

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `${this._entity.Meta.IsAbstract ? 'abstract' : 'class'} "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: Entity<EntityClass> }) {
    const { entity } = params
    super()
    this._entity = entity
    this._relations = entity.References.map((r) => new PumlRelation({ reference: r, fromEntity: entity }))
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
