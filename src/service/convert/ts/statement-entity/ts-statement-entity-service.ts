import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsParserClass } from 'src/service/convert/ts/statement-entity/parser/ts-parser-class'
import { tsParserImport } from 'src/service/convert/ts/statement-entity/parser/ts-parser-import'
import { tsParserInterface } from 'src/service/convert/ts/statement-entity/parser/ts-parser-interface'
import { tsParserObject } from 'src/service/convert/ts/statement-entity/parser/ts-parser-object'
import { tsParserType } from 'src/service/convert/ts/statement-entity/parser/ts-parser-type'
import { TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'
import { logger } from 'src/util/logger'

const self = {
  factory: (statement: ts.Statement): TsStatementEntity<any>[] => {
    const entityType = self.entityTypeByStatementKind(statement.kind)
    if (!entityType) return []
    return self.parserByType({ entityType, statement })
  },
  entityTypeByStatementKind: (kind: ts.SyntaxKind): EntityType | undefined => {
    switch (kind) {
      case ts.SyntaxKind.ImportDeclaration:
        return EntityType.IMPORT
      case ts.SyntaxKind.TypeAliasDeclaration:
        return EntityType.TYPE
      case ts.SyntaxKind.ClassDeclaration:
        return EntityType.CLASS
      case ts.SyntaxKind.InterfaceDeclaration:
        return EntityType.INTERFACE
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.VariableStatement:
      case ts.SyntaxKind.VariableDeclarationList:
        return EntityType.OBJECT
      default:
        logger.warn(`Unknown parser for type "${ts.SyntaxKind[kind]}"`)
        return undefined
    }
  },

  parserByType: ({ entityType, statement }: { entityType: EntityType; statement: ts.Statement }): TsStatementEntity<any>[] => {
    switch (entityType) {
      case EntityType.OBJECT:
        return tsParserObject.parse(statement)
      case EntityType.IMPORT:
        return tsParserImport.parse(statement)
      case EntityType.TYPE:
        return tsParserType.parse(statement)
      case EntityType.CLASS:
        return tsParserClass.parse(statement)
      case EntityType.INTERFACE:
        return tsParserInterface.parse(statement)
      default:
        throw new Error(`Unknown entity type "${entityType}"`)
    }
  },
}
export const tsStatementEntityService = self
