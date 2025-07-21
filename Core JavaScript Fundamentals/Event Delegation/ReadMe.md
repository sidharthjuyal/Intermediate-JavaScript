## 🔁 Event Delegation in JavaScript

### 🧠 What is Event Delegation?
**Event Delegation** is a technique where you **attach a single event listener to a parent element**, instead of adding individual listeners to multiple child elements.
The event naturally **bubbles up**, and we use `event.target` to find which child triggered it.

---

## 🔎 Why Use Event Delegation?
✅ **Better performance** (especially with many or dynamic child elements)
✅ **Less memory usage**
✅ **Handles dynamically added children automatically**
✅ **Cleaner, more maintainable code**

---

## 🧪 Example 1: Click on `<li>` Items
### ✅ HTML:
```html
<ul id="category">
  <li id="laptops">laptops</li>
  <li id="cameras">cameras</li>
  <li id="shoes">shoes</li>
</ul>
```

### ✅ JavaScript:
```js
document.getElementById("category").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    window.location.href = "/" + e.target.id;
  }
});
```

### ⚙️ How it works:
1. Listener is added to `<ul id="category">`
2. When any `<li>` inside it is clicked, the event bubbles to the `<ul>`.
3. We check `e.target.tagName === "LI"` to ensure we're acting only on actual `<li>` clicks.
### 📤 Output:
* Clicking on `laptops` → navigates to `/laptops`

---

## 🧪 Example 2: Auto Uppercasing Text Input
### ✅ HTML:
```html
<form id="category">
  <input type="text" data-uppercase />
  <input type="text" />
  <input type="text" />
</form>
```

### ✅ JavaScript:
```js
document.getElementById("category").addEventListener("keyup", (e) => {
  if (e.target.dataset.uppercase !== undefined) {
    e.target.value = e.target.value.toUpperCase();
  }
});
```

### ⚙️ How it works:
* Listens for `keyup` on the entire form
* Checks if the input has the attribute `data-uppercase`
* Converts its value to uppercase

### ✅ Output:
* Only the input with `data-uppercase` will auto-capitalize as the user types.

---

## 🧠 `e.target` vs `e.currentTarget`
| Property          | Refers To                                                              |
| ----------------- | ---------------------------------------------------------------------- |
| `e.target`        | The actual element clicked or typed on                                 |
| `e.currentTarget` | The element the event listener is attached to (`category` in our case) |

---

## 🛠 When to Use Event Delegation
| Use Case                                              | Reason                               |
| ----------------------------------------------------- | ------------------------------------ |
| Dynamic content (e.g., dropdowns, search suggestions) | Children created later still handled |
| Forms with many fields                                | Centralized validation/logic         |
| Lists or menus                                        | Fewer listeners, better performance  |

---

## 🔥 Advantages
* Performance gain in **large lists or dynamic UIs**
* Easy to handle **dynamic DOM changes**
* **Reduces redundant code**

---

## 🚨 Caution
* You must **filter `e.target`** carefully; events bubble from *deepest nested elements*
* Use `tagName`, `classList`, `matches()`, or `dataset` to check targets
* Some events **don’t bubble** (e.g. `focus`, `blur`)

---

## 🧪 Interview Tip
> **Q: How would you handle a click on hundreds of dynamic `<li>` items efficiently?**
✅ Use **Event Delegation**: Attach a single listener on the parent (like `<ul>`) and use `e.target` to determine which `<li>` was clicked.
