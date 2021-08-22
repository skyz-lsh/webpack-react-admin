/*
 * @Author: your name
 * @Date: 2021-07-23 21:55:53
 * @LastEditTime: 2021-08-22 10:13:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-react\config\webpack.base.js
 */

'use strict'
// 引入路径
const path = require('path')
// 引入模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  /**
   * 入口文件的配置
   * entry 可以接受单个参数，也可以接受一个对象或者数组
   * 多入口示例：entry: {one:路径，two:路径......}
   */
  entry: path.resolve(__dirname, '../src/index.js'),
  /**
   * hash:只要项目里有文件更改，整个项目构建的hash都会改变
   * chunkhash:根据不同入口来解析，比如vue-router、vuex、vue等公共入口文件，只要这些没有改变，那么他对应生成的js的hash值也不会改变。
   * contenthash：只有js修改时，关联输出的css、img等文件的hash值也会改变
   */
  output: {
    filename: '[name].[hash].bundle.js', // 打包输出的名字
    path: path.resolve(__dirname, '../dist') // 打包输出的位置
  },
  // plugin 插件配置
  plugins: [
    //   将js 的内容插入到HTML页面中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body'
    }),
    // 每次打包之后清除上次的打包文件
    new CleanWebpackPlugin()
  ],
  // 导入的文件
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js|jsx|tsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      //   css loader
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'top',
              modules: true
            }
          },
          'css-loader'
        ]
      },
      //   文件loader
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  // 优化
  optimization: {
    runtimeChunk: {
      name: entryPoint => `runtime~${entryPoint.name}`
    },
    // 切片
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  // 性能提示
  performance: {
    hints: 'warning',
    maxEntrypointSize: 50000,
    maxAssetSize: 500000
  },
  //   解析
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}
