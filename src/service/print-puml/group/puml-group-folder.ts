import { PumlGroup, PumlGroupStrategy } from 'src/service/print-puml/group/puml-group'

export class PumlGroupFolder implements PumlGroupStrategy {
  public constructor(protected _group: PumlGroup) {}

  public templateStart(): string {
    return `folder "${this._group.Name}" as ${this._group.Id} {`
  }

  public templateEnd(): string {
    return '}'
  }
}
