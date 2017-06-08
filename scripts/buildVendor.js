'use strict'

process.env.NODE_ENV = 'production'
process.on('unhandledRejection', (err) => {
  throw err
})

require('dotenv').config({ silent: true })

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const url = require('url')
const webpack = require('webpack')
const config = require('../config/webpack.config.dll')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils-academy/checkRequiredFiles')
const FileSizeReporter = require('react-dev-utils-academy/FileSizeReporter')

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

measureFileSizesBeforeBuild(paths.appBuildVendor).then((previousFileSizes) => {
  fs.emptyDirSync(paths.appBuildVendor)
  build(previousFileSizes)
  copyPublicFolder()
})

// Print out errors
const printErrors = (summary, errors) => {
  console.log(chalk.red(summary))
  console.log()
  errors.forEach((err) => {
    console.log(err.message || err)
    console.log()
  })
}

// Create the production build and print the deployment instructions.
const build = (previousFileSizes) => {
  console.log('Creating an optimized production build...')

  let compiler
  try {
    compiler = webpack(config)
  } catch (err) {
    printErrors('Failed to compile.', [err])
    process.exit(1)
  }

  compiler.run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err])
      process.exit(1)
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors)
      process.exit(1)
    }

    if (process.env.CI && stats.compilation.warnings.length) {
      printErrors(
        'Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.',
        stats.compilation.warnings
      )
      process.exit(1)
    }

    console.log(chalk.green('Compiled successfully.'))
    console.log()
    console.log('File sizes:')
    console.log()
    printFileSizesAfterBuild(stats, previousFileSizes)
    console.log()
  })
}

const copyPublicFolder = () => {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  })
}
