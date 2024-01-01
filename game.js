import { data } from './5-letter-words.js';

const getRandomWord = () => data[Math.floor(Math.random() * data.length)];

if (!localStorage.word) {
  localStorage.word = getRandomWord();
}

if (!localStorage.step) {
  localStorage.step = 0;
}

const fieldsets = document.querySelectorAll('fieldset');

const initReset = () => {
  const form = document.querySelector('form');
  const button = document.querySelector('.reset');
  button.addEventListener('click', e => {
    e.preventDefault();
    localStorage.word = getRandomWord();
    addDisabled(localStorage.step);
    localStorage.step = 0;
    removeDisabled(localStorage.step);
    localStorage.removeItem('values');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.classList.remove('correct', 'incorrect', 'includes');
      input.value = '';
    });
    form.reset();
  });
};

const addDisabled = index => {
  const currentInputs = fieldsets[index].querySelectorAll('input');
  currentInputs.forEach(input => (input.disabled = true));
};

const removeDisabled = index => {
  const nextInputs = fieldsets[index].querySelectorAll('input');
  nextInputs.forEach(input => (input.disabled = false));
};

const handleFormSubmit = e => {
  e.preventDefault();

  const inputs = fieldsets[localStorage.step].querySelectorAll('input');
  const inputValues = Array.from(inputs).map(input => input.value);

  const letters = localStorage.word.split('');
  letters.forEach((letter, index) => {
    if (letters.includes(inputs[index].value)) {
      inputs[index].classList.add('includes');
    }
  
    if (inputs[index].value === letter) {
      inputs[index].classList.add('correct');
    } else {
      inputs[index].classList.add('incorrect');
    }
  });

  localStorage.values = JSON.stringify({
    ...JSON.parse(localStorage.values ?? '{}'),
    [localStorage.step]: inputValues
  });

  addDisabled(localStorage.step);
  localStorage.step++
  removeDisabled(localStorage.step);
};

const init = () => {
  const fieldsets = document.querySelectorAll('fieldset');
  const inputs = document.querySelectorAll('input');
  const form = document.querySelector('form');
  const isInitValues = Boolean(localStorage.values);

  fieldsets.forEach((fieldset, index) => {
    if (index > localStorage.step - 1) return;

    const inputs = fieldsets[index].querySelectorAll('input');
    inputs.forEach((input, i) => {
      input.disabled = true;
      if (!isInitValues) return;
      const values = JSON.parse(localStorage.values)?.[index] ?? [];
      input.value = values[i] ?? '';

      const letters = localStorage.word.split('');
      
      if (letters.includes(input.value)) {
        input.classList.add('includes');
      }
      if (letters[i] === input.value) {
        input.classList.add('correct');
      } else {
        input.classList.add('incorrect');
      }
    });
  });

  if (isInitValues) {
    removeDisabled(Number(localStorage.step));
  }

  form.addEventListener('submit', handleFormSubmit);
  initReset();
};

document.addEventListener('DOMContentLoaded', init);
