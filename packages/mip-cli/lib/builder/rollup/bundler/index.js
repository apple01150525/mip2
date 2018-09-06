/**
 * @file index.js
 * @author clark-t (clarktanglei@163.com)
 * @description bundler 的作用是，给定一个入口文件，返回
 * {
 *   modules: Object - id: code,
 *   deps: Object - id, deps, circular ?
 * }
 */

const configFactory = require('./config/index')
const rollup = require('rollup')

module.exports = class Bundler {
  constructor (options) {

  }
}

function bundle (inputOptions) {
  return rollup.rollup(inputOptions)
}
