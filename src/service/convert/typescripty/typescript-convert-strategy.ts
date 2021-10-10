import { Entity } from 'src/model/entity'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { exportExtractor } from 'src/service/convert/typescripty/export-extractor'
import { importExtractor } from 'src/service/convert/typescripty/import-extractor'
import { typescriptEntityService } from 'src/service/convert/typescripty/typescript-entity-service'
import { fileService } from 'src/service/file-service'
import { TypescriptParser } from 'typescript-parser'

const parser = new TypescriptParser()

export class TypescriptConvertStrategy implements ConvertStrategy {
  protected readonly _filePath: string
  protected readonly _rootPath: string
  protected readonly _folderPath: string
  constructor({ filePath, rootPath, folderPath }: { filePath: string; folderPath: string; rootPath?: string }) {
    this._filePath = filePath
    this._rootPath = rootPath ?? '/'
    this._folderPath = folderPath
  }

  public async convert(): Promise<Entity[]> {
    const file = await parser.parseFile(fileService.joinPaths(this._folderPath, this._filePath), this._rootPath)

    const entities = typescriptEntityService.extractEntitiesFromFile(file, this._filePath)
    entities.forEach((entity) => {
      entity.importReference.push(...importExtractor.extract(file))
      entity.exportReference.push(...exportExtractor.extract(file))
    })

    return entities
  }
}
