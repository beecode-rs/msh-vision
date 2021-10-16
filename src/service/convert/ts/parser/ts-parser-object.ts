import { EntityObject } from 'src/model/entity-object'
import { Property, PropertyAccessLevelType } from 'src/model/property'
import ts from 'src/module/ts'
import { Parsable } from 'src/service/convert/ts/parser/parsable'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export class TsParserObject implements Parsable {
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

  public parse(): EntityObject[] {
    const result = tsParserService.nameFromDeclarationsList(this._statement['declarationList'])
    if (!result) throw new Error('Could not parse object from statement')
    const { name, declaration } = result
    const properties = this._findProperties(declaration?.initializer?.['properties'])
    const isExported = tsParserService.isExported(this._statement.modifiers)

    return [
      new EntityObject({
        name,
        inProjectPath: this._inProjectPath,
        isExported,
        properties,
      }),
    ]
  }

  protected _findProperties(properties?: any[]): Property[] {
    if (!properties) return []
    return properties.map((property) => {
      const name = property.name.escapedText
      const accessLevel = this._accessLevel(name)
      // const returnType = property.initializer.type.getText(this._parsedSource)
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
