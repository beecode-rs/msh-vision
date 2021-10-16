import ts from 'src/module/ts'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'

export const self = {
  checkIfThereAreAnyExports: ({ parsedSource }: { parsedSource: ts.SourceFile }): boolean => {
    return !!parsedSource.statements.find(
      (s) => self._isViableExportableStatementKind(s.kind) && tsParserService.isExported(s.modifiers)
    )
  },
  _isViableExportableStatementKind: (kind: number): boolean => {
    return [
      ts.SyntaxKind.TypeAliasDeclaration,
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.InterfaceDeclaration,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.VariableStatement,
      ts.SyntaxKind.VariableDeclarationList,
    ].includes(kind)
  },

  // extractEntities: ({
  //   parsedSource,
  //   inProjectPath,
  //   fileName,
  // }: {
  //   parsedSource: ts.SourceFile
  //   inProjectPath: string
  //   fileName: string
  // }): Entity[] => {
  //   const entities: Entity[] = []
  //   const statementEntities = parsedSource.statements.map((st) => tsStatementEntityService.factory(st)).flat()
  //
  //   // const importReferences = self._filterImports(statementEntities).map((se) => {
  //   //   const importFilePath = fileService.importPathFind(inProjectPath, se.meta.path)
  //   //   return new ImportReference({ name: se.name, filePath: importFilePath })
  //   // })
  //   //
  //   // entities.push(
  //   //   ...self
  //   //     ._filterTypesEnumsInterfaces(statementEntities)
  //   //     .map((se) => new Entity({ name: se.name, inProjectPath: inProjectPath }, se.entityType))
  //   // )
  //   //
  //   // const exportedObjectsAndClasses = self._filterExportedObjectsAndClasses(statementEntities)
  //   // if (exportedObjectsAndClasses.length > 0) {
  //   //   entities.push(
  //   //     ...exportedObjectsAndClasses.map(
  //   //       (se) => new Entity({ name: se.name, inProjectPath: inProjectPath, importReferences }, se.entityType)
  //   //     )
  //   //   )
  //   // } else {
  //   //   entities.push(new Entity({ name: fileName, inProjectPath: inProjectPath, importReferences }, EntityType.FILE))
  //   // }
  //
  //   return entities
  // },
  // _filterImports: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaImport>[] => {
  //   return statements.filter((se) => se.entityType === EntityType.IMPORT) as TsStatementEntity<TsMetaImport>[]
  // },
  // _filterTypesEnumsInterfaces: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaType | TsMetaEnum>[] => {
  //   return statements.filter((se) =>
  //     [EntityType.TYPE, EntityType.ENUM, EntityType.INTERFACE].includes(se.entityType)
  //   ) as TsStatementEntity<TsMetaType | TsMetaEnum>[]
  // },
  // _filterExportedObjectsAndClasses: (statements: TsStatementEntity<any>[]): TsStatementEntity<TsMetaObject | TsMetaClass>[] => {
  //   const objectsAndClasses = statements.filter((se) =>
  //     [EntityType.OBJECT, EntityType.CLASS].includes(se.entityType)
  //   ) as TsStatementEntity<TsMetaObject | TsMetaClass>[]
  //   return objectsAndClasses.filter((se) => se.meta.isExported)
  // },
}
export const tsEntityService = self
