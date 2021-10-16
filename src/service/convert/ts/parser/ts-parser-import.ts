import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'

export type TsParserImportParseResult = { name: string; inProjectPath: string }

export class TsParserImport implements Parsable<TsParserImportParseResult[]> {
  protected readonly _statement: ts.Statement

  constructor({ statement }: { statement: ts.Statement }) {
    this._statement = statement
  }

  public parse(): TsParserImportParseResult[] {
    const names: string[] = []
    const importClause = this._statement['importClause']
    if (!importClause) return []

    names.push(...this._parseDefaultImport(importClause))
    names.push(...this._parseBindingName(importClause))
    names.push(...this._parseElements(importClause.namedBindings?.elements))

    const inProjectPath = `${this._statement['moduleSpecifier'].text}.ts`
    return names.map((name) => ({ name, inProjectPath }))
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
}
