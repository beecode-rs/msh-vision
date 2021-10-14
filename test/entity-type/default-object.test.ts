import { TypescriptParserConvert } from '../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './default-object.ts'
const folderPath = './test/entity-type/'
const result = [
  {
    _type: 'object',
    filePath: 'default-object.ts',
    importReferences: [],
    name: 'obj',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TypescriptParserConvert({ filePath, folderPath }).convert()).toEqual(result)
})
