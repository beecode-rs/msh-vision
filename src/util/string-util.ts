import { camelCase, snakeCase } from 'change-case'

const shortHash = require('short-hash') // eslint-disable-line @typescript-eslint/no-var-requires

const _self = {
  camelCase: (name: string): string => {
    return camelCase(name)
  },
  snakeCase: (name: string): string => {
    return snakeCase(name)
  },
  stringToHash: (text: string): string => {
    return shortHash(text)
  },
  uniqueEntityHash: (name: string, inProjectPath: string): string => {
    const cleanName = _self.snakeCase(name)
    const hashPath = _self.stringToHash(inProjectPath)
    return `${cleanName}_${hashPath}`
  },
}

export const stringUtil = _self
