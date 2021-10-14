import { TypescriptParserConvert } from '../../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './index.ts'
const folderPath = './test/simple/src'
const expectedResult = [
  {
    _type: 'object',
    filePath: 'index.ts',
    importReferences: [
      {
        filePath: 'util/some-class.ts',
        name: 'SomeClass',
      },
      {
        filePath: 'util/logger.ts',
        name: 'logger',
      },
    ],
    name: 'index',
  },
]
it('should pass ' + filePath, async () => {
  const result = await new TypescriptParserConvert({ filePath, folderPath }).convert()
  expect(result).toEqual(expectedResult)
})
