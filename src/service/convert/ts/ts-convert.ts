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
    const node = await tsService.parseFile(fileService.joinPaths(this._folderPath, this._filePath))
    const cleanRelativeFilePath = fileService.cleanupPath(this._filePath)
    const entities = tsEntityService.extractEntities({ node, filePath: cleanRelativeFilePath })

    return entities
  }
}
