const webpack = require('webpack')
const path = require('path')
const ExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const { VueSSRClientPlugin: VueClientPlugin } = require('vue-ssr-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true,
  historyApiFallback: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-eval-module-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()  //for webpack3
    ]),
    devServer
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            ExtractPlugin.loader,
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
    plugins: defaultPlugins.concat([
      new ExtractPlugin({
        filename: 'styles.[hash:8].css'
      })
      // new webpack.optimize.CommonsChunkPlugin({  //for webpack3
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // })
    ]),
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
