const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause-btn');
const resetBtn = document.querySelector('#reset');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
let timerId;
let outcomeTimerId;
let currentTime = 10;
let currentIndex = 76;
const gridWidth = 9;

function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % gridWidth !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % gridWidth < gridWidth - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - gridWidth > 0) currentIndex -= gridWidth;
      break;
    case 'ArrowDown':
      if (currentIndex + gridWidth < gridWidth ** 2) currentIndex += gridWidth;
      break;
  }
  squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach((log) => moveLogLeft(log));
  logsRight.forEach((log) => moveLogRight(log));
  carsLeft.forEach((car) => moveCarLeft(car));
  carsRight.forEach((car) => moveCarRight(car));
}

function checkOutcomes() {
  lose();
  win();
}

function moveLogLeft(log) {
  switch (true) {
    case log.classList.contains('l1'):
      log.classList.remove('l1');
      log.classList.add('l2');
      break;
    case log.classList.contains('l2'):
      log.classList.remove('l2');
      log.classList.add('l3');
      break;
    case log.classList.contains('l3'):
      log.classList.remove('l3');
      log.classList.add('l4');
      break;
    case log.classList.contains('l4'):
      log.classList.remove('l4');
      log.classList.add('l5');
      break;
    case log.classList.contains('l5'):
      log.classList.remove('l5');
      log.classList.add('l1');
      break;
  }
}

function moveLogRight(log) {
  switch (true) {
    case log.classList.contains('l1'):
      log.classList.remove('l1');
      log.classList.add('l5');
      break;
    case log.classList.contains('l2'):
      log.classList.remove('l2');
      log.classList.add('l1');
      break;
    case log.classList.contains('l3'):
      log.classList.remove('l3');
      log.classList.add('l2');
      break;
    case log.classList.contains('l4'):
      log.classList.remove('l4');
      log.classList.add('l3');
      break;
    case log.classList.contains('l5'):
      log.classList.remove('l5');
      log.classList.add('l4');
      break;
  }
}

function moveCarLeft(car) {
  switch (true) {
    case car.classList.contains('c1'):
      car.classList.remove('c1');
      car.classList.add('c2');
      break;
    case car.classList.contains('c2'):
      car.classList.remove('c2');
      car.classList.add('c3');
      break;
    case car.classList.contains('c3'):
      car.classList.remove('c3');
      car.classList.add('c1');
      break;
  }
}

function moveCarRight(car) {
  switch (true) {
    case car.classList.contains('c1'):
      car.classList.remove('c1');
      car.classList.add('c3');
      break;
    case car.classList.contains('c2'):
      car.classList.remove('c2');
      car.classList.add('c1');
      break;
    case car.classList.contains('c3'):
      car.classList.remove('c3');
      car.classList.add('c2');
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = 'You lose :(';
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove('frog');
    document.removeEventListener('keyup', moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains('ending-block')) {
    resultDisplay.textContent = 'You Win!!!';
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener('keyup', moveFrog);
  }
}

startPauseBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    timerId = null;
    outcomeTimerId = null;
    document.removeEventListener('keyup', moveFrog);
  } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 30);
    document.addEventListener('keyup', moveFrog);
  }
});

resetBtn.addEventListener('click', () => {
  location.reload();
});
