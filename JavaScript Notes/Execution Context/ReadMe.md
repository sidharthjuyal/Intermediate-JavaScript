# 📘 How JavaScript Works & Execution Context

## 🔍 1. What is Execution Context?
Everything in JavaScript runs inside an **Execution Context**, which acts like a container where code executes.
Two main parts:
- **Memory Component** *(Variable Environment)*  
  Stores variables & function declarations as key-value pairs.
- **Code Component** *(Thread of Execution)*  
  Executes code sequentially, one line at a time.

---

## 🧠 2. JavaScript is Single-Threaded and Synchronous
- **Single-threaded** → only one command runs at a time  
- **Synchronous** → executes in order, line-by-line  
You cannot move to the next line until the current one finishes.

---

### 🎯 Why this matters
Understanding execution context helps you grasp:
- How variables and functions are stored and managed
- Why JavaScript is synchronous by default
- The groundwork for deeper concepts like hoisting, scope, closures, and the event loop
- 
