import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', handleSubmit);

function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function handleSubmit(event) {
  event.preventDefault();
  const amount = Number(refs.amountInput.value);
  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);

  setTimeout(() => {
    for (let index = 1; index <= amount; index += 1) {
      createPromise(index, delay).then(onSucces).catch(onError);
      delay += step;
    }
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
