# 🌟 Creating Promises, Chaining & Error Handling

## 1️⃣ Use Case: E-commerce Checkout Flow
- You have a `cart = ['shoes', 'pants', 'kurta']`.
- Goal:  
  1. Validate cart  
  2. Create order → get `orderId`  
  3. Proceed to payment → get `paymentInfo`  
  4. Handle errors cleanly along the way

---

## 2️⃣ Producer: Defining `createOrder(cart)`
```js
function createOrder(cart) {
  return new Promise((resolve, reject) => {
    if (!validateCart(cart)) {
      reject(new Error("Cart is not valid")); // error path
    }
    const orderId = '12345';
    resolve(orderId); // success path
  });
}
````
* Uses `new Promise((resolve, reject) => { ... })`
* Calls `resolve()` or `reject()` only once, ensuring predictable behavior

---

## 3️⃣ Consumer: Handling the Promise
```js
createOrder(cart)
  .then(orderId => proceedToPayment(orderId))
  .then(paymentInfo => console.log(paymentInfo))
  .catch(err => console.error("Error:", err));
```
* `.then()` receives resolved value
* `.catch()` handles any rejection in the chain

---

## 4️⃣ Flat Chaining vs. Nesting
* ✅ Correct (flat, returns promise in each `.then()`):
  ```js
  createOrder(cart)
    .then(orderId => {
      return proceedToPayment(orderId);
    })
    .then(paymentInfo => {
      console.log(paymentInfo);
    })
    .catch(err => console.error(err));
  ```
  Each `.then()` returns a new promise; the next `.then()` waits for it
* ❌ Wrong (chaining without `return` = breaks flow):
  ```js
  .then(orderId => {
    proceedToPayment(orderId);
  })
  ```
  Without `return`, `paymentInfo` in next `.then()` becomes `undefined`

---

## 5️⃣ Advanced: Multiple `.catch()` Positions
```js
createOrder(cart)
  .then(orderId => {
    return proceedToPayment(orderId);
  })
  .catch(err => {
    console.warn("Payment failed, but continue:", err);
  })
  .then(() => {
    // Continues even if payment failed
    return showOrderSummary();
  })
  .catch(err => console.error("Fatal error:", err));
```
* Placing `.catch()` mid-chain **handles certain errors locally**, and the chain continues
* Good for partial error recovery (e.g., payment failed, but still show summary)

---

## ✅ (Bonus Insight)
1. **Promises fix Inversion of Control** – unlike callbacks, handing `.then()` keeps control in *your* hands
2. **Flat structure = readable + maintainable**
3. **Return every promise in `.then()`** – essential for proper chaining
4. **Catch placement matters**:
   * A single `.catch()` at end captures *all errors*
   * Mid-chain `.catch()` allows *partial recovery and continued flow*

---

## 🔑 Key Takeaways
* Always **create** promises using `new Promise(...)`
* Always **return inside `.then()`** when chaining to preserve chain
* Use **.catch() smartly** — at the end for fatal errors, or mid-chain to recover
* Promise chains are powerful tools to serialize async steps clearly
