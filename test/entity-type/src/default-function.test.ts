import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const projectRootPath = process.cwd() + '/test/entity-type'
const filePath = 'src/default-function.ts'
const result = [
  {
    _inProjectPath: 'src/default-function.ts',
    _isExported: true,
    _name: 'default-function.ts',
    _references: [],
    _type: 'file',
  },
]

it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectRootPath }).convert()).toEqual(result)
})
