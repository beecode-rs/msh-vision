import { Entity } from 'src/model/entity'
import { PumlPrint } from 'src/service/print-puml/puml-print'
import { config } from 'src/util/config'

export interface PrintStrategy {
  print(params: { entities: Entity[] }): Promise<void>
}

export const printService = {
  print: async (entities: Entity[]): Promise<void> => {
    const { exportFilePath: destinationPath, applicationName: appName, exportFileName: fileName } = config().vision

    const printStrategy = new PumlPrint({ destinationPath, fileName, appName })

    await printStrategy.print({ entities })
  },
}
