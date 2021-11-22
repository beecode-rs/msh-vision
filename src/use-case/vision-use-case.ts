import { fileDao } from 'src/dal/file-dao'
import { Entity } from 'src/model/entity'
import { ConvertStrategy, parserService } from 'src/service/parser-service'

const _self = {
  parseFolder: async (params: { projectPath: string }): Promise<Entity[]> => {
    const { projectPath } = params
    const fileList = await fileDao.fileListFromFolder(projectPath)
    const convertStrategies = fileList
      .map((f) => parserService.strategyByFile({ filePath: f, projectPath: projectPath }))
      .filter(Boolean) as ConvertStrategy[]
    return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
  },
}

export const visionUseCase = _self
