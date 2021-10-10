import { Printable } from 'src/service/print/printable'
import { pumlGroupService } from 'src/service/print/puml/group/puml-group-service'

export class PumlGroup extends Printable {
  protected readonly _name: string
  public groups: { [k: string]: PumlGroup } = {}

  protected _templateEnd(): string {
    return '}'
  }
  protected _templateStart(): string {
    return `folder ${this._name} {`
  }

  public get Name(): string {
    return this._name
  }

  constructor({ name, level }: { name: string; level?: number }) {
    super()
    this._level = level ?? 0
    this._name = name
  }

  protected _print(): string[] {
    return [pumlGroupService.printGroups(this.groups)]
  }
}
