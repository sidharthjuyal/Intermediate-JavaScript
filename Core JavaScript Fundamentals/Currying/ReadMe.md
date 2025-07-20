# 📦 Function Currying in JavaScript
- Function Currying is a **transforming technique** where a function with multiple arguments is converted into a sequence of functions, each taking a single argument.
- **Currying** is a functional programming technique where a function with multiple arguments is **transformed into a sequence of functions**, each taking **a single argument** and returning a new function until all arguments are provided..

---

### 🧠 In simpler terms:
Currying breaks down a function that takes **`n` arguments** into **`n` nested functions**, each taking **one argument at a time**.

---

### 🧪 Example:
```js
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(sum(1)(2)(3)); // Output: 6
```

## 🧠 Why Use Currying?
- Reuse functions with preset arguments
- Avoid repeating logic
- Create flexible, partial utilities

---

## ✅ Method 1: Using `bind()`
```js
let multiply = function (x, y) {
  console.log("Multiply Result: " + x * y);
};
let multiplyByTwo = multiply.bind(this, 2);
multiplyByTwo(5); // Output: 10
let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5); // Output: 15
````
**What’s happening?**
* `bind(this, 2)` locks the first parameter `x = 2`
* Returns a new function which takes the remaining parameter `y`

---

## ✅ Method 2: Using **Closures**
```js
let divide = function (x) {
  return function (y) {
    console.log("Divide Result: " + x / y);
  };
};
let divideByFive = divide(25);
divideByFive(5); // Output: 5
```
**What’s happening?**
* `divide()` returns a new function that remembers `x`
* This is the classic form of currying using **lexical scoping**

---

## 💡 Real World Use Case
Suppose you're formatting logs:
```js
const log = (prefix) => (message) => console.log(`[${prefix}] ${message}`);
const errorLog = log("ERROR");
const infoLog = log("INFO");
errorLog("Something went wrong");
infoLog("User logged in");
```
