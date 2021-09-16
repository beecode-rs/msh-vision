import { cliService } from 'src/service/cli-service'
import { Executable } from 'src/service/command/executable'

export class PrintVersion implements Executable {
  public async execute(): Promise<void> {
    cliService.printVersion()
  }
}
