import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const filePath = './src/default-object.ts'
const result = [
  {
    _inProjectPath: 'src/default-object.ts',
    _isExported: true,
    _name: 'default-object.ts',
    _references: [],
    _type: 'file',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectPath: process.cwd() + '/test/entity-type' }).convert()).toEqual(result)
})
