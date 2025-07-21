// Example 1 : JS
// document.getElementById("category").addEventListener("click", (e) => {
//   console.log(e.target.id);
//   if (e.target.tagName == "LI") {
//     window.location.href = "/" + e.target.id;
//   }
// });

// Example 2: JS
document.getElementById("category").addEventListener("keyup", (e) => {
  console.log(e);
  if (e.target.dataset.uppercase != undefined) {
    e.target.value = e.target.value.toUpperCase();
  }
});