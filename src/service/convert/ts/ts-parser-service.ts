import ts from 'src/module/ts'

export const tsParserService = {
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
}
