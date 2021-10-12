import { Entity } from 'src/model/entity'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { importExtractor } from 'src/service/convert/typescript-parser/import-extractor'
import { typescriptParserEntityService } from 'src/service/convert/typescript-parser/typescript-parser-entity-service'
import { fileService } from 'src/service/file-service'
import { TypescriptParser } from 'typescript-parser'

const parser = new TypescriptParser()

export class TypescriptParserConvert implements ConvertStrategy {
  protected readonly _filePath: string
  protected readonly _rootPath: string
  protected readonly _folderPath: string
  constructor({ filePath, folderPath, rootPath }: { filePath: string; folderPath: string; rootPath?: string }) {
    this._filePath = filePath
    this._rootPath = rootPath ?? '/'
    this._folderPath = folderPath
  }

  public async convert(): Promise<Entity[]> {
    const file = await parser.parseFile(fileService.joinPaths(this._folderPath, this._filePath), this._rootPath)

    const cleanRelativeFilePath = fileService.removeDotSlashFromRelativePath(this._filePath)
    const entities = typescriptParserEntityService.extractEntities({ file, filePath: cleanRelativeFilePath })

    entities.forEach((entity) => {
      entity.importReference.push(...importExtractor.extract(file))
    })

    return entities
  }
}
