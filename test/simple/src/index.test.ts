import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const projectRootPath = process.cwd() + '/test/simple'
const filePath = 'src/index.ts'
const expectedResult = [
  {
    _inProjectPath: 'src/index.ts',
    _isExported: true,
    _name: 'index.ts',
    _references: [
      {
        _inProjectPath: 'src/service/some-class.ts',
        _name: 'SomeClass',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/util/logger.ts',
        _name: 'logger',
        _type: 'association',
      },
    ],
    _type: 'file',
  },
]

it('should pass ' + filePath, async () => {
  const result = await new ParserTs({ filePath, projectRootPath }).convert()
  expect(result).toEqual(expectedResult)
})
