import { TypescriptParserConvert } from '../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './default-function.ts'
const folderPath = './test/entity-type/'
const result = [
  {
    _type: 'object',
    filePath: 'default-function.ts',
    importReferences: [],
    name: 'default-function',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TypescriptParserConvert({ filePath, folderPath }).convert()).toEqual(result)
})
