import { fileService } from 'src/service/file-service'

describe('fileListFromFolder', () => {
  it('should return file list from test/simple folder', async () => {
    const result = await fileService.fileListFromFolder('./test/simple')
    expect(result).toEqual(['src/index.test.ts', 'src/index.ts', 'src/util/logger.test.ts', 'src/util/logger.ts'])
  })
})
