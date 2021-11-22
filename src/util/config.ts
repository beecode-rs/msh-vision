import { MshNodeEnv } from '@beecode/msh-node-env'
import { CliArgsMinimistLocation } from '@beecode/msh-node-env/lib/location/cli-args-minimist-location'
import { EnvironmentLocation } from '@beecode/msh-node-env/lib/location/environment-location'
import { NodeEnvLogger } from '@beecode/msh-node-env/lib/util/logger'
import { LogLevelType } from '@beecode/msh-node-log'
import { SimpleConsoleLog } from '@beecode/msh-node-log/lib/console-log-strategy/simple-console-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { cacheUtil } from '@beecode/msh-node-util/lib/cache-util'
import dotenv from 'dotenv'

NodeEnvLogger(new ConsoleLogger({ logLevel: LogLevelType.INFO, consoleLogStrategy: new SimpleConsoleLog() }))

const env = MshNodeEnv({
  locationStrategies: [
    new CliArgsMinimistLocation({
      options: {
        VISION_APPLICATION_NAME: { type: 'string', alias: ['appName', 'app-name'] },
        VISION_PROJECT_ROOT_PATH: { type: 'string', alias: ['projectRootPath', 'project-root-path'] },
        VISION_PROJECT_SRC_FOLDER_PATH: { type: 'string', alias: ['src'] },
        VISION_EXPORT_FILE_PATH: { type: 'string', alias: ['dest'] },
        VISION_EXPORT_FILE_NAME: { type: 'string', alias: ['destName', 'dest-name'] },
        VISION_TS_TSCONFIG_PATH: { type: 'string', alias: ['tsConfig', 'ts-config'] },
        VISION_PRINT_IGNORE_PATHS_JSON_ARRAY: { type: 'string', alias: ['printIgnorePaths', 'print-ignore-paths'] },
        VISION_PRINT_IGNORE_EXTERNAL: { type: 'string', alias: ['printIgnoreExternal', 'print-ignore-external'] },
        VISION_PRINT_IGNORE_TYPES: { type: 'string', alias: ['printIgnoreTypes', 'print-ignore-types'] },
        VISION_PRINT_SIMPLIFY_ENTITIES_JSON_ARRAY: {
          type: 'string',
          alias: ['printSimplifyEntities', 'print-simplify-entities'],
        },
      },
    }),
    new EnvironmentLocation(),
  ],
})
dotenv.config({ path: './.vision' })

export const config = cacheUtil.singleton(() =>
  Object.freeze({
    env: env('NODE_ENV').string.default('prod').required,
    logLevel: env('LOG_LEVEL').string.default('info').required as 'error' | 'warn' | 'info' | 'debug',
    vision: {
      ignoreGlobPaths: env('VISION_IGNORE_GLOB_PATHS')
        .json<string[]>()
        .default(['**/*.test.ts', '**/*.contract.ts', '**/__mocks__/**/*']).required,
      applicationName: env('VISION_APPLICATION_NAME').string.default('').required,
      projectRootPath: env('VISION_PROJECT_ROOT_PATH').string.default(process.cwd()).required,
      projectSrcFolderPath: env('VISION_PROJECT_SRC_FOLDER_PATH').string.default('./src').required,
      exportFilePath: env('VISION_EXPORT_FILE_PATH').string.default(`${process.cwd()}/`).required,
      exportFileName: env('VISION_EXPORT_FILE_NAME').string.default('vision').required,
      ts: {
        tsconfigPath: env('VISION_TS_TSCONFIG_PATH').string.default(`${process.cwd()}/tsconfig.json`).required,
      },
      print: {
        ignorePaths: env('VISION_PRINT_IGNORE_PATHS_JSON_ARRAY').json<string[]>().default([]).required,
        ignoreExternal: env('VISION_PRINT_IGNORE_EXTERNAL').boolean.default(false).required,
        ignoreTypes: env('VISION_PRINT_IGNORE_TYPES').boolean.default(false).required,
        simplifyEntities: env('VISION_PRINT_SIMPLIFY_ENTITIES_JSON_ARRAY').json<[string, string][]>().default([]).required,
      },
    },
  })
)
