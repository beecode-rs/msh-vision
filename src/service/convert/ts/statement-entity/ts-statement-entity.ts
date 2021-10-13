import ts from 'src/module/ts'

export enum TsStatementEntityType {
  IMPORT = 'import',
  OBJECT = 'object',
  CLASS = 'class',
  ENUM = 'enum',
  TYPE = 'type',
}

export class TsStatementEntity {
  constructor(partialEntity: Partial<TsStatementEntity>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }
  public entityType: TsStatementEntityType
  public statement: ts.Statement
  public isExported = false
  public name: string
  public properties: string[]
}
