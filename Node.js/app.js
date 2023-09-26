const math = require('./moduleExports');
console.log(math);

// math.table(3);
console.log(math.square(6));
console.log(math.mul(5,3));

const fruits = require('./Fruits');
console.log(fruits);
console.log(fruits[0].name);