import { fileDao } from 'src/dal/file-dao'
import { Entity } from 'src/model/entity'
import { ConvertStrategy, parserService } from 'src/service/parser-service'

export const visionUseCase = {
  parseFolder: async (params: { folderPath: string }): Promise<Entity[]> => {
    const { folderPath } = params
    const fileList = await fileDao.fileListFromFolder(folderPath)
    const convertStrategies = fileList
      .map((f) => parserService.strategyByFile({ filePath: f, folderPath }))
      .filter(Boolean) as ConvertStrategy[]
    return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
  },
}
