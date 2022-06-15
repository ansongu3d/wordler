// create global variable here;
const wordLength = 5;
const gameBoard = document.querySelector("#gameBoard");
const infoBox = document.querySelector("#infoBox");
const wordList = ["super", "light", "actor", "goose", "whale"];
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(secretWord);
let previousLetters = 0;
let guessWord = "";

//merge 5 lettes in one word;
function getGuessWord(activeBoxes, from, to) {
  // let guessWord = "";
  for (let i = from; i < to; ++i) {
    guessWord += activeBoxes[i].getAttribute("data-letter");
  }
  return guessWord;
}

// create game board & letter box;
function loadLetterBox() {
  for (let boxes = 0; boxes < 30; boxes++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.textContent = "";
    document.querySelector("#gameBoard").appendChild(box);
  }
}

loadLetterBox();

// Build a function to handle key press:
// 1.max letters 5 for one word && press key must be A-Z letter;
// 2."enter" key for sumbit guess word to match secretWord;
// 3."backspace" & "delete" key to remove the wrong type letter;
// 4.letter box change color: ACTIVE: Light Grey, WRONG: Grey, WRONG_LOCATION: yellow, CORRECT: green;
// 5.create infoBox to show hint message: 1."Not Enough Letters", 2."Not In the Wordlist", 3.'Congratations! Matched:"secretword"'

startPress();

function startPress() {
  document.addEventListener("keyup", inputLetters);
}

function getActiveBoxes() {
  return gameBoard.querySelectorAll('[data-state="active"]');
}
function inputLetters(e) {
  // enter to match;
  if (e.key === "Enter") {
    const activeBoxes = getActiveBoxes();
    getGuessWord(activeBoxes, 0, 5);
    previousLetters = activeBoxes.length;
    console.log(guessWord);
    console.log(activeBoxes.length);
    console.log(wordLength);
    if (activeBoxes.length !== wordLength) {
      infoBox.textContent = "Not enough letters";
      checkLetter();
      return;
    } else if (!wordList.includes(guessWord)) {
      infoBox.textContent = "Not in word list";
      checkLetter();
      return;
    } else if (secretWord.match(guessWord)) {
      checkLetter();
      infoBox.textContent = " 🥳 Congrats! ☑️ " + secretWord;
      return;
    }
  }
  // delete mistake letters;
  else if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey();
    return;
  }
  // limit type keyA-Z;
  else if (e.key.match(/^[a-zA-Z]+$/)) {
    const activeBoxes = getActiveBoxes();
    if (activeBoxes.length - previousLetters >= wordLength) {
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

function checkLetter() {
  const keyBoxes = gameBoard.querySelectorAll("[data-letter]");
  //console.log(keyBoxes);

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
