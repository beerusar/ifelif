const { _if } = require('ifelif')

const a = 3

const result =
  _if(a === 1).then('a is 1')
    .elif(a === 2).then('a is 2')
    .elif(a === 3).then('a is 3')
    .else('a is not 1, 2, or 3')

if (result !== 'a is 3') {
  throw new Error('result should be "a is 3"')
}

console.log('test passed')