import { PumlEntity } from '../puml-entity'

export class PumlRelation extends PumlEntity {
  protected readonly _from: string
  protected readonly _to: string

  constructor({ from, to }: { from: string; to: string; type?: string }) {
    super()
    this._from = from
    this._to = to
  }

  protected get _TemplateStart(): string {
    return `${this._from} -up-> ${this._to}`
  }

  protected get _TemplateEnd(): string {
    return ''
  }

  protected get _Print(): string[] {
    return []
  }
}
