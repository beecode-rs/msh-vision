import { EntityObject } from 'src/model/entity-object'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export class TsParserObject implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string

  constructor({ statement, inProjectPath }: { statement: ts.Statement; inProjectPath: string }) {
    this._statement = statement
    this._inProjectPath = inProjectPath
  }

  public parse(): EntityObject[] {
    const result = tsParserService.nameFromDeclarationsList(this._statement['declarationList'])
    if (!result) throw new Error('Could not parse object from statement')
    const { name, declaration } = result
    // const properties = tsParserService.propertiesFromInitializer(declaration.initializer)
    const isExported = tsParserService.isExported(this._statement.modifiers)

    return [
      new EntityObject({
        name,
        inProjectPath: this._inProjectPath,
        isExported,
      }),
    ]
  }
}
