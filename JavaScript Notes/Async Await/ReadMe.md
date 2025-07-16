# 🔥 `async/await` in JavaScript

## 🧠 What is `async`?
* `async` keyword is used to define a function that always returns a **Promise**, even if it returns a simple value.
* It allows use of the `await` keyword inside it.
```js
async function getData() {
  return "Hello";
}
getData().then(console.log); // Promise resolved with "Hello"
```

---

## 🧠 What is `await`?
* Used **only inside async functions**.
* Pauses the function execution at that line until the awaited Promise resolves.
* Makes asynchronous code look synchronous — increasing readability.
```js
async function fetchData() {
  const result = await somePromise;
  console.log(result);
}
```

---

## 🔄 How async/await works behind the scenes?
### ✅ async/await is **syntactic sugar over Promises**
When JS encounters `await`:
1. The async function execution is **suspended**.
2. The JS engine **removes** the function from the call stack.
3. The rest of the code runs.
4. When the awaited Promise resolves, the function is **resumed from the same line**.
⛔ It doesn't block the main thread.
✅ No freezing happens — call stack is free.

---

## 🧪 Real Example
```js
const p1 = new Promise(res => setTimeout(() => res("P1 Done"), 5000));
const p2 = new Promise(res => setTimeout(() => res("P2 Done"), 10000));
async function handle() {
  console.log("Start");
  const res1 = await p1;
  console.log(res1); // after 5s
  const res2 = await p2;
  console.log(res2); // after total 15s
}
```

### ⚠️ Common Confusion:
> “Shouldn’t this take 15s total if p2 starts when the line is reached?”
No. Because the timer for **p2** started *when it was defined*, **not when `await` is reached**.
🧠 **Timer starts at declaration**
So:
* If both `p1` and `p2` are declared outside the async function:
  ✔️ **Parallel execution** → total 10s
* If you move the declaration of `p2` **after `await p1`**, the timer starts later
  ❌ **Sequential execution** → total 15s
```js
async function handle() {
  const p1 = new Promise(res => setTimeout(() => res("P1"), 5000));
  const res1 = await p1;
  const p2 = new Promise(res => setTimeout(() => res("P2"), 10000));
  const res2 = await p2;
  console.log(res1, res2); // total 15s
}
```

---

## 🧠 Error Handling in async/await
### ✅ `try...catch` block
```js
async function fetchData() {
  try {
    const response = await fetch("https://api.github.com/users/sidharthjuyal");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Something went wrong", err);
  }
}
```

---

## 🔁 Async/Await vs `.then()/.catch()`
| Feature        | `.then()` / `.catch()`             | `async/await`                                           |
| -------------- | ---------------------------------- | ------------------------------------------------------- |
| Readability    | Less readable with multiple chains | Cleaner, looks like synchronous                         |
| Error Handling | With `.catch()`                    | With `try...catch`                                      |
| Blocking       | Non-blocking                       | Also non-blocking (execution is suspended, not blocked) |

---

## 🧠 Deep Concept: Is JS really “waiting”?
**No.**
When `await` is encountered:
* The async function is **paused**.
* JS engine continues executing other code.
* Once the Promise resolves, function is **resumed from where it paused**.
💡 This is what makes JS appear synchronous, while actually staying non-blocking.

---

## ✅ Summary – async/await
* `async` marks a function to always return a Promise.
* `await` pauses execution until a Promise resolves.
* Execution context is **suspended**, not blocked.
* **Error handling** is done using `try...catch`.
* For true **parallel execution**, declare promises **before awaiting** them.
