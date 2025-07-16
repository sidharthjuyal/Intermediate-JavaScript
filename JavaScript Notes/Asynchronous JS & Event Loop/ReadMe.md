# 🧠 JS vs JS Engine vs Runtime vs Browser vs Web APIs

### 🔹 1. JavaScript
> ✅ **The language.**
* Defines syntax, types, control structures, functions, etc.
* Does **not** include `setTimeout`, DOM, fetch, etc.
* Specified in **ECMAScript** standard (like a blueprint).

---

### 🔹 2. JavaScript Engine
> ✅ **Runs JavaScript code.**
* Parses, compiles, and executes JS.
* Examples:
  * Chrome → **V8**
  * Firefox → **SpiderMonkey**
  * Safari → **JavaScriptCore**
**BUT:** It only knows:
* How to execute JS code
* How to manage memory, scopes, closures
* How to process Promises and microtasks
**❌ No DOM, no setTimeout, no fetch** and contains:
- ├── Call Stack            ✅
- ├── Memory Heap           ✅
- └── Execution Thread      ✅

 - V8 JS ENGINE:
<img width="640" height="480" alt="image" src="https://github.com/user-attachments/assets/549f90f1-800a-4980-9d4e-e07d95a70010" />

---

### 🔹 3. JavaScript Runtime
> ✅ **Engine + Everything Else You Need to Actually Run JS Code**
| Runtime =   | JavaScript Engine + Web APIs + Event Loop |
| ----------- | ------------------------------------------------------ |
| In browsers | V8 (or similar) + DOM + Timers + Fetch + Event Loop    |
| In Node.js  | V8 + fs + process + timers + HTTP + Event Loop         |
**Runtime makes JavaScript feel powerful & async — but these extras aren’t in the language itself.**

---

### 🔹 4. Web APIs (in browsers)
> ✅ Provided by **the browser**, NOT JavaScript.
Includes:
* `setTimeout`, `setInterval`
* `DOM` APIs
* `fetch()`
* `localStorage`, `cookies`
* `addEventListener`
* `location`, `console.log` etc.
When you do:
```js
setTimeout(() => console.log("hello"), 0);
```
That `setTimeout` is a **browser feature**, not a JS one.

---

### 🔹 5. Are `Promise`, `then`, `async/await` Part of JS?
✅ YES. These **are** part of the **JavaScript language spec**.
* `Promise` is part of ECMAScript since ES6
* `async/await` is just syntactic sugar over Promises
* `Promise.then(...)` uses the **Microtask Queue**, which **is handled by the engine**
So:
| Feature       | Belongs To          | Queue Used                                 |
| ------------- | ------------------- | ------------------------------------------ |
| `Promise`     | JS Engine (ES spec) | Microtask queue                            |
| `async/await` | JS Engine           | Microtask queue                            |
| `setTimeout`  | Web API (Browser)   | Macrotask queue                            |
| `fetch`       | Web API (Browser)   | Macrotask (callback) + Microtask (promise) |

---

### 🔹 6. Is JS Engine = JS Runtime?
**❌ No.**
| Term       | Includes                                   |
| ---------- | ------------------------------------------ |
| JS Engine  | Just the JS interpreter/compiler (e.g. V8) |
| JS Runtime | Engine + APIs + Event Loop + Queues        |
You can’t run a full JS app with only the engine.

---

## ✅ TL;DR — Clear Answers to Your Questions:
| Question                                        | Answer                                                                  |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Is JavaScript synchronous?                      | ✅ Yes. It's a sync language with async features via runtime             |
| Is JS Engine = Runtime?                         | ❌ No. Engine runs JS; Runtime = Engine + APIs + Event Loop              |
| Is setTimeout part of JS?                       | ❌ No. It’s a **Web API** (browser/Node provides it)                     |
| Is Promise/then part of JS?                     | ✅ Yes. They're in the language itself                                   |
| Are async/await features of JS or browser?      | ✅ JS. They compile to Promises                                          |
| Is async behavior handled by the JS Engine?     | 🔁 Partially: Promises are; timers, fetch, etc., are handled by runtime |
| Are Web APIs and browser the same thing?        | 🔁 Kind of. Web APIs are **features exposed by the browser**            |
| Are Promises async because of browser features? | ❌ No. They are async **within JS engine** using the microtask queue     |

<img width="400" height="450" alt="Browser Structure" src="https://github.com/user-attachments/assets/781a80f3-37e7-4e4c-a408-a0077dc8119b" />

---

# 🗺️ Full Execution Flow: Async Code in JavaScript
Let’s say your JS program contains:
* `setTimeout`
* `fetch`
* `setInterval`
* `eventListeners`
* `Promise`
* `async/await`
* Callbacks (sync + async)

---

## 🧠 First: The Components Involved
| Layer               | Responsible For                                                    |
| ------------------- | ------------------------------------------------------------------ |
| **JS Engine**       | Executes sync code, handles Promises, async/await, microtask queue |
| **JS Runtime**      | Provides APIs: `setTimeout`, `fetch`, DOM, `setInterval`, events   |
| **Call Stack**      | Executes functions (sync or async callbacks)                       |
| **Web APIs**        | Handles async API execution in background                          |
| **Microtask Queue** | `Promise.then()`, `catch`, `async/await`                           |
| **Macrotask Queue** | `setTimeout`, `setInterval`, DOM events                            |
| **Event Loop**      | Coordinates between stack + queues                                 |

---

## 🧩 0. Setup
When your script is loaded:
* `Global Execution Context (GEC)` is created and pushed to the **Call Stack**
* Memory phase: variables/functions are hoisted
* Execution phase: code runs top-down

---

## ⚙️ 1. Sync Code Execution (JS Engine)
* JS engine runs all **synchronous code line by line**
* Functions like `console.log`, math, DOM access run **immediately** via the **Call Stack**
* If a `Promise` is encountered, its executor function runs **immediately**, but `.then()` gets scheduled
* `async/await` is converted to Promises under the hood

---

## ⏳ 2. Encountering Async APIs (Handled by Runtime)
| Code Line               | What Happens                                             |
| ----------------------- | -------------------------------------------------------- |
| `setTimeout(cb, 1000)`  | Registered in **Web API** → timer starts                 |
| `setInterval(cb, 2000)` | Registered in **Web API** → runs on interval             |
| `fetch(...)`            | Sent to Web API → HTTP request sent in background        |
| `addEventListener`      | Listener is registered in Web API → waits for user event |
These functions are **NOT JS features** — they’re delegated to **browser APIs (runtime)**.

---

## 🔄 3. As Async APIs Complete
* When timer finishes, HTTP response comes, or event occurs:
  → the **callback** is placed into the **Macrotask Queue** (aka Callback Queue)
✅ But it will **NOT execute immediately**.

---

## 🪝 4. Promises & Microtasks (JS Engine’s Domain)
* When a `Promise` is resolved or rejected:
  → Its `.then()` or `.catch()` is placed into the **Microtask Queue**
* Same for `await` — it pauses execution, schedules the next step in **Microtask Queue**
✅ Microtasks are JS-engine-native — they don’t involve Web APIs or timers.

---

## 🔁 5. The Event Loop’s Role
> The **Event Loop** is the orchestrator. It does this infinitely:
### Event Loop Cycle:
```
while (true) {
  if (Call Stack is empty) {
    Run all Microtasks in order (drain Microtask Queue)
    Run one Macrotask (from Callback Queue)
  }
}
```
✅ This ensures **microtasks always have higher priority** than macrotasks.

---

## 🔂 6. Summary of What Touches What
| Code Type           | Handled By                         | Goes To                            | Runs When                             |
| ------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------- |
| Sync Code           | JS Engine                          | Call Stack                         | Immediately                           |
| `Promise.then()`    | JS Engine                          | Microtask Queue                    | After current stack, before macrotask |
| `async/await`       | JS Engine                          | Microtask Queue (await resumption) | Same as Promise                       |
| `setTimeout`        | JS Runtime (Web API)               | Macrotask Queue                    | After delay, when stack is empty      |
| `fetch().then(...)` | Web API (fetch) + JS Engine (then) | Microtask Queue for `.then()`      | After response arrives                |
| `setInterval`       | JS Runtime                         | Macrotask Queue (repeated)         | Every interval after stack clears     |
| `eventListener`     | Web API                            | Macrotask Queue (on event)         | When event occurs                     |
| `callback` (sync)   | JS Engine                          | Call Stack                         | Immediately if sync                   |

---

## 🔁 Visual Flow
```
              JS Program Starts
                     │
           [ Global Execution Context ]
                     │
         ↓ Run Synchronous Code (JS Engine)
     ┌────────────────────────────────────────┐
     │ Async APIs Found → Offloaded to Web APIs│
     └────────────────────────────────────────┘
                     │
         ↓ JS Engine handles Promises → Microtask Queue
                     │
          [ Event Loop Starts Watching ]
                     │
        📌 Loop:
            → Is Call Stack empty?
               → Yes? Drain Microtask Queue
               → Then: Pull one Macrotask
                     │
          ⏱️ Timer/Fetch/Event/Interval Callbacks run
                     │
              New ECs pushed to Call Stack
                     ↓
               Functions execute
```

---

## 🎯 End Result

* JS engine runs sync code + internal async logic
* JS runtime (browser or Node) runs timers, events, HTTP
* **Event loop bridges the gap**
* Microtask queue is **priority 1**, macrotask queue is **priority 2**
* Promises and async/await = handled internally
* Web APIs = handled externally
