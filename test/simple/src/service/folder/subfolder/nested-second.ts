import { SomeClass } from '../../some-class'
import { nested, TestTypesTTT } from './nested'

export const nestedSecond = {
  otherFunction: async (test: TestTypesTTT): Promise<void> => {
    const ttt = await nested.someFunction(test)[1].map((a) => {
      return new SomeClass({ test: '', test1: '' })
    })
  },
}
