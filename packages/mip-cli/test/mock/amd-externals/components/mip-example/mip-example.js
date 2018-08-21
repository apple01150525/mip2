import {sayHi} from './utils'
import {sayBye} from '../../common/utils'
import etpl from 'etpl/src/main'

import item from './mip-example-item'

export default {
  mounted () {
    sayHi()
    console.log(etpl.version)
  },
  destroyed () {
    sayBye()
  },
  components: {
    item
  }
}
