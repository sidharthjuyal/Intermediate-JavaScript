# 📘 `let` & `const` and Temporal Dead Zone

## 🔍 1. Are `let` and `const` hoisted?
Yes—but differently than `var`:
- During memory allocation:
  - `let` and `const` are reserved in memory.
  - They remain **uninitialized**—this is the **Temporal Dead Zone (TDZ)**.

---

## ⚠️ 2. Temporal Dead Zone (TDZ)
- The time between **start of scope** (when the let or const variable was first hoisted/ allocated some memory ) and **initialization line** (initialized with a value) for `let`/`const`.
- Accessing these variables *before they’re initialized* causes a **ReferenceError**.
- Example:
  ```js
  console.log(a); // undefined (var)
  console.log(b); // ReferenceError (let)

  var a = 100;
  let b = 200;

---

## 🔧 3. Why TDZ matters
* Prevents use of variables before definition.
* Encourages cleaner, more predictable code.
* Reduces bugs caused by accidental early use.

---

## 🧠 4. Memory placement
* `var`: stored in **Global Execution Context**, accessible via `window.varName`.
* `let`/`const`: are allocated memory but they are stored in a **separate memory space**, *not* attached to `window`. and you cannot access them before initialization.

---

## 💡 5. `let` vs `const`
| Feature         | `let`      | `const`                             |
|----------------|------------|--------------------------------------|
| Reassignable?  | ✅ Yes     | ❌ No → **TypeError** if reassigned  |
| Redeclarable?  | ❌ No      | ❌ No → **SyntaxError** if redeclared |
| Requires init? | ❌ No      | ✅ Yes → **SyntaxError** if not initialized |

---

## ✅ 6. Best Practices
* Prefer `const` by default.
* Use `let` when reassignment is needed.
* Avoid `var`—it’s function-scoped and more error-prone.
* Declare variables at the **top of their scope** to shrink TDZ.

---

## 🔁 7. Visual Summary
```
  [ scope start ]
      ↓
  TDZ begins for b, c
      ↓
  let b = 10; // TDZ ends, b initialized
  const c = 20; // TDZ ends, c initialized
      ↓
  [ scope end ]
```

---

### 🧾 Final Take
`let` and `const` are hoisted but cannot be accessed before initialization due to TDZ.
Use `const` for constants, `let` when needed, and avoid `var` to keep code safe, clean, and predictable.

