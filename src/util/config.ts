import MshNodeEnv from '@beecode/msh-node-env'
import { LogLevelType } from '@beecode/msh-node-log'
import { SimpleConsoleLog } from '@beecode/msh-node-log/lib/console-log-strategy/simple-console-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import dotenv from 'dotenv'
import { CmdGenerateParams, argsService } from 'src/service/args-service'

const env = MshNodeEnv({
  loggerStrategy: new ConsoleLogger({ logLevel: LogLevelType.INFO, consoleLogStrategy: new SimpleConsoleLog() }),
})
dotenv.config({ path: './.vision' })

export const config = Object.freeze({
  env: env('NODE_ENV').string.default('dev').required,
  logLevel: env('LOG_LEVEL').string.default('info').required as 'error' | 'warn' | 'info' | 'debug',
  _vision: {
    applicationName: env('VISION_APPLICATION_NAME').string.default('').required,
    projectSrcFolderPath: env('VISION_PROJECT_SRC_FOLDER_PATH').string.default('./src').required,
    exportFilePath: env('VISION_EXPORT_FILE_PATH').string.default(`${process.cwd()}/`).required,
    ts: {
      tsconfigPath: env('VISION_TS_TSCONFIG_PATH').string.default(`${process.cwd()}/tsconfig.json`).required,
    },
    print: {
      ignorePaths: env('VISION_PRINT_IGNORE_PATHS_JSON_ARRAY').json<string[]>().default([]).required,
      ignoreExternal: env('VISION_PRINT_IGNORE_EXTERNAL').boolean.default(false).required,
    },
  },
})
export type VisionConfigReturn = typeof config._vision
export const visionConfig = (): VisionConfigReturn => {
  const args = process.argv.slice(2)
  const params = argsService.argToObject<CmdGenerateParams>({ args, options: argsService.cmdGenerateParams })
  return {
    ...config._vision,
    ...(params.appName && { applicationName: params.appName }),
    ...(params.src && { projectSrcFolderPath: params.src }),
    ...(params.dest && { exportFilePath: params.dest }),
    ts: {
      ...config._vision.ts,
      ...(params.tsConfig && { tsconfigPath: params.tsConfig }),
    },
    print: {
      ...config._vision.print,
      ...(params.printIgnorePaths && { ignorePaths: params.printIgnorePaths.split(',').map((s) => s.trim()) }),
      ...(params.ignoreExternal && { ignoreExternal: params.printIgnoreExternal }),
    },
  }
}
