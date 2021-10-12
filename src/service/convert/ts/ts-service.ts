import { fs } from 'mz'
import { fileService } from 'src/service/file-service'
import ts from 'typescript'

// https://allenhwkim.medium.com/how-to-parse-typescript-from-source-643387971f4e
// https://ts-ast-viewer.com/#code/JYWwDg9gTgLgBAbzgYQuCA7Aph+BfOAMyjTgHIABAQwwHMBXAGyqgHoBjaLMgbgCgKqdNlwAKBHzhwAzlkZZ2MaAC5yIAJ5kANJLgws4ZvtVkAFnMYQ4ILADoyfPAEo+WAB6RYcds2nS4ALLqQpAi8BJ4QA
export const tsService = {
  parseFile: async (filePath: string): Promise<ts.SourceFile> => {
    const fileSource = await fs.readFile(filePath, 'utf8')
    return ts.createSourceFile(fileService.fileNameFromPath(filePath), fileSource, ts.ScriptTarget.Latest)
  },
}
