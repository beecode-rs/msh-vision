import { errors } from './errors'

const _self = {
  debug: (msg: string): void => {
    console.log(msg)
    switch (true) {
      case true:
        errors.throwError('test')
    }
  },
}
export const logger = _self
