import { Printable } from 'src/service/print/printable'

export class PumlTemplate implements Printable {
  protected readonly _templateStart = '@startuml'
  protected readonly _templateEnd = '@enduml'
  protected _children: Printable[] = []

  public print(): string {
    const template: string[] = []
    template.push(this._templateStart)
    template.push(...this._children.map((c) => c.print()))
    template.push(this._templateEnd)
    return template.join('\n')
  }

  public addChildren(printable: Printable): void {
    this._children.push(printable)
  }
}
