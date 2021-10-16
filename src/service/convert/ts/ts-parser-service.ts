import { ReferenceType } from 'src/enum/reference-type'
import { PropertyAccessLevelType } from 'src/model/property'
import { Reference } from 'src/model/reference'
import ts from 'src/module/ts'
import { TsParserImport } from 'src/service/convert/ts/parser/ts-parser-import'
import { logger } from 'src/util/logger'

const self = {
  isExported: (modifiers?: ts.ModifiersArray): boolean => {
    if (!modifiers) return false
    return !!modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  },
  isAbstract: (modifiers?: ts.ModifiersArray): boolean => {
    if (!modifiers) return false
    return !!modifiers.find((m) => m.kind === ts.SyntaxKind.AbstractKeyword)
  },
  accessLevel: (modifiers?: ts.ModifiersArray): PropertyAccessLevelType => {
    if (!modifiers) return PropertyAccessLevelType.NO_MODIFIER
    if (modifiers.find((m) => m.kind === ts.SyntaxKind.PublicKeyword)) return PropertyAccessLevelType.PUBLIC
    if (modifiers.find((m) => m.kind === ts.SyntaxKind.PrivateKeyword)) return PropertyAccessLevelType.PRIVATE
    if (modifiers.find((m) => m.kind === ts.SyntaxKind.ProtectedKeyword)) return PropertyAccessLevelType.PROTECTED
    return PropertyAccessLevelType.NO_MODIFIER
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
  checkIfThereAreAnyExports: ({ parsedSource }: { parsedSource: ts.SourceFile }): boolean => {
    return !!parsedSource.statements.find((s) => self._isViableExportableStatementKind(s.kind) && self.isExported(s.modifiers))
  },
  _isViableExportableStatementKind: (kind: number): boolean => {
    return [
      ts.SyntaxKind.TypeAliasDeclaration,
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.InterfaceDeclaration,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.VariableStatement,
      ts.SyntaxKind.VariableDeclarationList,
    ].includes(kind)
  },
  findClassRelations: ({
    statement,
    parsedSource,
    inProjectPath,
  }: {
    statement: ts.Statement
    parsedSource: ts.SourceFile
    inProjectPath: string
  }): Reference[] => {
    const extendImplements = (statement['heritageClauses'] ?? [])
      .map((heritage) => {
        const type = heritage.getText(parsedSource).split(' ')[0]
        return (heritage.types ?? []).map((t) => ({ type, name: t.expression.escapedText }))
      })
      .flat() as { type: 'implements' | 'extends'; name: string }[]
    if (extendImplements.length === 0) return []

    const fileImports = parsedSource.statements
      .map((statement) => new TsParserImport({ statement, inProjectPath }).parse())
      .flat()

    return extendImplements
      .map((ei) => {
        const fileImport = fileImports.find((fi) => {
          return fi.name === ei.name
        })
        if (!fileImport) {
          logger.warn(`Import not found for ${JSON.stringify(ei)}`)
          return
        }
        return new Reference({
          name: ei.name,
          type: ei.type === 'implements' ? ReferenceType.IMPLEMENTATION : ReferenceType.INHERITANCE,
          inProjectPath: fileImport.inProjectPath,
        })
      })
      .filter(Boolean) as Reference[]
  },
}

export const tsParserService = self
