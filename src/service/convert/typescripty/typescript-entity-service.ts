import { Entity } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { File } from 'typescript-parser'

export const typescriptEntityService = {
  extractEntitiesFromFile: (file: File, filePath: string): Entity[] => {
    const entities: Entity[] = []
    const exportedConsts = file.declarations.filter((d: any) => d.isExported && d.isConst)
    if (exportedConsts.length > 0) {
      entities.push(...exportedConsts.map((ec) => new Entity({ filePath, name: ec.name })))
    } else {
      const name = fileService.fileNameFromPath(filePath)
      entities.push(new Entity({ filePath, name }))
    }
    return entities
  },
}
