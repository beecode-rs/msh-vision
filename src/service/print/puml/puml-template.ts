import { Printable } from 'src/service/print/printable'

export class PumlTemplate extends Printable {
  protected _templateStart(): string {
    return '@startuml'
  }
  protected _templateEnd(): string {
    return '@enduml'
  }

  protected _print(): string[] {
    return []
  }
}
