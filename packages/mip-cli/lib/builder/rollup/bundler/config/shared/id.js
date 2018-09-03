/**
 * @file id.js
 * @author clark-t (clarktanglei@163.com)
 */

const projectPath = require('../../../../../utils/project-path')
const path = require('path')
const fs = require('fs')

// id 的处理逻辑：
// 1. 打包成 amd 格式是从入口文件开始的，因此需要传入的 filename 是入口文件的 **绝对路径**
// 也正因为时从入口文件的绝对路径开始的，所以要求 node_modules 包的 id 也应该是带 .js 后缀的文件
// 举个例子 import mustache from 'mustache'，那么 filename 应该传入
// root-path/node_modules/mustache/mustache.js
// 生成的 id 应该为
// node_modules/mustache/2.3.2/mustache.js


module.exports = function (options) {
  let id
  let relative = path.relative(options.dir, options.filename)

  if (/node_modules/.test(options.filename)) {
    let arr = options.filename.replace(/.*node_modules./, '').split(path.sep)
    let moduleName
    let moduleInnerPath

    if (arr[0][0] === '@') {
      moduleName = arr.slice(0, 2).join('/')
      moduleInnerPath = arr.slice(2).join('/')
    } else {
      moduleName = arr[0]
      moduleInnerPath = arr.slice(1).join('/')
    }

    let rootDir = options.filename.replace(/(?=node_modules).*?$/, '')
    let dirname = path.resolve(rootDir, 'node_modules', moduleName)

    // let dirname = options.filename.replace(/(.*node_modules).*?/, '$1')
    let package = require(path.resolve(dirname, 'package.json'))
    let version = package.version
    id = `node_modules/${moduleName}/${version}/${moduleInnerPath}`
  } else if (/^common\//.test(relative)) {
    let projectName = path.basename(options.dir)
    let arr = relative.split(path.sep)
    arr.splice(1, 0, projectName)
    id = arr.join('/')
  } else {
    id = relative.split(path.sep).slice(1).join('/')
  }

  return id.replace(/\.(js|vue)$/, '')
}
