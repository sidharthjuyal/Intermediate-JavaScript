## 🧠 Prototype vs Prototypal Inheritance in JavaScript

### 🔁 What is a Prototype?
* In JavaScript, **every object has a hidden internal property `[[Prototype]]`**, which can be accessed via `__proto__` (unofficial) or `Object.getPrototypeOf(obj)` (official).
* A **prototype** is just another object that acts as a **fallback source** for properties and methods when they're not found on the object itself.

---

### 🧬 Prototypal Inheritance
* **If a property or method is not found on an object**, JavaScript looks up the `__proto__` chain until it finds it or reaches `null`.
```js
let object = {
    name: "Sid",
    city: "Kotdwar",
    getIntro: function() {
        console.log(this.name + " from " + this.city);
    }
};
let object2 = {
    name: "Vex"
};
// ❌ Avoid in practice, but used here to demonstrate inheritance
object2.__proto__ = object;
object2.getIntro(); // "Vex from Kotdwar"
```
### 🔍 Explanation:
* `object2` has no `city` or `getIntro`, so it looks into its prototype (`object`) for those.
* `this` inside `getIntro` still refers to `object2`, because it's the calling object.

---

## ⚠️ `__proto__` vs `prototype`
| Concept     | Belongs To       | Description                                            |
| ----------- | ---------------- | ------------------------------------------------------ |
| `__proto__` | Any object       | The internal reference to the object's prototype       |
| `prototype` | Constructor Func | The object from which new instances inherit properties |
**TL;DR:**
* `__proto__` is what **an object points to**
* `prototype` is what **a function uses to build that `__proto__`**
---

## 🧰 Function Prototype & Custom Methods
You can extend native prototypes like `Function.prototype`, `Array.prototype`, etc.
```js
Function.prototype.myBind = function() {
    console.log("My custom bind");
};
function hello() {}
hello.myBind(); // My custom bind
```

---

## 🔄 Prototype Chain Lookup
```js
object2.getIntro();
// Looks like:
- object2.getIntro → ❌
- object2.__proto__.getIntro → ✅
```

If `object2.__proto__ = object`, and `object.__proto__ = Object.prototype`, it continues looking until it hits `null`.

---

## ✅ Real-World Use (Cleaner Version)
Instead of `__proto__`, use `Object.create()`:
```js
let parent = {
    greet() {
        console.log("Hello from parent");
    }
};
let child = Object.create(parent);
child.name = "Vex";
child.greet(); // Hello from parent
```

---

## ❌ Why You Should Avoid `__proto__`
* It's considered legacy and non-performant.
* Can lead to unexpected bugs if misused.
* Use `Object.create`, `Object.setPrototypeOf`, or class-based inheritance instead.

---

## 🧠 Interview Snippets
> “Prototype in JavaScript is a mechanism by which objects can inherit properties from other objects.”
> “Prototypal inheritance lets objects inherit directly from other objects, forming a chain via their `__proto__` reference.”
> “Every function has a `prototype` property, which is used when creating objects using the `new` keyword. This becomes the new object's `__proto__`.”
