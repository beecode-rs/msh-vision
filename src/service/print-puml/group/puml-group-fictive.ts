import { PumlGroupStrategy } from 'src/service/print-puml/group/puml-group'

export class PumlGroupFictive implements PumlGroupStrategy {
  public templateEnd(): string {
    return ''
  }

  public templateStart(): string {
    return ''
  }
}
