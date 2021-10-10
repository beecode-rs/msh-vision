import { ExportReference } from 'src/model/export-reference'
import { ImportReference } from 'src/model/import-reference'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash')

export class Entity {
  constructor(partialEntity?: Partial<Entity>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }

  public filePath: string
  public name: string
  public get Id(): string {
    return `${this.name}_${shortHash(this.filePath)}`
  }

  public exportReference: ExportReference[] = []
  public importReference: ImportReference[] = []
}
