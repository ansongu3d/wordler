<!-- README.md is generated from README.Rmd. Please edit that file -->

# wordle

The wordler.js contains code to assist in finding good candidate
words for Wordle.

“Wordle” itself is a guess-a-word puzzle [playable
online](https://ansongu3d.github.io/wordler/).

The game plays like the old ‘mastermind’ board game, but with letters
instead of coloured pins. The gameplay is as follows:

1.  Enter a word as a guess for the hidden target word.
2.  Any letter which are not in the word list are coloured in grey.
3.  Any letters which are within the hidden target word are coloured in
    orange.
4.  Any letters which match exactly the letter in the hidden target word
    are coloured green
5.  Figure out a new candidate word as a guess for the hidden target
    word, and go back to Step 1.

In the following game of Wordle, the first guess was `arise`, the second
was `upper`, and then the third guess really only has one good option
given the constraints revealed so far: `super`. This was the hidden
target word, which means you win the game!

<img src="https://github.com/ansongu3d/wordler/blob/main/GAME.PNG" />

The process of finding good candidate words given letters which have
been seen so far is a good match for word_list. This javascript
aims to help you find these good candidate words.

## Structure

- `Index.html` is game board webpage.
- `style.css` is game interface design style sheet.
- `worldler.js` is the game code javascript file.
