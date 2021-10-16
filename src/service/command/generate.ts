import { Executable } from 'src/service/command/executable'
import { PumlPrint } from 'src/service/print/puml/puml-print'
import { visionUseCase } from 'src/use-case/vision-use-case'
import { visionConfig } from 'src/util/config'

export class Generate implements Executable {
  public async execute(): Promise<void> {
    const vconf = visionConfig()
    const folderPath = vconf.projectSrcFolderPath
    const destinationPath = vconf.exportFilePath
    const printStrategy = new PumlPrint({ destinationPath, appName: vconf.applicationName })
    await visionUseCase.processFolder({ folderPath, printStrategy })
  }
}
