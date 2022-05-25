import { EntityTypes } from 'src/enum/entity-types'
import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'
import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/parser-ts/parser/ts-parser-import'
import { tsParserImportRelations } from 'src/service/parser-ts/ts-parser-import-relations'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'
import { TsParsingError } from 'src/service/parser-ts/ts-parsing-error'

export class TsParserObject implements Parsable {
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

  public parse(): Entity<EntityTypes.OBJECT>[] {
    const result = this._nameFromDeclarationsList(this._statement['declarationList'])
    if (!result) throw new Error('Could not parse object from statement')
    const { name, declaration } = result
    if (!name) return []
    const properties = this._findProperties(declaration?.initializer?.['properties'])
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const aliasReference = this._aliasReferenceName(declaration)

    const imports = tsParserImportRelations.findImportRelations(declaration, this._importParseResults)

    return [
      new Entity({
        type: EntityTypes.OBJECT,
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

  protected _aliasReferenceName(declaration: any): string {
    if (declaration.initializer?.kind !== ts.SyntaxKind.Identifier) return ''
    if (declaration.initializer['escapedText'] === 'undefined') return ''
    return declaration.initializer['escapedText']
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
    try {
      if (!properties) return []
      return properties
        .map((property) => {
          if (!property.name) return // TODO solve the spread operator problem in objects, skipping for now
          const name = property.name.escapedText ?? property.name.text
          const accessLevel = this._accessLevel(name)
          const returnType = this._returnTypeValue(property)
          const functionParams =
            (property.initializer?.parameters ?? []).length === 0
              ? undefined
              : property.initializer.parameters.map((p) => p.getText(this._parsedSource)).join(', ')
          return new Property({
            name,
            accessLevel,
            returnType,
            functionParams,
          })
        })
        .filter(Boolean) as Property[]
    } catch (error) {
      if (error instanceof Error) throw new TsParsingError(error, 'find property', properties)
      throw error
    }
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
