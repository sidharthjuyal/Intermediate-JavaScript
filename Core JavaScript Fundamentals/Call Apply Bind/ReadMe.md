## 📘 `call`, `apply`, and `bind` in JavaScript
> ✅ **Purpose:** Function borrowing — use functions written for one object with a different object, without copying the function.

---

### 🧠 `call()` Method
* Invokes a function with an explicit `this` value and arguments provided one by one.
* Commonly used for **function borrowing**.
```js
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

name1.printFullName();             // Sidharth Juyal
name1.printFullName.call(name2);   // Vex Persona
```

### 🧠 Function Reuse Without Duplicating Logic
* Instead of putting function inside objects, define a generic function and reuse it.
```js
const printFullName = function () {
  console.log(this.firstName + " " + this.lastName);
};

let name3 = {
  firstName: "Vegeta",
  lastName: "Saiyan",
};

printFullName.call(name3); // Vegeta Saiyan
```

### 🔥 Passing Arguments with `call()`
```js
const printFullNameAndAge = function (age, state) {
  console.log(this.firstName + " " + this.lastName + 
              " is " + age + " years old from " + state);
};
printFullNameAndAge.call(name1, 24, "Uttarakhand");
// Output: Sidharth Juyal is 24 years old from Uttarakhand
```

---

### 🧠 `apply()` Method
* Works just like `call()`, but accepts arguments as an **array**.
```js
printFullNameAndAge.apply(name2, [24, "Haryana"]);
// Output: Vex Persona is 24 years old from Haryana
```

---

### 🧠 `bind()` Method
* Doesn't invoke the function immediately.
* Returns a **copy of the function**, with bound `this` and optional preset arguments.
```js
let printVegetaInfo = printFullNameAndAge.bind(name3, 24, "Tokyo");

printVegetaInfo(); 
// Output: Vegeta Saiyan is 24 years old from Tokyo
```

---

### 📝 Summary Table

| Method  | Invokes Immediately? | Pass Arguments | Returns a Function? |
| ------- | -------------------- | -------------- | ------------------- |
| `call`  | ✅ Yes                | Individually   | ❌ No                |
| `apply` | ✅ Yes                | As array       | ❌ No                |
| `bind`  | ❌ No                 | Individually   | ✅ Yes               |

