import { fileDao } from 'src/dal/file-dao'

describe('fileListFromFolder', () => {
  it('should return file list from test/simple folder', async () => {
    const result = await fileDao.fileListFromFolder({ rootFolder: `${process.cwd()}/test/simple`, folderPath: './src' })
    expect(result).toEqual([
      'src/enum/logger-type.ts',
      'src/enum/some-enum-type.ts',
      'src/index.ts',
      'src/service/abstract-class.ts',
      'src/service/case-type.ts',
      'src/service/folder/subfolder/nested-second.ts',
      'src/service/folder/subfolder/nested-third.ts',
      'src/service/folder/subfolder/nested.ts',
      'src/service/other-interface.ts',
      'src/service/some-class.ts',
      'src/service/some-interface.ts',
      'src/util/errors.ts',
      'src/util/logger.ts',
    ])
  })
})
