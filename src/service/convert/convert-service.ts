import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { TypescriptConvertStrategy } from 'src/service/convert/typescripty/typescript-convert-strategy'
import { logger } from 'src/util/logger'

export const convertService = {
  strategyByFile: ({ filePath, folderPath }: { filePath: string; folderPath: string }): ConvertStrategy | undefined => {
    if (filePath.endsWith('.ts')) return new TypescriptConvertStrategy({ filePath, folderPath })

    logger.debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
