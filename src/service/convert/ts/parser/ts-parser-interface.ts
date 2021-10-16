import { EntityInterface } from 'src/model/entity-interface'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export class TsParserInterface implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string

  constructor({ statement, inProjectPath }: { statement: ts.Statement; inProjectPath: string }) {
    this._statement = statement
    this._inProjectPath = inProjectPath
  }

  public parse(): EntityInterface[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)

    return [
      new EntityInterface({
        name,
        inProjectPath: this._inProjectPath,
        isExported,
      }),
    ]
  }
}
