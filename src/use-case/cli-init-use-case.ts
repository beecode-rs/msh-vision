import { CliCommands, argsService } from 'src/service/args-service'
import { cliService } from 'src/service/cli/cli-service'
import { Executable } from 'src/service/cli/command/executable'
import { Generate } from 'src/service/cli/command/generate'
import { PrintHelp } from 'src/service/cli/command/print-help'
import { PrintVersion } from 'src/service/cli/command/print-version'

export const cliInitUseCase = {
  execArgsAsCommand: async (args: string[]): Promise<void> => {
    cliInitUseCase.ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp(args)
    // cliInitUseCase.ifNoCommandSelectedThrowErrorAndPrintHelp(args)
    const command = cliInitUseCase.createCommandFromCliArgs(args)
    await command.execute()
  },
  createCommandFromCliArgs: (args: string[]): Executable => {
    const command = argsService.argToObject<CliCommands>({ args, options: argsService.cliCommandOptions })

    switch (true) {
      case command.version:
        return new PrintVersion()
      case command.help:
        return new PrintHelp()
      default:
        return new Generate()
      // throw new Error(`Unknown command[${JSON.stringify(command)}]`)
    }
  },
  ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp: (args: string[]): void => {
    if (argsService.selectedCommandCount({ args, options: argsService.cliCommandOptions }) <= 1) return
    cliService.printHelp()
    throw new Error('ERROR !!! - CLI can run only one command at a time')
  },
  ifNoCommandSelectedThrowErrorAndPrintHelp: (args: string[]): void => {
    if (argsService.selectedCommandCount({ args, options: argsService.cliCommandOptions }) !== 0) return
    cliService.printHelp()
    throw new Error('ERROR !!! - CLI needs one command to be selected')
  },
}
