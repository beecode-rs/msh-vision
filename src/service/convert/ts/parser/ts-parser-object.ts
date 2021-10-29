import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'
import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/convert/ts/parser/ts-parser-import'
import { tsParserImportRelations } from 'src/service/convert/ts/ts-parser-import-relations'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export class TsParserObject implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _importParseResults: TsParserImportParseResult[]

  constructor(params: {
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

  public parse(): Entity<EntityObject>[] {
    const result = this._nameFromDeclarationsList(this._statement['declarationList'])
    if (!result) throw new Error('Could not parse object from statement')
    const { name, declaration } = result
    const properties = this._findProperties(declaration?.initializer?.['properties'])
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const aliasReference =
      declaration.initializer?.kind === ts.SyntaxKind.Identifier ? declaration.initializer['escapedText'] : ''

    const imports = tsParserImportRelations.findImportRelations(declaration, this._importParseResults)

    return [
      new Entity({
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        references: [...imports],
        meta: new EntityObject({
          properties,
          aliasReference,
        }),
      }),
    ]
  }

  protected _nameFromDeclarationsList(
    declarationList: ts.VariableDeclarationList
  ): { name: string; declaration: ts.VariableDeclaration } | undefined {
    if (!declarationList?.declarations) return
    const decl = declarationList.declarations.find((d) => d.name)
    if (!decl) return
    return {
      name: decl.name['escapedText'],
      declaration: decl,
    }
  }

  protected _findProperties(properties?: any[]): Property[] {
    if (!properties) return []
    return properties.map((property) => {
      const name = property.name.escapedText
      const accessLevel = this._accessLevel(name)
      const returnType = this._returnTypeValue(property)
      const functionParams =
        (property.initializer.parameters ?? []).length === 0
          ? undefined
          : property.initializer.parameters.map((p) => p.getText(this._parsedSource)).join(', ')
      return new Property({
        name,
        accessLevel,
        returnType,
        functionParams,
      })
    })
  }

  protected _accessLevel(propName: string): PropertyAccessLevelType {
    if (propName.startsWith('__')) return PropertyAccessLevelType.PRIVATE
    if (propName.startsWith('_')) return PropertyAccessLevelType.PROTECTED
    return PropertyAccessLevelType.PUBLIC
  }

  protected _returnTypeValue(property: any): string {
    if (property.initializer?.type) return property.initializer.type.getText(this._parsedSource)
    if (property.initializer?.expression) return property.initializer.expression.getText(this._parsedSource)
    return ''
  }
}
