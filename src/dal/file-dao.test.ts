import { fileDao } from 'src/dal/file-dao'

describe('fileListFromFolder', () => {
  it('should return file list from test/simple folder', async () => {
    const result = await fileDao.fileListFromFolder('./test/simple')
    expect(result).toEqual(['src/index.test.ts', 'src/index.ts', 'src/util/logger.test.ts', 'src/util/logger.ts'])
  })
})
