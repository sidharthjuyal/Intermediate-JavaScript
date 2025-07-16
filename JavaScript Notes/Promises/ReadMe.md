# 🔥 Promises in JavaScript 

## 📦 What is a Promise?
> A **Promise** is an object that represents the eventual **completion (or failure)** of an asynchronous operation and its resulting value.
It acts as a **placeholder** for a value that’s not available *yet* but will be resolved in the future.

---

## 🧠 Why Promises?
Before Promises:
* We had **callback hell** 😵 — messy, hard to maintain, deeply nested functions.
* Lack of **readability**, **composability**, and **error handling**.

---

## ✅ Promises Solve:
| Problem                         | Promise Solution                        |
| ------------------------------- | --------------------------------------- |
| Inversion of control            | You decide when `.then()` runs, not API |
| Callback hell (pyramid of doom) | Promises allow clean chaining           |
| No error propagation            | Promises use `.catch()` for error flow  |

---

## 🧪 Promise Lifecycle
```js
const promise = new Promise((resolve, reject) => {
  // async task
  if (success) {
    resolve(data); // fulfilled
  } else {
    reject(error);  // rejected
  }
});
```
**States:**
* 🕒 *Pending* — initial state
* ✅ *Fulfilled* — `resolve()` was called
* ❌ *Rejected* — `reject()` was called
* 🔒 *Settled* — either fulfilled or rejected

---

## 🧬 Consuming Promises
```js
promise
  .then((data) => {
    // handle success
  })
  .catch((err) => {
    // handle error
  })
  .finally(() => {
    // always runs
  });
```
* `.then()` — handles **success**
* `.catch()` — handles **failure**
* `.finally()` — always runs (cleanup)

---

## 🔗 Promise Chaining
```js
doSomething()
  .then(result => doNext(result))
  .then(nextResult => finalStep(nextResult))
  .catch(err => handleError(err));
```
* Each `.then()` returns a **new promise**.
* Allows linear, readable async flows.

---

## ⚠️ Common Gotcha
If you **return nothing** in a `.then()`, the next `.then()` gets `undefined`.
```js
fetchData()
  .then(res => {
    console.log(res);
    // no return here → next .then gets undefined
  })
  .then(data => console.log(data)); // undefined
```

---

## 🔁 One-Time Use
Once a Promise is settled (resolved or rejected), its state is **immutable**.
```js
const p = new Promise((res, rej) => {
  res("done");
  rej("fail"); // ignored
});
```

---

## 🧪 Real Example
```js
const cart = ["shoes", "pants"];
createOrder(cart)
  .then(orderId => proceedToPayment(orderId))
  .then(paymentInfo => showOrderSummary(paymentInfo))
  .catch(err => handleError(err));
```
✅ **Each function returns a promise**
✅ **Clean flow from creation → payment → summary**

---

## 💣 Problem Without Promises
```js
createOrder(cart, function(orderId) {
  proceedToPayment(orderId, function(paymentInfo) {
    showOrderSummary(paymentInfo);
  });
});
```
### ⚠️ Inversion of Control:
* You're handing over control to the API.
* If `createOrder` internally calls the callback multiple times, or with the wrong data — you're **screwed**.
* Promises let **you control the chain**.

---

## 🧠 Takeaways
* Promises are **contracts**: “I’ll give you a result later.”
* They bring back **control, predictability, and composability**.
* Don’t just consume them — **understand how they’re structured**.

---

## Promise Practice
```js
console.clear();

let cart = ["shoes", "pants"];
// let cart = [];

createOrder(cart)
  .then( orderId => proceedToPayment(orderId))
  .then( paymentInfo => showOrderSummary(paymentInfo))
  .then(orderSummary => updateWallet(orderSummary))
  .then(walletBalance => console.log(walletBalance))
  .catch(error => console.log(error))

function validateCart(cart) {
  if (cart.length) return true;
  return false;
}

function createOrder(cart) {
  let pr = new Promise((resolve, reject) => {
    if (!validateCart(cart)) {
      let err = new Error("your cart is empty!");
      reject(err);
    }
    const orderId = "12345";
    if (orderId) {
      setTimeout( () => {
        resolve(orderId);
      }, 2000);
    }
  });
  return pr;
}

function proceedToPayment(orderId) {
  console.log(orderId);
  let pr = new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve("Payment is Successful!");
    }, 4000);
    // reject("Payment Failed!");
  });
  return pr;
}

function showOrderSummary(paymentInfo) {
  console.log(paymentInfo);
  let pr = new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve("Order Summary");
    }, 1000);
  });
  return pr;
}

function updateWallet(orderSummary) {
  console.log(orderSummary);
  let pr = new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve("Balance = 2 Billin Dollars.");
    }, 1000);
  });
  return pr;
}
```

