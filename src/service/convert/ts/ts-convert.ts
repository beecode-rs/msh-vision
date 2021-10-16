import { Entity } from 'src/model/entity'
import ts from 'src/module/ts'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { TsParserFile } from 'src/service/convert/ts/parser/ts-parser-file'
import { TsEntityParser } from 'src/service/convert/ts/ts-entity-parser'
import { tsEntityService } from 'src/service/convert/ts/ts-entity-service'
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
    const parsedSource = await this._parseFile(filePath, fileName)

    const hasExportsInFile = tsEntityService.checkIfThereAreAnyExports({ parsedSource })
    const inProjectPath = fileService.cleanupPath(this._filePath)
    if (!hasExportsInFile) return new TsParserFile({ parsedSource, fileName, inProjectPath }).parse()

    const entityParser = new TsEntityParser({ parsedSource, fileName, inProjectPath })
    return entityParser.parsedEntities()
  }

  /**
   * https://allenhwkim.medium.com/how-to-parse-typescript-from-source-643387971f4e
   *
   * https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgYQuCA7Aph+BfOAMyjTgHIABAQwwHMBXAGyqgHoBjaLMgbgCgKqdNlwAKBHzhwAzlkZZ2MaAC5yIAJ5kANJLgws4ZvtVkAFnMYQ4ILADoyfPAEo+WAB6RYcds2nS4ALLqQpAi8BJ4QA
   */
  protected async _parseFile(filePath: string, fileName: string): Promise<ts.SourceFile> {
    const fileSource = await fileService.readFile(filePath)
    return ts.createSourceFile(fileName, fileSource, ts.ScriptTarget.ES2020) // TODO implement param for script target
  }
}
