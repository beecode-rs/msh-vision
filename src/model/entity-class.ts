import { Entity } from 'src/model/entity'
import { Exportable } from 'src/model/exportable'
import { Property } from 'src/model/property'
import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'

export class EntityClass extends Entity implements Exportable, Referencable {
  protected readonly _isExported: boolean
  protected readonly _isAbstract: boolean
  protected readonly _references: Reference[]
  protected readonly _properties: Property[]

  constructor({
    name,
    inProjectPath,
    isExported,
    isAbstract,
    references,
    properties,
  }: {
    name: string
    inProjectPath: string
    isExported?: boolean
    isAbstract?: boolean
    references?: Reference[]
    properties?: Property[]
  }) {
    super({ name, inProjectPath })
    this._isExported = isExported ?? false
    this._isAbstract = isAbstract ?? false
    this._references = references ?? []
    this._properties = properties ?? []
  }

  public get IsExported(): boolean {
    return this._isExported
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
