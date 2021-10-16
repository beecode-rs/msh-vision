import { Entity } from 'src/model/entity'

export interface Parsable<T = Entity[]> {
  parse(): T
}
