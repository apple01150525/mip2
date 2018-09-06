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
const resolver = require('resolve')

module.exports = class Bundler {
  constructor (options) {
    this.options = options
  }

  async bundle () {
    let stack = [this.options.filename]
    let result = {}

    while (stack.length) {
      let filename = stack.pop()
      let options = Object.assign({}, this.options, {filename})
      let {input, output} = configFactory(options)
      let bundler = await rollup.rollup(input)

      result[filename] = {
        bundler,
        output,
        filename
      }

      if (bundler.imports && bundler.imports.length) {
        for (let i = 0; i < bundler.imports.length; i++) {
          // TODO: fix to async
          let filename = resolver.sync(bundler.imports[i], {basedir: this.options.dir})
          if (!result[filename]) {
            stack.push(filename)
          }
        }
      }
    }

    return result
  }

  async generate (bundlers) {

  }

  async write () {
    let bundlers = await this.bundle()
    // console.log(Object.keys(bundlers))
    return Object.keys(bundlers).map(async key => {
      let obj = bundlers[key]
      await obj.bundler.write(obj.output)
    })
  }
}
