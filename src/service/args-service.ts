import minimist from 'minimist'
import minimistOptions, { Options } from 'minimist-options'

export type ArgsServiceParams = {
  args: string[]
  options: Options
}

export type CliCommands = minimist.ParsedArgs & {
  help: boolean
  h: boolean
  version: boolean
  v: boolean
}

export type CmdGenerateParams = minimist.ParsedArgs & {
  src: string
  dest: string
  appName: string
  tsConfig: string
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
  cmdGenerateParams: {
    src: {
      type: 'string',
    },
    dest: {
      type: 'string',
    },
    appName: {
      type: 'string',
    },
    tsConfig: {
      type: 'string',
    },
  } as Options,
  selectedCommandCount: ({ args, options }: ArgsServiceParams): number => {
    const miniOpts = minimistOptions(options)
    const commands = argsService.argToObject({ args, options })
    return (miniOpts.boolean as string[]).reduce((sum, cmd) => (commands[cmd] ? ++sum : sum), 0)
  },
  argToObject: <T extends minimist.ParsedArgs>({ args, options }: ArgsServiceParams): T => {
    return minimist<T>(args, minimistOptions(options))
  },
}
