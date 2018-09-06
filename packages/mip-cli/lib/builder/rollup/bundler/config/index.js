/**
 * @file config.js
 * @author clark-t (clarktanglei@163.com)
 */
const path = require('path')
const idFactory = require('./shared/id')
const resolver = require('resolve')

module.exports = function (options) {
  const plugin = name => {
    let conf = require(`./${name}`)
    return typeof conf === 'function'
      ? conf(options)
      : conf
  }

  return {
    get input () {
      return {
        input: options.filename,
        plugins: [
          // plugin('alias'),
          plugin('unbundle'),
          // plugin('vue'),
          // plugin('babel'),
          // plugin('postcss'),
          // plugin('url'),
          // plugin('replace'),
          plugin('node-resolve'),
          plugin('commonjs')
        ]
      }
    },
    get output () {
      let mainId = idFactory({
        dir: options.dir,
        filename: options.filename
      })

      let outputOptions = {
        file: path.resolve(options.outputPath, mainId + '.js'),
        sourcemap: options.NODE_ENV === 'development',
        format: 'amd',
        amd: {
          id: mainId
        },
        paths (id) {
          let filename = resolver.sync(id, {basedir: options.dir})
          let newId = idFactory({
            dir: options.dir,
            filename: filename
          })

          return newId
        }
      }

      return outputOptions
    }
  }
}
