import { Property } from 'src/model/property'
import { Reference } from 'src/model/reference'

export class EntityObject {
  protected readonly _aliasReference: string
  protected readonly _references: Reference[]
  protected readonly _properties: Property[]

  constructor(params: { references?: Reference[]; properties?: Property[]; aliasReference?: string }) {
    const { references, properties, aliasReference } = params
    this._aliasReference = aliasReference ?? ''
    this._references = references ?? []
    this._properties = properties ?? []
  }

  public get References(): Reference[] {
    return this._references
  }

  public get Properties(): Property[] {
    return this._properties
  }

  public get AliasReference(): string {
    return this._aliasReference
  }
}
