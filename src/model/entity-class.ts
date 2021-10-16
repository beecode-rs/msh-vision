import { Entity } from 'src/model/entity'
import { Exportable } from 'src/model/exportable'
import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'

export class EntityClass extends Entity implements Exportable, Referencable {
  protected readonly _isExported: boolean
  protected readonly _references: Reference[]

  constructor({
    name,
    inProjectPath,
    isExported,
    references,
  }: {
    name: string
    inProjectPath: string
    isExported?: boolean
    references?: Reference[]
  }) {
    super({ name, inProjectPath })
    this._isExported = isExported ?? false
    this._references = references ?? []
  }

  public get References(): Reference[] {
    return this._references
  }

  public get IsExported(): boolean {
    return this._isExported
  }
}
