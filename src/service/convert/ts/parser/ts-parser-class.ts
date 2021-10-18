import { EntityClass } from 'src/model/entity-class'
import { Property } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'
import { constant } from 'src/util/constant'

export class TsParserClass implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile

  constructor(params: { parsedSource: ts.SourceFile; statement: ts.Statement; inProjectPath: string }) {
    const { parsedSource, statement, inProjectPath } = params
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._parsedSource = parsedSource
  }

  public parse(): EntityClass[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const isAbstract = tsParserService.isAbstract(this._statement.modifiers)

    const references = tsParserService.findClassRelations({
      statement: this._statement,
      parsedSource: this._parsedSource,
      inProjectPath: this._inProjectPath,
    })
    const properties = this._findProperties()

    const entityClass = new EntityClass({
      name,
      inProjectPath: this._inProjectPath,
      isExported,
      isAbstract,
      references,
      properties,
    })

    return [entityClass]
  }

  protected _findProperties(): Property[] {
    return this._statement['members'].map((member) => {
      const name = member.kind === ts.SyntaxKind.Constructor ? 'constructor' : member.name.escapedText
      const returnType = member.kind === ts.SyntaxKind.Constructor ? '' : this._returnTypeValue(member)

      const accessLevel = tsParserService.accessLevel(member.modifiers)
      const isAbstract = tsParserService.isAbstract(member.modifiers)
      const functionParams = this._propertiesToString(member.parameters)
      return new Property({
        name,
        isAbstract,
        accessLevel,
        returnType,
        functionParams,
      })
    })
  }

  protected _returnTypeValue(member: any): string {
    if (member.type) return member.type.getText(this._parsedSource)
    if (member.initializer?.text) return ` = ${member.initializer.text}`
    return ''
  }

  protected _propertiesToString(parameters?: any[]): string {
    if ((parameters ?? []).length === 0) return ''
    return (parameters ?? [])
      .map((p) => p.getText(this._parsedSource))
      .join(', ')
      .split(constant.newRow)
      .join('')
  }
}
