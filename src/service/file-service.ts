import { promises as fs } from 'fs'
import glob from 'glob'
import path from 'path'

export const fileService = {
  fileListFromFolder: async ({ folderPath }: { folderPath: string }): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      const cwd = fileService.relativeToAbsPath(folderPath)
      glob('**/*', { cwd, dot: true, nodir: true, ignore: '*.test.ts' }, (err, files) => {
        if (err) return reject(err)
        return resolve(files)
      })
    })
  },
  makeFolderIfNotExist: async ({ folderPath }: { folderPath: string }): Promise<void> => {
    if (await fs.stat(folderPath).catch(() => false)) return
    await fs.mkdir(folderPath)
  },
  writeToFile: async ({ filePath, data }: { filePath: string; data: string }): Promise<void> => {
    await fs.writeFile(filePath, data, 'utf-8')
  },
  mkdirAndWriteToFile: async ({
    folderPath,
    fileName,
    data,
  }: {
    folderPath: string
    fileName: string
    data: string
  }): Promise<void> => {
    await fileService.makeFolderIfNotExist({ folderPath })
    await fileService.writeToFile({ filePath: fileService.joinPaths(folderPath, fileName), data })
  },
  joinPaths: (...paths: string[]): string => {
    return path.join(...paths)
  },
  isAbsPath: (relativeOrAbsPath: string): boolean => {
    return relativeOrAbsPath.startsWith('/')
  },
  relativeToAbsPath: (relativeOrAbsPath: string): string => {
    return fileService.isAbsPath(relativeOrAbsPath) ? relativeOrAbsPath : fileService.joinPaths(process.cwd(), relativeOrAbsPath)
  },
  cleanupPath: (relativeOrAbsPath: string): string => {
    return path.join(relativeOrAbsPath)
    // return relativeOrAbsPath.startsWith('./') ? relativeOrAbsPath.slice(2) : relativeOrAbsPath
  },
  lastFolderFromPath: (filePath: string): string => {
    const pathSplit = filePath.split('/')
    if (pathSplit[pathSplit.length - 1].includes('.')) pathSplit.pop()
    return pathSplit.join('/')
  },
  importPathFind: (filePathImportedFrom: string, importPath: string): string => {
    const importedFromPath = fileService.lastFolderFromPath(filePathImportedFrom)
    const importPathSplit = importPath.split('/')
    const importedFromPathReverseSplit = importedFromPath.split('/').reverse()
    let equalPathSplitCount = 0
    for (const [ix, split] of Object.entries(importPathSplit)) {
      if (importedFromPathReverseSplit[ix] !== split) break
      equalPathSplitCount = +ix + 1
    }
    const cleanImportPath = importPathSplit.slice(equalPathSplitCount).join('/')
    return fileService.joinPaths(importedFromPath, cleanImportPath)
  },
  fileNameFromPath: (filePath: string): string => {
    const parts = filePath.split('/')
    const lastPart = parts[parts.length - 1]
    const nameParts = lastPart.split('.')
    if (nameParts.length === 1) return nameParts[0]
    nameParts.pop()
    return nameParts.join('.')
  },
}
