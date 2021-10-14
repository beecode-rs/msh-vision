import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'

export class TsStatementEntity {
  constructor(partialEntity: Partial<TsStatementEntity>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }
  public entityType: EntityType
  public statement: ts.Statement
  public isExported = false
  public name: string
  public properties: string[]
  public path: string
}
