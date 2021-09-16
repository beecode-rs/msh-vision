const packageJson = require('../../package.json') // eslint-disable-line

export const constant = Object.freeze({
  projectName: packageJson.name,
  projectVersion: packageJson.version,
})
