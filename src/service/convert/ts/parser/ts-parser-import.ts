import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { fileService } from 'src/service/file-service'

export type TsParserImportParseResult = { name: string; inProjectPath: string }

export class TsParserImport implements Parsable<TsParserImportParseResult[]> {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string

  constructor({ statement, inProjectPath }: { statement: ts.Statement; inProjectPath: string }) {
    this._statement = statement
    this._inProjectPath = inProjectPath
  }

  public parse(): TsParserImportParseResult[] {
    const names: string[] = []
    const importClause = this._statement['importClause']
    if (!importClause) return []

    names.push(...this._parseDefaultImport(importClause))
    names.push(...this._parseBindingName(importClause))
    names.push(...this._parseElements(importClause.namedBindings?.elements))

    const importPath = `${this._statement['moduleSpecifier'].text}.ts`
    const importedInProjectPath = this._importedFileInProjectAbsPath(importPath)
    return names.map((name) => ({ name, inProjectPath: importedInProjectPath }))
  }
  protected _parseDefaultImport(importClause: any): string[] {
    if (importClause?.name?.escapedText) return [importClause.name.escapedText]
    return []
  }
  protected _parseBindingName(importClause: any): string[] {
    if (importClause?.namedBindings?.name?.escapedText) return [importClause.namedBindings.name.escapedText]
    return []
  }
  protected _parseElements(elements: any): string[] {
    if (!elements || elements.length === 0) return []
    return elements.map((e) => e.name?.escapedText).filter(Boolean)
  }

  protected _importedFileInProjectAbsPath(importPath: string): string {
    if (fileService.isAbsPath(importPath)) return importPath
    return fileService.importPathFind(this._inProjectPath, importPath)
  }
}
