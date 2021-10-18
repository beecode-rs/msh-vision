import { Entity } from 'src/model/entity'
import { Exportable } from 'src/model/exportable'
import { Property } from 'src/model/property'

export class EntityObject extends Entity implements Exportable {
  protected readonly _isExported: boolean
  protected readonly _aliasReference: string
  protected readonly _properties: Property[]

  constructor(params: {
    name: string
    inProjectPath: string
    isExported?: boolean
    properties?: Property[]
    aliasReference?: string
  }) {
    const { name, inProjectPath, isExported, properties, aliasReference } = params
    super({ name, inProjectPath })
    this._isExported = isExported ?? false
    this._aliasReference = aliasReference ?? ''
    this._properties = properties ?? []
  }

  public get IsExported(): boolean {
    return this._isExported
  }

  public get Properties(): Property[] {
    return this._properties
  }

  public get AliasReference(): string {
    return this._aliasReference
  }
}
