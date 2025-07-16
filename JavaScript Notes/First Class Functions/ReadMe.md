# 📘 First-Class Functions 🔥 ft. Anonymous Functions

## 🔍 1. What Are First-Class Functions?
JavaScript treats functions as **first-class citizens**, meaning:
- Functions can be **assigned** to variables.
- Functions can be **passed** as arguments to other functions.
- Functions can be **returned** from other functions.
- Functions can be **stored** in data structures (arrays, objects).

---

### ✅ Function Statement (a.k.a Function Declaration)
```js
function greet() {
  console.log("Hello!");
}
greet(); // ✅ Works before this line too (due to hoisting)
````
* Declared using the `function` keyword at the top level
* ✅ Hoisted fully — both name and body
* Can be invoked **before** it's defined

---

### ✅ Function Expression
```js
const greet = function () {
  console.log("Hi there!");
};
greet(); // ❌ Cannot call before this line
```
* A function is assigned to a variable
* ❌ Only the variable is hoisted, not the function body
* You **can’t call it before the assignment**

---

### 🤐 Anonymous Function
```js
setTimeout(function () {
  console.log("Anonymous!");
}, 1000);
```

* Function **without a name**
* Mostly used in callbacks, one-liners
* Cannot be hoisted — they only exist when the line is executed

---

### 🧠 Named Function Expression
```js
const greet = function sayHi() {
  console.log("Hey!");
};
greet();     // ✅ works
sayHi();     // ❌ ReferenceError: sayHi is not defined
```
* Function expression **with a name**
* Name is **only visible inside** the function itself (used for recursion, debugging)
* Still not hoisted

---

## 🔄 Function Declaration vs Expression
| Feature             | Function Declaration | Function Expression          |
| ------------------- | -------------------- | ---------------------------- |
| Name                | Required             | Optional (can be anonymous)  |
| Hoisting            | ✅ Fully hoisted      | ❌ Not fully hoisted          |
| Call before define? | ✅ Yes                | ❌ No                         |
| Syntax              | `function fn() {}`   | `const fn = function() {}`   |
| Use Case            | Reusable logic       | Callbacks, conditional logic |

---

## 🧩 2. Example – Assigning to Variables
```js
function greet() {
  console.log("Hey there!");
}
const hello = greet;
hello(); // same as calling greet()
````
* `hello` now references `greet` — both point to the same function.

---

## 🎯 3. Passing as Arguments
```js
function sayHi(fn) {
  fn();
}
sayHi(greet); // prints "Hey there!"
```
* `greet` gets passed into `sayHi`, and is called inside it.

---

## 🔁 4. Returning Functions
```js
function outer() {
  return function inner() {
    console.log("I'm an inner function");
  };
}
const fn = outer();
fn(); // runs inner()
```
* `outer` returns a function — creating closures if it references outer variables.
  
---

## 🌟 5. Anonymous Functions & Callbacks
```js
setTimeout(function() {
  console.log("Delayed Hello");
}, 1000);
```
* The function passed has **no name** (anonymous).
* Common pattern in callbacks — especially in async code and event listeners.

---

## 🧩 6. Array Example with Anonymous Functions
```js
const arr = [1, 2, 3];
const doubled = arr.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6]
```
* `map` receives an **anonymous function** to transform each element.

---

## 🧠 7. Why First-Class Functions Matter
* Enable **functional programming** (map, filter, reduce).
* Allow **higher-order functions**, leading to flexible abstractions.
* Facilitate **callbacks**, **event-driven code**, **promises**, and async patterns.

---

## ✅ 8. Quick Summary
| Capability           | Example                     |
| -------------------- | --------------------------- |
| Assign to variable   | `const fn = greet; fn();`   |
| Pass as argument     | `sayHi(greet);`             |
| Return from function | `const fn = outer(); fn();` |
| Use as anonymous     | `arr.map(num => num * 2);`  |

---

## 💡 9. Final Notes
JavaScript’s power stems from treating functions like any other value.
Mastering **first-class functions** is key to writing concise, expressive, and high-level code — and it's crucial for frameworks, async flows, and clean architecture.
