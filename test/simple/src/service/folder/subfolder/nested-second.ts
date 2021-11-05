import { SomeClass } from '../../some-class'
import { nested, TestTypesTTT } from './nested'

export const nestedSecond = {
  otherFunction: async (test: TestTypesTTT): Promise<SomeClass> => {
    const ttt = await nested.someFunction(test)[1].map((a) => {
      return new xSomeClass({ test: '', test1: '' })
    })
  },
}
