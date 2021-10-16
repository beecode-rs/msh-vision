import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlDocument extends PumlEntity {
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
