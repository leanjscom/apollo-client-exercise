'use strict'

const path = require('path')
const fs = require('fs')
const url = require('url')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  appBuild: resolveApp('build'),
  appBuildVendor: resolveApp('build_vendor'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.jsx'),
  appVendorJs: resolveApp('vendor/vendor.js'),
  appVendor: resolveApp('vendor'),
  appManifestVendor: resolveApp('vendor/vendor-manifest.json'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: '/',
  servedPath: '/'
}
