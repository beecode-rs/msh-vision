import { Executable } from './executable'
import { cliService } from 'src/service/cli/cli-service'

export class PrintHelp implements Executable {
  public async execute(): Promise<void> {
    cliService.printHelp()
  }
}
