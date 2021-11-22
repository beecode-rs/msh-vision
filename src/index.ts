import 'module-alias/register'
import 'source-map-support/register'
import 'src/util/config'

import { appStarterFactory } from '@beecode/msh-node-app'
import { NodeAppLogger } from '@beecode/msh-node-app/lib/util/logger'
import { LogLevelType } from '@beecode/msh-node-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { CliApp } from 'src/app/cli-app'
import { logger } from 'src/util/logger'

process.on('uncaughtException', (error) => logger().error('Uncaught Exception', { error }))
process.on('unhandledRejection', (error) => logger().error('Unhandled Rejection', { error }))

NodeAppLogger(new ConsoleLogger({ logLevel: LogLevelType.DEBUG }))

appStarterFactory(CliApp)
  .start()
  .catch((err) => console.log(err)) // eslint-disable-line no-console
