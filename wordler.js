// create global variable here;
const height = 6;
const width = 5;
const wordLength = 5;
const gameBoard = document.querySelector("#gameBoard");
const infoBox = document.querySelector("#infoBox");
const wordList = ["super", "light", "actor", "goose", "whale"];
const secretWord = wordList[Math.floor(Math.random() * (wordList.length + 1))];

function getGuessWord(activeBoxes, from, to) {
  let guessWord = "";
  for (let i = from; i < to; ++i) {
    guessWord += activeBoxes[i].getAttribute("data-letter");
  }

  console.log(guessWord);
  return guessWord;
}

// create game board & letter box;
function loadLetterBox() {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.textContent = "";
      document.querySelector("#gameBoard").appendChild(box);
    }
  }
}

loadLetterBox();

// Build a function to handle key press:
// 1.max letters 5 for one word && press key must be A-Z letter;
// 2."enter" key for sumbit guess word to match secretWord;
// 3."backspace" & "delete" key to remove the wrong type letter;
// 4.letter box change color: ACTIVE: Light Grey, WRONG: Grey, WRONG_LOCATION: yellow, CORRECT: green;

startPress();

function startPress() {
  document.addEventListener("keyup", inputLetters);
}

//create infoBox to show hint message: 1."Not Enough Letters", 2."Not In the Wordlist", 3.'Congratations! Matched:"secretword"'

function inputLetters(e) {
  console.log("test", e.key === "Enter", e.key.match(/([a-z])/g));
  if (e.key === "Enter") {
    console.log("test3");
    const activeBoxes = getActiveBoxes();
    console.log(activeBoxes);
    getGuessWord(activeBoxes, 0, 5);

    if (activeBoxes.length !== wordLength) {
      infoBox.textContent = "Not enough letters";
      return;
    }

    if (!wordList.includes(guessWord)) {
      infoBox.textContent = "Not in word list";
      return;
    }
  } else if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  } else if (e.key.match(/([a-z])/g)) {
    console.log("test2");
    const activeBoxes = getActiveBoxes();
    if (activeBoxes.length >= wordLength) {
      return;
    }
    const keyBox = gameBoard.querySelector(":not([data-letter])");
    keyBox.dataset.letter = e.key.toLowerCase();
    keyBox.textContent = e.key;
    keyBox.dataset.state = "active";
    return;
  }
}

function getActiveBoxes() {
  return gameBoard.querySelectorAll('[data-state="active"]');
}

function deleteKey() {
  const activeBoxes = getActiveBoxes();
  const lastBox = activeBoxes[activeBoxes.length - 1];
  if (lastBox == null) {
    return;
  } else {
    lastBox.textContent = "";
    delete lastBox.dataset.state;
    delete lastBox.dataset.letter;
  }
}
//create play again button;
//create score: "", & highest score: "";
//options create keybox animation & sound effects
