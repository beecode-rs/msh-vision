import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableWrapper extends PumlEntity {
  protected _templateEnd(): string {
    return ''
  }
  protected _templateStart(): string {
    return this._string
  }

  constructor(protected readonly _string: string) {
    super()
  }

  protected _print(): string[] {
    return []
  }
}
