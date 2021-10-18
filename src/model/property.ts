import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'

export class Property {
  protected readonly _name: string
  protected readonly _returnType: string
  protected readonly _accessLevel: PropertyAccessLevelType
  protected readonly _isAbstract: boolean
  protected readonly _functionParams: string | undefined
  // TODO implement readonly
  // TODO implement getter/setter

  constructor(params: {
    name: string
    returnType: string
    accessLevel?: PropertyAccessLevelType
    isAbstract?: boolean
    functionParams?: string
  }) {
    const { name, returnType, accessLevel, isAbstract, functionParams } = params
    this._name = name
    this._returnType = returnType
    this._accessLevel = accessLevel ?? PropertyAccessLevelType.NO_MODIFIER
    this._isAbstract = isAbstract ?? false
    this._functionParams = functionParams
  }

  public get Name(): string {
    return this._name
  }

  public get ReturnType(): string {
    return this._returnType
  }

  public get AccessLevel(): PropertyAccessLevelType {
    return this._accessLevel
  }

  public get IsAbstract(): boolean {
    return this._isAbstract
  }

  public get FunctionParams(): string | undefined {
    return this._functionParams
  }

  public static SortByName(a: Property, b: Property): number {
    if (a.Name < b.Name) return -1
    if (a.Name > b.Name) return 1
    return 0
  }
}
