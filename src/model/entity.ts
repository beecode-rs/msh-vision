import { ImportReference } from 'src/model/import-reference'
import { stringUtil } from 'src/util/string-util'

export enum EntityType {
  FILE = 'file',
  IMPORT = 'import',
  OBJECT = 'object',
  CLASS = 'class',
  ENUM = 'enum',
  TYPE = 'type',
  INTERFACE = 'interface',
}

export class Entity {
  protected readonly _type: EntityType

  constructor(partialEntity?: Partial<Entity>, type?: EntityType) {
    if (partialEntity) Object.assign(this, partialEntity, this)
    this._type = type ?? EntityType.OBJECT
  }

  public get Id(): string {
    return `${stringUtil.snakeCase(this.name)}_${stringUtil.stringToHash(this.filePath)}`
  }

  public get Type(): EntityType {
    return this._type
  }

  public name: string
  public filePath: string

  public importReferences: ImportReference[] = []
}
