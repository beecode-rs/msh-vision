import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { EntityEnum } from 'src/model/entity-enum'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'

export class TsParserEnum implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile

  constructor(params: { parsedSource: ts.SourceFile; statement: ts.Statement; inProjectPath: string }) {
    const { parsedSource, statement, inProjectPath } = params
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._parsedSource = parsedSource
  }

  public parse(): Entity<EntityTypes.ENUM>[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)

    const properties = (this._statement['members'] ?? []).map((m) => m.getText(this._parsedSource))

    return [
      new Entity({
        type: EntityTypes.ENUM,
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        meta: new EntityEnum({
          properties,
        }),
      }),
    ]
  }
}
