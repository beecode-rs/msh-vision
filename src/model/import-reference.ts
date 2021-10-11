import { stringUtil } from 'src/util/string-util'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash')

export class ImportReference<T = any> {
  constructor(partialEntity?: Partial<ImportReference<T>>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }

  public get Id(): string {
    return `${stringUtil.snakeCase(this.name)}_${shortHash(this.filePath)}`
  }

  public filePath: string
  public name: string
  public alias?: string
}
