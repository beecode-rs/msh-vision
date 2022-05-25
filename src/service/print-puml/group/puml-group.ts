import { PumlGroupType } from 'src/enum/puml-group-type'
import { pumlGroupService } from 'src/service/print-puml/group/puml-group-service'
import { PumlEntity } from 'src/service/print-puml/puml-entity'
import { constant } from 'src/util/constant'
import { stringUtil } from 'src/util/string-util'

export interface PumlGroupStrategy {
  templateStart(): string
  templateEnd(): string
}

export class PumlGroup extends PumlEntity {
  protected readonly _groupStrategy: PumlGroupStrategy
  protected readonly _name: string
  protected readonly _type: PumlGroupType
  protected readonly _groupPath: string
  public groups: { [k: string]: PumlGroup }

  protected _templateEnd(): string {
    return this._groupStrategy.templateEnd()
  }

  protected _templateStart(): string {
    return this._groupStrategy.templateStart()
  }

  protected _print(): string[] {
    return [this._printGroups(this.groups)].filter(Boolean)
  }

  protected _printGroups(groups: { [k: string]: PumlGroup }): string {
    return Object.values(groups)
      .map((pg) => pg.print())
      .filter(Boolean)
      .join(constant().newRow)
  }

  public constructor(params: { name: string; type: PumlGroupType; groupPath: string; groups?: { [k: string]: PumlGroup } }) {
    const { name, type, groupPath, groups = {} } = params
    super()
    this._name = name
    this._type = type
    this._groupPath = groupPath
    this._groupStrategy = pumlGroupService.strategyFromGroup(this)
    this.groups = groups
  }

  public get Id(): string {
    return stringUtil.uniqueEntityHash(this.Name, this._groupPath)
  }

  public get Name(): string {
    return this._name
  }

  public get GroupPath(): string {
    return this._groupPath
  }

  public get Type(): PumlGroupType {
    return this._type
  }
}
