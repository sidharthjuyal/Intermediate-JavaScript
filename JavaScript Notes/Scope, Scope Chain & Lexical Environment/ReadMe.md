# 📘 Scope Chain, Scope & Lexical Environment

## 🔍 1. Scope vs Lexical Environment
- Lxical means "in Hierarchy". 
- **Scope** defines *where* a variable or function is accessible.
- A **Lexical Environment (LE)** is created with each execution context, combining:
  - Local memory (variables/functions)
  - Reference to the parent Lexical Environment.

---

## 🧠 2. Examples & Scope Chain

### ✅ Case 1 – Global Access
```js
function a() {
  console.log(b); // 10
}
var b = 10;
a();
````
* `a()` finds `b` in the **Global LE** → logs **10**&#x20;

---

### ✅ Case 2 – Nested Function, Global Access
```js
function a() {
  c();
  function c() {
    console.log(b); // 10
  }
}
var b = 10;
a();
```
* `c()` inside `a()` uses scope chain: **`c` → `a` → Global** → logs **10**&#x20;

---

### ✅ Case 3 – Inner Shadowing
```js
function a() {
  c();
  function c() {
    var b = 100;
    console.log(b); // 100
  }
}
var b = 10;
a();
```
* `c()` has its own `b` → logs **100**, not the global `b`

---

### ✅ Case 4 – Lexical Isolation
```js
function a() {
  var b = 10;
  c();
  function c() {
    console.log(b); // 10
  }
}
a();
console.log(b); // ReferenceError
```
* `c()` logs `10`, but global `b` is not defined outside → error&#x20;

---

## 🧩 3. Scope Chain & Execution Contexts
* When a function runs, a **Scope Chain** is created: local LE → parent LE → … → global LE → `null`
* JS looks up variables *lexically* through this chain.
* If not found, it throws **ReferenceError**.

---

## 🔁 4. Call Stack & Lexical Environments
```
Call Stack: [GEC, a(), c()]
- c() LE → pointer → a() LE
- a() LE → pointer → Global LE
- Global LE → pointer → null
```

Each LE stores local data + a link to its parent, forming the **scope chain**

---

## ✅ 5. Key Takeaways
* **Lexical scope**: defined by the location of functions in code.
* Inner functions access variables from parent scopes via the scope chain.
* Each function creates its own **LE with pointer to parent**, forming a chain.
* Global LE's parent is `null`, ending the chain.
