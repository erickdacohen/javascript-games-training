// define card objects array
const cardObjectDefinitions = [
	{ id: 1, imagePath: './images/card-KingHearts.png' },
	{ id: 2, imagePath: './images/card-JackClubs.png' },
	{ id: 3, imagePath: './images/card-QueenDiamonds.png' },
	{ id: 4, imagePath: './images/card-AceSpades.png' },
]

function createCard(cardItem) {
	// Create div elements needed for a card
	const cardElem = createElement('div')
	const cardInnerElem = createElement('div')
	const cardFrontElem = createElement('div')
	const cardBackElem = createElement('div')

	// Create front and bakc image elements
	const cardFrontImage = createElement('img')
	const cardBackImage = createElement('img')

	// Add class to element
	addClassToElement(cardElem, 'card')
	addIdToElement(cardItem, cardItem.id)
}

function createElement(elemType) {
	return document.createElement(elemType)
}

function addClassToElement(elem, className) {
	elem.classList.add(className)
}

function addIdToElement(elem, id) {
	elem.id = id
}
