import { filePathService } from 'src/service/file-path-service'
import { config } from 'src/util/config'

type TsConfigFileType = {
  compilerOptions?: {
    paths?: {
      [k: string]: string[]
    }
  }
}
let __tsConfigFileJson: TsConfigFileType | undefined = undefined

const _self = {
  init: async (): Promise<void> => {
    if (__tsConfigFileJson) return
    const tsConfigAbsPath = filePathService.relativeToAbsPath(config().vision.ts.tsconfigPath)
    __tsConfigFileJson = require(tsConfigAbsPath) // eslint-disable-line @typescript-eslint/no-var-requires
  },
  _getFileJson: (): TsConfigFileType => {
    if (!__tsConfigFileJson) throw new Error('tsconfig.json is not found')
    return __tsConfigFileJson
  },
  _cleanReplacePaths: (): { startsWith: string; replaceWith: string }[] => {
    const paths = _self._getFileJson().compilerOptions?.paths ?? {}
    return Object.entries(paths)
      .map(([refPath, [replacePaths, ..._paths]]) => ({
        startsWith: refPath.split('*').join(''),
        replaceWith: _self._cleanReplaceWith(replacePaths.split('*').join('')),
      }))
      .filter((r) => r.startsWith)
  },
  _cleanReplaceWith: (path: string): string => {
    if (!path.startsWith(config().vision.projectSrcFolderPath)) return path
    return `.${filePathService.cleanupPath(path.slice(config().vision.projectSrcFolderPath.length))}`
  },
  moduleAliasResolve: (path: string): string => {
    const resolver = _self._cleanReplacePaths().find((r) => path.startsWith(r.startsWith))
    if (!resolver) return path
    return `${resolver.replaceWith}${path.slice(resolver.startsWith.length)}`
  },
}
export const tsConfigFileService = _self
