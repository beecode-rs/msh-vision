import { existsSync } from 'fs'
import defaultFunction from './default-function'

export type SomeType = boolean

export const objectExport = {
  test: (): SomeType => {
    defaultFunction()
    return existsSync('test')
  },
}

export class TestClass {
  public test: string
}
