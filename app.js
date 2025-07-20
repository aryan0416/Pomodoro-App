const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
const message = document.querySelector('.app-message');

let myInterval;
let state = true;
let paused = false;
let totalSeconds;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    message.textContent = 'Session Running...';
    state = false;
    paused = false;
    totalSeconds = sessionAmount * 60;
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

const updateSeconds = () => {
  if (!paused) {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
      bells.play();
      message.textContent = 'Session Complete!';
      clearInterval(myInterval);
      state = true;
    }
  }
};

const pauseTimer = () => {
  if (!state) {
    paused = !paused;
    message.textContent = paused ? 'Paused' : 'Session Running...';
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  paused = false;
  session.textContent = '25';
  document.querySelector('.seconds').textContent = '00';
  message.textContent = 'Press start to begin';
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
