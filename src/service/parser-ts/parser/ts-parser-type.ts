import { EntityTypes } from 'src/enum/entity-types'
import { ReferenceType } from 'src/enum/reference-type'
import { Entity } from 'src/model/entity'
import { EntityType } from 'src/model/entity-type'
import { Reference } from 'src/model/reference'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/parser-ts/parser/parsable'
import { TsParserImportParseResult } from 'src/service/parser-ts/parser/ts-parser-import'
import { tsParserImportRelations } from 'src/service/parser-ts/ts-parser-import-relations'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'

export class TsParserType implements Parsable {
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
    this._parsedSource = parsedSource
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._importParseResults = importParseResults ?? []
  }

  public parse(): Entity<EntityTypes.TYPE>[] {
    const name = this._statement['name'].escapedText
    const isExported = tsParserService.isExported(this._statement.modifiers)
    const returnType = this._statement['type'].getText(this._parsedSource)

    const imports = this._findImportRelations(this._statement['type'], this._importParseResults)

    return [
      new Entity({
        type: EntityTypes.TYPE,
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        references: [...imports],
        meta: new EntityType({
          returnType,
        }),
      }),
    ]
  }

  protected _findImportRelations(
    statement: ts.Statement | ts.VariableDeclaration,
    importParseResults: TsParserImportParseResult[]
  ): Reference[] {
    if (importParseResults.length === 0) return []
    return importParseResults
      .map((importParseResult) => {
        if (!this._findIdentifier(importParseResult.name, statement)) return
        return new Reference({
          name: importParseResult.name,
          inProjectPath: importParseResult.inProjectPath,
          type: ReferenceType.ASSOCIATION,
        })
      })
      .filter(Boolean) as Reference[]
  }

  protected _findIdentifier(identifierName: string, statement: any): boolean {
    if (statement.escapedText === identifierName) return true
    // if (!tsParserImportRelations.isDeclaration(statement) && statement.name?.escapedText === identifierName) return true
    // if (statement.expression?.right && statement.expression.right.escapedText === identifierName) return true
    // if (
    //   (statement.declarations ?? []).length > 0 &&
    //   statement.declarations.find((d) => d.initializer?.escapedText === identifierName)
    // ) {
    //   return true
    // }
    //
    // if (
    //   [ts.SyntaxKind.TypeLiteral, ts.SyntaxKind.TypeReference].includes(statement.kind) &&
    //   statement.typeName?.escapedText === identifierName
    // )
    //   return true

    if (
      this._stepIntoNode(identifierName, statement, ['checkType', 'extendsType', 'trueType', 'falseType', 'left', 'typeName'])
    ) {
      return true
    }
    // if (this._stepIntoArray(identifierName, statement, ['statements', 'members', 'clauses', 'properties'])) {
    //   return true
    // }

    // if (
    //   [ts.SyntaxKind.CallExpression, ts.SyntaxKind.CallExpression].includes(statement.kind) &&
    //   tsParserImportRelations.stepIntoArray(identifierName, statement, ['arguments'])
    // ) {
    //   return true
    // }
    //
    // if (
    //   [ts.SyntaxKind.Constructor].includes(statement.kind) &&
    //   tsParserImportRelations.stepIntoArray(identifierName, statement, ['parameters'])
    // ) {
    //   return true
    // }

    return false
  }

  protected _stepIntoNode(identifierName: string, statement: any, blockNames: string[]): boolean {
    return !!blockNames.find((block) => {
      return statement[block] && this._findIdentifier(identifierName, statement[block])
    })
  }
  protected _stepIntoArray(identifierName: string, statement: any, blockNames: string[]): boolean {
    return !!blockNames.find((block) => {
      return (statement[block] ?? []).length > 0 && statement[block].find((b) => this._findIdentifier(identifierName, b))
    })
  }
}
