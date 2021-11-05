import { EntityTypes } from 'src/enum/entity-types'
import { ConvertStrategy, convertService } from 'src/service/convert-service'
import { fileService } from 'src/service/file-service'
import { Entity } from 'src/service/model/entity'
import { PrintStrategy } from 'src/service/print-strategy'
import { visionConfig } from 'src/util/config'

export const visionUseCase = {
  processFolder: async (params: { folderPath: string; printStrategy: PrintStrategy }): Promise<void> => {
    const { folderPath, printStrategy } = params
    const fileList = await fileService.fileListFromFolder(folderPath)
    const convertStrategies = fileList
      .map((f) => convertService.strategyByFile({ filePath: f, folderPath }))
      .filter(Boolean) as ConvertStrategy[]
    const entities = (await Promise.all(convertStrategies.map((cs) => cs.convert()))).flat()
    if (!entities) return
    const cleanEntities = visionUseCase._removeIgnoredPaths(entities)
    const noExternalEntities = visionUseCase._removeExternal(cleanEntities)
    const noTypeEntities = visionUseCase._removeTypes(noExternalEntities)
    await printStrategy.print({ entities: noTypeEntities })
  },
  _removeIgnoredPaths: (entities: Entity[]): Entity[] => {
    const {
      print: { ignorePaths },
    } = visionConfig()
    if (ignorePaths.length === 0) return entities
    const removedIgnoredEntities = entities.filter((e) => !ignorePaths.find((ip) => e.InProjectPath.startsWith(ip)))
    removedIgnoredEntities.forEach((rie) => rie.removeIgnoredReferences(ignorePaths))
    return removedIgnoredEntities
  },
  _removeExternal: (entities: Entity[]): Entity[] => {
    if (!visionConfig().print.ignoreExternal) return entities
    entities.forEach((entity) => {
      if (entity.References.length === 0) return
      entity.References = entity.References.filter((r) => entities.find((e) => r.InProjectPath === e.InProjectPath))
    })
    return entities
  },
  _removeTypes: (entities: Entity[]): Entity[] => {
    if (!visionConfig().print.ignoreTypes) return entities

    const { typeEntities, otherEntities } = entities.reduce<{ typeEntities: Entity[]; otherEntities: Entity[] }>(
      (agg, cur) => {
        if (cur.Type === EntityTypes.TYPE) agg.typeEntities.push(cur)
        else agg.otherEntities.push(cur)
        return agg
      },
      { typeEntities: [], otherEntities: [] }
    )

    otherEntities.forEach((entity) => {
      if (entity.References.length === 0) return
      entity.References = entity.References.filter(
        (r) => !typeEntities.find((e) => r.InProjectPath === e.InProjectPath && r.Name === e.Name)
      )
    })

    return otherEntities
  },
}
