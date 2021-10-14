import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'
import { fileService } from 'src/service/file-service'

const self = {
  factory: (statement: ts.Statement, fileName: string): TsStatementEntity => {
    const entityType = self.entityTypeByStatementKind(statement.kind)
    const isExported = statement.modifiers ? self.isExported(statement.modifiers) : false
    const { name = fileName, ...data } = self.parserByType(entityType)(statement)

    return new TsStatementEntity({ entityType, statement, isExported, name, ...data })
  },
  entityTypeByStatementKind: (kind: ts.SyntaxKind): EntityType => {
    switch (kind) {
      case ts.SyntaxKind.ImportDeclaration:
        return EntityType.IMPORT
      case ts.SyntaxKind.TypeAliasDeclaration:
        return EntityType.TYPE
      case ts.SyntaxKind.ClassDeclaration:
        return EntityType.CLASS
      default:
        return EntityType.OBJECT
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
    return (initializer.properties ?? []).map((p) => p.name.escapedText)
  },
  parserByType: (entityType: EntityType): ((statement: ts.Statement) => any) => {
    switch (entityType) {
      case EntityType.OBJECT:
        return self.objectParser
      case EntityType.IMPORT:
        return self.importParser
      case EntityType.TYPE:
        return self.typeParser
      case EntityType.CLASS:
        return self.classParser
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
  importParser: (statement: ts.Statement): any => {
    // TODO what to do if there is more then one import??
    const name = statement['importClause'].namedBindings.elements.find((e) => e.name).name.escapedText
    const path = `${statement['moduleSpecifier'].text}.ts`
    // const path = `${fileService.cleanupPath(statement['moduleSpecifier'].text)}.ts`
    return { path, name }
  },
  typeParser: (statement: ts.Statement): any => {
    const name = statement['name'].escapedText
    return { name }
  },
  classParser: (statement: ts.Statement): any => {
    const name = statement['name'].escapedText
    const properties = statement['members'].map((m) => m.name.escapedText)

    return { name, properties }
  },
}
export const tsStatementEntityService = self
