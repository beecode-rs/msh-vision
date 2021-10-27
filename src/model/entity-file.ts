import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'

export class EntityFile implements Referencable {
  protected readonly _references: Reference[]

  constructor(params: { references: Reference[] }) {
    const { references } = params
    this._references = references ?? []
  }

  public get References(): Reference[] {
    return this._references
  }
}
