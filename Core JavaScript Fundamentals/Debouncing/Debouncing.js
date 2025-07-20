let counter = 0;
const getData = () => {
  console.log("Fetching Data...", counter++);
};

const debounceFunction = function (fn, delay) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, arguments);
    }, delay);
  };
};

const betterFunction = debounceFunction(getData, 300);
