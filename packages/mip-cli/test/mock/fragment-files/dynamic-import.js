import {second} from './sub/second'
import {lol} from './common/utils'

function hehe () {
  import('./sub/utils').then(utils => {
    console.log(utils)
  })
  second()
  lol()
}

hehe()
