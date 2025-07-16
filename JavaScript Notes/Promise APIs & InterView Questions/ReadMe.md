# 🔥 Promise APIs in JavaScript

## ✅ Topics Covered:
* What are the 4 major Promise combinators?
* Use-cases & behavior in real-world async tasks
* Performance, behavior, and pitfalls
* Interview-level clarity

---

## 🔑 1. `Promise.all()`
### ▶️ What It Does:
Takes an array of promises → waits for all to resolve → returns an array of results in order.
If **any** promise **rejects**, the whole `Promise.all()` **fails immediately** (Fail Fast).
### 🧠 Use-case:
Perfect for parallel API calls where you want **all results** to proceed.
### ⚠️ Catch:
If one fails, others don’t stop executing, but their result is ignored.
### ✅ Example:
```js
const p1 = new Promise(resolve => setTimeout(() => resolve('P1'), 3000));
const p2 = new Promise(resolve => setTimeout(() => resolve('P2'), 1000));
const p3 = new Promise(resolve => setTimeout(() => resolve('P3'), 2000));
Promise.all([p1, p2, p3])
  .then(results => console.log(results)) // ['P1', 'P2', 'P3']
  .catch(err => console.error(err));
```
### ❌ Error Scenario:
```js
const p2 = new Promise((_, reject) => setTimeout(() => reject('P2 Failed'), 1000));
Promise.all([p1, p2, p3])
  .then(results => console.log(results))
  .catch(err => console.error(err)); // 'P2 Failed' after 1s
```

---

## 🔰 2. `Promise.allSettled()`
### ▶️ What It Does:
Waits for **all promises to settle** (resolve/reject) → returns status+value/reason of each.
### 🧠 Use-case:
When you want the result of every promise regardless of success/failure.
### 🔥 Safer alternative to `.all()` when rejection shouldn't break the chain.
### ✅ Example:
```js
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
```
```js
// Output:
[
  { status: 'fulfilled', value: 'P1' },
  { status: 'rejected', reason: 'P2 Failed' },
  { status: 'fulfilled', value: 'P3' }
]
```

---

## 🏁 3. `Promise.race()`
### ▶️ What It Does:
Returns result of the **first promise** that settles (either resolve or reject).
### 🧠 Use-case:
Timeouts, fallback APIs, race conditions, etc.
### ❗ Caveat:
If the **first** one fails → the entire `.race()` fails.
### ✅ Example:
```js
Promise.race([p1, p2, p3])
  .then(result => console.log(result))
  .catch(err => console.error(err)); // Depends on fastest one
```
```js
// p2 resolves in 1s → Output: "P2"
// If p3 rejected in 2s before others resolved → Output: "P3 Failed"
```

---

## 🟢 4. `Promise.any()`
### ▶️ What It Does:
Returns the result of the **first successful promise**.
### 🧠 Use-case:
When **only one** success is required, and rejections can be ignored (initially).
### ✅ Example:
```js
Promise.any([p1, p2, p3])
  .then(result => console.log(result)) // returns first fulfilled one
  .catch(err => {
    console.error(err);           // AggregateError if all failed
    console.error(err.errors);    // ['P1 Fail', 'P2 Fail', 'P3 Fail']
  });
```
### 🔥 Note:
* It only **fails** if **all promises fail**.
* Introduced in ES2021.

---

## 🧠 Key Differences Recap:
| Method               | Returns When?                       | Success Condition         | Fails When?                               |
| -------------------- | ----------------------------------- | ------------------------- | ----------------------------------------- |
| `Promise.all`        | All resolved                        | All promises must resolve | Any one fails (fast fail)                 |
| `Promise.allSettled` | All settled (resolve/reject)        | Always resolves           | Never fails                               |
| `Promise.race`       | First to settle (resolve or reject) | Any one settles           | On first rejection (if it comes first)    |
| `Promise.any`        | First to resolve                    | Any one resolves          | Only if all are rejected (AggregateError) |

---

## 💥 Advanced Insight: Execution Timing
Even though `await` causes execution to pause within the async function, **timers for promises start when declared**, not at the `await` line.
So this:
```js
const p1 = new Promise(resolve => setTimeout(() => resolve("p1"), 5000));
const p2 = new Promise(resolve => setTimeout(() => resolve("p2"), 10000));
async function handle() {
  const val1 = await p1;
  const val2 = await p2;
  console.log(val1, val2);
}
```
⏱️ Will take **10 seconds**, not 15 — because both `p1` and `p2` started ticking at declaration.
But this will take 15s:
```js
async function handle() {
  const p1 = new Promise(resolve => setTimeout(() => resolve("p1"), 5000));
  const val1 = await p1;
  const p2 = new Promise(resolve => setTimeout(() => resolve("p2"), 10000));
  const val2 = await p2;
  console.log(val1, val2);
}
```
⏱️ Because p2 doesn’t start until after p1 resolves.

---

## 🎯 Real-World Application Patterns
| Pattern                | Use-Case                                   |
| ---------------------- | ------------------------------------------ |
| `Promise.all()`        | Fetch multiple product data in parallel    |
| `Promise.allSettled()` | Form submission with optional fields       |
| `Promise.race()`       | Show fallback loader if API takes too long |
| `Promise.any()`        | Fastest mirror server from a list          |

---

## 🧪 Interview-Level Tips
* `Promise.all()` is fast but brittle. One fail, all fail.
* `allSettled()` is best for audit logs, batch jobs.
* `race()` is great for adding timeouts.
* `any()` is best when only one success is enough.
### 🧨 Bonus:
* Use `AbortController` + `race()` for fetch timeouts.
* Always add `.catch()` or use `try-catch` in `async/await`.

---

## 🧼 Summary
```js
// Most safe:
Promise.allSettled()
// Fastest result (success/fail):
Promise.race()
// Fastest successful result:
Promise.any()
// Wait for all but risky if one fails:
Promise.all()
```
