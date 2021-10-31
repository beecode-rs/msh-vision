import { Entity } from 'src/service/model/entity'

export interface PrintStrategy {
  print(params: { entities: Entity[] }): Promise<void>
}
