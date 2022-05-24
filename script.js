let currentColor = "#333333";
let currentSize = 8;
let currentMode = "colorFill";
let slider = document.querySelector("#Size");
slider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.querySelector(".clear").addEventListener("click", clear);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

document.querySelector(".eraser").onclick = () => setMode("eraser");
document.querySelector(".colorPicker").oninput = (e) =>
  setColor(e.target.value);
document.querySelector(".colorfill").onclick = () => setMode("colorFill");
document.querySelector(".rainbow").onclick = () => setMode("rainbow");
let grid = document.querySelector(".canvas");

function clear() {
  document.querySelector(".canvas").innerHTML = "";
  createCanvas(currentSize);
}

function setColor(color) {
  currentColor = color;
}

function setSize(size) {
  currentSize = size;
}

function setMode(mode) {
  currentMode = mode;
}

function changeSize(value) {
  setSize(value);
  document.querySelector("#sizeValue").innerHTML = `${value}x${value}`;
  clear();
}

function childGen(sizepx) {
  let child = document.createElement("div");
  child.classList.add("box");
  child.style.width = `${sizepx}px`;
  child.style.height = `${sizepx}px`;
  return child;
}

function createCanvas(size) {
  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
    for (let j = 0; j < size; j++) {
      row.appendChild(childGen(grid.clientWidth / size));
      row.addEventListener("mouseover", paint);
      row.addEventListener("mousedown", paint);
    }
  }
}
function paint(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
  if (currentMode === "rainbow") {
    let rng = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = "#" + rng;
  } else if (currentMode === "colorFill") {
    e.target.style.backgroundColor = currentColor;
  }
}

createCanvas(currentSize);
