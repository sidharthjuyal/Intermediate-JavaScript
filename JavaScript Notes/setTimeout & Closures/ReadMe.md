# 📘 `setTimeout` + Closures Interview Trap

## 🔍 1. The Basic Closure in `setTimeout`
```js
function x() {
  var i = 1;
  setTimeout(function () {
    console.log(i);
  }, 3000);
  console.log("Namaste JavaScript");
}
x();
````
### 🧠 What happens:
* JS encounters `setTimeout` and **registers the callback** to run after 3 seconds.
* It doesn’t wait — `console.log("Namaste JavaScript")` runs **immediately**.
* Time, Tide and Javascript waits for none.
* After 3s, the callback runs and **logs `i`**, which is `1` (due to closure).
* The callback inside `setTimeout` forms a **closure with the scope of `x()`**, allowing it to access variables like `i` even after `x()` has completed execution.

### ✅ Output:
```
Namaste JavaScript
1 ← (after 3 seconds)
```
> Closure allows the callback to **remember `i`**, even after `x()` has finished executing.

---

## ⚠️ 2. The Classic Interview Trap – Loop with `var`
```js
function x() {
  for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
x();
```
### ❌ Output:

```
6
6
6
6
6
```

### 🤯 Why does it print 6 five times?
* `var` is **function-scoped**, not block-scoped.
* All 5 callbacks **share the same `i`**.
* By the time the timer fires, the loop has already finished and `i = 6`.
> The callbacks don't capture **values**, they capture a **reference to `i`** — and it's 6 by the time they execute.

---

## ✅ 3. Solution 1 – Use `let` (Block Scoped)
```js
function x() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
x();
```
### ✅ Output:

```
1
2
3
4
5
```

### ✅ Why it works:
* `let` is **block-scoped**, so each iteration has its own version of `i`.
* Each `setTimeout` callback closes over a **separate copy** of `i`.

---

## ✅ 4. Solution 2 – Use a helper function
```js
function x() {
  for (var i = 1; i <= 5; i++) {
    function close(x) {
      setTimeout(function () {
        console.log(x);
      }, x * 1000);
    }
    close(i);
  }
}
x();
```
### ✅ Output:
```
1
2
3
4
5
```
### ✅ Why it works:
* Each i is passed to a separate invocation of close().
* Inside close, a new scope is created, so the setTimeout callback captures a fresh x every time.
* Avoids the shared reference problem of var inside the loop.
> The closure now captures `j` (not the shared `i`), which locks the value per iteration.

---

## ⚠️ 5. Important Concepts at Play
### 🧠 setTimeout:
* Doesn’t block — it schedules the callback and moves on.
* Callback goes to the **Web API**, then to the **callback queue**, and runs via the **Event Loop** after the delay.
### 🧠 Closures:
* A function “remembers” its **lexical environment**, even after the outer function has finished.
* **Closures capture variables by reference**, not by value — unless you isolate them (via `let` or IIFE).
### 🧠 var vs let:
| `var`                                | `let`                     |
| ------------------------------------ | ------------------------- |
| Function-scoped                      | Block-scoped              |
| Shared across loop                   | New binding per iteration |
| Hoisted + initialized as `undefined` | Hoisted but in **TDZ**    |

---

## ✅ Summary
* Use `let` in loops with async code to avoid closure traps.
* `var` + closure = shared state = interview trap.
* Closures hold references, not snapshots.
* Mastering this helps in understanding timers, async logic, and safe loop patterns.
```
