import { EntityTypes } from 'src/enum/entity-types'
import { ReferenceType } from 'src/enum/reference-type'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert-ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/convert-ts/parser/ts-parser-import'
import { Entity } from 'src/service/model/entity'
import { Reference } from 'src/service/model/reference'

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

  public parse(): Entity<EntityTypes.FILE>[] {
    const references = this._importParseResults.map(
      ({ name, inProjectPath }) => new Reference({ name, inProjectPath, type: ReferenceType.ASSOCIATION })
    )
    return [
      new Entity({
        type: EntityTypes.FILE,
        name: this._fileName,
        inProjectPath: this._inProjectPath,
        isExported: true,
        references,
        meta: undefined,
      }),
    ]
  }
}
