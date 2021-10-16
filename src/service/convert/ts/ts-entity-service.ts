import { Entity, EntityType } from 'src/model/entity'
import { ImportReference } from 'src/model/import-reference'
import ts from 'src/module/ts'
import {
  TsMetaClass,
  TsMetaEnum,
  TsMetaImport,
  TsMetaObject,
  TsMetaType,
  TsStatementEntity,
} from 'src/service/convert/ts/statement-entity/ts-statement-entity'
import { tsStatementEntityService } from 'src/service/convert/ts/statement-entity/ts-statement-entity-service'
import { fileService } from 'src/service/file-service'

export const self = {
  extractEntities: ({ node, filePath, fileName }: { node: ts.SourceFile; filePath: string; fileName: string }): Entity[] => {
    const entities: Entity[] = []
    const statementEntities = node.statements.map((st) => tsStatementEntityService.factory(st)).flat()

    const importReferences = self._filterImports(statementEntities).map((se) => {
      const importFilePath = fileService.importPathFind(filePath, se.meta.path)
      return new ImportReference({ name: se.name, filePath: importFilePath })
    })

    entities.push(
      ...self._filterTypesEnumsInterfaces(statementEntities).map((se) => new Entity({ name: se.name, filePath }, se.entityType))
    )

    const exportedObjectsAndClasses = self._filterExportedObjectsAndClasses(statementEntities)
    if (exportedObjectsAndClasses.length > 0) {
      entities.push(
        ...exportedObjectsAndClasses.map((se) => new Entity({ name: se.name, filePath, importReferences }, se.entityType))
      )
    } else {
      entities.push(new Entity({ name: fileName, filePath, importReferences }, EntityType.FILE))
    }

    return entities
  },
  _filterImports: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaImport>[] => {
    return statements.filter((se) => se.entityType === EntityType.IMPORT) as TsStatementEntity<TsMetaImport>[]
  },
  _filterTypesEnumsInterfaces: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaType | TsMetaEnum>[] => {
    return statements.filter((se) =>
      [EntityType.TYPE, EntityType.ENUM, EntityType.INTERFACE].includes(se.entityType)
    ) as TsStatementEntity<TsMetaType | TsMetaEnum>[]
  },
  _filterExportedObjectsAndClasses: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaObject | TsMetaClass>[] => {
    const objectsAndClasses = statements.filter((se) =>
      [EntityType.OBJECT, EntityType.CLASS].includes(se.entityType)
    ) as TsStatementEntity<TsMetaObject | TsMetaClass>[]
    return objectsAndClasses.filter((se) => se.meta.isExported)
  },
}
export const tsEntityService = self
