import { Entity } from 'src/model/entity'

export interface ConvertStrategy {
  convert(): Promise<Entity>
}
