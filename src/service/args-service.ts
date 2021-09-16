import minimist from 'minimist'
import minimistOptions, { Options } from 'minimist-options'

export type argsServiceParams = {
  args: string[]
  options: Options
}

export type cliCommands = minimist.ParsedArgs & {
  help: boolean
  h: boolean
  version: boolean
  v: boolean
}

export const argsService = {
  cliCommandOptions: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    version: {
      type: 'boolean',
      alias: 'v',
    },
  } as Options,
  selectedCommandCount: (params: argsServiceParams): number => {
    const miniOpts = minimistOptions(params.options)
    const commands = argsService.argToObject(params)
    return (miniOpts.boolean as string[]).reduce((sum, cmd) => {
      return commands[cmd] ? ++sum : sum
    }, 0)
  },
  argToObject: <T extends minimist.ParsedArgs>(params: argsServiceParams): T => {
    const miniOpts = minimistOptions(params.options)
    return minimist<T>(params.args, miniOpts)
  },
}
