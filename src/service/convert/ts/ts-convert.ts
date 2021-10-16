import { Entity } from 'src/model/entity'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { tsEntityService } from 'src/service/convert/ts/ts-entity-service'
import { tsService } from 'src/service/convert/ts/ts-service'
import { fileService } from 'src/service/file-service'

export class TsConvert implements ConvertStrategy {
  protected readonly _filePath: string
  protected readonly _folderPath: string

  constructor({ filePath, folderPath }: { filePath: string; folderPath: string }) {
    this._filePath = filePath
    this._folderPath = folderPath
  }

  public async convert(): Promise<Entity[]> {
    const filePath = fileService.joinPaths(this._folderPath, this._filePath)
    const fileName = fileService.fileNameFromPath(filePath, { withExtension: true })
    const node = await tsService.parseFile(filePath)
    const diagramFilePath = fileService.cleanupPath(this._filePath)
    return tsEntityService.extractEntities({ node, fileName, filePath: diagramFilePath })
  }
}
