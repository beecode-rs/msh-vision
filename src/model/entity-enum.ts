export class EntityEnum {
  protected readonly _properties: string[]

  public constructor(params: { properties: string[] }) {
    const { properties } = params
    this._properties = properties ?? []
  }

  public get Properties(): string[] {
    return this._properties
  }
}
