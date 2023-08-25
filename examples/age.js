const { _if } = require('ifelif');

const age = 25;

// All of the following examples will print 'You are an adult'

// Basic usage
// --------------------------------------------------------------
console.log(
  _if(age < 18).then('You are a minor')
    .elif(age < 65).then('You are an adult')
    .else('You are a senior')
);

// Instead of `else(...)`, you can also use `else().then(...)`
// --------------------------------------------------------------
console.log(
  _if(age < 18).then('You are a minor')
    .elif(age < 65).then('You are an adult')
    .else().then('You are a senior')
);

// You can also use functions instead of values
// --------------------------------------------------------------
_if(age < 18).then(() => console.log('You are a minor'))
  .elif(age < 65).then(() => console.log('You are an adult'))
  .else().then(() => console.log('You are a senior'));