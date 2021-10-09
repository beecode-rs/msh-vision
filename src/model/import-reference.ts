export class ImportReference<T = any> {
  constructor(partialEntity?: Partial<ImportReference<T>>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }
  public id: string
  public filePath: string
  public name: string
  public alias?: string
}
