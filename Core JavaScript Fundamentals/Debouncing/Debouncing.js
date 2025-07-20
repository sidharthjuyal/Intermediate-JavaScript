let counter = 0;
function getData() {
  console.log("Fetching Data...", counter++);
  console.log(this);
  console.log(arguments);
};

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
betterFunction.call({ custom: "object" }, "Sid");