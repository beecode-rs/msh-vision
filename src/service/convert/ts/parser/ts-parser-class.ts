import { ReferenceType } from 'src/enum/reference-type'
import { EntityClass } from 'src/model/entity-class'
import { Reference } from 'src/model/reference'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { TsParserImport } from 'src/service/convert/ts/parser/ts-parser-import'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'
import { logger } from 'src/util/logger'

export class TsParserClass implements Parsable {
  protected readonly _statement: ts.Statement
  protected readonly _inProjectPath: string
  protected readonly _parsedSource: ts.SourceFile

  constructor({
    parsedSource,
    statement,
    inProjectPath,
  }: {
    parsedSource: ts.SourceFile
    statement: ts.Statement
    inProjectPath: string
  }) {
    this._statement = statement
    this._inProjectPath = inProjectPath
    this._parsedSource = parsedSource
  }

  public parse(): EntityClass[] {
    const name = this._statement['name'].escapedText
    // const properties = this._statement['members'].map((m) => m.name?.escapedText)
    const isExported = tsParserService.isExported(this._statement.modifiers)

    const references = this._findRelations()

    const entityClass = new EntityClass({
      name,
      inProjectPath: this._inProjectPath,
      isExported,
      references,
    })

    return [entityClass]
  }

  protected _findRelations(): Reference[] {
    const extendImplements = (this._statement['heritageClauses'] ?? [])
      .map((heritage) => {
        const type = heritage.getText(this._parsedSource).split(' ')[0]
        return (heritage.types ?? []).map((t) => ({ type, name: t.expression.escapedText }))
      })
      .flat() as { type: 'implements' | 'extends'; name: string }[]
    if (extendImplements.length === 0) return []

    const fileImports = this._parsedSource.statements
      .map((statement) => new TsParserImport({ statement, inProjectPath: this._inProjectPath }).parse())
      .flat()

    return extendImplements
      .map((ei) => {
        const fileImport = fileImports.find((fi) => {
          return fi.name === ei.name
        })
        if (!fileImport) {
          logger.warn(`Import not found for ${JSON.stringify(ei)}`)
          return
        }
        return new Reference({
          name: ei.name,
          type: ei.type === 'implements' ? ReferenceType.IMPLEMENTATION : ReferenceType.INHERITANCE,
          inProjectPath: fileImport.inProjectPath,
        })
      })
      .filter(Boolean) as Reference[]
  }
}
