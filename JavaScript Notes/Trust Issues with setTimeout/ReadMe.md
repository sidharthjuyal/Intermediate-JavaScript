# 🔥 TRUST ISSUES with setTimeout()

## 🧠 Understanding `setTimeout()`
```js
console.log("Start");
setTimeout(() => {
  console.log("Inside Timeout");
}, 0);
console.log("End");
````
### 🧾 Output:
```
Start
End
Inside Timeout
```
### ❗ Why not "Inside Timeout" right after "Start"?
Even with `0ms`, `setTimeout()` doesn't run **immediately** — it gets pushed to the **macrotask queue** (a.k.a. callback queue), waiting for the call stack to clear.

---

## 🔄 Behind the Scenes
### 1. Global Execution Context (GEC) is created.
### 2. Code starts executing line by line (Call Stack).
### 3. `setTimeout()` is handed over to Web API (Browser/Runtime).
### 4. After `delay` ms, callback goes into **macrotask queue**.
### 5. **Event Loop** constantly checks:
* Is Call Stack empty? ✅
* Then it pulls callback from Macrotask Queue → Stack

---

## 📌 Important Facts about `setTimeout()`
| Fact                        | Explanation                                        |
| --------------------------- | -------------------------------------------------- |
| `setTimeout()` is **async** | Runs via browser’s Web API                         |
| Callback is queued          | In **macrotask queue**, not immediately            |
| Delay ≠ exact timing        | Minimum wait time, **not a guarantee**             |
| Blocked by long sync code   | JS is single-threaded. Sync code delays the async. |

---

## 🧪 Example: Heavy Code Blocks Timeout
```js
setTimeout(() => {
  console.log("Hello");
}, 0);
for (let i = 0; i < 1e9; i++) {} // Heavy sync code
console.log("Done");
```
### Output:
```
Done
Hello
```
➡ Even though `setTimeout` was 0ms, it waited until the **blocking loop finished**. Because **JS is single-threaded**.

---

## 🕒 `setTimeout()` ≠ Precise Timing
* 0ms delay means: "Run it **as soon as possible**, but **after current execution** finishes."
* It never skips the **event loop** and **call stack rules**.

---

## 🧠 How Delay Affects Things?
```js
console.log("Start");
setTimeout(() => console.log("Timeout 1"), 100);
setTimeout(() => console.log("Timeout 2"), 0);
console.log("End");
```

### Output:
```
Start
End
Timeout 2
Timeout 1
```
Even though `Timeout 1` has a higher delay, `Timeout 2` is still **not instant**, but gets queued first.

---

## 📊 setTimeout vs Promises
```js
console.log("Start");
setTimeout(() => console.log("setTimeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
```
### Output:
```
Start
End
Promise
setTimeout
```
🧠 **Promise** goes to **microtask queue** → has higher priority.
🕓 `setTimeout` → macrotask queue → runs later.

---

## ⚠️ Gotcha: Delay Stacking
```js
setTimeout(() => {
  console.log("First");
  setTimeout(() => {
    console.log("Second");
  }, 0);
}, 0);

output:
First
Second
```
Even though both are 0ms, **nested setTimeout** causes a **tick delay** between executions.

---

## 🧪 Bonus
> Even **1000s of 0ms setTimeout()** will queue up and execute **one per event loop tick**, never truly "parallel".
```js
for (let i = 0; i < 1000; i++) {
  setTimeout(() => console.log(i), 0);
}

output: 0 to 1000 printed
```
⛔ JS is not multithreaded (unless you explicitly use Web Workers). All callbacks wait their turn.

---

## 🔚 Key Takeaways
* `setTimeout` is NOT a guaranteed timer — it’s a **scheduling mechanism**.
* Callback execution always respects the **event loop model**.
* Know your **task queues**: macrotask vs microtask.
* Great for **non-blocking async logic**, but not for exact timing (e.g., animations → use `requestAnimationFrame`).
* Avoid relying on `setTimeout()` for accurate delays.
