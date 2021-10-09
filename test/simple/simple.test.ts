import { TypescriptConvertStrategy } from 'src/service/convert/typescript-convert-strategy'

describe('Simple', () => {
  describe('test', () => {
    test.each([
      [
        './test/simple/src/index.ts',
        {
          exportReference: [],
          importReference: [
            {
              name: 'logger',
              filePath: './util/logger',
            },
          ],
        },
      ],
      [
        './test/simple/src/util/logger.ts',
        {
          exportReference: [
            {
              name: 'logger',
            },
          ],
          importReference: [],
        },
      ],
    ])('should parse %s', async (file, result) => {
      const parsedResult = await new TypescriptConvertStrategy(file).convert()
      expect(parsedResult).toEqual(result)
    })
  })
})
