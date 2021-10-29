import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserClass } from 'src/service/convert/ts/parser/ts-parser-class'
import { TsParserEnum } from 'src/service/convert/ts/parser/ts-parser-enum'
import { TsParserImportParseResult } from 'src/service/convert/ts/parser/ts-parser-import'
import { TsParserInterface } from 'src/service/convert/ts/parser/ts-parser-interface'
import { TsParserObject } from 'src/service/convert/ts/parser/ts-parser-object'
import { TsParserType } from 'src/service/convert/ts/parser/ts-parser-type'
import { logger } from 'src/util/logger'

export class TsEntityParser {
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _fileName: string
  protected readonly _inProjectPath: string
  protected readonly _importParseResults: TsParserImportParseResult[]

  constructor(params: {
    parsedSource: ts.SourceFile
    fileName: string
    inProjectPath: string
    importParseResults: TsParserImportParseResult[]
  }) {
    const { parsedSource, fileName, inProjectPath, importParseResults } = params
    this._parsedSource = parsedSource
    this._fileName = fileName
    this._inProjectPath = inProjectPath
    this._importParseResults = importParseResults
  }

  public parsedEntities(): Entity[] {
    const entities = this._parseStatements()
    const entityWithJoins = this._joinEntitiesByAliasReference(entities)

    return entityWithJoins
  }

  protected _parseStatements(): Entity[] {
    return this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat()
  }

  protected _parseStatement(statement: ts.Statement): Entity[] {
    const parser = this._parserByStatementKind(statement)
    if (!parser) return []
    return parser.parse()
  }

  protected _parserByStatementKind(statement: ts.Statement): Parsable | undefined {
    const parsedSource = this._parsedSource
    const inProjectPath = this._inProjectPath
    const importParseResults = this._importParseResults

    switch (statement.kind) {
      case ts.SyntaxKind.TypeAliasDeclaration:
        return new TsParserType({ parsedSource, statement, inProjectPath })
      case ts.SyntaxKind.ClassDeclaration:
        return new TsParserClass({ parsedSource, statement, inProjectPath, importParseResults })
      case ts.SyntaxKind.InterfaceDeclaration:
        return new TsParserInterface({ parsedSource, statement, inProjectPath })
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.VariableStatement:
      case ts.SyntaxKind.VariableDeclarationList:
        return new TsParserObject({ parsedSource, statement, inProjectPath, importParseResults })
      case ts.SyntaxKind.EnumDeclaration:
        return new TsParserEnum({ parsedSource, statement, inProjectPath })
      case ts.SyntaxKind.ImportDeclaration:
        return undefined
      default:
        logger.warn(`Unknown parser for type "${ts.SyntaxKind[statement.kind]}"`)
        return undefined
    }
  }

  protected _joinEntitiesByAliasReference(entities: Entity[]): Entity[] {
    const withAliasRef = entities.filter(
      (entity) => entity.Meta instanceof EntityObject && (entity.Meta as EntityObject).AliasReference
    )
    if (withAliasRef.length === 0) return entities

    const { aliasRef, other } = entities.reduce<{ aliasRef: Entity<EntityObject>[]; other: Entity[] }>(
      (result, entity) => {
        if (withAliasRef.includes(entity)) return result
        if (withAliasRef.map((e) => (e.Meta as EntityObject).AliasReference).includes(entity.Name)) result.aliasRef.push(entity)
        else result.other.push(entity)
        return result
      },
      { aliasRef: [], other: [] }
    )
    if (aliasRef.length === 0) return entities

    const aliasedEntities = withAliasRef.map((entity) => {
      const foundJoin = aliasRef.find((e) => e.Name === (entity.Meta as EntityObject).AliasReference)
      if (!foundJoin) throw new Error(`Join not found for entity ${JSON.stringify(entity)}`)
      const joinedEntity = new Entity({
        name: entity.Name,
        isExported: foundJoin.IsExported,
        inProjectPath: foundJoin.InProjectPath,
        meta: foundJoin.Meta,
      })
      return joinedEntity
    })

    return [...other, ...aliasedEntities]
  }
}
