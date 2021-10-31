import { ConvertTs } from 'src/service/convert-ts/convert-ts'
import { Entity } from 'src/service/model/entity'
import { logger } from 'src/util/logger'

export interface ConvertStrategy {
  convert(): Promise<Entity[]>
}

export const convertService = {
  strategyByFile: (params: { filePath: string; folderPath: string }): ConvertStrategy | undefined => {
    const { filePath, folderPath } = params
    if (filePath.endsWith('.ts')) return new ConvertTs({ filePath, folderPath })

    logger.debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
