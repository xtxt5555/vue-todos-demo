const webpack = require('webpack')
const path = require('path')
// const ExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { VueLoaderPlugin } = require('vue-loader')
const { VueSSRServerPlugin: VueServerPlugin } = require('vue-ssr-webpack-plugin')
// const nodeExternals = require('webpack-node-externals')

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          // ExtractPlugin.loader,
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: {
          //       auto: /header\.vue/,
          //       localIdentName: '[name]-[hash:base64:5]',
          //     },
          //     localsConvention: 'camelCase',
          //   }
          // },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
      'process.env.VUE_ENV': '"server"'
    }),
    new VueLoaderPlugin(),
    new VueServerPlugin()
    // new ExtractPlugin({
    //   filename: 'styles.[hash:8].css'
    // })
  ]
})

if (!isDev) {
  config.output.publicPath = '/public/'
}

module.exports = config
