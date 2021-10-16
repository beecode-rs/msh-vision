import { AbstractClass } from './abstract-class'
import { OtherInterface } from './other-interface'
import { SomeInterface } from './some-interface'

export class SomeClass extends AbstractClass implements SomeInterface, OtherInterface<string> {
  public test(): number {
    return 1
  }
}
