import { Entity } from 'src/model/entity'
import { Exportable } from 'src/model/exportable'

export class EntityClass extends Entity implements Exportable {
  protected readonly _isExported: boolean

  constructor({ name, inProjectPath, isExported }: { name: string; inProjectPath: string; isExported?: boolean }) {
    super({ name, inProjectPath })
    this._isExported = isExported ?? false
  }

  public get IsExported(): boolean {
    return this._isExported
  }
}
