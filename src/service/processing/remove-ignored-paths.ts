import { Entity } from 'src/model/entity'
import { ProcessingStrategy } from 'src/service/processing/processing-service'

export class RemoveIgnoredPaths implements ProcessingStrategy {
  constructor(protected _ignorePaths: string[]) {}

  public process(entities: Entity[]): Entity[] {
    if (this._ignorePaths.length === 0) return entities
    const removedIgnoredEntities = entities.filter((e) => !this._ignorePaths.find((ip) => e.InProjectPath.startsWith(ip)))
    removedIgnoredEntities.forEach((rie) => rie.removeIgnoredReferences(this._ignorePaths))
    return removedIgnoredEntities
  }
}
