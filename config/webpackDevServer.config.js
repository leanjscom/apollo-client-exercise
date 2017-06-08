'use strict'

const config = require('./webpack.config.dev')
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  hot: true,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/
  },
  https: protocol === 'https',
  host,
  port,
  historyApiFallback: true,
  overlay: false
}
