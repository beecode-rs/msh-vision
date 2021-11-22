import { ParserTs } from '../../../../src/service/parser-ts/parser-ts'

const filePath = './src/util/logger.ts'
const result = [
  {
    _inProjectPath: 'src/util/logger.ts',
    _isExported: false,
    _meta: {
      _aliasReference: '',
      _properties: [
        {
          _accessLevel: 'public',
          _functionParams: 'msg: string',
          _isAbstract: false,
          _name: 'debug',
          _returnType: 'void',
        },
      ],
    },
    _name: 'logger',
    _references: [
      {
        _inProjectPath: 'src/util/errors.ts',
        _name: 'errors',
        _type: 'association',
      },
      {
        _inProjectPath: 'src/enum/logger-type.ts',
        _name: 'LoggerType',
        _type: 'association',
      },
    ],
    _type: 'object',
  },
]
it('should pass ' + filePath, async () => {
  expect(await new ParserTs({ filePath, projectPath: process.cwd() + '/test/simple' }).convert()).toEqual(result)
})
