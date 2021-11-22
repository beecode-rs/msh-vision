import { fileDao } from 'src/dal/file-dao'
import { Entity } from 'src/model/entity'
import ts from 'src/module/ts'
import { filePathService } from 'src/service/file-path-service'
import { ConvertStrategy } from 'src/service/parser-service'
import { TsParserFile } from 'src/service/parser-ts/parser/ts-parser-file'
import { tsConfigFileService } from 'src/service/parser-ts/ts-config-file-service'
import { TsEntityParser } from 'src/service/parser-ts/ts-entity-parser'
import { tsParserService } from 'src/service/parser-ts/ts-parser-service'

export class ParserTs implements ConvertStrategy {
  protected readonly _filePath: string
  protected readonly _projectPath: string

  constructor(params: { filePath: string; projectPath: string }) {
    const { filePath, projectPath } = params
    this._filePath = filePath
    this._projectPath = projectPath
  }

  public async convert(): Promise<Entity[]> {
    await tsConfigFileService.init()
    const fileName = filePathService.fileNameFromPath(this._filePath, { withExtension: true })
    const parsedSource = await this._parseFile({ filePath: this._filePath, fileName, folderPath: this._projectPath })

    const hasExportsInFile = tsParserService.checkIfThereAreAnyExports(parsedSource)
    const inProjectPath = filePathService.cleanupPath(this._filePath)

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
  protected async _parseFile(params: { filePath: string; fileName: string; folderPath: string }): Promise<ts.SourceFile> {
    const { filePath, fileName, folderPath } = params
    const fileSource = await fileDao.readFile(filePathService.joinPaths(folderPath, filePath))
    return ts.createSourceFile(fileName, fileSource, ts.ScriptTarget.ES2020) // TODO implement param for script target
  }
}
