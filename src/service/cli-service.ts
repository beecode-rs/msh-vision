import { helpService } from 'src/service/help-service'
import { shellService } from 'src/service/shell-service'
import { constant } from 'src/util/constant'

export const cliService = {
  printVersion: (): void => {
    shellService.print(`v${constant.projectVersion}`)
  },
  printHelp: (): void => {
    shellService.print(helpService.text())
  },
}
