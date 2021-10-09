import { Entity } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { PumlGroup } from 'src/service/print/puml/puml-group/puml-group'
import { pumlPrintableEntityService } from 'src/service/print/puml/puml-printable-entity/puml-printable-entity-service'
import { PumlTemplate } from 'src/service/print/puml/puml-template'

export class PumlPrintStrategy implements PrintStrategy {
  protected readonly _destinationPath: string
  protected readonly _fileName = 'vision.puml'
  protected _groups: { [k: string]: PumlGroup } = {}

  protected async _writeToFile(data: string): Promise<void> {
    await fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data })
  }

  constructor({ destinationPath }: { destinationPath: string }) {
    this._destinationPath = destinationPath
  }

  protected _generateGroups(entities: Entity[]): void {
    entities.forEach((e) => {
      const paths = e.filePath.split('/')
      let prevGroup: PumlGroup
      paths.forEach((p, ix, list) => {
        if (list.length === 1) return
        const groups = prevGroup ? prevGroup.groups : this._groups
        if (ix === list.length - 1) {
          prevGroup.addChildren(pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }))
          return
        }
        const newGroup = groups[p] ?? new PumlGroup({ name: p })
        groups[p] = newGroup
        prevGroup = newGroup
      })
    })
  }

  public async print({ entities }: { entities: Entity[] }): Promise<void> {
    const template = new PumlTemplate()
    this._generateGroups(entities)
    Object.values(this._groups).forEach((g) => template.addChildren(g))
    await this._writeToFile(template.print())
  }
}
