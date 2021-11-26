import { fileDao } from 'src/dal/file-dao'
import { Entity } from 'src/model/entity'
import { ConvertStrategy, parserService } from 'src/service/parser-service'

const _self = {
  parseFolder: async (params: { projectRootPath: string; projectSrcFolderPath: string }): Promise<Entity[]> => {
    const { projectRootPath, projectSrcFolderPath } = params
    const fileList = await fileDao.fileListFromFolder({ rootFolder: projectRootPath, folderPath: projectSrcFolderPath })
    const convertStrategies = fileList
      .map((f) => parserService.strategyByFile({ filePath: f, projectRootPath }))
      .filter(Boolean) as ConvertStrategy[]
    return (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
  },
}

export const visionUseCase = _self
