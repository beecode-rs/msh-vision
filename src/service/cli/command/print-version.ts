import { Executable } from './executable'
import { cliService } from 'src/service/cli/cli-service'

export class PrintVersion implements Executable {
  public async execute(): Promise<void> {
    cliService.printVersion()
  }
}
