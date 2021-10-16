import { Printable } from 'src/service/print/printable'
import { pumlGroupService } from 'src/service/print/puml/group/puml-group-service'
import { stringUtil } from 'src/util/string-util'

export enum PumlGroupType {
  FOLDER = 'folder',
  RECTANGLE = 'rectangle',
}

export class PumlGroup extends Printable {
  protected readonly _name: string
  public groups: { [k: string]: PumlGroup } = {}
  public readonly _type: PumlGroupType
  public readonly _fullGroupPath: string
  protected _templateEnd(): string {
    return '}'
  }

  protected _templateStart(): string {
    return `${this._type} "${this.Name}" as ${this.Id} {`
  }

  protected _print(): string[] {
    return [pumlGroupService.printGroups(this.groups)]
  }

  constructor({ name, type, fullGroupPath }: { name: string; type?: PumlGroupType; fullGroupPath: string }) {
    super()
    this._name = name
    this._type = type ?? PumlGroupType.FOLDER
    this._fullGroupPath = fullGroupPath
  }

  public get Id(): string {
    return `${stringUtil.snakeCase(this._name)}_${stringUtil.stringToHash(this._fullGroupPath)}`
  }

  public get Name(): string {
    return this._name
  }
}
