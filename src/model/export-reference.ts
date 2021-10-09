export class ExportReference {
  constructor(partialEntity?: Partial<ExportReference>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }
  public name: string
}
