import { Entity } from 'src/model/entity'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { exportExtractor } from 'src/service/convert/typescripty/export-extractor'
import { importExtractor } from 'src/service/convert/typescripty/import-extractor'
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
    const parsedResult = await parser.parseFile(fileService.joinPaths(this._folderPath, this._filePath), this._rootPath)

    // TODO extract entity from parsed result
    const entity = new Entity({ filePath: this._filePath })

    entity.importReference.push(...importExtractor.extract(parsedResult))
    entity.exportReference.push(...exportExtractor.extract(parsedResult))

    return [entity]
  }
}
