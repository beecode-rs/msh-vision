import { PumlEntity } from 'src/service/print-puml/puml-entity'

export class PumlDocument extends PumlEntity {
  protected _templateStart(): string {
    return '@startuml'
    // return ['@startuml', '!define TYPE <T,lightblue>'].join(constant.newRow) // TODO IF WE NEED COLOR TO SOME ENTITIES
  }
  protected _templateEnd(): string {
    return '@enduml'
  }

  protected _print(): string[] {
    return []
  }
}
