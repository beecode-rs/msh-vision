import { nestedThird } from './nested-third'

export type TestTypesTTT = string

export const nested = {
  someFunction: async (test: TestTypesTTT): Promise<void> => {
    const ttt2 = await nestedThird.someFunction(test)[1].map((a) => {
      return new xSomeClass({ test: '', test1: '' })
    })
  },
}
