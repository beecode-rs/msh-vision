import { ExportReference } from 'src/model/export-reference'
import { ImportReference } from 'src/model/import-reference'

export class Entity {
  constructor(partialEntity?: Partial<Entity>) {
    if (partialEntity) Object.assign(this, partialEntity, this)
  }

  public filePath: string
  public name: string
  public id: string

  public exportReference: ExportReference[] = []
  public importReference: ImportReference[] = []
}
