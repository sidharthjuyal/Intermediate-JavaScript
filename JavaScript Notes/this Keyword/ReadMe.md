# 🔥 `this` Keyword in JavaScript
The `this` keyword refers to **the object that is executing the current function**. Its value depends entirely on the **execution context**, i.e., **how a function is called**, **not where it's defined**.

---

## 🧠 1. `this` in Global Context
```js
console.log(this); // window (in browser)
```
* In the global space (top-level code), `this` points to the **global object**.
  * In browser → `window`
  * In Node.js → `global`

---

## 🔐 2. `this` Inside Regular Functions
```js
function test() {
  console.log(this);
}
test();
```
* In **non-strict mode**, `this` refers to the **global object**.
* In **strict mode**, `this` is **`undefined`**.
```js
"use strict";
function test() {
  console.log(this); // undefined
}
test();
```
### 💡 `this` Substitution Rule:
In **non-strict mode**, if `this` is `null` or `undefined`, it is **automatically substituted** with the global object.

---

## 👤 3. `this` in Object Methods
```js
const user = {
  name: "Vex",
  greet() {
    console.log(this); // refers to `user` object
    console.log(this.name); // Vex
  }
};
user.greet();
```
* When a function is called as a method of an object, `this` refers to that **object**.

---

## 🎭 4. `this` with `call`, `apply`, and `bind`
These methods are used to explicitly **set the value of `this`** in a function.
```js
const person = {
  name: "Sid",
  printName() {
    console.log(this.name);
  }
};
const person2 = { name: "Vex" };
person.printName();              // Sid
person.printName.call(person2); // Vex
```
* `call(obj)` → invokes the function immediately with `this = obj`.
* `apply(obj, argsArray)` → same as `call`, but takes arguments as an array.
* `bind(obj)` → returns a **new function** with `this = obj`.
```js
const boundFn = person.printName.bind(person2);
boundFn(); // Vex
```

---

## 🏹 5. `this` in Arrow Functions
Arrow functions do **not have their own `this`**. They **inherit `this` from their lexical (outer) context**.
```js
const obj = {
  name: "Alok",
  arrowFn: () => {
    console.log(this.name); // undefined (global or window)
  }
};
obj.arrowFn();
```
Compare with:
```js
const obj = {
  name: "Alok",
  regularFn() {
    const arrowFn = () => {
      console.log(this.name); // Alok
    };
    arrowFn();
  }
};
obj.regularFn();
```
### ⚠️ Remember:
Arrow functions capture `this` from **where they are defined**, not where they are called.

---

## 🌐 6. `this` in Event Listeners / DOM
```html
<button onclick="console.log(this)">Click Me</button>
```
* `this` refers to the **DOM element** that triggered the event (i.e., the button).
Equivalent in JS:
```js
document.querySelector("button").addEventListener("click", function () {
  console.log(this); // the <button> element
});
```
But with arrow function:
```js
document.querySelector("button").addEventListener("click", () => {
  console.log(this); // refers to the enclosing lexical `this` (not the button!)
});
```

---

## 🔄 Common Pitfalls
| Situation                             | `this` Value                   |
| ------------------------------------- | ------------------------------ |
| Global code                           | `window` (in browser)          |
| Inside regular function (non-strict)  | `window`                       |
| Inside regular function (strict)      | `undefined`                    |
| Method in object                      | The object itself              |
| Arrow function                        | Lexical (outer) `this`         |
| DOM event (regular function)          | The HTML element               |
| DOM event (arrow function)            | Outer `this` (not DOM element) |
| With `.call()`, `.apply()`, `.bind()` | Explicitly set by user         |

---

## 🧪 Interview-Level Examples
### Q: What's printed here?
```js
const user = {
  name: "Sid",
  greet: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};
user.greet();
```
A: `undefined` (because `this` inside `setTimeout` is global, not `user`)
✅ Fix with arrow function:
```js
setTimeout(() => {
  console.log(this.name); // Sid
}, 1000);
```

---

## ✨ Key Takeaways
* Always understand the **calling context** to predict `this`.
* Avoid `this` inside nested regular functions — prefer arrow functions when appropriate.
* Use `bind` to fix `this` in callbacks.
* Arrow functions are **not suited** for methods or event listeners where `this` is required.
