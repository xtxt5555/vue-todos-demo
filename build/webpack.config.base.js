const path = require('path')
const createVueLoaderOptions = require('../vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../client/index'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: createVueLoaderOptions(isDev)
          }
        ]
      },
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.styl', '.js', '.json'],
    alias: {
      styles: path.join(__dirname, '../client/assets/styles')
    }
  }
}
