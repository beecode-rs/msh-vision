import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const filePath = './src/index.ts'
const expectedResult = [
  {
    _inProjectPath: 'src/index.ts',
    _isExported: true,
    _name: 'index.ts',
    _references: [
      {
        _inProjectPath: 'src/default-object.ts',
        _name: 'defaultObject',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/default-function.ts',
        _name: 'defaultFunction',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/module.ts',
        _name: 'module',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/object-export.ts',
        _name: 'objectExport',
        _type: 'association',
      },
    ],
    _type: 'file',
  },
]
it('should pass ' + filePath, async () => {
  const result = await new ParserTs({ filePath, projectPath: process.cwd() + '/test/entity-type' }).convert()
  expect(result).toEqual(expectedResult)
})
