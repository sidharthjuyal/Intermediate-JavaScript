## 🔥 Throttling in JavaScript (Flipkart UI Interview Concept)

### ✅ Definition
**Throttling** is a technique used to **limit the number of times a function can execute over time**. It ensures that a function is invoked at most **once every specified interval**, regardless of how many times the event is triggered.

---

### ⚡ Real-World Use Cases
* `resize` events (e.g., adjusting layout/UI responsively)
* `scroll` events (e.g., infinite scroll logic)
* `mousemove`, `keyup`, or `input` events
* Preventing **button spamming**
* Rate-limiting **API calls** (e.g., search suggestions)

---

### 🚫 Problem (Without Throttling)
If you directly bind an **expensive function** to a high-frequency event (e.g., `resize`), it gets called **hundreds of times per second**, resulting in:
* Laggy UI
* Memory leaks
* Performance bottlenecks

---

### ✅ Solution (With Throttling)

Throttle limits the function call to once every `n` milliseconds, regardless of how frequently the event is triggered.

---

### 🧠 Code Example

```js
function expensive() {
  console.log("Expensive function called...");
}

function throttle(func, limit) {
  let flag = true;

  return function () {
    let context = this;
    let args = arguments;

    if (flag) {
      func.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}
// Create a throttled version of expensive()
const betterExpensive = throttle(expensive, 1000);
// Bind it to the resize event
window.addEventListener("resize", betterExpensive);
```

---

### 🧪 Explanation of How It Works
* The `flag` is initially `true`.
* On the first call, `flag` allows the function to run and is then set to `false`.
* A `setTimeout` resets the `flag` to `true` after `limit` milliseconds.
* Until `flag` becomes true again, no further execution is allowed.

This creates a **cooldown window** where the function is ignored even if events keep firing.

---

### ❗ Common Mistakes
```js
// ❌ Incorrect
window.addEventListener("resize", betterExpensive()); 
```
This executes `betterExpensive()` **immediately** during setup, not on `resize`.
✅ Correct version:
```js
window.addEventListener("resize", betterExpensive);
```

---

### 🧠 Concept Summary Table
| Feature            | Throttling              | Debouncing                        |
| ------------------ | ----------------------- | --------------------------------- |
| Function executes  | At most once every X ms | Only after X ms of inactivity     |
| Use case           | Resize, scroll, clicks  | Input boxes, search bars          |
| Ideal for          | Rate-limiting calls     | Avoiding unnecessary repeat calls |
| Triggers execution | Periodically            | After idle period                 |

---

### 🔚 Final Thought
Throttling = **controlled frequency**
Debouncing = **controlled silence**
Use throttling when you want **consistent execution at intervals**, and debouncing when you want **execution only once after inactivity**.
