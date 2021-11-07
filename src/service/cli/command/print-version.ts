import { cliService } from 'src/service/cli/cli-service'
import { Executable } from 'src/service/cli/command/executable'

export class PrintVersion implements Executable {
  public async execute(): Promise<void> {
    cliService.printVersion()
  }
}
