import { promises as fs } from 'fs'
import glob from 'glob'
import { filePathService } from 'src/service/file-path-service'
import { config } from 'src/util/config'

const _self = {
  fileListFromFolder: async (folderPath: string): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
      const cwd = filePathService.relativeToAbsPath(filePathService.joinPaths(config().vision.projectRootPath, folderPath))
      glob('**/*', { cwd, dot: true, nodir: true, ignore: config().vision.ignoreGlobPaths }, (err, files) => {
        // TODO implement some mechanism to ignore files
        if (err) return reject(err)
        return resolve(files.map((f) => filePathService.joinPaths(folderPath, f)))
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
    await _self.writeToFile({ filePath: filePathService.joinPaths(folderPath, fileName), data })
  },
}

export const fileDao = _self
