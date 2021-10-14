import { Entity, EntityType } from 'src/model/entity'
import { ImportReference } from 'src/model/import-reference'
import ts from 'src/module/ts'
import { tsStatementEntityService } from 'src/service/convert/ts/statement-entity/ts-statement-entity-service'
import { fileService } from 'src/service/file-service'

export const tsEntityService = {
  extractEntities: ({ node, filePath }: { node: ts.SourceFile; filePath: string }): Entity[] => {
    const entities: Entity[] = []

    const statementEntities = node.statements.map((st) => tsStatementEntityService.factory(st, node.fileName))

    const importReferences = statementEntities
      .filter((se) => se.entityType === EntityType.IMPORT)
      .map((se) => {
        const importFilePath = fileService.importPathFind(filePath, se.path)
        return new ImportReference({ name: se.name, filePath: importFilePath })
      })

    entities.push(
      ...statementEntities
        .filter((se) => [EntityType.TYPE, EntityType.ENUM].includes(se.entityType))
        .map((se) => new Entity({ name: se.name, filePath }, se.entityType))
    )

    const exportedObjectsAndClasses = statementEntities.filter(
      (se) => se.isExported && [EntityType.OBJECT, EntityType.CLASS].includes(se.entityType)
    )
    if (exportedObjectsAndClasses.length > 0) {
      entities.push(
        ...exportedObjectsAndClasses.map((se) => new Entity({ name: se.name, filePath, importReferences }, se.entityType))
      )
    } else {
      entities.push(new Entity({ name: `${node.fileName}.ts`, filePath, importReferences }, EntityType.FILE))
    }

    return entities
  },
}
