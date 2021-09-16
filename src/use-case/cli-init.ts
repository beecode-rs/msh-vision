import { argsService, cliCommands } from 'src/service/args-service'
import { cliService } from 'src/service/cli-service'
import { Executable } from 'src/service/command/executable'
import { Generate } from 'src/service/command/generate'
import { PrintHelp } from 'src/service/command/print-help'
import { PrintVersion } from 'src/service/command/print-version'

export const cliInit = {
  execArgsAsCommand: async (args: string[]): Promise<void> => {
    cliInit.ifMoreThenOneCommandSelectedThrowErrorAndPrintHelp(args)
    cliInit.ifNoCommandSelectedThrowErrorAndPrintHelp(args)
    const command = cliInit.createCommandFromCliArgs(args)
    await command.execute()
  },
  createCommandFromCliArgs: (args: string[]): Executable => {
    const command = argsService.argToObject<cliCommands>({ args, options: argsService.cliCommandOptions })
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
