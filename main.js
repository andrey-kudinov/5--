import { data } from './5-letter-words.js';

const init = () => {
  const inputsKnowing = document.querySelectorAll('.letters--knowing input');
  const inputUnknowing = document.querySelector('.letters--unknowing input');

  const showResults = (e) => {
    e.preventDefault();

    const firstLetter = inputsKnowing[0].value.toLowerCase();
    const secondLetter = inputsKnowing[1].value.toLowerCase();
    const thirdLetter = inputsKnowing[2].value.toLowerCase();
    const fourthLetter = inputsKnowing[3].value.toLowerCase();
    const fifthLetter = inputsKnowing[4].value.toLowerCase();
    const letters = inputUnknowing.value.toLowerCase();

    const result = [];

    data.forEach(word => {
      let isValid = true;

      if (firstLetter) isValid = isValid && word[0] === firstLetter;
      if (secondLetter) isValid = isValid && word[1] === secondLetter;
      if (thirdLetter) isValid = isValid && word[2] === thirdLetter;
      if (fourthLetter) isValid = isValid && word[3] === fourthLetter;
      if (fifthLetter) isValid = isValid && word[4] === fifthLetter;
  
      letters.split('').forEach(letter => {
        isValid = isValid && word.includes(letter);
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

  const button = document.querySelector('button');
  button.addEventListener('click', showResults);
};

document.addEventListener('DOMContentLoaded', init);
