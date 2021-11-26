import { ParserTs } from '../../../src/service/parser-ts/parser-ts'

const projectRootPath = process.cwd() + '/test/entity-type'
const filePath = 'src/some-test.ts'
const result = [
  {
    _inProjectPath: 'src/some-test.ts',
    _isExported: true,
    _meta: {
      _returnType: 'string',
    },
    _name: 'SomeType',
    _references: [],
    _type: 'type',
  },
  {
    _inProjectPath: 'src/some-test.ts',
    _isExported: true,
    _meta: {
      _aliasReference: '',
      _properties: [
        {
          _accessLevel: 'public',
          _isAbstract: false,
          _name: 'someCall',
          _returnType: 'SomeType',
        },
      ],
    },
    _name: 'someTest',
    _references: [
      {
        _inProjectPath: 'src/object-export.ts',
        _name: 'objectExport',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/some-test.ts',
        _name: 'SomeType',
        _type: 'association',
      },
    ],
    _type: 'object',
  },
  {
    _inProjectPath: 'src/some-test.ts',
    _isExported: true,
    _meta: {
      _aliasReference: '',
      _properties: [
        {
          _accessLevel: 'public',
          _isAbstract: false,
          _name: 'someCall',
          _returnType: 'SomeType',
        },
      ],
    },
    _name: 'someTest2',
    _references: [
      {
        _inProjectPath: 'src/object-export.ts',
        _name: 'objectExport',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/some-test.ts',
        _name: 'SomeType',
        _type: 'association',
      },
    ],
    _type: 'object',
  },
]

it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectRootPath }).convert()).toEqual(result)
})
