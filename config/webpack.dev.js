/*
 * @Author: shunhua.liang
 * @Date: 2021-08-22 11:20:32
 * @LastEditTime: 2021-08-22 11:20:32
 * @LastEditors: Please set LastEditors
 * @Description: webpack 配置开发文件
 * @FilePath: \webpack-react\config\webpack.dev.js
 */

'use strict'

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')

module.exports = merge(baseConfig, {
  // 开发模式下
  mode: 'development',
  devServer: {
    // 启动HMR（模块热替换）在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面
    hot: true,
    // 是否开启极致压缩
    compress: true,
    // 告诉服务器来源内容
    contentBase: [path.join(__dirname, 'public')],
    // 使用HTML5的history API时，如果有404请求那么就会相应index.html
    historyApiFallback: true,
    // 是否默认打开浏览器
    open: true,
    // 指定的host 主机（localhost），如果想别人从外部访问配置成自己的主机地址
    host: '0.0.0.0',
    // 懒惰模式,开发服务器仅在收到请求时才会去监视文件更改
    lazy: false,
    // 指定端口号
    port: 8080,
    /**
     * 代理
     * 在同一域上发送api 请求
     * 只在开发环境中生效，上线之后不走这里配置
     */
    proxy: {
      // 请求地址中的需要替换的标识符
      '/api': {
        // 需要代理的地址
        target: 'http://localhost:8081',
        secure: false
      }
    },
    // 多个标识符代理到同一个地址的写法
    // proxy: [
    //   {
    //     content: ['/auth', '/api'],
    //     target: 'http:localhost:8081'
    //   }
    // ]
  }
})
