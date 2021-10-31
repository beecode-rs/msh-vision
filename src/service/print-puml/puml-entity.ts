import { PumlRelation } from 'src/service/print-puml/puml-relation'
import { constant } from 'src/util/constant'

export abstract class PumlEntity {
  protected _children: PumlEntity[] = []
  protected _relations: PumlRelation[] = []

  protected abstract _templateEnd(): string
  protected abstract _templateStart(): string
  protected abstract _print(): string[]

  public print(): string {
    const bodyTemplate: string[] = []
    bodyTemplate.push(...this._children.map((c) => c.print()).filter(Boolean))
    bodyTemplate.push(...this._print())

    const template: string[] = []
    if (this._templateStart()) template.push(this._templateStart())
    template.push(...this._indentRows(bodyTemplate))
    if (this._templateEnd()) template.push(this._templateEnd())

    return template.join(constant.newRow)
  }

  protected _indentRows(templates: string[]): string[] {
    return templates.map((template) =>
      template
        .split(constant.newRow)
        .map((row) => `  ${row}`)
        .join(constant.newRow)
    )
  }

  public addChildren(printable: PumlEntity): void {
    this._children.push(printable)
  }

  public get Children(): PumlEntity[] {
    return this._children
  }

  public printRelations(): string {
    const template: string[] = []
    template.push(...this._relations.map((r) => r.print()).filter(Boolean))
    return template.join(constant.newRow)
  }
}
