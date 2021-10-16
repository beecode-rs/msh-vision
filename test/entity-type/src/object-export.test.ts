import { TsConvert } from '../../src/service/convert/ts/ts-convert'

const filePath = './object-export.ts'
const folderPath = './test/entity-type/'
const result = [
  {
    _type: 'object',
    filePath: 'object-export.ts',
    importReferences: [],
    name: 'objectExport',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TsConvert({ filePath, folderPath }).convert()).toEqual(result)
})
