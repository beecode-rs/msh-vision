import { PumlGroupType } from 'src/enum/puml-group-type'
import { Entity } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { PumlGroup } from 'src/service/print/puml/group/puml-group'
import { pumlPrintableEntityService } from 'src/service/print/puml/printable-entity/puml-printable-entity-service'
import { PumlDocument } from 'src/service/print/puml/puml-document'
import { pumlRelationService } from 'src/service/print/puml/relation/puml-relation-service'
import { constant } from 'src/util/constant'

export class PumlPrint implements PrintStrategy {
  protected readonly _destinationPath: string
  protected readonly _fileName = 'vision.puml' // TODO implement export file name variable
  protected _rootGroup: PumlGroup

  protected async _writeToFile(data: string): Promise<void> {
    await fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data })
  }

  constructor({ appName, destinationPath }: { appName: string; destinationPath: string }) {
    this._destinationPath = destinationPath
    this._rootGroup = new PumlGroup({ name: appName, type: PumlGroupType.FICTIVE, groupPath: appName })
  }

  protected _generateGroups(entities: Entity[]): void {
    entities.forEach((e) => {
      const paths = e.InProjectPath.split(constant.folderSep)
      let prevGroup: PumlGroup | undefined
      // let fullGroupPath: string
      paths.forEach((p, ix, list) => {
        const parentGroup = prevGroup ? prevGroup : this._rootGroup
        if (ix === list.length - 1) {
          const printableEntity = pumlPrintableEntityService.printableStrategyFromEntity({ entity: e })
          if (printableEntity) parentGroup.addChildren(printableEntity)
          return
        }
        if (list.length === 1) return
        const groupPath = [parentGroup.GroupPath, p].filter(Boolean).join(constant.folderSep)
        const newGroup = parentGroup.groups[p] ?? new PumlGroup({ name: p, groupPath, type: PumlGroupType.FOLDER })
        parentGroup.groups[p] = newGroup
        prevGroup = newGroup
      })
    })
  }

  public async print({ entities }: { entities: Entity[] }): Promise<void> {
    const template = new PumlDocument()
    this._generateGroups(entities)
    template.addChildren(this._rootGroup)
    // pumlRelationService.generateRelations(entities).forEach((r) => template.addChildren(r))
    await this._writeToFile(template.print())
  }
}
