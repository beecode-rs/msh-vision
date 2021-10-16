import { objectExport } from './object-export'

export type SomeType = string

export const someTest = {
  someCall: (): SomeType => {
    return objectExport.test()
  },
}

export const someTest2 = {
  someCall: (): SomeType => {
    return objectExport.test()
  },
}
