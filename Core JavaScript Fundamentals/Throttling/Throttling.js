function expensive() {
  console.log("expensive Function...");
}
const betterExpensive = throttle(expensive, 300);

window.addEventListener("resize", betterExpensive);

function throttle(func, limit) {
  let flag = true;

  return function () {
    let context = this,
      args = arguments;
    if (flag) {
      flag = false;
      func.apply(context, args);
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}
