import { Locatable } from 'src/model/locatable'
import { stringUtil } from 'src/util/string-util'

export abstract class Entity implements Locatable {
  protected _name: string
  protected readonly _inProjectPath: string

  protected constructor(params: { name: string; inProjectPath: string }) {
    const { name, inProjectPath } = params
    this._name = name
    this._inProjectPath = inProjectPath
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

  public renameEntity(name: string): void {
    this._name = name
  }

  public static SortByName(a: Entity, b: Entity): number {
    if (a.Name < b.Name) return -1
    if (a.Name > b.Name) return 1
    return 0
  }
}
