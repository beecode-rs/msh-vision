import { AbstractClass } from './abstract-class'
import { errors } from './errors'
import { OtherInterface } from './other-interface'
import { SomeEnumType } from './some-enum-type'
import { SomeInterface } from './some-interface'

export type SomeType = string

export class SomeClass extends AbstractClass implements SomeInterface, OtherInterface<string> {
  protected readonly _constParam: string
  protected readonly _constParam1: string

  public constructor(params: { test: string; test1: SomeType }) {
    const { test, test1 } = params
    super()
    this._constParam = test
    this._constParam1 = test1
  }
  public test1(): SomeEnumType {
    switch (true) {
      case true:
        errors.throwError('test')
    }
    return SomeEnumType.FIRST_VALUE
  }

  public test(someParam: string): number
  public test(): number
  public test(someParam?: string): number {
    return 0
  }
}
