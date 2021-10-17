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

  constructor({ appName, destinationPath }: { appName?: string; destinationPath: string }) {
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
          const printableEntity = this._printableStrategyFromEntity({ entity: e })
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

  protected _printableStrategyFromEntity({ entity }: { entity: Entity }): PumlEntity | undefined {
    switch (true) {
      case entity instanceof EntityClass:
        return new PumlPrintableClass({ entity: entity as EntityClass })
      case entity instanceof EntityFile:
        return new PumlPrintableFile({ entity: entity as EntityFile })
      case entity instanceof EntityObject:
        return new PumlPrintableObject({ entity: entity as EntityObject })
      case entity instanceof EntityInterface:
        return new PumlPrintableInterface({ entity: entity as EntityInterface })
      case entity instanceof EntityType:
        return new PumlPrintableType({ entity: entity as EntityType })
      case entity instanceof EntityEnum:
        return new PumlPrintableEnum({ entity: entity as EntityEnum })
      default:
        logger.warn(`Unknown entity type ${entity.constructor.name}`)
    }
  }

  public async print({ entities }: { entities: Entity[] }): Promise<void> {
    const template = new PumlDocument()
    this._generateGroups(entities)
    template.addChildren(this._rootGroup)
    this._pumlRelationStrings.forEach((s) => template.addChildren(new PumlPrintableWrapper(s)))
    await this._writeToFile(template.print())
  }
}
