import 'module-alias/register'
import 'source-map-support/register'
import 'src/util/config'

import { logger } from 'src/util/logger'

process.on('uncaughtException', (error) => logger.error('Uncaught Exception', { error }))
process.on('unhandledRejection', (error) => logger.error('Unhandled Rejection', { error }))

require('src/app').app.start() // eslint-disable-line
