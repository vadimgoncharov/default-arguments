# Default Arguments

[![Build Status](https://img.shields.io/travis/vadimgoncharov/default-arguments/master.svg)](https://travis-ci.org/vadimgoncharov/default-arguments)
[![Coverage Status](https://img.shields.io/coveralls/vadimgoncharov/default-arguments/master.svg)](https://coveralls.io/r/vadimgoncharov/default-arguments)

It takes a function as an argument, along with an object containing default values for that function's arguments, and returns another function which defaults to the right values.

## Requirements 

* You cannot assume that the function's arguments have any particular names.
* You should be able to call `defaultArguments` repeatedly to change the defaults.

## Examples

```js
function add(a, b) {
  return a + b;
};

const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
console.assert(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't an argument
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);
```