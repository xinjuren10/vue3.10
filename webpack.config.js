const { resolve, join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, './src/main.js'),
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: './'
  },
  optimization: {
    usedExports: true, // 只导出被使用的模块
    concatenateModules: true,
    minimize: true // 启动压缩
  },
  module: {
    rules: [
      // vue-loader
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src'),
        exclude: /node_modules/
      },
      // css-loader
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader', 'css-loader'] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包清除历史
    new HtmlWebpackPlugin({
      template: resolve(__dirname, './index.html'),
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
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new BundleAnalyzerPlugin(),
    require('autoprefixer')
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: join(__dirname, 'node_modules/.cac/webpack')
  },
  devServer: {
    contentBase: resolve(__dirname, './dist'),
    hot: true
  }
}
