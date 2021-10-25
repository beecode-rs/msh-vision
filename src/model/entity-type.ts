export class EntityType {
  protected readonly _returnType: string

  constructor(params: { returnType: string }) {
    const { returnType } = params
    this._returnType = returnType
  }

  public get ReturnType(): string {
    return this._returnType
  }
}
