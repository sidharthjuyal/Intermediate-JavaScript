## 📌 Event Bubbling vs Capturing in JavaScript

### 🧠 What Happens When an Event is Triggered?
When a DOM event (e.g., click) occurs, it goes through **three phases**:
1. **Capturing Phase (Trickling Down)** – Event moves from `window → root → target`.
2. **Target Phase** – Event reaches the actual element clicked.
3. **Bubbling Phase (Bubbling Up)** – Event moves back from target to root.

---

## 🔁 addEventListener: Third Argument
```js
element.addEventListener('click', callback, useCapture);
```
* `useCapture = true` → event is handled in **capturing phase**
* `useCapture = false` (default) → event is handled in **bubbling phase**

---

## 🧪 Example Setup
HTML Structure:
```html
<div id="grandparent">
  <div id="parent">
    <div id="child"></div>
  </div>
</div>
```
Each element has a border, so when you click on `#child`, events fire on all 3.

---

## 📌 CASES
### ✅ Case 1: **Pure Bubbling** (default)
```js
grandparent.addEventListener('click', ..., false);
parent.addEventListener('click', ..., false);
child.addEventListener('click', ..., false);
```
**Click on `child`**
🡺 Output: `child clicked`, `parent clicked`, `grandparent clicked`
➡️ **Reason**: Event bubbles up after reaching target.

---

### ✅ Case 2: **Pure Capturing**
```js
grandparent.addEventListener('click', ..., true);
parent.addEventListener('click', ..., true);
child.addEventListener('click', ..., true);
```
**Click on `child`**
🡺 Output: `grandparent clicked`, `parent clicked`, `child clicked`
➡️ **Reason**: Event captured from top to bottom.

---

### ✅ Case 3: **Mixed – Capturing + Bubbling**
```js
grandparent.addEventListener('click', ..., true);  // Capturing
parent.addEventListener('click', ..., false);      // Bubbling
child.addEventListener('click', ..., true);        // Capturing
```
**Click on `child`**
🡺 Output: `grandparent clicked`, `child clicked`, `parent clicked`
➡️ **Reason**:
* Capturing → grandparent → child
* Bubbling → back up → parent

---

## 🚫 stopPropagation()
Stops the event from continuing its journey.

---

### 🛑 Case 4: Bubbling + stopPropagation on Target
```js
child.addEventListener('click', (e) => {
  console.log('child clicked');
  e.stopPropagation();
}, false);
```
**Click on `child`**
🡺 Output: `child clicked`
➡️ **Reason**: Bubbling is prevented from propagating up.

---

### 🛑 Case 5: Capturing + stopPropagation on Target
```js
child.addEventListener('click', (e) => {
  console.log('child clicked');
  e.stopPropagation();
}, true);
```
**Click on `child`**
🡺 Output: `grandparent clicked`, `parent clicked`, `child clicked`
➡️ **Reason**: Capturing finishes before `stopPropagation` at target.

---

### 🛑 Case 6: Capturing + stopPropagation on Grandparent
```js
grandparent.addEventListener('click', (e) => {
  console.log('grandparent clicked');
  e.stopPropagation();
}, true);
```
**Click on `child`**
🡺 Output: `grandparent clicked`
➡️ **Reason**: Event is stopped in capturing phase at the top, so it doesn’t even reach child or parent.

---

## 🔍 Summary Table
| Phase     | Order (Click on `child`)     | Propagation                     | Control             |
| --------- | ---------------------------- | ------------------------------- | ------------------- |
| Capturing | Grandparent → Parent → Child | Top → Bottom                    | `useCapture: true`  |
| Target    | Child                        |                                 |                     |
| Bubbling  | Child → Parent → Grandparent | Bottom → Top                    | `useCapture: false` |
| Stop Flow | `event.stopPropagation()`    | Stops either phase at any point |                     |

---

## ✅ When to Use What?

| Situation                          | Solution               |
| ---------------------------------- | ---------------------- |
| Prevent parent from reacting       | `e.stopPropagation()`  |
| Need control from outer → inner    | Use capturing (`true`) |
| Want outer elements to react later | Use bubbling (`false`) |
