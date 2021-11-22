import shell from 'shelljs'
import { logger } from 'src/util/logger'

export type ExecResult = {
  stdout: string
  stderr: string
  errorOccurred: boolean
}

export const shellDal = {
  exec: (cmd: string): Promise<ExecResult> =>
    new Promise((resolve) => {
      logger().debug(shellDal.pwd())
      shell.exec(cmd, { silent: true }, (code, stdout, stderr) => {
        const errorOccurred = code !== 0
        return resolve({ stdout, stderr, errorOccurred })
      })
    }),
  print: (message: string): void => {
    shell.echo(message)
  },
  cd: (dir: string): void => {
    shell.cd(dir)
  },
  pwd: (): string => {
    return shell.pwd()
  },
}
