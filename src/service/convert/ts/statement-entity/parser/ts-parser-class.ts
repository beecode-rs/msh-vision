import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsParserService } from 'src/service/convert/ts/statement-entity/parser/ts-parser-service'
import { TsMetaClass, TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'

export const tsParserClass = {
  parse: (statement: ts.Statement): TsStatementEntity<TsMetaClass>[] => {
    const name = statement['name'].escapedText
    const properties = statement['members'].map((m) => m.name?.escapedText)
    const isExported = tsParserService.isExported(statement.modifiers)

    return [
      {
        entityType: EntityType.CLASS,
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
