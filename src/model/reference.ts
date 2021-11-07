import { ReferenceType } from 'src/enum/reference-type'
import { Locatable } from 'src/model/locatable'
import { stringUtil } from 'src/util/string-util'

export type ReferenceDirection = 'up' | 'down' | 'left' | 'right'

export type ReferenceParams = { name: string; inProjectPath: string; type: ReferenceType; direction?: ReferenceDirection }

export class Reference implements Locatable {
  protected readonly _name: string
  protected readonly _inProjectPath: string
  protected readonly _type: ReferenceType
  protected readonly _direction?: ReferenceDirection

  constructor({ name, inProjectPath, type, direction }: ReferenceParams) {
    this._name = name
    this._inProjectPath = inProjectPath
    this._type = type
    this._direction = direction
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
  public get Type(): ReferenceType {
    return this._type
  }
  public get Direction(): ReferenceDirection | undefined {
    return this._direction
  }

  public static cloneAndModify(toClone: Reference, overrideParams: Partial<ReferenceParams> = {}): Reference {
    const params: ReferenceParams = {
      name: toClone._name,
      inProjectPath: toClone._inProjectPath,
      type: toClone._type,
      direction: toClone._direction,
      ...overrideParams,
    }
    return new Reference(params)
  }
}
