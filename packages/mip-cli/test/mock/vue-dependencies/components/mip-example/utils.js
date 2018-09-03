export function sayHi () {
  console.log('hi')
}

export function loadEtpl() {
  import('etpl/src/main').then(etpl => console.log(etpl))
}