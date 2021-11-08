import fs from 'fs'
import plantuml from 'node-plantuml'
import { fileDao } from 'src/dal/file-dao'
import { EntityTypes } from 'src/enum/entity-types'
import { PumlGroupType } from 'src/enum/puml-group-type'
import { Entity } from 'src/model/entity'
import { EntityObject } from 'src/model/entity-object'
import { Property } from 'src/model/property'
import { filePathService } from 'src/service/file-path-service'
import { PumlGroup } from 'src/service/print-puml/group/puml-group'
import { PumlDocument } from 'src/service/print-puml/printable-entity/puml-document'
import { PumlPrintableWrapper } from 'src/service/print-puml/printable-entity/puml-printable-wrapper'
import { pumlService } from 'src/service/print-puml/puml-service'
import { PrintStrategy } from 'src/service/print-service'
import { constant } from 'src/util/constant'

export class PumlPrint implements PrintStrategy {
  protected readonly _destinationPath: string
  protected readonly _fileName: string
  protected _rootGroup: PumlGroup
  protected readonly _pumlRelationStrings: string[] = []

  protected async _writeToFile(data: string): Promise<void> {
    await fileDao.mkdirAndWriteToFile({ folderPath: this._destinationPath, fileName: this._fileName, data })
  }

  constructor(params: { appName?: string; destinationPath: string; fileName: string }) {
    const { appName, destinationPath, fileName } = params
    const fallbackAppName = appName ?? ''
    this._destinationPath = destinationPath
    this._fileName = `${fileName}.puml`
    this._rootGroup = new PumlGroup({
      name: fallbackAppName,
      type: appName ? PumlGroupType.RECTANGLE : PumlGroupType.FICTIVE,
      groupPath: fallbackAppName,
    })
  }

  public get FilePath(): string {
    return filePathService.joinPaths(this._destinationPath, this._fileName)
  }

  public async print(params: { entities: Entity[] }): Promise<void> {
    const { entities } = params
    const withMissingEntities = this._missingEntities(entities)
    this._generateGroups(withMissingEntities)
    this._flattenGroups(this._rootGroup)
    const template = new PumlDocument()
    template.addChildren(this._rootGroup)
    this._pumlRelationStrings.forEach((s) => template.addChildren(new PumlPrintableWrapper(s)))
    const pumlBody = template.print()
    await this._writeToFile(pumlBody)
    // await this._exportFile() // TODO add parameter flag
  }

  protected _missingEntities(entities: Entity[]): Entity[] {
    const allReferences = entities.map((e) => e.References).flat()
    const newEntities = allReferences.reduce<Entity[]>((acc, cur) => {
      if ([...entities, ...acc].find((e) => e.Name === cur.Name && e.InProjectPath === cur.InProjectPath)) return acc
      acc.push(
        new Entity({
          type: EntityTypes.OBJECT,
          name: cur.Name,
          inProjectPath: cur.InProjectPath,
          isExported: false,
          meta: new EntityObject({ properties: [new Property({ name: cur.InProjectPath, returnType: '' })] }),
        })
      )
      return acc
    }, [])
    return [...entities, ...newEntities]
  }

  protected async _exportFile(): Promise<void> {
    const exportFilePath = `${this.FilePath.split('.')[0]}.svg`
    await this._svgPromiseGenerator(this.FilePath, exportFilePath)
    // return new Promise((resolve) => {
    //   const gen = plantuml.generate(this.FilePath, { format: 'svg' })
    //   gen.out.pipe(fs.createWriteStream(exportFilePath))
    //   gen.out.on('end', resolve)
    // })
  }

  protected _svgPromiseGenerator(source, dest): Promise<void> {
    return new Promise((resolve, reject) => {
      const generator = plantuml.generate(source, { format: 'svg' })
      const fileStream = fs.createWriteStream(dest)

      fileStream.on('error', reject)
      generator.out.on('error', reject)

      generator.out.pipe(fileStream)

      fileStream.on('finish', () => {
        resolve()
      })
    })
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
      groups: childGroup.groups,
    })
    childGroup.Children.forEach((cg) => flatGroup.addChildren(cg))
    return Object.keys(flatGroup.groups).length > 0 ? this._flattenGroups(flatGroup) : flatGroup
  }
}
