import { Property } from 'src/model/property'
import { Reference } from 'src/model/reference'

export class EntityInterface {
  protected readonly _references: Reference[]
  protected readonly _properties: Property[]

  public constructor(params: { references?: Reference[]; properties?: Property[] }) {
    const { references, properties } = params
    this._references = references ?? []
    this._properties = properties ?? []
  }

  public get References(): Reference[] {
    return this._references
  }

  public get Properties(): Property[] {
    return this._properties
  }
}
