import { EntityEnum } from 'src/model/entity-enum'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableEnum extends PumlEntity {
  protected readonly _entity: EntityEnum

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `enum "${this._entity.Name}" as ${this._entity.Id} {`
  }

  constructor(params: { entity: EntityEnum }) {
    const { entity } = params
    super()
    this._entity = entity
  }

  protected _print(): string[] {
    return this._entity.Properties.sort()
  }
}
