import { TsConvert } from '../../src/service/convert/ts/ts-convert'

const filePath = './some-test.ts'
const folderPath = './test/entity-type/'
const result = [
  {
    _type: 'type',
    filePath: 'some-test.ts',
    importReference: [],
    name: 'SomeType',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new TsConvert({ filePath, folderPath }).convert()).toEqual(result)
})
