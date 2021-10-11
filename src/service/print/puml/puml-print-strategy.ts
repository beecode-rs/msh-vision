import { Entity } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { PumlGroup } from 'src/service/print/puml/group/puml-group'
import { pumlPrintableEntityService } from 'src/service/print/puml/printable-entity/puml-printable-entity-service'
import { PumlTemplate } from 'src/service/print/puml/puml-template'
import { pumlRelationService } from 'src/service/print/puml/relation/puml-relation-service'

export class PumlPrintStrategy implements PrintStrategy {
  protected readonly _destinationPath: string
  protected readonly _fileName = 'vision.puml'
  protected _rootGroup: PumlGroup

  protected async _writeToFile(data: string): Promise<void> {
    await fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data })
  }

  constructor({ appName, destinationPath }: { appName: string; destinationPath: string }) {
    this._destinationPath = destinationPath
    this._rootGroup = new PumlGroup({ name: appName, level: 0 })
  }

  protected _generateGroups(entities: Entity[]): void {
    entities.forEach((e) => {
      const paths = e.filePath.split('/')
      let prevGroup: PumlGroup
      paths.forEach((p, ix, list) => {
        const group = prevGroup ? prevGroup : this._rootGroup
        if (ix === list.length - 1) {
          group.addChildren(pumlPrintableEntityService.printableStrategyFromEntity({ entity: e }))
          return
        }
        if (list.length === 1) return
        const newGroup = group.groups[p] ?? new PumlGroup({ name: p, level: ix + 1 })
        group.groups[p] = newGroup
        prevGroup = newGroup
      })
    })
  }

  public async print({ entities }: { entities: Entity[] }): Promise<void> {
    const template = new PumlTemplate()
    this._generateGroups(entities)
    template.addChildren(this._rootGroup)
    pumlRelationService.generateRelations(entities).forEach((r) => template.addChildren(r))
    await this._writeToFile(template.print())
  }
}
