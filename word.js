const Letter = require("./letter");
const chalk = require("chalk");
const hangmanPics = require("./hangmanPics")
let win = chalk.green;
let lose = chalk.red;
let warning = chalk.blue;

class Word {
  constructor(_word) {
    this.characters = this.parseWord(_word);
    this.gameDone = this.wholeWordGuessed();
    this.score = 10;
    this.pastGuesses = [];
    this.lettersLeft = this.characters.length;
  }

  // takes in word string and puts each letter into a new Letter instance
  parseWord(word) {
    let letterArray = [];
    for (const letter of word) {
      letterArray.push(new Letter(letter));
    }
    return letterArray;
  }

  // checks if the whole word has been guessed correctly in order to end the game
  wholeWordGuessed() {
    return this.characters.every(letter => letter.guessed);
  }

  // returns the string of blanks and letters as they are guessed
  displayWord() {
    let toBeDisplayed = "";
    this.lettersLeft = this.characters.length;
    this.characters.forEach(letter => {
      if (letter.guessed) {
        toBeDisplayed += letter.letter + " ";
        this.lettersLeft--;
      } else {
        toBeDisplayed += "_ ";
      }
    });
    if (this.score <= 0) {
      this.gameDone = true;
      let loseWord = "";
      this.characters.forEach(letter => (loseWord += letter.letter));
      return loseWord;
    } else {
      this.gameDone = this.wholeWordGuessed();
      return toBeDisplayed;
    }
  }

  // checks the incoming guesses and then returns the display string
  checkGuess(guess) {
    // if guess has been made before tell the user
    if (this.pastGuesses.includes(guess)) {
      return `${this.displayWord()}\n${warning(
        `You've already guessed that letter`
      )}`;
    } else {
      // boolean for if guess is in word
      let inWord = this.characters.some(l => l.letter == guess);
      // push guess to past guesses array
      this.pastGuesses.push(guess);
      // run checkGuess() method from Letter on each letter
      this.characters.forEach(letter => {
        letter.checkGuess(guess);
      });
      // if the guess isn't in the word lower the score
      if (!inWord) {
        this.score--;
        return `${this.displayWord()}\n${lose(`That's incorrect`)}`;
      } else {
        return `${this.displayWord()}\n${win(`That's correct`)}`;
      }
    }
  }
}

module.exports = Word;