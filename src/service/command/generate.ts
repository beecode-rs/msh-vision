import { CmdGenerateParams, argsService } from 'src/service/args-service'
import { Executable } from 'src/service/command/executable'
import { PumlPrintStrategy } from 'src/service/print/puml/puml-print-strategy'
import { visionUseCase } from 'src/use-case/vision-use-case'

export class Generate implements Executable {
  protected readonly _params: CmdGenerateParams
  constructor(args: string[]) {
    this._params = argsService.argToObject<CmdGenerateParams>({ args, options: argsService.cmdGenerateParams })
  }

  public async execute(): Promise<void> {
    const folderPath = this._params.src
    const destinationPath = this._params.dest
    const printStrategy = new PumlPrintStrategy({ destinationPath })
    await visionUseCase.processFolder({ folderPath, printStrategy })
  }
}
