import { errors } from './errors'

const enum LoggerType {
  INFO = 'info',
  WARN = 'warn',
}

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
