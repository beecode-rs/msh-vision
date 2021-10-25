import { PumlGroupType } from 'src/enum/puml-group-type'
import { PumlEntity } from 'src/service/print/puml/puml-entity'
import { constant } from 'src/util/constant'
import { stringUtil } from 'src/util/string-util'

export class PumlGroup extends PumlEntity {
  protected readonly _name: string
  protected readonly _type: PumlGroupType
  protected readonly _groupPath: string
  public groups: { [k: string]: PumlGroup } = {}

  protected _templateEnd(): string {
    if (this.Type === PumlGroupType.FICTIVE) return ''
    return '}'
  }

  protected _templateStart(): string {
    if (this.Type === PumlGroupType.FICTIVE) return ''
    return `${this._type} "${this.Name}" as ${this.Id} {`
  }

  protected _print(): string[] {
    return [this._printGroups(this.groups)].filter(Boolean)
  }

  protected _printGroups(groups: { [k: string]: PumlGroup }): string {
    return Object.values(groups)
      .map((pg) => pg.print())
      .filter(Boolean)
      .join(constant.newRow)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(params: { name: string; type: PumlGroupType; groupPath: string }) {
    const { name, type, groupPath } = params
    super()
    this._name = name
    this._type = type
    this._groupPath = groupPath
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
