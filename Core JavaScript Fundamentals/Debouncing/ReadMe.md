# 🔁 Debouncing in JavaScript

## 📌 What is Debouncing?
**Debouncing** is a technique used to **limit the rate** at which a function is executed. It ensures that the function is invoked **only after a certain delay has passed** since the last time it was invoked.
This is especially useful in **performance-heavy** situations like:
- Handling **search bar input**
- **Resize** or **scroll** events
- Button clicks that could trigger expensive API calls

---

## 🧠 Real-world Scenario:
Imagine you are typing in a search bar and it triggers an API call on every keystroke — this can overwhelm your server and degrade performance. Debouncing ensures the API call is made **only after the user stops typing** for a set time.

---

## ✅ Implementation
### `HTML`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Debouncing</title>
</head>
<body>
  <input type="text" onkeyup="betterFunction()" />
  <script src="./Debouncing.js"></script>
</body>
</html>
```

---

### `JavaScript`
```js
let counter = 0;
const getData = () => {
  console.log("Fetching Data...", counter++);
};
// Debounce utility function
const debounceFunction = function (fn, delay) {
  let timer;
  return function () {
    let context = this,
        args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
const betterFunction = debounceFunction(getData, 300);
```

---

## 🧪 Explanation
* `debounceFunction` accepts a function `fn` and a delay in ms.
* It returns a new function (a closure) that:
  * Clears any previous timer.
  * Sets a new timer to invoke `fn` after the specified `delay`.
* The use of `apply(context, args)` ensures that the original function `fn` runs with its correct `this` context and arguments.

---

## 🔥 Flipkart Interview Use-case
**Question**: You’re building an input box that fetches suggestions from a server as the user types. How do you make sure you're not making API calls on *every* keystroke?
**Answer**: Use **debouncing** to delay the API call until the user stops typing for a few milliseconds (e.g., 300ms). This reduces network usage and improves performance.

---

## 🧠 Bonus Insight:
* Debouncing is different from **throttling**, which ensures a function is called at **regular intervals**, while debouncing waits for **a pause in action**.

```

