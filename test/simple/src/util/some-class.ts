import { AbstractClass } from './abstract-class'
import { OtherInterface } from './other-interface'
import { SomeInterface } from './some-interface'

export class SomeClass extends AbstractClass implements SomeInterface, OtherInterface<string> {
  protected readonly _constParam: string

  public constructor(constParam: string) {
    super()
    this._constParam = constParam
  }
  public test(): number {
    return 1
  }
}
