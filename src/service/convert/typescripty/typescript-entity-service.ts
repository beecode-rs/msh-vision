import { Entity, EntityType } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { ClassDeclaration, File } from 'typescript-parser'

export const typescriptEntityService = {
  extractEntitiesFromFile: (file: File, filePath: string): Entity[] => {
    const entities: Entity[] = []
    const exportedConsts = file.declarations.filter((d: any) => d.isExported && d.isConst)
    const exportedOther = file.declarations.filter((d: any) => d.isExported && !d.isConst)
    if (exportedConsts.length > 0) {
      entities.push(
        ...exportedConsts.map((ec) => {
          return new Entity({ filePath, name: ec.name }, typescriptEntityService.typeFromInstance(ec))
        })
      )
    } else if (exportedOther.length > 0) {
      entities.push(
        ...exportedOther.map((ec) => {
          return new Entity({ filePath, name: ec.name }, typescriptEntityService.typeFromInstance(ec))
        })
      )
    }
    if (exportedConsts.length === 0 && exportedOther.length === 0) {
      const name = fileService.fileNameFromPath(filePath)
      entities.push(new Entity({ filePath, name }))
    }
    return entities
  },
  typeFromInstance: (instance: any): EntityType => {
    if (instance instanceof ClassDeclaration) return EntityType.CLASS
    return EntityType.OBJECT
  },
}
