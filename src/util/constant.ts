import { cacheUtil } from '@beecode/msh-node-util/lib/cache-util'

const packageJson = require('../../package.json') // eslint-disable-line

export const constant = cacheUtil.singleton(() =>
  Object.freeze({
    projectName: packageJson.name,
    projectVersion: packageJson.version,
    newRow: '\n',
    folderSep: '/',
  })
)
