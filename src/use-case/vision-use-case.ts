import { convertService } from 'src/service/convert/convert-service'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'

export const visionUseCase = {
  processFolder: async ({ folderPath, printStrategy }: { folderPath: string; printStrategy: PrintStrategy }): Promise<void> => {
    const fileList = await fileService.fileListFromFolder({ folderPath: folderPath })
    const convertStrategies = fileList
      .filter((f) => !f.endsWith('test.ts'))
      .map((f) => convertService.strategyByFile({ filePath: f, folderPath: folderPath }))
      .filter(Boolean) as ConvertStrategy[]
    const entities = (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
    if (!entities) return
    await printStrategy.print({ entities })
  },
}
