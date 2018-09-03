/**
 * @file rollup-plugin-unbundle.js
 * @author clark-t (clarktanglei@163.com)
 * @deprecated rollup-plugin-node-resolve's 'only' options instead when only problem is fixed
 */

const path = require('path')
const {createFilter} = require('rollup-pluginutils')
const resolver = require('resolve')
const fs = require('fs-extra')
// const minimatch = require('minimatch')

module.exports = function (options = {}) {
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'unbundle',
    resolveId (importee, importer) {
      if (importer == null) {
        return
      }

      if (importee[0] === '\0') {
        return
      }

      let query

      if (importee.indexOf('?') > -1) {
        let arr = importee.split('?')
        query = arr.slice(1).join('?')
        importee = arr[0]
      }

      try {
        importee = resolver.sync(importee, {basedir: path.dirname(importer)})
      } catch (e) {
        importee = path.resolve(importer, '..', importee)
        if (!fs.existsSync(importee)) {
          return
        }
      }

      if (path.resolve(importee) === path.resolve(options.filename)) {
        return
      }

      if (query) {
        importee = importee + '?' + query
      }
//       if (/^[@a-zA-Z_]/.test(importee)) {
// console.log('start importee:' + importee)
//         importee = path.join('node_modules', importee)
//       } else {
//         importer = importer.replace(/\?.*$/, '')
//         importee = path.relative(options.baseDir, path.resolve(importer, '..', importee))
//       }
      if (filter(importee)) {
        return false
      }
    }
  }
}
