import { TypescriptParserConvert } from '../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './module.ts'
const folderPath = './test/entity-type/'
const result = [
  {
    _type: 'type',
    filePath: 'module.ts',
    importReference: [],
    name: 'ReturnFnType',
  },
  {
    _type: 'object',
    filePath: 'module.ts',
    importReference: [],
    name: 'fn1',
  },
  {
    _type: 'object',
    filePath: 'module.ts',
    importReference: [],
    name: 'fn2',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TypescriptParserConvert({ filePath, folderPath }).convert()).toEqual(result)
})
