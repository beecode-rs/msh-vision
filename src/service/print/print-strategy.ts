import { Entity } from 'src/model/entity'

export interface PrintStrategy {
  print(params: { entities: Entity[] }): Promise<void>
}
