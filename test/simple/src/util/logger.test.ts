import { TypescriptParserConvert } from '../../../../src/service/convert/typescript-parser/typescript-parser-convert'

const filePath = './util/logger.ts'
const folderPath = './test/simple/src'
const result = [
  {
    _type: 'object',
    filePath: 'util/logger.ts',
    importReferences: [],
    name: 'logger',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TypescriptParserConvert({ filePath, folderPath }).convert()).toEqual(result)
})
