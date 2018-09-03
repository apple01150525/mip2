/**
 * @file rollup-plugin-vue.spec.js
 * @author clark-t (clarktanglei@163.com)
 */

const path = require('path')
const rollup = require('rollup')
const execa = require('execa')
const configFactory = require('../../../../../lib/builder/rollup/bundler/config/index')
const fs = require('fs-extra')
const {expect} = require('chai')

const projectDir = path.resolve(__dirname, '../../../../mock/vue-dependencies')
const etplDir = path.resolve(projectDir, 'node_modules/etpl')

describe.only('test full plugin config', function () {
  let commonOptions = {
    outputPath: path.resolve(__dirname, 'dist'),
    asset: 'https://www.baidu.com/'
  }

  before(async function () {
    this.timeout(15000)
    await fs.remove(commonOptions.outputPath)
    if (await fs.exists(etplDir)) {
      return
    }

    process.chdir(projectDir)
    await execa('npm install')
  })

  it('should be generate component js successfully', async function () {
    let options = Object.assign({}, commonOptions, {
      filename: path.resolve(projectDir, 'components/mip-example/mip-example.vue'),
      dir: projectDir
    })

    options.baseDir = options.dir
    let {input, output} = configFactory(options)
    let bundler = await rollup.rollup(input)

    let result = await bundler.generate(output)

    // console.log(result)
    // console.log(bundler.modules.map(k => k.id))

    fs.writeFileSync(path.resolve(commonOptions.outputPath, '..', 'dist.js'), result.code, 'utf-8')

    // console.log(result)
    // delete result.code
    // delete result.map
    // console.log(result)
    // console.log('********************************')
    // console.log(bundler.modules.map(mod => mod.id))
    // console.log('')
    // console.log(result.code)

    // expect(result.code).to.contain('this is mip example item')
    // expect(result.code).to.contain('mip-example-item')
  })

  after(function () {
    return fs.remove(commonOptions.outputPath)
  })
})
