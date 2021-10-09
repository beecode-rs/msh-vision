import { ExportReference } from 'src/model/export-reference'
import { ImportReference } from 'src/model/import-reference'

export class Entity {
  public filePath: string
  public importReference: ImportReference[] = []
  public exportReference: ExportReference[] = []
}
