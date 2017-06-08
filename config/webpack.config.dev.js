'use strict'

const autoprefixer = require('autoprefixer')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils-academy/WatchMissingNodeModulesPlugin')
const InterpolateHtmlPlugin = require('react-dev-utils-academy/InterpolateHtmlPlugin')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

module.exports = {
  entry: [
    require.resolve('react-dev-utils-academy/webpackHotDevClient'),
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils-academy/crashOverlay'),
    './src/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: paths.appBuild,
    pathinfo: true,
    publicPath: paths.publicPath
    // necessary for HMR to know where to load the hot update chunks
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      /* {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              useEslintrc: true
            },
            loader: 'eslint-loader'
          }
        ],
        include: paths.appSrc
      },
      */
      // ** ADDING/UPDATING LOADERS **
      // The "url" loader handles all assets unless explicitly excluded.
      // The `exclude` list *must* be updated with every change to loader extensions.
      // When adding a new loader, you must add its `test`
      // as a new entry in the `exclude` list for "url" loader.

      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `build` folder.
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.graphql$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/[name].[hash:8].[ext]'
        }
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: paths.appSrc,
        exclude: [/node_modules/, /\.test\.jsx?$/, /\.story\.(js|jsx)$/],
        options: {
          babelrc: true,
          // presets: [require.resolve('babel-preset-react-app')],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list.
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new InterpolateHtmlPlugin(process.env),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.NamedModulesPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  performance: {
    hints: false
  },
  devServer: {
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === 'https',
    host,
    port,
    historyApiFallback: true,
    overlay: false
  }
}
