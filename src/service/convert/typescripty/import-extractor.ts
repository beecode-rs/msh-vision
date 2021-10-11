import { ImportReference } from 'src/model/import-reference'
import { File, Import } from 'typescript-parser'
import { NamedImport } from 'typescript-parser/imports/NamedImport'

export const importExtractor = {
  extract: (file: File): ImportReference[] => {
    return file.imports.map(importExtractor._parseImports).flat()
  },
  _parseImports: (imp: Import): ImportReference[] => {
    return (imp as NamedImport).specifiers.map((spec) => importExtractor._importRefFromSpecifier({ imp, spec }))
  },
  _importRefFromSpecifier: ({
    imp: { libraryName },
    spec: { specifier, alias },
  }: {
    imp: { libraryName: string }
    spec: { specifier: string; alias?: string }
  }): ImportReference => {
    return new ImportReference({
      filePath: importExtractor._pathCleanup(libraryName),
      name: specifier,
      ...(alias && { alias }),
    })
  },
  _pathCleanup: (filePath: string): string => {
    const cleanCurrFolder = filePath.startsWith('./') ? filePath.slice(2) : filePath
    return `${cleanCurrFolder}.ts`
  },
}
