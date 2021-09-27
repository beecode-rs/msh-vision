import { TypescriptConvertStrategy } from 'src/service/convert/typescript-convert-strategy'

describe('Simple', () => {
  describe('test', () => {
    it('should ', async () => {
      const result = await new TypescriptConvertStrategy().convert('./test/simple/src/index.ts')
      expect(result).toEqual({})
    })
  })
})
