import { camelCase, snakeCase } from 'change-case'

const shortHash = require('short-hash') // eslint-disable-line @typescript-eslint/no-var-requires

export const stringUtil = {
  camelCase: (name: string): string => {
    return camelCase(name)
  },
  snakeCase: (name: string): string => {
    return snakeCase(name)
  },
  stringToHash: (text: string): string => {
    return shortHash(text)
  },
}
