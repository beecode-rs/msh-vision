import { EntityTypes } from 'src/enum/entity-types'
import { EntityClass } from 'src/model/entity-class'
import { EntityEnum } from 'src/model/entity-enum'
import { EntityInterface } from 'src/model/entity-interface'
import { EntityObject } from 'src/model/entity-object'
import { EntityType } from 'src/model/entity-type'
import { Locatable } from 'src/model/locatable'
import { Reference } from 'src/model/reference'
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

export type EntityParams<T extends EntityTypes = any> = {
  type: T
  name: string
  inProjectPath: string
  isExported: boolean
  references?: Reference[]
  meta: EntityMeta<T>
}

export class Entity<T extends EntityTypes = any> implements Locatable {
  protected readonly _type: T
  protected _name: string
  protected readonly _inProjectPath: string
  protected readonly _isExported: boolean
  protected _references: Reference[]
  protected readonly _meta: EntityMeta<T>

  constructor({ type, name, inProjectPath, isExported, references, meta }: EntityParams<T>) {
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

  public static cloneAndModify<T extends EntityTypes = any>(
    toClone: Entity<T>,
    overrideParams: Partial<EntityParams> = {}
  ): Entity<T> {
    const params: EntityParams = {
      name: overrideParams.name ?? toClone._name,
      type: overrideParams.type ?? toClone._type,
      inProjectPath: overrideParams.inProjectPath ?? toClone._inProjectPath,
      isExported: overrideParams.isExported ?? toClone._isExported,
      meta: overrideParams.meta ?? toClone._meta,
      references: (overrideParams.references ?? toClone._references).map((ref) => Reference.cloneAndModify(ref)),
    }

    return new Entity<T>(params)
  }
}
