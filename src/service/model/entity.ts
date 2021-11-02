import { EntityTypes } from 'src/enum/entity-types'
import { EntityClass } from 'src/service/model/entity-class'
import { EntityEnum } from 'src/service/model/entity-enum'
import { EntityInterface } from 'src/service/model/entity-interface'
import { EntityObject } from 'src/service/model/entity-object'
import { EntityType } from 'src/service/model/entity-type'
import { Locatable } from 'src/service/model/locatable'
import { Referencable } from 'src/service/model/referencable'
import { Reference } from 'src/service/model/reference'
import { stringUtil } from 'src/util/string-util'

// prettier-ignore
export type EntityMeta<T extends EntityTypes> =
    T extends EntityTypes.CLASS     ? EntityClass
  : T extends EntityTypes.ENUM      ? EntityEnum
  : T extends EntityTypes.INTERFACE ? EntityInterface
  : T extends EntityTypes.OBJECT    ? EntityObject
  : T extends EntityTypes.TYPE      ? EntityType
  : T extends EntityTypes.FILE      ? undefined
  : never

export class Entity<T extends EntityTypes = any> implements Locatable, Referencable {
  protected readonly _type: T
  protected _name: string
  protected readonly _inProjectPath: string
  protected readonly _isExported: boolean
  protected _references: Reference[]
  protected readonly _meta: EntityMeta<T>

  constructor(params: {
    type: T
    name: string
    inProjectPath: string
    isExported: boolean
    references?: Reference[]
    meta: EntityMeta<T>
  }) {
    const { type, name, inProjectPath, isExported, references, meta } = params
    this._type = type
    this._name = name
    this._inProjectPath = inProjectPath
    this._isExported = isExported
    this._references = references ?? []
    this._meta = meta
  }

  public get Id(): string {
    return stringUtil.uniqueEntityHash(this.Name, this.InProjectPath)
  }

  public get Type(): T {
    return this._type
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

  public set References(references: Reference[]) {
    this._references = references
  }

  public get Meta(): EntityMeta<T> {
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
