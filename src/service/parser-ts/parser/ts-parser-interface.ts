import { EntityTypes } from 'src/enum/entity-types'
import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'
import { Entity } from 'src/model/entity'
import { EntityInterface } from 'src/model/entity-interface'
import { Property } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'

export class TsParserInterface implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile

  public constructor(params: { parsedSource: ts.SourceFile; statement: ts.Statement; inProjectPath: string }) {
    const { parsedSource, statement, inProjectPath } = params
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._parsedSource = parsedSource
  }

  public parse(): Entity<EntityTypes.INTERFACE>[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)

    const references = tsParserService.findClassRelations({
      statement: this._statement,
      parsedSource: this._parsedSource,
      inProjectPath: this._inProjectPath,
    })
    const properties = this._findProperties()

    return [
      new Entity({
        type: EntityTypes.INTERFACE,
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        meta: new EntityInterface({
          references,
          properties,
        }),
      }),
    ]
  }

  protected _findProperties(): Property[] {
    return this._statement['members'].map((member) => {
      const name = member.name.escapedText
      const returnType = member.type.getText(this._parsedSource)
      const functionParams =
        (member.parameters ?? []).length === 0
          ? undefined
          : member.parameters.map((p) => p.getText(this._parsedSource)).join(', ')
      return new Property({
        name,
        accessLevel: PropertyAccessLevelType.PUBLIC,
        returnType,
        functionParams,
      })
    })
  }
}
