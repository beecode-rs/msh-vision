import { Entity } from 'src/model/entity'
import { EntityType } from 'src/model/entity-type'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export class TsParserType implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile

  constructor(params: { parsedSource: ts.SourceFile; statement: ts.Statement; inProjectPath: string }) {
    const { parsedSource, statement, inProjectPath } = params
    this._parsedSource = parsedSource
    this._statement = statement
    this._inProjectPath = inProjectPath
  }

  public parse(): Entity<EntityType>[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const returnType = this._statement['type'].getText(this._parsedSource)

    return [
      new Entity({
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        meta: new EntityType({
          returnType,
        }),
      }),
    ]
  }
}
