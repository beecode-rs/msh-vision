import { Property } from 'src/model/property'

export class EntityClass {
  protected readonly _isAbstract: boolean
  protected readonly _properties: Property[]

  public constructor(params: { isAbstract?: boolean; properties?: Property[] }) {
    const { isAbstract, properties } = params
    this._isAbstract = isAbstract ?? false
    this._properties = properties ?? []
  }

  public get IsAbstract(): boolean {
    return this._isAbstract
  }

  public get Properties(): Property[] {
    return this._properties
  }
}
