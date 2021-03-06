const halfCards = ['fa-diamond',
                  'fa-paper-plane-o',
                  'fa-anchor',
                  'fa-bolt',
                  'fa-bomb',
                  'fa-cube',
                  'fa-leaf',
                  'fa-bicycle'];
const allCards = halfCards.concat(halfCards);
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
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// A function for reducing stars
function reduceStars(){
	if(stars == 3){
		starElements[2].innerHTML = '<i class="fa fa-star-o"></i>';
		stars--;
	}else if(stars ==2){
	    starElements[1].innerHTML = '<i class="fa fa-star-o"></i>';
	    stars--;
	}
}

// A function for stopping the timer and showing the win panel
function winGame() {
    // Stop the timer
	clearInterval(gameTimer);
	const deck = document.querySelector('.deck');
    deck.innerHTML = "";
    const winPanel =  document.createElement('div');
    winPanel.classList.add("winPanel");
    const winHeader =  document.createElement('h1');
    winHeader.innerText = "You won! woohoo!";
	winHeader.style.marginLeft = "15%";
    winHeader.style.fontWeight = "bolder";
    winHeader.style.textAlign = "center";
	winHeader.style.color = "#eef2f5";
    winPanel.appendChild(winHeader);
	const playAgain =  document.createElement('button');
    playAgain.addEventListener('click', function(e){
		location.reload();
	});
    playAgain.innerText = "Play Again";
	playAgain.style.marginLeft = "auto";	
	playAgain.style.marginRight = "auto";
    winPanel.appendChild(playAgain);
    const winStats =  document.createElement('h2');
    winStats.innerHTML = `You finished in ${minutes}:${seconds} and with ${stars}<i class="fa fa-star-o"></i>`;
    winStats.style.fontWeight = "bolder";
    winStats.style.textAlign = "center";
	winStats.style.marginLeft = "20%";
	winStats.style.color = "#eef2f5";
    winPanel.appendChild(winStats);
	deck.appendChild(winPanel);
}	

/* Game init function */
function startGame(){
    // Shuffle and display cards
	displayCards(allCards);
	const cards = document.querySelectorAll('.card');
    // Iterate through all the cards and add the game rules to them
	for(const card of cards) {
		card.addEventListener('click', function(e){
			if(!card.classList.contains('open', 'show')) {
				if(openedCards.length < 2){
                    // Show card content
					openedCards.push(card);
					card.classList.add('open', 'show');
                    // If two cards have been picked 
                    // We need  to check if they are identical
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
                            // Check if the game is over
							if(pairsLeft == 0){ winGame(); }
						}else{
                            // Flip the cards
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

/* Game init */

startGame();