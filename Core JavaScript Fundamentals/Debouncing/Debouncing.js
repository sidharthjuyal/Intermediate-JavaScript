let counter = 0;
const getData = () => {
  console.log("Fetching Data...", counter++);
};

const debounceFunction = function (fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

const betterFunction = debounceFunction(getData, 300);