import { constant } from 'src/util/constant'

export const helpService = {
  text: (): string => {
    return [
      'Usage: vision [command]',
      '',
      'Command:',
      '',
      '',
      '   -v | --version          Display version',
      '',
      '   -h | --help             Display this help',
    ].join(constant().newRow)
  },
}
