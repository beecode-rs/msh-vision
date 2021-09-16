import { cliService } from 'src/service/cli-service'
import { Executable } from 'src/service/command/executable'

export class PrintHelp implements Executable {
  public async execute(): Promise<void> {
    cliService.printHelp()
  }
}
