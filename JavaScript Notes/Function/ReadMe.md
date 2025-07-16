# 📘 How Functions Work & Variable Environment

## 🔍 1. Function Invocation & Execution Context
Whenever a function is invoked, JavaScript creates a **new Functional Execution Context (FEC)** — a container similar to the global one but scoped to that function.
Each FEC has:
```
Execution Context (Function)
├── Memory Component (Variable Environment)
│   ├── Parameters as variables
│   ├── Local variables (initialized `undefined`)
├── Code Component (Thread of Execution)
│   └── Function body executed line-by-line
└── Outer Lexical Environment reference
````

---

## 🧠 2. Variable Environment in Function
When a function runs:
1. **Memory Phase**:
   - Parameters and local `var` variables are hoisted (set to `undefined`).
2. **Execution Phase**:
   - Values are assigned, logic is executed, and function may return a value.
---

### 🔁 Example:
```js
var x = 1;
a();
b();
console.log(x);

function a() {
  var x = 10;
  console.log(x);
}

function b() {
  var x = 100;
  console.log(x);
}
````
### 🔍 Output:
```
10
100
1
```

### ⚙️ Execution Flow:

#### 🔹 Global Execution Context
```
Memory Phase:
- x → undefined
- a → [function a]
- b → [function b]

Execution Phase:
- x = 1
- a() invoked → new FEC created
```
#### 🔹 a() Execution Context
```
Memory:
- x → undefined
Execution:
- x = 10
- console.log(x) → 10
```
FEC for `a()` is then **popped off** the call stack.

---

#### 🔹 b() Execution Context
```
Memory:
- x → undefined
Execution:
- x = 100
- console.log(x) → 100
```
FEC for `b()` is popped off after execution.

---

#### 🔹 Back to Global Context
```js
console.log(x); // 1
```
Global `x` is still 1 → prints 1.

---

### 🧠 Scope Isolation Insight:
Each function creates its **own local `x`**, which:
* **Shadows** the global `x` inside its own scope
* Doesn’t affect or overwrite `x` outside the function

---

## 📦 3. Call Stack + Function Contexts

```
Call Stack:
[ b() Execution Context ]        ← after a()
[ a() Execution Context ]        ← after global
[ Global Execution Context ]
```

Each function call gets pushed onto the call stack and popped after it finishes.

---

## ✅ 4. Key Takeaways
* Function calls create **isolated execution contexts** with their own variables.
* Variables like `x` are **function-scoped**, even if named the same.
* Local variables never overwrite global ones.
* Execution is tracked using the **call stack**.

