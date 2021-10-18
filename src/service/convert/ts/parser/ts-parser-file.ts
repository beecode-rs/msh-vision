import { EntityFile } from 'src/model/entity-file'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/convert/ts/parser/ts-parser-import'

export class TsParserFile implements Parsable {
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _inProjectPath: string
  protected readonly _fileName: string
  protected readonly _importParseResults: TsParserImportParseResult[]

  constructor(params: {
    parsedSource: ts.SourceFile
    inProjectPath: string
    fileName: string
    importParseResults: TsParserImportParseResult[]
  }) {
    const { parsedSource, inProjectPath, fileName, importParseResults } = params
    this._parsedSource = parsedSource
    this._inProjectPath = inProjectPath
    this._fileName = fileName
    this._importParseResults = importParseResults
  }

  public parse(): EntityFile[] {
    const entityFile = new EntityFile({
      name: this._fileName,
      inProjectPath: this._inProjectPath,
    })

    this._importParseResults.forEach(({ name, inProjectPath }: TsParserImportParseResult) =>
      entityFile.addAssociation({ name, inProjectPath })
    )
    return [entityFile]
  }
}
