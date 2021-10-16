import { camelCase, snakeCase } from 'change-case'

const shortHash = require('short-hash') // eslint-disable-line @typescript-eslint/no-var-requires

const self = {
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
    const cleanName = self.snakeCase(name)
    const hashPath = self.stringToHash(inProjectPath)
    return `${cleanName}_${hashPath}`
  },
}

export const stringUtil = self
