import { PumlGroupType } from 'src/enum/puml-group-type'
import { Entity } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { PrintStrategy } from 'src/service/print/print-strategy'
import { PumlPrintableWrapper } from 'src/service/print/puml/printable-entity/puml-printable-wrapper'
import { PumlDocument } from 'src/service/print/puml/puml-document'
import { PumlGroup } from 'src/service/print/puml/puml-group'
import { pumlService } from 'src/service/print/puml/puml-service'
import { constant } from 'src/util/constant'

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

  public async print(params: { entities: Entity[] }): Promise<void> {
    const { entities } = params
    this._generateGroups(entities)
    this._flattenGroups(this._rootGroup)
    const template = new PumlDocument()
    template.addChildren(this._rootGroup)
    this._pumlRelationStrings.forEach((s) => template.addChildren(new PumlPrintableWrapper(s)))
    await this._writeToFile(template.print())
  }

  protected _generateGroups(entities: Entity[]): void {
    entities.forEach((e) => {
      const paths = e.InProjectPath.split(constant.folderSep)
      let prevGroup: PumlGroup | undefined
      paths.forEach((p, ix, list) => {
        const parentGroup = prevGroup ?? this._rootGroup
        if (ix === list.length - 1) {
          const printableEntity = pumlService.printableStrategyFromEntity(e)
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

  protected _flattenGroups(group: PumlGroup): PumlGroup | undefined {
    const groups = Object.values(group.groups)
    if (group.Type === PumlGroupType.FICTIVE || group.Children.length > 0 || groups.length > 1) {
      Object.entries(group.groups).forEach(([name, grp]) => {
        const result = this._flattenGroups(grp)
        if (result) group.groups[name] = result
      })
      return
    }
    if (groups.length === 0) return
    const childGroup = groups[0]
    const flatGroup = new PumlGroup({
      name: [group.Name, childGroup.Name].join(constant.folderSep),
      type: group.Type,
      groupPath: childGroup.GroupPath,
    })
    childGroup.Children.forEach((cg) => flatGroup.addChildren(cg))
    return flatGroup
  }
}
