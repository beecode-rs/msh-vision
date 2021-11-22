import { fileDao } from 'src/dal/file-dao'

describe('fileListFromFolder', () => {
  it('should return file list from test/simple folder', async () => {
    const result = await fileDao.fileListFromFolder('./test/simple')
    expect(result).toEqual([
      'test/simple/.vision',
      'test/simple/src/enum/logger-type.ts',
      'test/simple/src/enum/some-enum-type.ts',
      'test/simple/src/index.ts',
      'test/simple/src/service/abstract-class.ts',
      'test/simple/src/service/case-type.ts',
      'test/simple/src/service/folder/subfolder/nested-second.ts',
      'test/simple/src/service/folder/subfolder/nested-third.ts',
      'test/simple/src/service/folder/subfolder/nested.ts',
      'test/simple/src/service/other-interface.ts',
      'test/simple/src/service/some-class.ts',
      'test/simple/src/service/some-interface.ts',
      'test/simple/src/util/errors.ts',
      'test/simple/src/util/logger.ts',
      'test/simple/vision.puml',
      'test/simple/vision.svg',
    ])
  })
})
