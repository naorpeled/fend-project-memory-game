const allCards = ['fa-diamond', 'fa-diamond',
                  'fa-paper-plane-o', 'fa-paper-plane-o',
                  'fa-anchor', 'fa-anchor',
                  'fa-bolt', 'fa-bolt',
                  'fa-bomb', 'fa-bomb',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bicycle', 'fa-bicycle'];
let openedCards = [];
let starElements = [];
let stars = 3;
let pairsLeft = 8;
let moves = 0;
let totalTime =0;
let seconds =0;
let minutes =0;
let gameTimer = setInterval(function() {


  minutes = parseInt(totalTime/60);
  seconds = totalTime % 60;
  if(seconds < 10) {
	 document.querySelector('.gameTime').innerText= `Time - ${minutes} : 0${seconds}`;
  }else{
	    document.querySelector('.gameTime').innerText= `Time - ${minutes} : ${seconds}`;
  }
  totalTime++;
}, 1000);


// Display card HTML function
function displayCards(cardArray){
	openedCards = [];
    pairsLeft = 8;
	moves = 0;
	shuffle(cardArray);
	const deck = document.querySelector('ul.deck');
	deck.innerHTML = "";        		
    const scoreStars = document.querySelector('ul.stars');
    scoreStars.innerHTML = "";
    for(const card of cardArray){
        const cardElement = document.createElement('li');
		cardElement.classList.add('card', 'show', 'open');
        cardElement.innerHTML = '<i class="fa '+card+'"></i>';
		deck.appendChild(cardElement);
	}
	for(let i = 1; i<=3; i++) {
		const starElement = document.createElement('li');
		starElement.innerHTML = '<i class="fa fa-star"></i>';
		starElements.push(starElement);
        scoreStars.appendChild(starElement);
	};
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


function reduceStars(){
	if(stars == 3){
		starElements[2].innerHTML = '<i class="fa fa-star-o"></i>';
		stars--;
	}else if(stars ==2){
	    starElements[1].innerHTML = '<i class="fa fa-star-o"></i>';
	    stars--;
	}
}

function winGame() {
	clearInterval(gameTimer);
	totalTime =0;
    seconds =0;
    minutes =0;
}	

// Game init function
function startGame(){
	displayCards(allCards);
	const cards = document.querySelectorAll('.card');
	document.querySelector('.moves').innerText = moves;
	for(const card of cards) {
		card.addEventListener('click', function(e){
			if(!card.classList.contains('open', 'show')) {
				if(openedCards.length < 2){
					openedCards.push(card);
					card.classList.add('open', 'show');	
					if(openedCards.length == 2){
                        moves++;
						document.querySelector('.moves').innerText = moves;
                        if(moves == 8) {
					    	reduceStars();	
						}else if(moves == 16){
						    reduceStars();
						}
                        const firstCard = openedCards[0];
                        const secondCard = openedCards[1];	
						openedCards = [];							
						if(firstCard.innerHTML == secondCard.innerHTML)
						{
                            pairsLeft--;
							firstCard.classList.add('match');	
							secondCard.classList.add('match');
							if(pairsLeft == 0){ winGame(); }
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