import { ExportReference } from 'src/model/export-reference'
import { ImportReference } from 'src/model/import-reference'
import { stringUtil } from 'src/util/string-util'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortHash = require('short-hash')

export enum EntityType {
  OBJECT = 'object',
  CLASS = 'class',
}

export class Entity {
  protected readonly _type: EntityType
  public get Type(): EntityType {
    return this._type
  }

  constructor(partialEntity?: Partial<Entity>, type?: EntityType) {
    if (partialEntity) Object.assign(this, partialEntity, this)
    this._type = type ?? EntityType.OBJECT
  }

  public filePath: string
  public name: string
  public get Id(): string {
    return `${stringUtil.snakeCase(this.name)}_${shortHash(this.filePath)}`
  }

  public exportReference: ExportReference[] = []
  public importReference: ImportReference[] = []
}
