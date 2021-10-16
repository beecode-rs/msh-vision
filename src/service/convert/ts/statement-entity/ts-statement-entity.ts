import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'

export type TsMetaObject = {
  properties: string[]
  isExported: boolean
}

export type TsMetaClass = TsMetaObject

export type TsMetaImport = {
  path: string
}
export type TsMetaType = {
  isExported: boolean
}
export type TsMetaEnum = {
  isExported: boolean
  properties: string[]
}
export type TsMetaInterface = {
  isExported: boolean
}

type TsMeta = TsMetaObject | TsMetaClass | TsMetaImport | TsMetaType | TsMetaEnum | TsMetaImport

export type TsStatementEntity<T extends TsMeta> = {
  entityType: EntityType
  statement: ts.Statement
  name: string
  meta: T
}
