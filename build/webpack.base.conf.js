const { resolve } = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./webpack.rules.conf')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const chalk = require('chalk')

const envMode = process.env.envMode
require('dotenv').config({ path: `.env.${envMode}` })
// 正则匹配以 VUE_APP_ 开头的 变量
const prefixRE = /^VUE_APP_/
let env = {}
// 只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
for (const key in process.env) {
  if (key === 'NODE_ENV' || key === 'BASE_URL' || prefixRE.test(key)) {
    env[key] = JSON.stringify(process.env[key])
  }
}

module.exports = prodMode => {
  return {
    stats: 'errors-only',
    entry: resolve(__dirname, '../src/main.js'),
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',
        '@': resolve('src'),
        assets: resolve(__dirname, '../src/assets/'),
        img: resolve(__dirname, '../src/assets/img'),
        utils: resolve(__dirname, '../src/utils'),
        api: resolve(__dirname, '../src/api')
      }
    },
    module: {
      rules: rules(prodMode)
    },
    plugins: [
      new webpack.DefinePlugin({
        // 定义环境和变量
        'process.env': {
          ...env
        }
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        minify: {
          html5: true, // 根据HTML5规范解析输入
          collapseWhitespace: true, // 折叠空白区域
          preserveLineBreaks: false,
          minifyCSS: true, // 压缩文内css
          minifyJS: true, // 压缩文内js
          removeComments: false // 移除注释
        }
      }),
      new ProgressBarPlugin({
        format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
      }),
      new VueLoaderPlugin(),
      new ESLintPlugin({
        // fix: true,
        extensions: ['js', 'json', 'vue'],
        exclude: '/node_modules/'
      })
    ]
  }
}
