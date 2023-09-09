const submitButton = document.getElementById("generateArray");
const form = document.getElementById("sort-form");
const root = document.getElementById("root");
let isSorting = false;

let sortOrder = "asc";

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

const highlightBar = (...index) => {
  const bars = root.children;
  for (let i of index) {
    bars[i].classList.add("highlight");
  }
};

const swapBars = (index1, index2) => {
  const bars = root.children;
  const tempHeight = bars[index1].style.height;
  bars[index1].style.height = bars[index2].style.height;
  bars[index2].style.height = tempHeight;
};

const inheritBarProperty = (parent, child) => {
  const bars = root.children;
  bars[child].style.height = bars[parent].style.height;
};

const calculateBarHeight = (array, key) => {
  return (key / Math.max(...array)) * 200;
};

const updateBarProperty = (index, value) => {
  const bars = root.children;
  bars[index].style.height = value + "px";
};

const resetBars = (...index) => {
  const bars = root.children;
  for (let i of index) {
    bars[i].classList.remove("highlight");
  }
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

const ascendingCompression = (a, b) => a > b;
const descendingCompression = (a, b) => a < b;

const Compression = (a, b) =>
  sortOrder === "asc"
    ? ascendingCompression(a, b)
    : descendingCompression(a, b);

const BubbleSort = async (array) => {
  for (let i = 0; i < array.length; i++) {
    let isSwapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      highlightBar(j, j + 1);
      if (Compression(array[j], array[j + 1])) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSwapped = true;
        swapBars(j, j + 1);
      }
      await sleep(500);
      resetBars(j, j + 1);
    }
    if (!isSwapped) {
      break;
    }
  }
  isSorting = false;
  submitButton.disabled = false;
};

const SelectionSort = async (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      highlightBar(i, j);
      if (Compression(array[i], array[j])) {
        const temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        swapBars(i, j);
      }
      await sleep(500);
      resetBars(i, j);
    }
  }
  isSorting = false;
  submitButton.disabled = false;
};

const InsertionSort = async (array) => {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    highlightBar(i);
    while (j >= 0 && Compression(array[j], key)) {
      array[j + 1] = array[j];
      highlightBar(j + 1);
      inheritBarProperty(j, j + 1);
      await sleep(500);
      resetBars(j + 1);
      highlightBar(i);
      j = j - 1;
    }
    array[j + 1] = key;
    const value = calculateBarHeight(array, key);
    highlightBar(j + 1);
    updateBarProperty(j + 1, value);
    await sleep(500);
    resetBars(i, j + 1);
  }
  isSorting = false;
  submitButton.disabled = false;
};

const implementation = {
  BubbleSort: BubbleSort,
  SelectionSort: SelectionSort,
  InsertionSort: InsertionSort,
};

const sortingAlgorithm = (array, algo) => {
  implementation[algo](array);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isSorting) {
    isSorting = true;
    submitButton.disabled = true;
    clearRoot();
    const arrayLength = parseInt(document.getElementById("arrayLength").value);
    const algo = document.getElementById("sortingAlgorithm").value;
    sortOrder = document.getElementById("sortOrder").value;
    const array = generateArray(arrayLength);
    createBars(array);
    sortingAlgorithm(array, algo);
  }
});
