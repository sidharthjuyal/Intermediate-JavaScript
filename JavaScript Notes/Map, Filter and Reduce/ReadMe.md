# 🔥 `map()`, `filter()`, and `reduce()` in JavaScript

## 🚀 1. What are these?
JavaScript provides **functional array methods** that accept **callbacks** and return **new arrays** or values without mutating the original array.
| Method    | Purpose                                 | Returns        |
|-----------|------------------------------------------|----------------|
| `map()`   | Transforms each element                  | New array      |
| `filter()`| Filters elements based on a condition    | New array      |
| `reduce()`| Reduces array to a single value          | Any data type  |

---

## 🔄 2. `map()` – Transform Each Element
### 🧠 Use:
Create a **new array** by applying a function to **every element**.
```js
const nums = [1, 2, 3, 4];
const doubled = nums.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
````
* Non-mutating.
* Returns **same length** array.
* Ideal for **data transformation**.

---

## 🔍 3. `filter()` – Select Elements
### 🧠 Use:
Create a **new array** by keeping only elements that **pass the condition**.
```js
const nums = [1, 2, 3, 4];
const evens = nums.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]
```
* Non-mutating.
* Returns **fewer or same number** of elements.
* Ideal for **cleaning or narrowing data**.

---

## 🔢 4. `reduce()` – Boil Down to a Single Value
### 🧠 Use:
Use a function to **accumulate/combine** all values into one.
```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

🔧 Syntax:

```js
arr.reduce((accumulator, currentValue) => {
  return updatedAccumulator;
}, initialValue);
```
* Powerful for **totals, averages, objects, arrays, even nested reduction**.
* You can build `map()` and `filter()` using `reduce()`.

---

## 📦 Real-World Examples

### 🔸 Map Names to Uppercase
```js
const names = ["sid", "vex", "vish"];
const upper = names.map(name => name.toUpperCase());
// ["SID", "VEX", "VISH"]
```

### 🔸 Filter Out Falsy Values
```js
const arr = [0, null, "hello", undefined, 42];
const truthy = arr.filter(Boolean);
// ["hello", 42]
```

### 🔸 Reduce to Count Occurrences
```js
const chars = ['a', 'b', 'a'];
const count = chars.reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
// { a: 2, b: 1 }
```

---

## 🧠 Why These Matter
| Concept        | Value                                         |
| -------------- | --------------------------------------------- |
| Declarative    | Write **what** to do, not **how**             |
| Immutability   | Safer & easier to reason about                |
| Chainable      | Combine multiple methods cleanly              |
| Interview Gold | Common Qs in React, Node, data & logic rounds |

---

## 🧪 Bonus Tip
You can chain them for more power:
```js
const result = [1, 2, 3, 4, 5]
  .filter(x => x % 2 === 0)        // [2, 4]
  .map(x => x * 10)                // [20, 40]
  .reduce((a, b) => a + b);        // 60
```

