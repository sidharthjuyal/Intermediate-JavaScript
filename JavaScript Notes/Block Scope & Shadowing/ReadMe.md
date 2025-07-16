# 📘 Block Scope & Shadowing

## 🔍 1. What is a Block?
- A **block** is a group of statements wrapped in `{…}`. It creates its own **block scope**. A block is also known as compound statement.
- We can group multiple statements in a block where javascript expects a single statement. Example:
```js
if(true) {
   var a = 10;
   console.log(a);
}
```

---

## 🔧 2. Block Scope vs `var`
```js
{
  var a = 10;
  let b = 20;
  const c = 30;
}
console.log(a); // 10
console.log(b); // ReferenceError
console.log(c); // ReferenceError
````
* `var a` is **function/global scoped**, so it leaks out. get's attached in the global window object.
* `let b` and `const c` are **block-scoped** and cannot be accessed outside. get's attached to a separate memory space.

---

## 🔄 3. Shadowing with `var`
```js
var a = 100;
{
  var a = 10;
  console.log(a); // 10
}
console.log(a); // 10
```
* Inner `var a` **overwrites** the outer one because both share the same scope (a is attached to the global window object).

---

## ✅ 4. Shadowing with `let` and `const`
```js
let b = 100;  // Separate memory - script scoped 
{
  let b = 20;  // separate memory - block scoped
  const c = 30;
  console.log(b); // 20
}
console.log(b); // 100
```
* Inner `let b` **shadows** outer `b`.
* Outer `b` remains unaffected: block vs script values.

---

## 🚫 5. Illegal Shadowing
```js
let a = 20;
{
  var a = 20; // SyntaxError: Identifier 'a' has already been declared
}
```
* You **cannot** declare a `var` inside a block if a `let` with the same name exists outside.
* However:
  * You *can* shadow `var` with `let` or `const`.
  * You can also shadow block-scoped variables with other block-scoped variables.

---

## 💡 6. Shadowing in Functions
```js
const c = 100;
function x() {
  const c = 10;
  console.log(c); // 10
}
x();
console.log(c); // 100
```
* Functions work the same: inner `c` shadows outer `c`.

---

## ✅ 7. Summary
* NOTE: Blocks also follow the Lexical Environment Scope Chain Behaviour (Block Chain).
* All the scope rules that apply to a function, also applies same to the arrow functions.
* A **block** creates its own scope for `let` and `const`.
* `var` ignores block scope—declared at function/global level.
* **Shadowing** means inner variables with the same name hide outer ones:
  * `var` shadows `var`
  * `let/const` shadows `let/const` or `var`
  * But `var` cannot shadow `let/const`

