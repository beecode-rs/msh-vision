import { Entity } from 'src/service/model/entity'
import { RemoveExternal } from 'src/service/processing/remove-external'
import { RemoveIgnoredPaths } from 'src/service/processing/remove-ignored-paths'
import { RemoveTypes } from 'src/service/processing/remove-types'
import { visionConfig } from 'src/util/config'

export interface ProcessingStrategy {
  process(entities: Entity[]): Entity[]
}

export const processingService = {
  process: (entities: Entity[]): Entity[] => {
    const processingStrategies: ProcessingStrategy[] = []

    const {
      print: { ignorePaths, ignoreTypes, ignoreExternal },
    } = visionConfig()

    if (ignorePaths) processingStrategies.push(new RemoveIgnoredPaths(ignorePaths))
    if (ignoreExternal) processingStrategies.push(new RemoveExternal())
    if (ignoreTypes) processingStrategies.push(new RemoveTypes())

    return processingStrategies.reduce<Entity[]>((agg, cur) => {
      return cur.process(agg)
    }, entities)
  },
}
