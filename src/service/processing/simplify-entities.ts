import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import { Reference } from 'src/model/reference'
import { ProcessingStrategy } from 'src/service/processing/processing-service'

export class SimplifyEntities implements ProcessingStrategy {
  protected readonly _simplifyConfig: { [k: string]: string }

  constructor(simplifyConfig: [string, string][]) {
    this._simplifyConfig = simplifyConfig.reduce<{ [k: string]: string }>((acc, cur) => {
      acc = { ...acc, [cur[1]]: cur[0] }
      return acc
    }, {})
  }

  public process(entities: Entity[]): Entity[] {
    if (Object.keys(this._simplifyConfig).length === 0) return entities
    const entitiesUpdatedReferences = this._processReferences(entities)
    return this._simplifyEntities(entitiesUpdatedReferences)
  }

  protected _simplifyEntities(entities: Entity[]): Entity[] {
    const { toSimplifyObj, other } = entities.reduce<{ toSimplifyObj: { [k: string]: Entity[] }; other: Entity[] }>(
      (acc, cur) => {
        const simKey = this._findSimplifiedEntityByPath(cur.InProjectPath)
        if (!simKey) {
          acc.other.push(cur)
          return acc
        }
        acc.toSimplifyObj[simKey] = acc.toSimplifyObj[simKey] ?? []
        acc.toSimplifyObj[simKey].push(cur)

        return acc
      },
      { toSimplifyObj: {}, other: [] }
    )

    const simplifiedEntities = Object.entries(toSimplifyObj).map(([simplifyName, simplifiedEntities]) => {
      const references = simplifiedEntities
        .map((e) => {
          return e.References.map((r) => Reference.cloneAndModify(r))
        })
        .flat()

      return new Entity({
        type: EntityTypes.OBJECT,
        name: simplifyName,
        inProjectPath: this._simplifyConfig[simplifyName],
        isExported: true,
        references: this._removeDuplicatedReferences(references),
        meta: new EntityObject({
          properties: simplifiedEntities.map((se) => {
            return new Property({ name: `${se.Name} (${se.InProjectPath})`, returnType: '' })
          }),
        }),
      })
    })

    return [...other, ...simplifiedEntities]
  }

  protected _processReferences(entities: Entity[]): Entity[] {
    return entities.map((entity) => {
      const references = entity.References.map((ref) => {
        const simKey = this._findSimplifiedEntityByPath(ref.InProjectPath)
        if (!simKey) return ref
        return Reference.cloneAndModify(ref, { name: simKey, inProjectPath: this._simplifyConfig[simKey] })
      })
      const noDuplicatedReferences = this._removeDuplicatedReferences(references)
      return Entity.cloneAndModify(entity, { references: noDuplicatedReferences })
    })
  }

  protected _removeDuplicatedReferences(references: Reference[]): Reference[] {
    return references.reduce((acc, cur) => {
      if (acc.find((e) => e.Name === cur.Name && e.InProjectPath === cur.InProjectPath)) return acc
      acc.push(cur)
      return acc
    }, [] as Reference[])
  }

  protected _findSimplifiedEntityByPath(path: string): string | undefined {
    const found = Object.entries(this._simplifyConfig).find(([_, value]) => path.startsWith(value))
    if (!found) return undefined
    return found[0]
  }
}
