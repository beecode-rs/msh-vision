import { Entity } from 'src/model/entity'
import { ParserTs } from 'src/service/parser-ts/parser-ts'
import { logger } from 'src/util/logger'

export interface ConvertStrategy {
  convert(): Promise<Entity[]>
}

export const parserService = {
  strategyByFile: (params: { filePath: string; projectRootPath: string }): ConvertStrategy | undefined => {
    const { filePath, projectRootPath } = params
    if (filePath.endsWith('.ts')) return new ParserTs({ filePath, projectRootPath })

    logger().debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
