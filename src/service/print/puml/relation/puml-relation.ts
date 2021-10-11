import { Printable } from 'src/service/print/printable'

export class PumlRelation extends Printable {
  protected readonly _from: string
  protected readonly _to: string
  // protected readonly _note: string | undefined
  // protected _type: string

  constructor({ from, to }: { from: string; to: string; type?: string }) {
    super()
    this._from = from
    this._to = to
  }

  protected _print(): string[] {
    return [`${this._from} --> ${this._to}`]
  }

  protected _templateEnd(): string {
    return ''
  }

  protected _templateStart(): string {
    return ''
  }
}
