import { Entity } from 'src/model/entity'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserClass } from 'src/service/convert/ts/parser/ts-parser-class'
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
    return this._parsedSource.statements.map((statement) => this._parseStatement(statement)).flat()
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
        return new TsParserInterface({ statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.VariableStatement:
      case ts.SyntaxKind.VariableDeclarationList:
        return new TsParserObject({ parsedSource: this._parsedSource, statement, inProjectPath: this._inProjectPath })
      case ts.SyntaxKind.ImportDeclaration:
        return undefined
      default:
        logger.warn(`Unknown parser for type "${ts.SyntaxKind[statement.kind]}"`)
        return undefined
    }
  }
}
