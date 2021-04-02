class Letter {
  constructor(_letter) {
      this.letter = _letter;
      this.guessed = false;
  }

  checkGuess(guess) {
      if (guess === this.letter) this.guessed = true;
      else this.guessed = this.guessed;
  }
}

module.exports = Letter;