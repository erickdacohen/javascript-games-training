const cardArray = [
  {
    name: 'fries',
    img: 'imgs/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'imgs/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'imgs/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'imgs/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'imgs/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'imgs/pizza.png',
  },
  {
    name: 'fries',
    img: 'imgs/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'imgs/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'imgs/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'imgs/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'imgs/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'imgs/pizza.png',
  },
];

// Shuffle cards in random order
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
// const restartButton = querySelector('#restart');

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'imgs/blank.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    gridDisplay.append(card);
  }
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll('#grid img');
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  //   Alert if clicked on the same card
  if (optionOneId == optionTwoId) {
    alert('You clicked on the same card...');
    cards[optionOneId].setAttribute('src', 'imgs/blank.png');
    cards[optionTwoId].setAttribute('src', 'imgs/blank.png');
  }

  if (cardsChosen[0] == cardsChosen[1]) {
    cards[optionOneId].setAttribute('src', 'imgs/white.png');
    cards[optionTwoId].setAttribute('src', 'imgs/white.png');
    // remove event listener for clicks
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute('src', 'imgs/blank.png');
    cards[optionTwoId].setAttribute('src', 'imgs/blank.png');
  }

  resultDisplay.textContent = cardsWon.length;

  cardsChosen = [];
  cardsChosenIds = [];

  // Check to see if player won!
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.innerHTML = 'Congratulations! You win!!';
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id');
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute('src', cardArray[cardId].img);
  // check if match
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

document.getElementById('restart').addEventListener('click', () => {
  location.reload();
});
