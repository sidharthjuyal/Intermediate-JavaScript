# 📘 Closures in JS

## 🔍 1. What Is a Closure?
- A **closure** is a function bundled together with its **lexical environment**—i.e., all the variables that were in scope when it was created.  
This allows the function to **remember and access** those variables even after its outer function has finished execution.
- A **closure** is a function bundled with its lexical environment, giving it access to its **parent scopes** even after those functions have finished execution.


---

## 🔧 2. Primary Example:
```js
function x() {
  var a = 7;
  return function y() {
    console.log(a);
  }
}
var z = x();
z(); // logs: 7

console.log(z); // f  y() { console.log(a) };
````
* `x()` sets `a = 7` and returns function `y`.
* Even though `x()` has executed, `y()` still **remembers** `a` → logs `7`.
* Now we can call `z()` anytime, and it’s like running `y()` — with access to `var a = 7`, even though `x()` has already finished execution.

---

## 🧩 3. Nested Example:
```js
function z() {
  var b = 900;
  function x() {
    var a = 7;
    function y() {
      console.log(a, b);
    }
    y();
  }
  x();
}
z(); // logs: 7 900
```
* `y()` can access both `a` and `b`, thanks to its surrounding scope.*
* `y` forms a closure with its parent function `x`, and also with `x`'s parent `z`, capturing variables from both scopes.


---

## 🎯 4. Key Principle:
> A closure enables a function to access variables from its outer (lexical) scope even after the outer function has returned.

---

## ✅ 5. Advantages
Closures power many useful patterns:
* **Data hiding & encapsulation**
* **Module pattern**
* **Function currying**
* **Memoization**
* Maintaining state in callbacks (e.g. `setTimeout`)

---

## ⚠️ 6. Disadvantages
* Can cause **memory bloat** if variables are kept unintentionally alive.
* Potential for **memory leaks** if not managed carefully.
* Be mindful of **resource consumption** in long-lived closures.

---

Ah, that makes sense now — and yes, your updated code is **100% valid** and a classic closure gotcha. Here's the **clean and corrected version** for your `.md` notes:

---

## 🔧 Closure Gotchas:
```js
function x() {
  var a = 7;
  return function y() {
    console.log(a);
  }
  a = 100;
}
var z = x();
z(); // logs: 100

console.log(z); // logs: ƒ y() { console.log(a); }
````

### ✅ Explanation:
* `x()` creates `a = 7`, but then immediately reassigns `a = 100`.
* Function `y()` has the **reference** to `a`, not the value.
* So when `z()` is called, it logs **100** — the latest value of `a` at the time `y()` runs.
* This shows closures capture **variable bindings**, not their values at closure creation time.
  
