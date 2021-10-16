import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsParserService } from 'src/service/convert/ts/statement-entity/parser/ts-parser-service'
import { TsMetaInterface, TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'

export const tsParserInterface = {
  parse: (statement: ts.Statement): TsStatementEntity<TsMetaInterface>[] => {
    const name = statement['name'].escapedText
    const isExported = tsParserService.isExported(statement.modifiers)

    return [
      {
        entityType: EntityType.INTERFACE,
        statement,
        name,
        meta: {
          isExported,
        },
      },
    ]
  },
}
