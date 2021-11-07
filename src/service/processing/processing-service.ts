import { Entity } from 'src/model/entity'
import { RemoveExternal } from 'src/service/processing/remove-external'
import { RemoveIgnoredPaths } from 'src/service/processing/remove-ignored-paths'
import { RemoveTypes } from 'src/service/processing/remove-types'
import { SimplifyEntities } from 'src/service/processing/simplify-entities'
import { visionConfig } from 'src/util/config'

export interface ProcessingStrategy {
  process(entities: Entity[]): Entity[]
}

export const processingService = {
  process: (entities: Entity[]): Entity[] => {
    const processingStrategies: ProcessingStrategy[] = []

    const {
      print: { ignorePaths, ignoreTypes, ignoreExternal, simplifyEntities },
    } = visionConfig()

    if (ignorePaths.length > 0) processingStrategies.push(new RemoveIgnoredPaths(ignorePaths))
    if (ignoreExternal) processingStrategies.push(new RemoveExternal())
    if (ignoreTypes) processingStrategies.push(new RemoveTypes())
    if (simplifyEntities.length > 0) processingStrategies.push(new SimplifyEntities(simplifyEntities))

    return processingStrategies.reduce<Entity[]>((agg, cur) => {
      return cur.process(agg)
    }, entities)
  },
}
