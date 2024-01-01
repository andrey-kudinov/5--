import { data } from './5-letter-words.js';

const init = () => {
  const inputsCorrect = document.querySelectorAll('.letters--correct input');
  const inputIncludes = document.querySelector('.letters--includes input');
  const inputIncorrect = document.querySelector('.letters--incorrect input');

  const showResults = e => {
    e.preventDefault();

    const firstLetter = inputsCorrect[0].value.toLowerCase();
    const secondLetter = inputsCorrect[1].value.toLowerCase();
    const thirdLetter = inputsCorrect[2].value.toLowerCase();
    const fourthLetter = inputsCorrect[3].value.toLowerCase();
    const fifthLetter = inputsCorrect[4].value.toLowerCase();
    const includeLetters = inputIncludes.value.toLowerCase();
    const incorrectLetters = inputIncorrect.value.toLowerCase();

    const result = [];

    data.forEach(word => {
      let isValid = true;

      if (firstLetter) isValid = isValid && word[0] === firstLetter;
      if (secondLetter) isValid = isValid && word[1] === secondLetter;
      if (thirdLetter) isValid = isValid && word[2] === thirdLetter;
      if (fourthLetter) isValid = isValid && word[3] === fourthLetter;
      if (fifthLetter) isValid = isValid && word[4] === fifthLetter;

      includeLetters.split('').forEach(letter => {
        isValid = isValid && word.includes(letter);
      });

      incorrectLetters.split('').forEach(letter => {
        isValid = isValid && !word.includes(letter);
      });

      if (isValid) {
        result.push(word);
      }
    });

    const resultContainer = document.querySelector('.result');

    if (result.length === 0) {
      resultContainer.textContent = 'поиск не дал результатов';
      return;
    }

    resultContainer.textContent = result.join(', ');
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', showResults);
};

document.addEventListener('DOMContentLoaded', init);
