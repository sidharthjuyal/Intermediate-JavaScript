# 📘 Shortest JS Program, `window`, & `this`

## 🔍 1. Shortest JS Program
- An **empty `.js` file** → no code → still executes.
- JS engine creates:
  - **Global Execution Context (GEC)**
  - **Global object** (`window` in browsers) - created inside global scope.
  - `this` in global scope points to `window`
  - global variables and functions are attached to window object.
---

## 🌐 2. `window` – The Global Object
- Represents the global scope in browsers.
- Automatically created when code runs.
- All **global variables/functions** attach to `window`.
```js
var a = 5;
function c() { return 10; }

console.log(window.a); // 5
console.log(window.c()); // 10
````
* Variables/functions inside functions are **not** on `window`.

---

## ✅ 3. `this` in Global Scope
* Outside any function, `this === window` in browsers.
```js
var x = 10;
console.log(this.x);         // 10
console.log(window.x);       // 10
```
* `this` and `window` are interchangeable globally.

---

## 🧠 4. Key Takeaways
* **Empty script** still triggers:
  * Global Execution Context
  * Creation of `window` and `this` linking to it
* Global variables/functions attach to `window`.
* `this` in global scope references `window`.

---

## 🧾 Summary Table
| Concept   | Behavior in Browser Global Scope      |
| --------- | ------------------------------------- |
| Global EC | Always created, even if file is empty |
| `window`  | Global object that holds globals      |
| `this`    | Same as `window` outside any function |

---

# 📘 `undefined` vs “not defined” in JS

---

## 🔍 1. Memory Allocation in JavaScript
- Before running any code, JS performs a **memory creation phase**:
  - Variables (with `var`, `let`, `const`) are allocated memory.
  - Uninitialized variables are set to `undefined`.
  - Functions get their full definitions in memory.

---

## ❗ 2. `undefined` vs. “not defined”
- **`undefined`**: Memory exists but no value is assigned.
- **ReferenceError: x is not defined**: No memory reserved — variable was never declared.

---

## 🧪 3. Code Examples

```js
var a;
console.log(a);         // undefined
console.log(b);         // ReferenceError: b is not defined
````
* `a` → exists, but no value → **undefined**
* `b` → never declared → **not defined**&#x20;
---

## ⚠️ 4. `undefined` ≠ empty or `null`
* `undefined` is its own type and reserved keyword.
* It's a placeholder until you assign a real value.
* Best practice: **don’t manually assign `undefined`** — it confuses intent.
### ⚠️ Why Not to Manually Assign `undefined`
- JS **automatically assigns `undefined`** to uninitialized variables.
- Manually doing `var a = undefined` creates confusion:
  - Was it set by the dev or left uninitialized?
- ✅ Use `null` if you want to **intentionally indicate "no value"**.
- you can also consider using empty string or boolean

---

## 📋 5. Behavior Summary
| Situation                   | Result                      |
| --------------------------- | --------------------------- |
| Declared, no value          | `undefined`                 |
| Never declared              | ReferenceError: not defined |
| Manually set to `undefined` | Allowed, but discouraged    |

---

## ✅ 6. Why It Matters
* Understanding the distinction helps in debugging:
  * Logs `undefined` → variable exists but isn’t set.
  * Throws ReferenceError → you likely made a typo or forgot to declare it.
* Avoids pitfalls with conditional checks and default values.

---

## 🔁 7. Visual Flowchart
```
[ var a; ]
    ↓
[a: undefined] —> console.log(a) // prints undefined

[ console.log(b) ]
    ↓
ReferenceError: b is not defined

