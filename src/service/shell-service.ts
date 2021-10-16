import chalk from 'chalk'
import { ExecResult, shellDal } from 'src/dal/shell-dal'
import { constant } from 'src/util/constant'

export type PrintStdMessage = {
  [key: string]: ExecResult
}
export const shellService = {
  exec: shellDal.exec,
  cd: shellDal.cd,
  print: shellDal.print,
  printStdMessage: (...messageArgs: PrintStdMessage[]): void => {
    const messages = shellService._joinResults(messageArgs)
    for (const [key, execResult] of Object.entries(messages)) {
      shellService.print(chalk.cyan(key))
      for (const msg of execResult.stdout.split(constant.newRow)) shellService.print(msg)
      for (const msg of execResult.stderr.split(constant.newRow)) shellService.printError(msg)
    }
  },
  _joinResults: (results: PrintStdMessage[]): PrintStdMessage => {
    return results.reduce((agg, cur) => {
      agg = Object.assign(agg, cur)
      return agg
    }, {} as PrintStdMessage)
  },
  printError: (message: string): void => {
    shellDal.print(chalk.red(message))
  },
  printSuccess: (message: string): void => {
    shellDal.print(chalk.green(message))
  },
}
