import { helpService } from 'src/service/cli/help-service'
import { shellService } from 'src/service/cli/shell-service'
import { constant } from 'src/util/constant'

export const cliService = {
  printVersion: (): void => {
    shellService.print(`v${constant().projectVersion}`)
  },
  printHelp: (): void => {
    shellService.print(helpService.text())
  },
}
