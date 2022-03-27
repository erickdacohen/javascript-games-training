const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const boardWidth = 560;
const boardHeight = 300;
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
const ballStart = [270, 40];
const ballDiameter = 20;
let ballCurrentPosition = ballStart;
let currentPosition = userStart;
let timerId;
let xDir = 2;
let yDir = 2;
let score = 0;

// Create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// all blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// draw block
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks();

// add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// draw user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px';
}

// draw ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;

    case 'ArrowRight':
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// move the ball
function moveBall() {
  ballCurrentPosition[0] += xDir;
  ballCurrentPosition[1] += yDir;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 20);

// check for collisions
function checkForCollisions() {
  //  check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      //   check for win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'You Win!';
        clearInterval(timerId);
        document.removeEventListener('keydown', moveUser);
      }
    }
  }
  // check for wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //   check for user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    // check for game over
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'you lose :(';
    document.removeEventListener('keydown', moveUser);
  }
}

function changeDirection() {
  if (xDir === 2 && yDir === 2) {
    yDir = -2;
    return;
  }
  if (xDir === 2 && yDir === -2) {
    xDir = -2;
    return;
  }
  if (xDir === -2 && yDir === -2) {
    yDir = 2;
    return;
  }
  if (xDir === -2 && yDir === 2) {
    xDir = 2;
    return;
  }
}
