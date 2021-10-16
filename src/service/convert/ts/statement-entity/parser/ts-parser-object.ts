import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsParserService } from 'src/service/convert/ts/statement-entity/parser/ts-parser-service'
import { TsMetaObject, TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'

export const tsParserObject = {
  parse: (statement: ts.Statement): TsStatementEntity<TsMetaObject>[] => {
    const result = tsParserService.nameFromDeclarationsList(statement['declarationList'])
    if (!result) throw new Error('Could not parse object from statement')
    const { name, declaration } = result
    const properties = tsParserService.propertiesFromInitializer(declaration.initializer)
    const isExported = tsParserService.isExported(statement.modifiers)

    return [
      {
        entityType: EntityType.OBJECT,
        statement,
        name,
        meta: {
          isExported,
          properties,
        },
      },
    ]
  },
}
