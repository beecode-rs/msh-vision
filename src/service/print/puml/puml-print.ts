import { PumlGroupType } from 'src/enum/puml-group-type'
import { Entity } from 'src/model/entity'
import { EntityClass } from 'src/model/entity-class'
import { EntityEnum } from 'src/model/entity-enum'
import { EntityFile } from 'src/model/entity-file'
import { EntityInterface } from 'src/model/entity-interface'
import { EntityObject } from 'src/model/entity-object'
import { EntityType } from 'src/model/entity-type'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { PumlPrintableClass } from 'src/service/print/puml/printable-entity/puml-printable-class'
import { PumlPrintableEnum } from 'src/service/print/puml/printable-entity/puml-printable-enum'
import { PumlPrintableFile } from 'src/service/print/puml/printable-entity/puml-printable-file'
import { PumlPrintableInterface } from 'src/service/print/puml/printable-entity/puml-printable-interface'
import { PumlPrintableObject } from 'src/service/print/puml/printable-entity/puml-printable-object'
import { PumlPrintableType } from 'src/service/print/puml/printable-entity/puml-printable-type'
import { PumlPrintableWrapper } from 'src/service/print/puml/printable-entity/puml-printable-wrapper'
import { PumlDocument } from 'src/service/print/puml/puml-document'
import { PumlEntity } from 'src/service/print/puml/puml-entity'
import { PumlGroup } from 'src/service/print/puml/puml-group'
import { constant } from 'src/util/constant'
import { logger } from 'src/util/logger'

export class PumlPrint implements PrintStrategy {
  protected readonly _destinationPath: string
  protected readonly _fileName = 'vision.puml' // TODO implement export file name variable
  protected _rootGroup: PumlGroup
  protected readonly _pumlRelationStrings: string[] = []

  protected async _writeToFile(data: string): Promise<void> {
    await fileService.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data })
  }

  constructor(params: { appName?: string; destinationPath: string }) {
    const { appName, destinationPath } = params
    const fallbackAppName = appName ?? ''
    this._destinationPath = destinationPath
    this._rootGroup = new PumlGroup({
      name: fallbackAppName,
      type: appName ? PumlGroupType.RECTANGLE : PumlGroupType.FICTIVE,
      groupPath: fallbackAppName,
    })
  }

  protected _generateGroups(entities: Entity[]): void {
    entities.forEach((e) => {
      const paths = e.InProjectPath.split(constant.folderSep)
      let prevGroup: PumlGroup | undefined
      // let fullGroupPath: string
      paths.forEach((p, ix, list) => {
        const parentGroup = prevGroup ? prevGroup : this._rootGroup
        if (ix === list.length - 1) {
          const printableEntity = this._printableStrategyFromEntity(e)
          if (printableEntity) {
            this._pumlRelationStrings.push(printableEntity.printRelations())
            parentGroup.addChildren(printableEntity)
          }
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

  protected _printableStrategyFromEntity(entity: Entity): PumlEntity | undefined {
    switch (true) {
      case entity.Meta instanceof EntityClass:
        return new PumlPrintableClass({ entity })
      case entity.Meta instanceof EntityFile:
        return new PumlPrintableFile({ entity })
      case entity.Meta instanceof EntityObject:
        return new PumlPrintableObject({ entity })
      case entity.Meta instanceof EntityInterface:
        return new PumlPrintableInterface({ entity })
      case entity.Meta instanceof EntityType:
        return new PumlPrintableType({ entity })
      case entity.Meta instanceof EntityEnum:
        return new PumlPrintableEnum({ entity })
      default:
        logger.warn(`Unknown entity type ${entity.constructor.name}`)
    }
  }

  public async print(params: { entities: Entity[] }): Promise<void> {
    const { entities } = params
    const template = new PumlDocument()
    this._generateGroups(entities)
    template.addChildren(this._rootGroup)
    this._pumlRelationStrings.forEach((s) => template.addChildren(new PumlPrintableWrapper(s)))
    await this._writeToFile(template.print())
  }
}
