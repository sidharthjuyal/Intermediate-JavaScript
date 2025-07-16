# 📘 Hoisting in JavaScript

## 🔍 1. What Is Hoisting?
Hoisting is JavaScript’s behavior during the **memory creation phase**, where:
- **Variable declarations** (with `var`) are hoisted and initialized as `undefined`.
- **Function declarations** are hoisted with their full definitions.  
This allows you to use variables and call functions before they appear in your code—though with different outcomes.

---

## 🧠 2. Memory Creation Phase Explained
Before execution, JS engine builds the memory model (Execution Context):
```
Memory (before code runs):
* var x      → undefined
* function foo() { … }  → full function code
````
So calls before declaration often don’t error—but be careful which declaration you’re using.

---

## 🧩 3. Example 1 – Function Declarations
```js
getName();         // ✅ Logs "Namaste JavaScript"
console.log(x);    // ✅ undefined
var x = 7;
function getName() {
  console.log("Namaste JavaScript");
}
````
✔️ `getName()` works due to function hoisting
✔️ `x` logs `undefined`, not an error

---

## ⚠️ 4. Example 2 – Missing Declaration
```js
getName();        // ✅ Logs
console.log(x);   // ❌ ReferenceError: x is not defined
function getName() {
  console.log("Namaste JavaScript");
}
```
✔️ The function exists
❌ `x` isn't declared, so accessing it gives a **ReferenceError**

---

## ❌ 5. Example 3 – Function Expressions

```js
var getName = () => {};  or var getName = function() {};  // ❌ TypeError: getName is not a function
console.log(getName); // ✅ undefined
var getName = function() {
  console.log("Namaste JavaScript");
};
```
✔️ `getName` is a **variable declaration**, not a function declaration
✔️ It's hoisted as `undefined`, so calling it yields a **TypeError**

---

## 📌 6. Hoisting Rules Summary
| Declaration Type      | Hoisting Behavior                            |
| --------------------- | -------------------------------------------- |
| `var x`               | Hoisted → `undefined`                        |
| `let` / `const`       | Hoisted **into TDZ** → ReferenceError        |
| `function fn() {...}` | Fully hoisted → callable anytime             |
| `var fn = function()` | Hoisted as `undefined` → TypeError if called |

---

## 🌊 7. Scope of Hoisting
Hoisting always occurs within its current scope—**global or function-level**:
```js
function foo() {
  console.log(a); // undefined
  var a = 5;
}
foo();
console.log(a);   // ReferenceError
```
✔️ Inside `foo`, `a` is hoisted
❌ Outside, `a` doesn't exist → ReferenceError

---

## ✅ 8. Key Takeaways

* Hoisting moves **declarations** to top during memory phase, not initializations
* `var` → hoisted as `undefined`; `let`/`const` → TDZ; function declarations → fully hoisted
* **Function expressions** behave like variables—no hoisting of function code
* Understanding hoisting is crucial to avoid unexpected bugs and errors

