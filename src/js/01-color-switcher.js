const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.buttonStart.addEventListener('click', startColorSwitcher);
refs.buttonStop.addEventListener('click', stopColorSwitcher);

function startColorSwitcher() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
  }, 1000);
}

function stopColorSwitcher() {
  clearInterval(timerId);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}
