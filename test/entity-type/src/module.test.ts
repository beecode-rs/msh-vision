import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const filePath = './src/module.ts'
const result = [
  {
    _inProjectPath: 'src/module.ts',
    _isExported: true,
    _meta: {
      _returnType: 'string',
    },
    _name: 'ReturnFnType',
    _references: [],
    _type: 'type',
  },
  {
    _inProjectPath: 'src/module.ts',
    _isExported: true,
    _meta: {
      _aliasReference: '',
      _properties: [],
    },
    _name: 'fn1',
    _references: [
      {
        _inProjectPath: 'src/module.ts',
        _name: 'ReturnFnType',
        _type: 'association',
      },
    ],
    _type: 'object',
  },
  {
    _inProjectPath: 'src/module.ts',
    _isExported: true,
    _meta: {
      _aliasReference: '',
      _properties: [],
    },
    _name: 'fn2',
    _references: [],
    _type: 'object',
  },
]

it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectPath: process.cwd() + '/test/entity-type' }).convert()).toEqual(result)
})
