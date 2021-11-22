import { LogLevelType } from '@beecode/msh-node-log'
import { SimpleConsoleLog } from '@beecode/msh-node-log/lib/console-log-strategy/simple-console-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { cacheUtil } from '@beecode/msh-node-util/lib/cache-util'
import { config } from 'src/util/config'

export const logger = cacheUtil.singleton(
  () =>
    new ConsoleLogger({
      logLevel: LogLevelType[config().logLevel.toUpperCase()] ?? LogLevelType.INFO,
      consoleLogStrategy: new SimpleConsoleLog(),
    })
)
