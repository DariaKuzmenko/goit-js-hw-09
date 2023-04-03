import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
};

const clockFace = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.buttonStart.disabled = true;
      return;
    }
    refs.buttonStart.disabled = false;
  },
};

flatpickr(refs.dateInput, options);

let selectedDate = null;

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    refs.buttonStart.disabled = true;
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const deltaTime = selectedDate - Date.now();
      updateClockFace(convertMs(deltaTime));
      timerFinished(deltaTime, this.intervalId);
    }, 1000);
  },
};

refs.buttonStart.addEventListener('click', onTimerStart);

function onTimerStart() {
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  clockFace.days.textContent = addLeadingZero(days);
  clockFace.hours.textContent = addLeadingZero(hours);
  clockFace.minutes.textContent = addLeadingZero(minutes);
  clockFace.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerFinished(deltaTime, intervalId) {
  if (deltaTime < 1000) {
    clearInterval(intervalId);
    Notify.success('Timer expired!');
    refs.buttonStart.disabled = false;
    refs.dateInput.disabled = false;
    timer.isActive = false;
  }
}
