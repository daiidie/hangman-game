/*const fs = require('fs')
const readlineSync = require('readlineSync')
const { randomInt } = require('crypto')
const words = require('./docu.txt')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'guess> '
});

rl.on('line', (line) => {
  checkword(line);
}).on('close', () => {
  process.exit(0);
});

function init() {
  console.log('Welcome to the game of hangman, I am going to give you some empty dashes ' +
    'and you would guess the word in question by typing one letter or space at a time,' + 
    ' well that is before you are hanged! -:)');

}*/

const inquirer = require('inquirer');
const Word = require('./word');
const randomWord = require('random-words');
const chalk = require('chalk');
let bold = chalk.bold;

let toBeGuessed = new Word(randomWord());
// let toBeGuessed = new Word('apple');


function promptGuess(_word) {
    if (_word instanceof Word) {
        if (!_word.gameDone) {
            inquirer.prompt([{
                name: 'guess',
                message: 'Your guess?'
            }]).then(answer => {
                console.log(`${bold(_word.checkGuess(answer.guess))}\nYou have ${_word.lettersLeft} correct guesses left to win\nYou have ${_word.score} wrong guesses left to lose`);
                promptGuess(_word);
            })
    } else console.log(`~   ~   ~   ~   ~   ~   ~   ~   \n${bold(_word.displayWord().replace(/\s/g, ''))} is the correct answer\n~  ~   ~   ~   ~   ~   ~   ~   `);
    }
}

console.log(`${chalk.bold(toBeGuessed.displayWord())}\nYou have ${toBeGuessed.lettersLeft} correct guesses left to win\nYou have ${toBeGuessed.score} wrong guesses left to lose`)
promptGuess(toBeGuessed);