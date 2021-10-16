import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsParserService } from 'src/service/convert/ts/statement-entity/parser/ts-parser-service'
import { TsMetaType, TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'

export const tsParserType = {
  parse: (statement: ts.Statement): TsStatementEntity<TsMetaType>[] => {
    const name = statement['name'].escapedText
    const isExported = tsParserService.isExported(statement.modifiers)

    return [
      {
        entityType: EntityType.TYPE,
        statement,
        name,
        meta: {
          isExported,
        },
      },
    ]
  },
}
