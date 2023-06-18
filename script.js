const submitButton = document.getElementById("generateArray");
const form = document.getElementById("sort-form");
const root = document.getElementById("root");

const createElement = (type) => {
  return document.createElement(type);
};

const appendChild = (parent, child) => {
  parent.appendChild(child);
};

const clearRoot = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
};

const createBars = (array) => {
  clearRoot();
  for (let i = 0; i < array.length; i++) {
    const barHeight = (array[i] / Math.max(...array)) * 200;
    const div = createElement("div");
    div.classList.add("bar");
    div.style.height = barHeight + "px";
    root.appendChild(div);
  }
};

const highlightBar = (index) => {
  const bar = root.children;
  bar[index].classList.add("highlight");
  bar[index + 1].classList.add("highlight");
};

const swapBars = (index1, index2) => {
  const bars = root.children;
  const tempHeight = bars[index1].style.height;
  bars[index1].style.height = bars[index2].style.height;
  bars[index2].style.height = tempHeight;
};

const resetBars = (index) => {
  const bars = root.children;
  bars[index].classList.remove("highlight");
  bars[index + 1].classList.remove("highlight");
};

const generateArray = (len) => {
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push(Math.floor(Math.random() * 16) + 5);
  }
  return array;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const BubbleSort = async (array) => {
  for (let i = 0; i < array.length; i++) {
    let isSwapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      highlightBar(j);
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSwapped = true;
        swapBars(j, j + 1);
      }
      await sleep(500);
      resetBars(j);
    }
    if (!isSwapped) {
      break;
    }
  }
};

const implementation = {
  BubbleSort: BubbleSort,
};

const sortingAlgorithm = (array, algo) => {
  implementation[algo](array);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const arrayLength = parseInt(document.getElementById("arrayLength").value);
  const algo = document.getElementById("sortingAlgorithm").value;
  const array = generateArray(arrayLength);
  createBars(array);
  sortingAlgorithm(array, algo);
  form.reset();
});
