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
  destName: string
  appName: string
  tsConfig: string
  printIgnorePaths: string
  printIgnoreExternal: boolean
  printIgnoreTypes: boolean
  printSimplifyEntities: string
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
    destName: {
      type: 'string',
    },
    appName: {
      type: 'string',
    },
    tsConfig: {
      type: 'string',
    },
    printIgnorePaths: {
      type: 'string',
    },
    printIgnoreExternal: {
      type: 'boolean',
    },
    printIgnoreTypes: {
      type: 'boolean',
    },
    printSimplifyEntities: {
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
