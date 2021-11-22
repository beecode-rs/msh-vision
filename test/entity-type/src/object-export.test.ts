import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const filePath = './src/object-export.ts'
const result = [
  {
    _inProjectPath: 'src/object-export.ts',
    _isExported: true,
    _meta: {
      _returnType: 'boolean',
    },
    _name: 'SomeType',
    _references: [],
    _type: 'type',
  },
  {
    _inProjectPath: 'src/object-export.ts',
    _isExported: true,
    _meta: {
      _aliasReference: '',
      _properties: [
        {
          _accessLevel: 'public',
          _isAbstract: false,
          _name: 'test',
          _returnType: 'SomeType',
        },
      ],
    },
    _name: 'objectExport',
    _references: [
      {
        _inProjectPath: 'fs.ts',
        _name: 'existsSync',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/default-function.ts',
        _name: 'defaultFunction',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/object-export.ts',
        _name: 'SomeType',
        _type: 'association',
      },
    ],
    _type: 'object',
  },
  {
    _inProjectPath: 'src/object-export.ts',
    _isExported: true,
    _meta: {
      _isAbstract: false,
      _properties: [
        {
          _accessLevel: 'public',
          _functionParams: '',
          _isAbstract: false,
          _name: 'test',
          _returnType: 'string',
        },
      ],
    },
    _name: 'TestClass',
    _references: [],
    _type: 'class',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectPath: process.cwd() + '/test/entity-type' }).convert()).toEqual(result)
})
