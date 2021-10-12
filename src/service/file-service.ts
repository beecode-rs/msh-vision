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
  removeDotSlashFromRelativePath: (relativeOrAbsPath: string): string => {
    return relativeOrAbsPath.startsWith('./') ? relativeOrAbsPath.slice(2) : relativeOrAbsPath
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
