import path from 'path'
import { constant } from 'src/util/constant'

const _self = {
  joinPaths: (...paths: string[]): string => {
    return path.join(...paths)
  },
  isAbsPath: (relativeOrAbsPath: string): boolean => {
    return relativeOrAbsPath.startsWith(constant().folderSep)
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
  fileNameFromPath: (filePath: string, options: { withExtension?: boolean } = {}): string => {
    const parts = filePath.split(constant().folderSep)
    const lastPart = parts[parts.length - 1]
    if (options.withExtension) return lastPart
    const nameParts = lastPart.split('.')
    if (nameParts.length === 1) return nameParts[0]
    nameParts.pop()
    return nameParts.join('.')
  },
  lastFolderFromPath: (filePath: string): string => {
    const pathSplit = filePath.split(constant().folderSep)
    if (pathSplit[pathSplit.length - 1].includes('.')) pathSplit.pop()
    return pathSplit.join(constant().folderSep)
  },
}

export const filePathService = _self
