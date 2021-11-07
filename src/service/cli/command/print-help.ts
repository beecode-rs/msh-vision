import { cliService } from 'src/service/cli/cli-service'
import { Executable } from 'src/service/cli/command/executable'

export class PrintHelp implements Executable {
  public async execute(): Promise<void> {
    cliService.printHelp()
  }
}
