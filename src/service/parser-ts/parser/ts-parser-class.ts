import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { EntityClass } from 'src/model/entity-class'
import { Property } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/parser-ts/parser/ts-parser-import'
import { tsParserImportRelations } from 'src/service/parser-ts/ts-parser-import-relations'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'
import { constant } from 'src/util/constant'

export class TsParserClass implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _importParseResults: TsParserImportParseResult[]

  public constructor(params: {
    parsedSource: ts.SourceFile
    statement: ts.Statement
    inProjectPath: string
    importParseResults: TsParserImportParseResult[]
  }) {
    const { parsedSource, statement, inProjectPath, importParseResults } = params
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._parsedSource = parsedSource
    this._importParseResults = importParseResults ?? []
  }

  public parse(): Entity<EntityTypes.CLASS>[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const isAbstract = tsParserService.isAbstract(this._statement.modifiers)

    const classRefs = tsParserService.findClassRelations({
      statement: this._statement,
      parsedSource: this._parsedSource,
      inProjectPath: this._inProjectPath,
    })

    const classRefNames = classRefs.map((cr) => cr.Name)
    const imports = tsParserImportRelations.findImportRelations(
      this._statement,
      this._importParseResults.filter((ipr) => !classRefNames.includes(ipr.name))
    )

    const properties = this._findProperties()

    return [
      new Entity({
        type: EntityTypes.CLASS,
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        references: [...imports, ...classRefs],
        meta: new EntityClass({
          isAbstract,
          properties,
        }),
      }),
    ]
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
      .map((p) => p.split(constant.newRow).join('\\n'))
      .join(', ')
      .split(constant.newRow)
      .join('')
  }
}
