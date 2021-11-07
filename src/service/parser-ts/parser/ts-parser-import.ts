import ts from 'src/module/ts'
import { filePathService } from 'src/service/file-path-service'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { tsConfigFileService } from 'src/service/parser-ts/ts-config-file-service'
import { constant } from 'src/util/constant'

export type TsParserImportParseResult = { name: string; inProjectPath: string }

export class TsParserImport implements Parsable<TsParserImportParseResult[]> {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string

  constructor(params: { statement: ts.Statement; inProjectPath: string }) {
    const { statement, inProjectPath } = params
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
    if (!filePathService.isDotPath(importPath)) return importPath
    return TsParserImport.ImportPathFind({ filePathImportedFrom: this._inProjectPath, importPath: importPath })
  }

  public static ImportPathFind(params: { filePathImportedFrom: string; importPath: string }): string {
    const { filePathImportedFrom, importPath } = params
    const resolvedImportPath = tsConfigFileService.moduleAliasResolve(importPath)
    const importedFromPath = filePathService.lastFolderFromPath(filePathImportedFrom)
    const importPathSplit = resolvedImportPath.split(constant.folderSep)
    const importedFromPathReverseSplit = importedFromPath.split(constant.folderSep).reverse()
    let equalPathSplitCount = 0
    for (const [ix, split] of Object.entries(importPathSplit)) {
      if (importedFromPathReverseSplit[ix] !== split) break
      equalPathSplitCount = +ix + 1
    }
    const cleanImportPath = importPathSplit.slice(equalPathSplitCount).join(constant.folderSep)
    return filePathService.joinPaths(importedFromPath, cleanImportPath)
  }
}
