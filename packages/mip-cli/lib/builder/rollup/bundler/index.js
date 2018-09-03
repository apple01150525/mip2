/**
 * @file index.js
 * @author clark-t (clarktanglei@163.com)
 */

const configFactory = require('./config/index')
const rollup = require('rollup')

module.exports = class Bundler {
  constructor (options) {

  }
}

function bundle (options) {
  return rollup.rollup(configFactory(options))
}
