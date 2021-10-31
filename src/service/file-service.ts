import { promises as fs } from 'fs'
import glob from 'glob'
import path from 'path'
import { tsConfigFileService } from 'src/service/convert-ts/ts-config-file-service'
import { constant } from 'src/util/constant'

const _self = {
  fileListFromFolder: async (folderPath: string): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      const cwd = _self.relativeToAbsPath(folderPath)
      glob('**/*', { cwd, dot: true, nodir: true, ignore: ['**/*.test.ts', '**/*.contract.ts'] }, (err, files) => {
        // TODO implement some mechanism to ignore files
        if (err) return reject(err)
        return resolve(files.map((f) => _self.joinPaths(folderPath, f)))
      })
    })
  },
  makeFolderIfNotExist: async (folderPath: string): Promise<void> => {
    if (await fs.stat(folderPath).catch(() => false)) return
    await fs.mkdir(folderPath)
  },
  writeToFile: async (params: { filePath: string; data: string }): Promise<void> => {
    const { filePath, data } = params
    await fs.writeFile(filePath, data, 'utf-8')
  },
  readFile: async (filePath: string): Promise<string> => {
    return fs.readFile(filePath, 'utf8')
  },
  mkdirAndWriteToFile: async (params: { folderPath: string; fileName: string; data: string }): Promise<void> => {
    const { folderPath, fileName, data } = params
    await _self.makeFolderIfNotExist(folderPath)
    await _self.writeToFile({ filePath: _self.joinPaths(folderPath, fileName), data })
  },
  joinPaths: (...paths: string[]): string => {
    return path.join(...paths)
  },
  isAbsPath: (relativeOrAbsPath: string): boolean => {
    return relativeOrAbsPath.startsWith(constant.folderSep)
  },
  isDotPath: (path: string): boolean => {
    return path.startsWith('.')
  },
  relativeToAbsPath: (relativeOrAbsPath: string): string => {
    return _self.isAbsPath(relativeOrAbsPath) ? relativeOrAbsPath : _self.joinPaths(process.cwd(), relativeOrAbsPath)
  },
  cleanupPath: (relativeOrAbsPath: string): string => {
    return path.join(relativeOrAbsPath)
  },
  lastFolderFromPath: (filePath: string): string => {
    const pathSplit = filePath.split(constant.folderSep)
    if (pathSplit[pathSplit.length - 1].includes('.')) pathSplit.pop()
    return pathSplit.join(constant.folderSep)
  },
  importPathFind: (params: { filePathImportedFrom: string; importPath: string }): string => {
    const { filePathImportedFrom, importPath } = params
    const resolvedImportPath = tsConfigFileService.moduleAliasResolve(importPath)
    const importedFromPath = _self.lastFolderFromPath(filePathImportedFrom)
    const importPathSplit = resolvedImportPath.split(constant.folderSep)
    const importedFromPathReverseSplit = importedFromPath.split(constant.folderSep).reverse()
    let equalPathSplitCount = 0
    for (const [ix, split] of Object.entries(importPathSplit)) {
      if (importedFromPathReverseSplit[ix] !== split) break
      equalPathSplitCount = +ix + 1
    }
    const cleanImportPath = importPathSplit.slice(equalPathSplitCount).join(constant.folderSep)
    return _self.joinPaths(importedFromPath, cleanImportPath)
  },
  fileNameFromPath: (filePath: string, options: { withExtension?: boolean } = {}): string => {
    const parts = filePath.split(constant.folderSep)
    const lastPart = parts[parts.length - 1]
    if (options.withExtension) return lastPart
    const nameParts = lastPart.split('.')
    if (nameParts.length === 1) return nameParts[0]
    nameParts.pop()
    return nameParts.join('.')
  },
}

export const fileService = _self
