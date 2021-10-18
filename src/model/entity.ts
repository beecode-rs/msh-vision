import { EntityClass } from 'src/model/entity-class'
import { EntityEnum } from 'src/model/entity-enum'
import { EntityFile } from 'src/model/entity-file'
import { EntityInterface } from 'src/model/entity-interface'
import { EntityObject } from 'src/model/entity-object'
import { EntityType } from 'src/model/entity-type'
import { Locatable } from 'src/model/locatable'
import { stringUtil } from 'src/util/string-util'

export type EntityMeta = EntityClass | EntityEnum | EntityFile | EntityInterface | EntityObject | EntityType

export class Entity<T extends EntityMeta = any> implements Locatable {
  protected _name: string
  protected readonly _inProjectPath: string
  protected readonly _isExported: boolean
  protected readonly _meta: T

  constructor(params: { name: string; inProjectPath: string; isExported: boolean; meta: T }) {
    const { name, inProjectPath, isExported, meta } = params
    this._name = name
    this._inProjectPath = inProjectPath
    this._isExported = isExported
    this._meta = meta
  }

  public get Id(): string {
    return stringUtil.uniqueEntityHash(this.Name, this.InProjectPath)
  }

  public get Name(): string {
    return this._name
  }

  public get InProjectPath(): string {
    return this._inProjectPath
  }

  public get IsExported(): boolean {
    return this._isExported
  }

  public get Meta(): T {
    return this._meta
  }

  // TODO remove
  public renameEntity(name: string): void {
    this._name = name
  }

  public static SortByName(a: Entity<any>, b: Entity<any>): number {
    if (a.Name < b.Name) return -1
    if (a.Name > b.Name) return 1
    return 0
  }
}
