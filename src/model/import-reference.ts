import { stringUtil } from 'src/util/string-util'

export class ImportReference<T = any> {
  constructor(partialEntity?: Partial<ImportReference<T>>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }

  public get Id(): string {
    return `${stringUtil.snakeCase(this.name)}_${stringUtil.stringToHash(this.filePath)}`
  }

  public filePath: string
  public name: string
  public alias?: string
}
