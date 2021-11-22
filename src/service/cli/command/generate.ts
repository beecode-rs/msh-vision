import { Executable } from 'src/service/cli/command/executable'
import { printService } from 'src/service/print-service'
import { processingService } from 'src/service/processing/processing-service'
import { visionUseCase } from 'src/use-case/vision-use-case'
import { config } from 'src/util/config'

export class Generate implements Executable {
  public async execute(): Promise<void> {
    const { projectSrcFolderPath: projectPath } = config().vision
    const entities = await visionUseCase.parseFolder({ projectPath })
    const processedEntities = processingService.process(entities)
    await printService.print(processedEntities)
  }
}
