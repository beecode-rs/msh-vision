import { Entity } from 'src/model/entity'
import { convertService } from 'src/service/convert/convert-service'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { visionConfig } from 'src/util/config'

export const visionUseCase = {
  processFolder: async (params: { folderPath: string; printStrategy: PrintStrategy }): Promise<void> => {
    const { folderPath, printStrategy } = params
    const fileList = await fileService.fileListFromFolder(folderPath)
    const convertStrategies = fileList
      .map((f) => convertService.strategyByFile({ filePath: f, folderPath }))
      .filter(Boolean) as ConvertStrategy[]
    const entities = (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
    if (!entities) return
    const cleanEntities = visionUseCase._removeIgnoredPaths(entities)
    await printStrategy.print({ entities: cleanEntities })
  },
  _removeIgnoredPaths: (entities: Entity<any>[]): Entity<any>[] => {
    const {
      print: { ignorePaths },
    } = visionConfig()
    if (ignorePaths.length === 0) return entities
    const removedIgnoredEntities = entities.filter((e) => !ignorePaths.find((ip) => e.InProjectPath.startsWith(ip)))
    removedIgnoredEntities.forEach((rie) => rie.removeIgnoredReferences(ignorePaths))
    return removedIgnoredEntities
  },
}
