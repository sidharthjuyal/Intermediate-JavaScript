// ---------- call ------------
let name1 = {
  firstName: "Sidharth",
  lastName: "Juyal",
  printFullName: function () {
    console.log(this.firstName + " " + this.lastName);
  },
};

let name2 = {
  firstName: "Vex",
  lastName: "Persona",
};

let name3 = {
  firstName: "Vegeta",
  lastName: "Saiyan",
};

name1.printFullName();

// function borrowing
name1.printFullName.call(name2);

// However, generally we dont keep our functions inside our object if we want to reuse them, example:
const printFullName = function () {
  console.log(this.firstName + " " + this.lastName);
};

printFullName.call(name3);

// what if we had some extra parameters to the function?
const printFullNameAndAge = function (age, state) {
  console.log(this.firstName + " " + this.lastName + " is " + age + " years old from " + state);
};

printFullNameAndAge.call(name1, 24, "Uttarakhand");


// ----------- apply -----------
// apply is similar to call but it takes an array of arguments instead of individual arguments
printFullNameAndAge.apply(name2, [24, "Haryana"]);

// ----------- bind --------------
// bind method looks exactly the same as call method, but he only difference is that
// the bind method binds the function printFullNameAndAge to the object and returns the function
// so we can call it later
let printVegetaInfo = printFullNameAndAge.bind(name3, 24, "Tokyo");
printVegetaInfo();