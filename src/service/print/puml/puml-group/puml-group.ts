import { Printable } from 'src/service/print/printable'
import { pumlGroupService } from 'src/service/print/puml/puml-group/puml-group-service'

export class PumlGroup implements Printable {
  protected _children: Printable[] = []
  protected readonly _templateEnd = '}'
  protected readonly _name: string
  public groups: { [k: string]: PumlGroup } = {}

  protected _templateStart(): string {
    return `folder ${this._name} {`
  }

  public get Name(): string {
    return this._name
  }

  constructor({ name }: { name: string }) {
    this._name = name
  }

  public print(): string {
    const template: string[] = []
    template.push(this._templateStart())
    template.push(...this._children.map((c) => c.print()))
    template.push(pumlGroupService.printGroups(this.groups))
    template.push(this._templateEnd)
    return template.join('\n')
  }

  public addChildren(printable: Printable): void {
    this._children.push(printable)
  }
}
