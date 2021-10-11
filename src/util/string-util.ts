import { camelCase, snakeCase } from 'change-case'

export const stringUtil = {
  camelCase: (name: string): string => {
    return camelCase(name)
  },
  snakeCase: (name: string): string => {
    return snakeCase(name)
  },
}
