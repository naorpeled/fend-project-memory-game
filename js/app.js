const allCards = ['fa-diamond', 'fa-diamond',
                  'fa-paper-plane-o', 'fa-paper-plane-o',
                  'fa-anchor', 'fa-anchor',
                  'fa-bolt', 'fa-bolt',
                  'fa-bomb', 'fa-bomb',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bicycle', 'fa-bicycle'];
let openedCards = [];
let pairsLeft = 8;

// Display card HTML function
function displayCards(cardArray){
	shuffle(cardArray);
	const deck = document.querySelector('ul.deck');
    for(const card of cardArray){
        const cardElement = document.createElement('li');
		cardElement.classList.add('card', 'show', 'open');
        cardElement.innerHTML = '<i class="fa '+card+'"></i>';
		deck.appendChild(cardElement);
	}
	const cards = document.querySelectorAll('.card');
	for(const card of cards) {
		setTimeout(function(){ 
			card.classList.remove('show', 'open');
		},600);
	};
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// Game init function
function startGame(){
	displayCards(allCards);
	const cards = document.querySelectorAll('.card');
	for(const card of cards) {
		card.addEventListener('click', function(e){
			if(!card.classList.contains('open', 'show')) {

				if(openedCards.length < 2){
					openedCards.push(card);
					card.classList.add('open', 'show');	
					if(openedCards.length == 2){
                        const firstCard = openedCards[0];
                        const secondCard = openedCards[1];	
						openedCards = [];							
						if(firstCard.innerHTML == secondCard.innerHTML)
						{
							firstCard.classList.add('match');	
							secondCard.classList.add('match');
						}else{
                            setTimeout(function(){ 
								firstCard.classList.remove('open','show');	
								secondCard.classList.remove('open', 'show');
							}, 500);
						}
					}
				}else{

				}
			}
		});
	};
}


startGame();