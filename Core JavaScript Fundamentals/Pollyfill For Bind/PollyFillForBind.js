// PollyFill for Bind
const name1 = {
  firstName: "Sidarth",
  lastname: "Juyal",
};

const printName = function (hometown, state, country) {
  console.log(
    this.firstName +
      " " +
      this.lastname +
      " from " +
      hometown +
      ", " +
      state +
      ", " +
      country
  );
};

const printMyName = printName.bind(name1, "Kotdwar");
printMyName("Uttarakhand", "India");

Function.prototype.myBind = function (...args) {
  let obj = this,
  // This variable will point to the printName function
  params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};

let printMyName2 = printName.myBind(name1, "Kotdwar");
printMyName2("Uttarakhand", "India");

// Custom map Higher Order Function
Array.prototype.myMap = function (logic) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(logic(this[i]));
  }
  return result;
};

let arr = [1, 2, 3];

function double(x) {
  return x * 2;
}

console.log(arr.myMap(double));
