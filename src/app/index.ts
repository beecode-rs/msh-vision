import { App } from '@beecode/msh-node-app'
import { CliApp } from 'src/app/cli-app'
import { logger } from 'src/util/logger'

export const app = {
  _server: undefined as undefined | any,
  start: (): void => {
    const args = process.argv.slice(2)
    const appToRun = new CliApp(args)

    app
      ._start(appToRun)
      .then(app._registerOnExit)
      .catch(app._onError)
      .catch((err) => logger.error(err))
  },
  _registerOnExit: (): void => {
    ;['SIGTERM', 'SIGINT'].forEach((signal: string) => {
      process.on(signal, () => {
        app
          ._stop()
          .then(() => process.exit(0))
          .catch((err) => logger.error(err))
      })
    })
  },
  _stop: async (): Promise<void> => {
    if (!app._server) return
    const server = app._server
    app._server = undefined
    await server.destroy()
  },
  _start: async (runApp: App): Promise<void> => {
    app._server = runApp
    await app._server.initiate()
  },
  _onError: async (err: Error): Promise<void> => {
    logger.error(err.message)
    await app._stop()
    process.exit(1)
  },
}
