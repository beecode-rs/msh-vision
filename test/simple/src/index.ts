import { SomeClass } from './service/some-class'
import { logger } from './util/logger'

logger.debug('test')

const test = new SomeClass({ test: 'test', test1: 'test1' })
