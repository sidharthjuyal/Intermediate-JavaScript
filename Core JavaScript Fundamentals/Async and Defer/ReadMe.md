# 🚀 async vs defer in JavaScript
When loading a webpage, two major processes occur:
1. **HTML Parsing** – The browser reads and parses the HTML document top to bottom.
2. **Script Loading** – When the browser encounters a `<script>` tag, it handles:
   - **Fetching**: Getting the script file from the network (I/O bound).
   - **Execution**: Running the JavaScript (CPU bound).

---

## 🛑 Without `async` or `defer` (Normal `<script src="...">`)
### ⛓️ **Blocking Behavior**:
- When the parser encounters a script:
  - HTML parsing **stops**.
  - The script is **fetched** from the network.
  - Once fetched, the script is **executed immediately**.
  - Only **after execution**, HTML parsing **resumes**.

```html
<script src="app.js"></script>
````

### ❌ Cons:
* Blocks rendering.
* Bad for performance.
* Not suitable for large scripts or multiple `<script>` tags.

---

## ⚡ With `async`

### 🔄 **Asynchronous Fetch, Immediate Execution**
```html
<script src="app.js" async></script>
```

* HTML parsing and script **fetching happen in parallel**.
* As soon as the script is fetched:
  * HTML parsing is **paused**.
  * Script is **executed immediately**.
  * After execution, HTML parsing **resumes**.

### ⚠️ Important:
* \*\*Execution order is **not guaranteed**.
* Scripts execute **as soon as they're ready**, possibly out of order.
* Best for **independent third-party scripts** (e.g., analytics, ads).

### ✅ Use `async` when:
* Scripts **don’t depend** on each other or on HTML.
* Execution order **doesn’t matter**.
* Example: Google Analytics.

---

## 🕓 With `defer`
### ⏳ **Asynchronous Fetch, Deferred Execution**
```html
<script src="app.js" defer></script>
```
* HTML parsing and script fetching happen **in parallel**.
* Script execution is **deferred** until **after the entire HTML is parsed**.
* Scripts are executed **in order of appearance in the HTML**.

### ✅ Best of Both Worlds:
* Doesn’t block HTML parsing.
* Preserves execution order.

### ✅ Use `defer` when:
* Scripts rely on the DOM being fully available.
* Scripts are interdependent.
* Ideal for most **main application JS files**.

---

## 🧠 Comparison Table
| Feature         | Normal Script            | `async`                 | `defer`            |
| --------------- | ------------------------ | ----------------------- | ------------------ |
| Fetching        | Blocking                 | Asynchronous            | Asynchronous       |
| Execution       | Immediately (blocking)   | Immediately after fetch | After HTML parsing |
| HTML Parsing    | Paused during fetch+exec | Paused during exec      | Never paused       |
| Execution Order | Top to bottom            | Not guaranteed          | Preserved          |
| Use case        | Old school scripts       | Third-party libs        | Main app scripts   |

---

## 🧪 DOMContentLoaded & Script Execution
* `DOMContentLoaded` event fires **after HTML is parsed**, but **before** styles/images/etc are loaded.
* **Normal scripts** delay `DOMContentLoaded` until executed.
* **`async` scripts** may delay or fire before DOMContentLoaded (unpredictable).
* **`defer` scripts** always execute **just before `DOMContentLoaded` fires**, after HTML parsing.

---

## ⚠️ Bonus Gotcha: Placement Matters
* `async` and `defer` only work with **external scripts** (i.e., with `src`).
* They have **no effect on inline scripts**.
```html
<!-- ✅ Works -->
<script src="main.js" defer></script>
<!-- ❌ async/ defer ignored -->
<script defer>
  console.log("Ignored");
</script>
```

---

## ✅ Summary
* `async`: Load and execute scripts **as soon as possible**, without waiting.
  * Fastest but **order is not guaranteed**.
* `defer`: Load scripts in parallel, **execute after parsing**, **preserves order**.
  * Best for app scripts.
* Regular scripts **block HTML parsing** — avoid them when possible.

---

## 🧠 Pro Tips
* Use `defer` for all internal JS files.
* Use `async` only for independent 3rd-party tools.
* Never use both `async` and `defer` on the same script — browser will treat it as `async`.

```

