import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserClass } from 'src/service/convert/ts/parser/ts-parser-class'
import { TsParserEnum } from 'src/service/convert/ts/parser/ts-parser-enum'
import { TsParserInterface } from 'src/service/convert/ts/parser/ts-parser-interface'
import { TsParserObject } from 'src/service/convert/ts/parser/ts-parser-object'
import { TsParserType } from 'src/service/convert/ts/parser/ts-parser-type'
import { logger } from 'src/util/logger'

export class TsEntityParser {
  protected readonly _parsedSource: ts.SourceFile
  protected readonly _fileName: string
  protected readonly _inProjectPath: string

  constructor({
    parsedSource,
    fileName,
    inProjectPath,
  }: {
    parsedSource: ts.SourceFile
    fileName: string
    inProjectPath: string
  }) {
    this._parsedSource = parsedSource
    this._fileName = fileName
    this._inProjectPath = inProjectPath
  }

  public parsedEntities(): Entity[] {
    const entities: Entity[] = []
    entities.push(...this._parseStatements())
    return entities
  }

  protected _parseStatements(): Entity[] {
    const entities = this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat()
    const entityWithJoins = this._joinEntitiesByAliasReference(entities)
    return entityWithJoins
  }

  protected _parseStatement(statement: ts.Statement): Entity[] {
    const parser = this._parserByStatementKind(statement)
    if (!parser) return []
    return parser.parse()
  }

  protected _parserByStatementKind(statement: ts.Statement): Parsable | undefined {
    switch (statement.kind) {
      case ts.SyntaxKind.TypeAliasDeclaration:
        return new TsParserType({ statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.ClassDeclaration:
        return new TsParserClass({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.InterfaceDeclaration:
        return new TsParserInterface({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.VariableStatement:
      case ts.SyntaxKind.VariableDeclarationList:
        return new TsParserObject({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.EnumDeclaration:
        return new TsParserEnum({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.ImportDeclaration:
        return undefined
      default:
        logger.warn(`Unknown parser for type "${ts.SyntaxKind[statement.kind]}"`)
        return undefined
    }
  }

  protected _joinEntitiesByAliasReference(entities: Entity[]): Entity[] {
    const withAliasRef = entities.filter(
      (entity) => entity instanceof EntityObject && (entity as EntityObject).AliasReference
    ) as EntityObject[]
    if (withAliasRef.length === 0) return entities

    const { aliasRef, other } = entities.reduce<{ aliasRef: Entity[]; other: Entity[] }>(
      (result, entity) => {
        if ((withAliasRef as Entity[]).includes(entity)) return result
        if (withAliasRef.map((e) => e.AliasReference).includes(entity.Name)) result.aliasRef.push(entity)
        else result.other.push(entity)
        return result
      },
      { aliasRef: [], other: [] }
    )
    if (aliasRef.length === 0) return entities

    const aliasedEntities = withAliasRef.map((entity) => {
      const foundJoin = aliasRef.find((e) => e.Name === entity.AliasReference)
      if (!foundJoin) throw new Error(`Join not found for entity ${JSON.stringify(entity)}`)
      foundJoin.renameEntity(entity.Name)
      return foundJoin
    })

    return [...other, ...aliasedEntities]
  }
}
