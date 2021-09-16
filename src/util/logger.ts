import { SimpleConsoleLog } from '@beecode/msh-node-log/lib/console-log-strategy/simple-console-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { config } from 'src/util/config'

export const logger = new ConsoleLogger({
  logLevel: config.logLevel ?? 'debug',
  consoleLogStrategy: new SimpleConsoleLog(),
})
