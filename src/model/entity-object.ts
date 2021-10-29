import { Property } from 'src/model/property'

export class EntityObject {
  protected readonly _aliasReference: string
  protected readonly _properties: Property[]

  constructor(params: { properties?: Property[]; aliasReference?: string }) {
    const { properties, aliasReference } = params
    this._aliasReference = aliasReference ?? ''
    this._properties = properties ?? []
  }

  public get Properties(): Property[] {
    return this._properties
  }

  public get AliasReference(): string {
    return this._aliasReference
  }
}
