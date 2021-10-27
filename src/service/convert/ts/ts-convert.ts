import { Entity } from 'src/model/entity'
import ts from 'src/module/ts'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { TsParserFile } from 'src/service/convert/ts/parser/ts-parser-file'
import { tsConfigFileService } from 'src/service/convert/ts/ts-config-file-service'
import { TsEntityParser } from 'src/service/convert/ts/ts-entity-parser'
import { tsParserService } from 'src/service/convert/ts/ts-parser-service'
import { fileService } from 'src/service/file-service'

export class TsConvert implements ConvertStrategy {
  protected readonly _filePath: string
  protected readonly _folderPath: string

  constructor({ filePath, folderPath }: { filePath: string; folderPath: string }) {
    this._filePath = filePath
    this._folderPath = folderPath
  }

  public async convert(): Promise<Entity[]> {
    await tsConfigFileService.init()
    const fileName = fileService.fileNameFromPath(this._filePath, { withExtension: true })
    const parsedSource = await this._parseFile({ filePath: this._filePath, fileName })

    const hasExportsInFile = tsParserService.checkIfThereAreAnyExports(parsedSource)
    const inProjectPath = fileService.cleanupPath(this._filePath)

    const importParseResults = tsParserService.importsFromStatements({ parsedSource, inProjectPath })
    if (!hasExportsInFile) return new TsParserFile({ parsedSource, fileName, inProjectPath, importParseResults }).parse()
    const entityLinks = tsParserService.entityLinksFromStatements({ parsedSource, inProjectPath })

    const entityParser = new TsEntityParser({
      parsedSource,
      fileName,
      inProjectPath,
      importParseResults: [...importParseResults, ...entityLinks],
    })
    return entityParser.parsedEntities()
  }

  /**
   * https://allenhwkim.medium.com/how-to-parse-typescript-from-source-643387971f4e
   *
   * https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgYQuCA7Aph+BfOAMyjTgHIABAQwwHMBXAGyqgHoBjaLMgbgCgKqdNlwAKBHzhwAzlkZZ2MaAC5yIAJ5kANJLgws4ZvtVkAFnMYQ4ILADoyfPAEo+WAB6RYcds2nS4ALLqQpAi8BJ4QA
   */
  protected async _parseFile(params: { filePath: string; fileName: string }): Promise<ts.SourceFile> {
    const { filePath, fileName } = params
    const fileSource = await fileService.readFile(filePath)
    return ts.createSourceFile(fileName, fileSource, ts.ScriptTarget.ES2020) // TODO implement param for script target
  }
}
