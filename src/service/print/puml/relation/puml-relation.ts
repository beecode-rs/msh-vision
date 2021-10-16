import { Printable } from 'src/service/print/printable'

export class PumlRelation extends Printable {
  protected readonly _from: string
  protected readonly _to: string

  constructor({ from, to }: { from: string; to: string; type?: string }) {
    super()
    this._from = from
    this._to = to
  }

  protected _templateStart(): string {
    return `${this._from} -up-> ${this._to}`
  }

  protected _templateEnd(): string {
    return ''
  }

  protected _print(): string[] {
    return []
  }
}
