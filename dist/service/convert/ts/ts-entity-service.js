"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsEntityService = exports.self = void 0;
const ts_1 = __importDefault(require("src/module/ts"));
const ts_parser_service_1 = require("src/service/convert/ts/ts-parser-service");
exports.self = {
    checkIfThereAreAnyExports: ({ parsedSource }) => {
        return !!parsedSource.statements.find((s) => exports.self._isViableExportableStatementKind(s.kind) && ts_parser_service_1.tsParserService.isExported(s.modifiers));
    },
    _isViableExportableStatementKind: (kind) => {
        return [
            ts_1.default.SyntaxKind.TypeAliasDeclaration,
            ts_1.default.SyntaxKind.ClassDeclaration,
            ts_1.default.SyntaxKind.InterfaceDeclaration,
            ts_1.default.SyntaxKind.VariableDeclaration,
            ts_1.default.SyntaxKind.VariableStatement,
            ts_1.default.SyntaxKind.VariableDeclarationList,
        ].includes(kind);
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
};
exports.tsEntityService = exports.self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZW50aXR5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZS9jb252ZXJ0L3RzL3RzLWVudGl0eS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVEQUE4QjtBQUM5QixnRkFBMEU7QUFFN0QsUUFBQSxJQUFJLEdBQUc7SUFDbEIseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBbUMsRUFBVyxFQUFFO1FBQ3hGLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxtQ0FBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ2hHLENBQUE7SUFDSCxDQUFDO0lBQ0QsZ0NBQWdDLEVBQUUsQ0FBQyxJQUFZLEVBQVcsRUFBRTtRQUMxRCxPQUFPO1lBQ0wsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7WUFDbEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0I7WUFDOUIsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0I7WUFDbEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7WUFDakMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7WUFDL0IsWUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7U0FDdEMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEIsQ0FBQztJQUVELHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxPQUFPO0lBQ1AsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixxQkFBcUI7SUFDckIsb0JBQW9CO0lBQ3BCLGtDQUFrQztJQUNsQywrR0FBK0c7SUFDL0csRUFBRTtJQUNGLHFGQUFxRjtJQUNyRix3RkFBd0Y7SUFDeEYsaUZBQWlGO0lBQ2pGLFVBQVU7SUFDVixPQUFPO0lBQ1Asc0JBQXNCO0lBQ3RCLGlCQUFpQjtJQUNqQiwyREFBMkQ7SUFDM0Qsb0dBQW9HO0lBQ3BHLFNBQVM7SUFDVCxPQUFPO0lBQ1Asa0dBQWtHO0lBQ2xHLG1EQUFtRDtJQUNuRCx3QkFBd0I7SUFDeEIsNkNBQTZDO0lBQzdDLGtIQUFrSDtJQUNsSCxhQUFhO0lBQ2IsV0FBVztJQUNYLGdCQUFnQjtJQUNoQix3SEFBd0g7SUFDeEgsU0FBUztJQUNULEVBQUU7SUFDRixvQkFBb0I7SUFDcEIsS0FBSztJQUNMLGlHQUFpRztJQUNqRywrR0FBK0c7SUFDL0csS0FBSztJQUNMLHlIQUF5SDtJQUN6SCxxQ0FBcUM7SUFDckMsdUZBQXVGO0lBQ3ZGLHNEQUFzRDtJQUN0RCxLQUFLO0lBQ0wsaUlBQWlJO0lBQ2pJLHdEQUF3RDtJQUN4RCxvRUFBb0U7SUFDcEUseURBQXlEO0lBQ3pELGdFQUFnRTtJQUNoRSxLQUFLO0NBQ04sQ0FBQTtBQUNZLFFBQUEsZUFBZSxHQUFHLFlBQUksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cyBmcm9tICdzcmMvbW9kdWxlL3RzJ1xuaW1wb3J0IHsgdHNQYXJzZXJTZXJ2aWNlIH0gZnJvbSAnc3JjL3NlcnZpY2UvY29udmVydC90cy90cy1wYXJzZXItc2VydmljZSdcblxuZXhwb3J0IGNvbnN0IHNlbGYgPSB7XG4gIGNoZWNrSWZUaGVyZUFyZUFueUV4cG9ydHM6ICh7IHBhcnNlZFNvdXJjZSB9OiB7IHBhcnNlZFNvdXJjZTogdHMuU291cmNlRmlsZSB9KTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuICEhcGFyc2VkU291cmNlLnN0YXRlbWVudHMuZmluZChcbiAgICAgIChzKSA9PiBzZWxmLl9pc1ZpYWJsZUV4cG9ydGFibGVTdGF0ZW1lbnRLaW5kKHMua2luZCkgJiYgdHNQYXJzZXJTZXJ2aWNlLmlzRXhwb3J0ZWQocy5tb2RpZmllcnMpXG4gICAgKVxuICB9LFxuICBfaXNWaWFibGVFeHBvcnRhYmxlU3RhdGVtZW50S2luZDogKGtpbmQ6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB0cy5TeW50YXhLaW5kLlR5cGVBbGlhc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uLFxuICAgICAgdHMuU3ludGF4S2luZC5JbnRlcmZhY2VEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVEZWNsYXJhdGlvbixcbiAgICAgIHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQsXG4gICAgICB0cy5TeW50YXhLaW5kLlZhcmlhYmxlRGVjbGFyYXRpb25MaXN0LFxuICAgIF0uaW5jbHVkZXMoa2luZClcbiAgfSxcblxuICAvLyBleHRyYWN0RW50aXRpZXM6ICh7XG4gIC8vICAgcGFyc2VkU291cmNlLFxuICAvLyAgIGluUHJvamVjdFBhdGgsXG4gIC8vICAgZmlsZU5hbWUsXG4gIC8vIH06IHtcbiAgLy8gICBwYXJzZWRTb3VyY2U6IHRzLlNvdXJjZUZpbGVcbiAgLy8gICBpblByb2plY3RQYXRoOiBzdHJpbmdcbiAgLy8gICBmaWxlTmFtZTogc3RyaW5nXG4gIC8vIH0pOiBFbnRpdHlbXSA9PiB7XG4gIC8vICAgY29uc3QgZW50aXRpZXM6IEVudGl0eVtdID0gW11cbiAgLy8gICBjb25zdCBzdGF0ZW1lbnRFbnRpdGllcyA9IHBhcnNlZFNvdXJjZS5zdGF0ZW1lbnRzLm1hcCgoc3QpID0+IHRzU3RhdGVtZW50RW50aXR5U2VydmljZS5mYWN0b3J5KHN0KSkuZmxhdCgpXG4gIC8vXG4gIC8vICAgLy8gY29uc3QgaW1wb3J0UmVmZXJlbmNlcyA9IHNlbGYuX2ZpbHRlckltcG9ydHMoc3RhdGVtZW50RW50aXRpZXMpLm1hcCgoc2UpID0+IHtcbiAgLy8gICAvLyAgIGNvbnN0IGltcG9ydEZpbGVQYXRoID0gZmlsZVNlcnZpY2UuaW1wb3J0UGF0aEZpbmQoaW5Qcm9qZWN0UGF0aCwgc2UubWV0YS5wYXRoKVxuICAvLyAgIC8vICAgcmV0dXJuIG5ldyBJbXBvcnRSZWZlcmVuY2UoeyBuYW1lOiBzZS5uYW1lLCBmaWxlUGF0aDogaW1wb3J0RmlsZVBhdGggfSlcbiAgLy8gICAvLyB9KVxuICAvLyAgIC8vXG4gIC8vICAgLy8gZW50aXRpZXMucHVzaChcbiAgLy8gICAvLyAgIC4uLnNlbGZcbiAgLy8gICAvLyAgICAgLl9maWx0ZXJUeXBlc0VudW1zSW50ZXJmYWNlcyhzdGF0ZW1lbnRFbnRpdGllcylcbiAgLy8gICAvLyAgICAgLm1hcCgoc2UpID0+IG5ldyBFbnRpdHkoeyBuYW1lOiBzZS5uYW1lLCBpblByb2plY3RQYXRoOiBpblByb2plY3RQYXRoIH0sIHNlLmVudGl0eVR5cGUpKVxuICAvLyAgIC8vIClcbiAgLy8gICAvL1xuICAvLyAgIC8vIGNvbnN0IGV4cG9ydGVkT2JqZWN0c0FuZENsYXNzZXMgPSBzZWxmLl9maWx0ZXJFeHBvcnRlZE9iamVjdHNBbmRDbGFzc2VzKHN0YXRlbWVudEVudGl0aWVzKVxuICAvLyAgIC8vIGlmIChleHBvcnRlZE9iamVjdHNBbmRDbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgLy8gICAvLyAgIGVudGl0aWVzLnB1c2goXG4gIC8vICAgLy8gICAgIC4uLmV4cG9ydGVkT2JqZWN0c0FuZENsYXNzZXMubWFwKFxuICAvLyAgIC8vICAgICAgIChzZSkgPT4gbmV3IEVudGl0eSh7IG5hbWU6IHNlLm5hbWUsIGluUHJvamVjdFBhdGg6IGluUHJvamVjdFBhdGgsIGltcG9ydFJlZmVyZW5jZXMgfSwgc2UuZW50aXR5VHlwZSlcbiAgLy8gICAvLyAgICAgKVxuICAvLyAgIC8vICAgKVxuICAvLyAgIC8vIH0gZWxzZSB7XG4gIC8vICAgLy8gICBlbnRpdGllcy5wdXNoKG5ldyBFbnRpdHkoeyBuYW1lOiBmaWxlTmFtZSwgaW5Qcm9qZWN0UGF0aDogaW5Qcm9qZWN0UGF0aCwgaW1wb3J0UmVmZXJlbmNlcyB9LCBFbnRpdHlUeXBlLkZJTEUpKVxuICAvLyAgIC8vIH1cbiAgLy9cbiAgLy8gICByZXR1cm4gZW50aXRpZXNcbiAgLy8gfSxcbiAgLy8gX2ZpbHRlckltcG9ydHM6IChzdGF0ZW1lbnRzOiBUc1N0YXRlbWVudEVudGl0eTxhbnk+W10pOiBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFJbXBvcnQ+W10gPT4ge1xuICAvLyAgIHJldHVybiBzdGF0ZW1lbnRzLmZpbHRlcigoc2UpID0+IHNlLmVudGl0eVR5cGUgPT09IEVudGl0eVR5cGUuSU1QT1JUKSBhcyBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFJbXBvcnQ+W11cbiAgLy8gfSxcbiAgLy8gX2ZpbHRlclR5cGVzRW51bXNJbnRlcmZhY2VzOiAoc3RhdGVtZW50czogVHNTdGF0ZW1lbnRFbnRpdHk8YW55PltdKTogVHNTdGF0ZW1lbnRFbnRpdHk8VHNNZXRhVHlwZSB8IFRzTWV0YUVudW0+W10gPT4ge1xuICAvLyAgIHJldHVybiBzdGF0ZW1lbnRzLmZpbHRlcigoc2UpID0+XG4gIC8vICAgICBbRW50aXR5VHlwZS5UWVBFLCBFbnRpdHlUeXBlLkVOVU0sIEVudGl0eVR5cGUuSU5URVJGQUNFXS5pbmNsdWRlcyhzZS5lbnRpdHlUeXBlKVxuICAvLyAgICkgYXMgVHNTdGF0ZW1lbnRFbnRpdHk8VHNNZXRhVHlwZSB8IFRzTWV0YUVudW0+W11cbiAgLy8gfSxcbiAgLy8gX2ZpbHRlckV4cG9ydGVkT2JqZWN0c0FuZENsYXNzZXM6IChzdGF0ZW1lbnRzOiBUc1N0YXRlbWVudEVudGl0eTxhbnk+W10pOiBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFPYmplY3QgfCBUc01ldGFDbGFzcz5bXSA9PiB7XG4gIC8vICAgY29uc3Qgb2JqZWN0c0FuZENsYXNzZXMgPSBzdGF0ZW1lbnRzLmZpbHRlcigoc2UpID0+XG4gIC8vICAgICBbRW50aXR5VHlwZS5PQkpFQ1QsIEVudGl0eVR5cGUuQ0xBU1NdLmluY2x1ZGVzKHNlLmVudGl0eVR5cGUpXG4gIC8vICAgKSBhcyBUc1N0YXRlbWVudEVudGl0eTxUc01ldGFPYmplY3QgfCBUc01ldGFDbGFzcz5bXVxuICAvLyAgIHJldHVybiBvYmplY3RzQW5kQ2xhc3Nlcy5maWx0ZXIoKHNlKSA9PiBzZS5tZXRhLmlzRXhwb3J0ZWQpXG4gIC8vIH0sXG59XG5leHBvcnQgY29uc3QgdHNFbnRpdHlTZXJ2aWNlID0gc2VsZlxuIl19