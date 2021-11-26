import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { PumlEntity } from 'src/service/print-puml/puml-entity'
import { PumlRelation } from 'src/service/print-puml/puml-relation'

export class PumlPrintableType extends PumlEntity {
  protected readonly _entity: Entity<EntityTypes.TYPE>

  protected _templateEnd(): string {
    return ']'
  }
  protected _templateStart(): string {
    return `card ${this._entity.Id} [`
  }

  public constructor(params: { entity: Entity<EntityTypes.TYPE> }) {
    const { entity } = params
    super()
    this._entity = entity
    this._relations = entity.References.map((r) => new PumlRelation({ reference: r, fromEntity: entity }))
  }

  protected _print(): string[] {
    return [this._entity.Name, '---', this._wrapWithDoubleQuotesIfItStartsWithSingleQuote(this._entity.Meta.ReturnType)]
  }

  protected _wrapWithDoubleQuotesIfItStartsWithSingleQuote(text: string): string {
    if (text.trim()[0] === "'") return `"${text}"`
    return text
  }
}
