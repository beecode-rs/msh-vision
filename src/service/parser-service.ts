import { Entity } from 'src/model/entity'
import { ParserTs } from 'src/service/parser-ts/parser-ts'
import { logger } from 'src/util/logger'

export interface ConvertStrategy {
  convert(): Promise<Entity[]>
}

export const parserService = {
  strategyByFile: (params: { filePath: string; projectPath: string }): ConvertStrategy | undefined => {
    const { filePath, projectPath } = params
    if (filePath.endsWith('.ts')) return new ParserTs({ filePath, projectPath })

    logger().debug(`Strategy not found for filePath: ${filePath}`)
    return undefined
  },
}
