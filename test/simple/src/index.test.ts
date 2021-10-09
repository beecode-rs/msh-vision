import { TypescriptConvertStrategy } from 'src/service/convert/typescripty/typescript-convert-strategy'

describe('simple', () => {
  const file = './test/simple/src/index.ts'
  const result = [
    {
      filePath: './test/simple/src/index.ts',
      exportReference: [],
      importReference: [
        {
          name: 'logger',
          filePath: './util/logger',
        },
      ],
    },
  ]
  it('should pass ' + file, async () => {
    expect(await new TypescriptConvertStrategy(file).convert()).toEqual(result)
  })
})
