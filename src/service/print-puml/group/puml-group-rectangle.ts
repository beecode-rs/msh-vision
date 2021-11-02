import { PumlGroup, PumlGroupStrategy } from 'src/service/print-puml/group/puml-group'

export class PumlGroupRectangle implements PumlGroupStrategy {
  public constructor(protected _group: PumlGroup) {}

  public templateStart(): string {
    return `rectangle "${this._group.Name}" as ${this._group.Id} {`
  }

  public templateEnd(): string {
    return '}'
  }
}
