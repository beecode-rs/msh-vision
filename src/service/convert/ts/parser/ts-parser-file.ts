import { EntityFile } from 'src/model/entity-file'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserImport, TsParserImportParseResult } from 'src/service/convert/ts/parser/ts-parser-import'

export class TsParserFile implements Parsable {
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _inProjectPath: string
  protected readonly _fileName: string

  constructor({
    parsedSource,
    inProjectPath,
    fileName,
  }: {
    parsedSource: ts.SourceFile
    inProjectPath: string
    fileName: string
  }) {
    this._parsedSource = parsedSource
    this._inProjectPath = inProjectPath
    this._fileName = fileName
  }

  public parse(): EntityFile[] {
    const entityFile = new EntityFile({
      name: this._fileName,
      inProjectPath: this._inProjectPath,
    })
    const imports = this._importsFromStatements()
    imports.forEach(({ name, inProjectPath }: TsParserImportParseResult) => entityFile.addAssociation({ name, inProjectPath }))
    return [entityFile]
  }

  protected _importsFromStatements(): TsParserImportParseResult[] {
    return this._parsedSource.statements
      .map((s) => this._importsFromStatement(s))
      .filter(Boolean)
      .flat()
  }
  protected _importsFromStatement(statement: ts.Statement): TsParserImportParseResult[] {
    if (statement.kind != ts.SyntaxKind.ImportDeclaration) return []
    return new TsParserImport({ statement, inProjectPath: this._inProjectPath }).parse()
  }
}
