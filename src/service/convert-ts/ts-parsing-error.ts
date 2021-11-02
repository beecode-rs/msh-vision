export class TsParsingError extends Error {
  constructor(error: Error, message: string, protected _statement: any) {
    super(error.message)
    this.message = message
    this.stack = error.stack
  }

  public get Statement(): any {
    return this._statement
  }

  public get CanPrintCode(): boolean {
    return !!this._statement.getText
  }
}
