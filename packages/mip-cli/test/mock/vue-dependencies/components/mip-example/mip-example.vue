<template>
  <div>{{ name }}</div>
</template>

<script>

import {sayHi, loadEtpl} from './utils'
import {sayBye} from '../../common/utils'
import '../../common/common.less'
import mustache from 'mustache'

export default {
  data () {
    return {
      name: 'haha'
    }
  },
  mounted () {
    sayHi()

    loadEtpl()
  },
  destroyed () {
    sayBye()
  }
}

</script>
