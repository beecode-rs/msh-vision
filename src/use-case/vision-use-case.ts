import { ConvertStrategy, convertService } from 'src/service/convert-service'
import { fileService } from 'src/service/file-service'
import { Entity } from 'src/service/model/entity'

export const visionUseCase = {
  processFolder: async (params: { folderPath: string }): Promise<Entity[]> => {
    // TODO separate getting files filtering, and getting strategy for parsing and actual parsing
    const { folderPath } = params
    const fileList = await fileService.fileListFromFolder(folderPath)
    const convertStrategies = fileList
      .map((f) => convertService.strategyByFile({ filePath: f, folderPath }))
      .filter(Boolean) as ConvertStrategy[]
    return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
  },
}
