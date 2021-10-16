import MshNodeEnv from '@beecode/msh-node-env'
import { LogLevelType } from '@beecode/msh-node-log'
import { SimpleConsoleLog } from '@beecode/msh-node-log/lib/console-log-strategy/simple-console-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import dotenv from 'dotenv'

const env = MshNodeEnv({
  loggerStrategy: new ConsoleLogger({ logLevel: LogLevelType.INFO, consoleLogStrategy: new SimpleConsoleLog() }),
})
dotenv.config()

export const config = Object.freeze({
  env: env('NODE_ENV').string.default('dev').required,
  logLevel: (env('LOG_LEVEL').string.default('info').required as 'error' | 'warn' | 'info' | 'debug') as
    | 'error'
    | 'warn'
    | 'info'
    | 'debug',
})
