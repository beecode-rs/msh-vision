import { ExportReference } from 'src/model/export-reference'
import { File } from 'typescript-parser'

export const exportExtractor = {
  extract: (file: File): ExportReference[] => {
    return [...file.exports.map(exportExtractor._parseExport), ...exportExtractor._parseDeclarations(file.declarations)]
  },
  _parseExport: (exp: any): ExportReference => {
    return new ExportReference(exp.specifiers.map((s) => s.specifier))
  },
  _parseDeclarations: (declarations: any[]): ExportReference[] => {
    return declarations.filter((d) => d.isExported).map((d: any) => new ExportReference({ name: d.name }))
  },
}
