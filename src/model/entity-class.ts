import { Property } from 'src/model/property'
import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'

export class EntityClass implements Referencable {
  protected readonly _isAbstract: boolean
  protected readonly _references: Reference[]
  protected readonly _properties: Property[]

  constructor(params: { isAbstract?: boolean; references?: Reference[]; properties?: Property[] }) {
    const { isAbstract, references, properties } = params
    this._isAbstract = isAbstract ?? false
    this._references = references ?? []
    this._properties = properties ?? []
  }

  public get IsAbstract(): boolean {
    return this._isAbstract
  }

  public get References(): Reference[] {
    return this._references
  }

  public get Properties(): Property[] {
    return this._properties
  }
}
