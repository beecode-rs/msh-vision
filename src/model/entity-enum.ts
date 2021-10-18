import { Entity } from 'src/model/entity'
import { Exportable } from 'src/model/exportable'

export class EntityEnum extends Entity implements Exportable {
  protected readonly _isExported: boolean
  protected readonly _properties: string[]

  constructor(params: { name: string; inProjectPath: string; isExported?: boolean; properties: string[] }) {
    const { name, inProjectPath, isExported, properties } = params
    super({ name, inProjectPath })
    this._isExported = isExported ?? false
    this._properties = properties ?? []
  }

  public get IsExported(): boolean {
    return this._isExported
  }
  public get Properties(): string[] {
    return this._properties
  }
}
