import { data } from './5-letter-words.js';

const init = () => {
  const inputsKnowing = document.querySelectorAll('.letters--knowing input');
  const inputUnknowing = document.querySelector('.letters--unknowing input');

  const showResults = (e) => {
    e.preventDefault();

    const firstLetter = inputsKnowing[0].value;
    const secondLetter = inputsKnowing[1].value;
    const thirdLetter = inputsKnowing[2].value;
    const fourthLetter = inputsKnowing[3].value;
    const fifthLetter = inputsKnowing[4].value;
    const letters = inputUnknowing.value;

    const result = [];
    console.log(firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter, letters);

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
    resultContainer.textContent = result.join(', ');
    console.log(result);
  };

  const button = document.querySelector('button');
  button.addEventListener('click', showResults);
};

document.addEventListener('DOMContentLoaded', init);
