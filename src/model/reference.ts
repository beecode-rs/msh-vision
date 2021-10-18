import { ReferenceType } from 'src/enum/reference-type'
import { Locatable } from 'src/model/locatable'
import { stringUtil } from 'src/util/string-util'

export class Reference implements Locatable {
  protected readonly _name: string
  protected readonly _inProjectPath: string
  protected readonly _type: ReferenceType

  constructor(params: { name: string; inProjectPath: string; type: ReferenceType }) {
    const { name, inProjectPath, type } = params
    this._name = name
    this._inProjectPath = inProjectPath
    this._type = type
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
}
