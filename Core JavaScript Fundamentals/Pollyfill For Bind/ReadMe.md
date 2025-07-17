# Polyfill for `.bind()` & Custom `.map()` – Core JS Fundamentals (Video 2)

## 🚀 bind() Recap
- `Function.prototype.bind()` creates a **copy of a function** with `this` keyword bound to the object passed.
- It doesn't invoke the function immediately (unlike `call` or `apply`), but **returns a new function** to be called later.

### ✅ Example:
```js
const name1 = {
  firstName: "Sidarth",
  lastname: "Juyal",
};
const printName = function (hometown, state, country) {
  console.log(
    this.firstName +
      " " +
      this.lastname +
      " from " +
      hometown +
      ", " +
      state +
      ", " +
      country
  );
};
const printMyName = printName.bind(name1, "Kotdwar");
printMyName("Uttarakhand", "India");
```

---

## 🧠 Polyfill for `.bind()`

### ❓What is a Polyfill?
A polyfill is a **custom implementation** of a built-in JavaScript method, for learning or for legacy browser support.

### 💡 Custom `myBind()` implementation:
```js
Function.prototype.myBind = function (...args) {
  let obj = this, // Refers to the function on which myBind was called (printName)
      params = args.slice(1); // Extracting params to be pre-set

  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};
```

### ✅ Using `myBind`:
```js
let printMyName2 = printName.myBind(name1, "Kotdwar");
printMyName2("Uttarakhand", "India");
```
> ✔️ `myBind` does:
>
> * First argument = object to bind (`this`)
> * Rest are **preset parameters**
> * Returned function can be called later with additional args

---

## 🎯 Pollyfill for `map()` Implementation
* `.map()` is a **Higher Order Function** – it takes a function as input and returns a new array.
* Let’s polyfill our own `.myMap()` method on `Array.prototype`

### 💻 Implementation:
```js
Array.prototype.myMap = function (logic) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(logic(this[i]));
  }
  return result;
};
```
### ✅ Usage:
```js
let arr = [1, 2, 3];
function double(x) {
  return x * 2;
}
console.log(arr.myMap(double)); // [2, 4, 6]
```