import { errors } from './errors'
import { LoggerType } from '../enum/logger-type'

const _self = {
  debug: (msg: string): void => {
    console.log(msg)
    switch (true) {
      case true:
        errors.throwError(LoggerType.WARN.toString())
    }
  },
}
export const logger = _self
