import { EntityClass } from 'src/model/entity-class'
import { EntityEnum } from 'src/model/entity-enum'
import { EntityFile } from 'src/model/entity-file'
import { EntityInterface } from 'src/model/entity-interface'
import { EntityObject } from 'src/model/entity-object'
import { EntityType } from 'src/model/entity-type'
import { Locatable } from 'src/model/locatable'
import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'
import { stringUtil } from 'src/util/string-util'

export type EntityMeta = EntityClass | EntityEnum | EntityFile | EntityInterface | EntityObject | EntityType

export class Entity<T extends EntityMeta = any> implements Locatable, Referencable {
  protected _name: string
  protected readonly _inProjectPath: string
  protected readonly _isExported: boolean
  protected readonly _meta: T
  protected _references: Reference[]

  constructor(params: { name: string; inProjectPath: string; isExported: boolean; references?: Reference[]; meta: T }) {
    const { name, inProjectPath, isExported, references, meta } = params
    this._name = name
    this._inProjectPath = inProjectPath
    this._isExported = isExported
    this._meta = meta
    this._references = references ?? []
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

  public get References(): Reference[] {
    return this._references
  }

  public get Meta(): T {
    return this._meta
  }

  public removeIgnoredReferences(ignoredPaths: string[]): void {
    this._references = this._references.filter((r) => !ignoredPaths.find((ip) => r.InProjectPath.startsWith(ip)))
  }

  public static SortByName(a: Entity, b: Entity): number {
    if (a.Name < b.Name) return -1
    if (a.Name > b.Name) return 1
    return 0
  }
}
