import ts from 'src/module/ts'

const self = {
  isExported: (modifiers?: ts.ModifiersArray): boolean => {
    if (!modifiers) return false
    return !!modifiers.find((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  },
  propertiesFromInitializer: (initializer: ts.Expression | any): string[] => {
    return (initializer.properties ?? []).map((p) => p.name.escapedText)
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
}

export const tsParserService = self
