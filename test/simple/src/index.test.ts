import { TypescriptParserConvert } from '../../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './index.ts'
const folderPath = './test/simple/src'
const result = [
  {
    _type: 'object',
    filePath: 'index.ts',
    importReference: [
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
  expect(await new TypescriptParserConvert({ filePath, folderPath }).convert()).toEqual(result)
})
