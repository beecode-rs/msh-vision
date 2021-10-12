import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { TsConvert } from 'src/service/convert/ts/ts-convert'
import { logger } from 'src/util/logger'

export const convertService = {
  strategyByFile: ({ filePath, folderPath }: { filePath: string; folderPath: string }): ConvertStrategy | undefined => {
    if (filePath.endsWith('.ts')) return new TsConvert({ filePath, folderPath })

    logger.debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
