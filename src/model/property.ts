export enum PropertyAccessLevelType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  PROTECTED = 'protected',
  NO_MODIFIER = 'no-modifier',
}

export class Property {
  protected readonly _name: string
  protected readonly _returnType: string
  protected readonly _accessLevel: PropertyAccessLevelType
  protected readonly _isAbstract: boolean
  protected readonly _functionParams: string | undefined

  constructor({
    name,
    returnType,
    accessLevel,
    isAbstract,
    functionParams,
  }: {
    name: string
    returnType: string
    accessLevel?: PropertyAccessLevelType
    isAbstract?: boolean
    functionParams?: string
  }) {
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
}
