const { _if } = require('ifelif');

const grade = 75;

// You can use ifelif as a ternary operator
// --------------------------------------------------------------
const letterGrade =
  _if(grade >= 90).then('A')
    .elif(grade >= 80).then('B')
    .elif(grade >= 70).then('C')
    .elif(grade >= 60).then('D')
    .else('F');

console.log(letterGrade); // This will print 'C'
