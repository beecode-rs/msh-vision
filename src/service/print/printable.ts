export abstract class Printable {
  protected _children: Printable[] = []
  protected _level = 0

  public get Level(): number {
    return this._level
  }
  public set Level(lev: number) {
    this._level = lev
  }

  protected abstract _templateEnd(): string
  protected abstract _templateStart(): string
  protected abstract _print(): string[]

  public print(): string {
    const template: string[] = []
    template.push(this._templateStart())
    template.push(...this._children.map((c) => c.print()))
    template.push(...this._print())
    template.push(this._templateEnd())

    return this._indentByLevel(template.join('\n'))
  }

  protected _indentByLevel(template: string): string {
    if (this._level === 0) return template
    return template
      .split('\n')
      .map((t) => `  ${t}`)
      .join('\n')
  }

  public addChildren(printable: Printable): void {
    printable.Level = this.Level + 1
    this._children.push(printable)
  }
}
