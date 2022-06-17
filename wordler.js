// create global variable here;
const wordLength = 5;
const gameBoard = document.querySelector("#gameBoard");
const infoBox = document.querySelector("#infoBox");
const wordList = ["super", "light", "actor", "goose", "whale"];
const secretWord = wordList[Math.trunc(Math.random() * wordList.length)];
console.log(secretWord);
let previousLetters = 0;

//merge 5 lettes in one word;
function getGuessWord(keyBoxes, from, to) {
  let guessWord = "";
  for (let i = from; i < to; ++i) {
    guessWord += keyBoxes[i].getAttribute("data-letter");
  }
  return guessWord;
}

// create game board & letter box;
function loadLetterBox() {
  for (let b = 0; b < 30; b++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.textContent = "";
    document.querySelector("#gameBoard").appendChild(box);
  }
}
loadLetterBox();

function loadKeyBoard() {
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "space",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "space",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "«",
  ];
  for (let k = 0; k < 30; k++) {
    const keyElement = document.createElement("button");
    keyElement.textContent = keys[k];
    keyElement.dataset.key = keys[k];
    keyElement.classList.add("key");
    keyboard.append(keyElement);
  }
}
loadKeyBoard();
// Build functions to handle key press;
startPress();

function startPress() {
  document.addEventListener("keyup", inputLetters);
  document.addEventListener("click", clickLetters);
}

function removePress() {
  document.removeEventListener("keyup", inputLetters);
  document.removeEventListener("click", clickLetters);
}

function getActiveBoxes() {
  return gameBoard.querySelectorAll('[data-state="active"]');
}

function enterTrigger() {
  const keyBoxes = getActiveBoxes();
  const allLetterLength = keyBoxes.length;
  if (allLetterLength === 0 || allLetterLength % wordLength !== 0) {
    infoBox.textContent = "Not enough letters";
    return;
  }
  const guessWord = getGuessWord(keyBoxes, 0, 5);
  if (!wordList.includes(guessWord)) {
    infoBox.textContent = "Not in word list";
  }
  if (secretWord === guessWord) {
    infoBox.textContent = " 💥 Congrats! ✅ " + secretWord;
    document.querySelector("body").style.backgroundColor = "#d8d227";
    removePress();
  }
  const remainBoxes = gameBoard.querySelectorAll(":not([data-letter])");
  if (remainBoxes.length === 0) {
    infoBox.textContent = "👿 " + secretWord + " 👉 Try again?";
    removePress();
  }
  checkLetter(guessWord);
}

function clickLetters(e) {
  if (e.target.matches("[data-key='ENTER']")) {
    enterTrigger();
    return;
  }

  if (e.target.matches("[data-key='«']")) {
    deleteKey();
    return;
  }
  if (e.target.matches("[data-key]")) {
    const keyBoxes = getActiveBoxes();
    if (keyBoxes.length - previousLetters >= wordLength) {
      return;
    }
    const keyBox = gameBoard.querySelector(":not([data-letter])");
    keyBox.dataset.letter = e.target.dataset.key.toLowerCase();
    keyBox.textContent = e.target.dataset.key;
    keyBox.dataset.state = "active";
    return;
  }
}

function inputLetters(e) {
  // enter to match;
  if (e.key === "Enter") {
    enterTrigger();
  }
  // delete mistake letters;
  else if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }
  // limit type keyA-Z;
  else if (e.key.match(/^[a-zA-Z]$/)) {
    const keyBoxes = getActiveBoxes();
    if (keyBoxes.length - previousLetters >= wordLength) {
      return;
    }
    const keyBox = gameBoard.querySelector(":not([data-letter])");
    keyBox.dataset.letter = e.key.toLowerCase();
    keyBox.textContent = e.key;
    keyBox.dataset.state = "active";
    return;
  }
}

function deleteKey() {
  const keyBoxes = getActiveBoxes();
  const lastBox = keyBoxes[keyBoxes.length - 1];
  if (lastBox == null) {
    return;
  } else {
    lastBox.textContent = "";
    delete lastBox.dataset.state;
    delete lastBox.dataset.letter;
  }
}
function checkLetter(guessWord) {
  const keyBoxes = getActiveBoxes();
  for (let i = 0; i < 5; i++) {
    const keyBox = keyBoxes[i];
    if (secretWord[i] === guessWord[i]) {
      //console.log(secretWord[i]);
      keyBox.dataset.state = "correct";
      keyBox.classList.add("correct");
    } else if (secretWord.includes(guessWord[i])) {
      keyBox.dataset.state = "wrong-location";
      keyBox.classList.add("wrong-location");
    } else {
      keyBox.dataset.state = "wrong";
      keyBox.classList.add("wrong");
    }
  }
}
//create play again button;
//create score: "", & highest score: "";
//options create keybox animation & sound effects
