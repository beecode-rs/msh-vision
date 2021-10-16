import { ReferenceType } from 'src/enum/reference-type'
import { Entity } from 'src/model/entity'
import { Referencable } from 'src/model/referencable'
import { Reference } from 'src/model/reference'

export class EntityFile extends Entity implements Referencable {
  protected readonly _references: Reference[] = []

  constructor({ name, inProjectPath }: { name: string; inProjectPath: string }) {
    super({ name, inProjectPath })
  }

  public get References(): Reference[] {
    return this._references
  }

  public addAssociation({ name, inProjectPath }: { name: string; inProjectPath: string }): void {
    this._references.push(new Reference({ name, inProjectPath, type: ReferenceType.ASSOCIATION }))
  }
}
