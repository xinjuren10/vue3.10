const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')

module.exports = prodMode => {
  return [
    {
      test: /\.vue$/,
      use: ['vue-loader']
    },
    //babel-loader
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      exclude: /node_modules/
    },
    // css-loader
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
    },
    //webpack.rules.conf.js
    {
      test: /\.(css|scss|sass)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },

    // 处理静态资源
    {
      test: /\.(png|jpg|svg|gif)$/,
      type: 'asset/resource',
      generator: {
        // [ext]前面自带"."
        filename: 'assets/[hash:8].[name][ext]'
      }
    }
  ]
}
