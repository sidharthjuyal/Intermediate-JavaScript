// -------- Function Currying --------

// using bind
let multiply = function (x, y) {
  console.log("Multiply Result: " + x * y);
};

let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5); // Output: 10

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5); // Output: 15

// using closures
let divide = function (x) {
  return function (y) {
    console.log("Divide Result: " + x / y);
  };
};

let divideByFive = divide(25);
divideByFive(5); // output: 5