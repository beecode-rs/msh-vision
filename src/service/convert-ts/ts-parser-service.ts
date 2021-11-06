import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'
import { ReferenceType } from 'src/enum/reference-type'
import ts from 'src/module/ts'
import { TsParserImport, TsParserImportParseResult } from 'src/service/convert-ts/parser/ts-parser-import'
import { Reference } from 'src/service/model/reference'
import { logger } from 'src/util/logger'

const _self = {
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
  checkIfThereAreAnyExports: (parsedSource: ts.SourceFile): boolean => {
    return !!parsedSource.statements.find((s) => _self._isViableExportableStatementKind(s.kind) && _self.isExported(s.modifiers))
  },
  _isViableExportableStatementKind: (kind: number): boolean => {
    return [
      ts.SyntaxKind.TypeAliasDeclaration,
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.InterfaceDeclaration,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.VariableStatement,
      ts.SyntaxKind.VariableDeclarationList,
      ts.SyntaxKind.EnumDeclaration,
    ].includes(kind)
  },
  findClassRelations: (params: { statement: ts.Statement; parsedSource: ts.SourceFile; inProjectPath: string }): Reference[] => {
    const { statement, parsedSource, inProjectPath } = params
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
  importsFromStatements: (params: { parsedSource: ts.SourceFile; inProjectPath: string }): TsParserImportParseResult[] => {
    const { parsedSource, inProjectPath } = params
    return parsedSource.statements
      .map((statement) => _self.importsFromStatement({ statement, inProjectPath }))
      .filter(Boolean)
      .flat()
  },
  importsFromStatement: (params: { statement: ts.Statement; inProjectPath: string }): TsParserImportParseResult[] => {
    const { statement, inProjectPath } = params
    if (statement.kind != ts.SyntaxKind.ImportDeclaration) return []
    return new TsParserImport({ statement, inProjectPath }).parse()
  },
  entityLinksFromStatements: (params: { parsedSource: ts.SourceFile; inProjectPath: string }): TsParserImportParseResult[] => {
    const { parsedSource, inProjectPath } = params
    return parsedSource.statements
      .map((statement) => _self.entityLinksFromStatement({ statement, inProjectPath }))
      .filter(Boolean)
      .flat()
  },
  entityLinksFromStatement: (params: { statement: ts.Statement; inProjectPath: string }): TsParserImportParseResult[] => {
    const { statement, inProjectPath } = params
    if (!_self._isViableExportableStatementKind(statement.kind)) return []

    // TODO find a better solution to finding entity links
    if (statement['name']) return [{ name: statement['name'].escapedText, inProjectPath }]
    if (statement['declarationList'] && statement['declarationList'].declarations[0].name.escapedText)
      return [{ name: statement['declarationList'].declarations[0].name.escapedText, inProjectPath }]

    return []
  },
}

export const tsParserService = _self
