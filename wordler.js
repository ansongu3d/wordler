const height = 6;
const width = 5;

function loadLetterBox() {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let box = document.createElement("div");
      box.id = row.toString() + "-" + col.toString();
      box.classList.add("box");
      box.innerHTML = "";
      document.querySelector("#gameBoard").appendChild(box);
    }
  }
}
loadLetterBox();
