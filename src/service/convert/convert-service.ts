import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { TsConvert } from 'src/service/convert/ts/ts-convert'
import { logger } from 'src/util/logger'

export const convertService = {
  strategyByFile: (params: { filePath: string; folderPath: string }): ConvertStrategy | undefined => {
    const { filePath, folderPath } = params
    if (filePath.endsWith('.ts')) return new TsConvert({ filePath, folderPath })

    logger.debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
