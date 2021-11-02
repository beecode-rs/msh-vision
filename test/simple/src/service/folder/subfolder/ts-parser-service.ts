import { Reference } from 'src/service/model/reference'
const _self = {
  findClassRelations: (params: { statement: ts.Statement; parsedSource: ts.SourceFile; inProjectPath: string }): Reference[] => {
    return extendImplements
      .map((ei) => {
        const fileImport = fileImports.find((fi) => {
          return fi.name === ei.name
        })
        if (!fileImport) {
          logger.warn(`Import not found for ${JSON.stringify(ei)}`)
          return
        }
        return new Reference({
          name: ei.name,
          type: ei.type === 'implements' ? ReferenceType.IMPLEMENTATION : ReferenceType.INHERITANCE,
          inProjectPath: fileImport.inProjectPath,
        })
      })
      .filter(Boolean) as Reference[]
  },
}

export const tsParserService = _self
