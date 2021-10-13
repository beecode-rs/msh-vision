import { Entity } from 'src/model/entity'
import ts from 'src/module/ts'
import { tsStatementEntityService } from 'src/service/convert/ts/statement-entity/ts-statement-entity-service'

export const tsEntityService = {
  extractEntities: ({ node, filePath }: { node: ts.SourceFile; filePath: string }): Entity[] => {
    // const entities: Entity[] = []

    const statementEntities = node.statements.map(tsStatementEntityService.factory)

    return []
  },
}
