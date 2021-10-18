import { AbstractClass } from './abstract-class'
import { OtherInterface } from './other-interface'
import { SomeInterface } from './some-interface'
import { errors } from './errors'

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
  public test(): number {
    switch (true) {
      case true:
        errors.throwError('test')
    }
    return 1
  }
}
