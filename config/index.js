'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 配置跨域代理方案
    proxyTable: {
      '/api': {
        // 由于请求的是不同源json文件 即本地开发地址无法请求到qq音乐的服务器地址
        // 于是我们添加一层代理 设置target，来请求接口
        // 意思就是如果我们的请求首字段包括api，那么就在本地浏览器创建一个服务器来请求目标服务器，再设置changeOrigin跨域
        // 请求的时候会用target替代掉本地地址 因此就不存在跨域限制，而且使用axios调用get请求时接口路径必须以/api开头
        // 最终的路径就是 target/api/getList?参数   如果设置了pathRewrite如下 那么api会被消除
        target: 'https://c.y.qq.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/api' : ''
        },
        headers: {
          referer: 'https://c.y.qq.com'
        }
      },
      '/a':{
        target:'https://u.y.qq.com/',
        secure:false,
        changeOrigin: true,
        pathRewrite: {
          '^/a':''
        }
      }
    },

    // Various Dev Server settings
    host: '10.100.120.174', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
