import { TypescriptConvertStrategy } from 'src/service/convert/typescripty/typescript-convert-strategy'

describe('Simple', () => {
  const file = './test/simple/src/util/logger.ts'
  const result = [
    {
      filePath: './test/simple/src/util/logger.ts',
      importReference: [],
      exportReference: [
        {
          name: 'logger',
        },
      ],
    },
  ]
  it('should pass ' + file, async () => {
    expect(await new TypescriptConvertStrategy(file).convert()).toEqual(result)
  })
})
