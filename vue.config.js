/*
 * @Description: 
 * @Author: Lx
 * @Date: 2021-09-18 11:45:42
 * @LastEditors: Lw
 * @LastEditTime: 2021-10-08 12:02:22
 */

const { resolve } = require('path')
const path = require('path')
const WebpackBar = require('webpackbar');
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_UPDATE_TIME = time
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort,
} = require('./src/config/default/vue.custom.config')
module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    disableHostCheck: true,
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': {
        target: "http://172.168.10.191:9999",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ]
    }
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
          'Assets': resolve('src/assets')
        }
      },
      module: {
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: '@intlify/vue-i18n-loader',
            include: [ // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              path.resolve(__dirname, 'src/lang')
            ]
          },
        ],
      },
      plugins: [
        new WebpackBar({
          name: title,
        })
      ]
    }
  },
}
