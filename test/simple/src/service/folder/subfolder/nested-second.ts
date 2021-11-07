import { SomeClass } from '../../some-class'
import { nested, TestTypesTTT } from './nested'
import { nestedThird } from './nested-third'

export const nestedSecond = {
  otherFunction: async (test: TestTypesTTT): Promise<SomeClass> => {
    const ttt = await nested.someFunction(test)[1].map((a) => {
      return new xSomeClass({ test: '', test1: '' })
    })
    const ttt2 = await nestedThird.someFunction(test)[1].map((a) => {
      return new xSomeClass({ test: '', test1: '' })
    })
  },
}
