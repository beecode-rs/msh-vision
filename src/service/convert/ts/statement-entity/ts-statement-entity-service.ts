import ts from 'src/module/ts'
import { TsStatementEntity, TsStatementEntityType } from 'src/service/convert/ts/statement-entity/ts-statement-entity'
// import { logger } from 'src/util/logger'

const self = {
  factory: (statement: ts.Statement): TsStatementEntity => {
    const entityType = self.entityTypeByStatementKind(statement.kind)
    const isExported = statement.modifiers ? self.isExported(statement.modifiers) : false
    const data = self.parserByType(entityType)(statement)

    return new TsStatementEntity({ entityType, statement, isExported, name: data.name, properties: data.properties })
  },
  entityTypeByStatementKind: (kind: ts.SyntaxKind): TsStatementEntityType => {
    switch (kind) {
      case ts.SyntaxKind.ImportDeclaration:
        return TsStatementEntityType.IMPORT
      case ts.SyntaxKind.TypeAliasDeclaration:
        return TsStatementEntityType.TYPE
      default:
        return TsStatementEntityType.OBJECT
    }
  },
  isExported: (modifiers: ts.ModifiersArray): boolean => {
    return !!modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  },
  nameFromDeclarationsList: (
    declarationList: ts.VariableDeclarationList
  ): { name: string; declaration: ts.VariableDeclaration } | undefined => {
    if (!declarationList?.declarations) return
    const decl = declarationList.declarations.find((d) => d.name)
    if (!decl) return
    return {
      name: decl.name['escapedText'],
      declaration: decl,
    }
  },
  propertiesFromInitializer: (initializer: any): string[] => {
    return initializer.properties.map((p) => p.name.escapedText)
  },
  parserByType: (entityType: TsStatementEntityType): ((statement: ts.Statement) => any) => {
    switch (entityType) {
      case TsStatementEntityType.OBJECT:
        return self.objectParser
      default:
        return (_: any): any => {
          return {}
        }
    }
  },
  objectParser: (statement: ts.Statement): any => {
    const result = self.nameFromDeclarationsList(statement['declarationList'])
    if (!result) return {}
    const { name, declaration } = result
    const properties = self.propertiesFromInitializer(declaration.initializer)

    return {
      name,
      properties,
    }
  },
}
export const tsStatementEntityService = self
