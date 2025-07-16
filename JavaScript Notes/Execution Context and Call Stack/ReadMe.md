# 📘 How JS Is Executed & Call Stack

## 🔍 1. Program Execution Context
When a JavaScript program starts, a **Global Execution Context (GEC)** is created automatically.  
It runs in two phases:
- **Memory Creation Phase**: JS allocates memory:
  - Variables (`var`) → `undefined`
  - Functions → full definition
- **Code Execution Phase**: JS executes code line-by-line.

---

## 🧩 2. Example Walkthrough
```js
var n = 2;

function square(num) {
  var ans = num * num;
  return ans;
}

var square2 = square(n);
var square4 = square(4);
````

### Execution Breakdown:
1. **Memory Phase**
   * `n` → `undefined`
   * `square` → function definition
   * `square2`, `square4` → `undefined`
2. **Code Phase**
   * `n = 2`
   * Calling `square(2)`:
     * New function execution context (memory component/ variable environment and code Component/thread of execution):
       * `num = 2`
       * `ans = 4`
       * returns `4`, stored in `square2`
   * Calling `square(4)`:
     * Similar context:
       * `num = 4`
       * `ans = 16`
       * returns `16`, stored in `square4`

---

## 📚 3. Call Stack Mechanics
JS is **single-threaded** and synchronous. The **Call Stack** manages order of execution of execution contexts:
* Start: `Global Execution Context` (bottom)
* `square(n)` is called → new context pushed on top
* Once `square` returns → its context is popped
* Then `square(4)` → another context push/pop
* End: Back to just the GEC

* Some fancy names for call stack
  - Execution context stack
  - program stack
  - control stack
  - runtime stack
  - machine stack

---

## 🧠 4. Why This Matters
Understanding this gives clarity on:
* How functions create their own execution contexts
* How local variables (`num`, `ans`) don't pollute global scope
* How the call stack keeps track of what to run next
* How recursion and nested calls are handled

---

## ✅ Key Takeaways
* JS manages execution via **Execution Contexts** and **Call Stack**
* Two-phase execution ensures hoisting and safe variable access
* Each function invocation gets its own context
* Local vs. global scope controlled via context stacking

