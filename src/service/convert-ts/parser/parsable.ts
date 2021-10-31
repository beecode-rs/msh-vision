import { Entity } from 'src/service/model/entity'

export interface Parsable<T = Entity[]> {
  parse(): T
}
