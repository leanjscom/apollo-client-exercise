const autoprefixer = require('autoprefixer')
const paths = require('../config/paths')

const path = require('path')

const query = {
  mozjpeg: {
    progressive: true
  },
  gifsicle: {
    interlaced: true
  },
  optipng: {
    optimizationLevel: 7
  }
}

const loaders = [
  // Webpack 1.2 config, migrate when they upgrade in 2017 Q3
  {
    test: /\.css?$/,
    loaders: ['style', 'raw'],
    include: path.resolve(__dirname, '../')
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      `image-webpack-loader?${JSON.stringify(query)}`
    ]
  }
]

// Export a function. Accept the base config as the only param.
module.exports = function (storybookBaseConfig, configType) {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.loaders.push(...loaders)
  storybookBaseConfig.module.noParse = /object-hash\/dist\/object_hash.js/

  // Return the altered config
  return storybookBaseConfig
}
