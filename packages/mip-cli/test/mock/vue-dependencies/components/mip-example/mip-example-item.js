import {sayHi} from './utils'
import {sayBye} from '../../common/utils'

export default {
  mounted () {
    sayHi()
    console.log('this is mip example item')
  },
  destroyed () {
    sayBye()
  }
}
