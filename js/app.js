
const cards = document.querySelectorAll('.card');
let openedCards = [];
 
 
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
	for(const card of cards) {
		card.addEventListener('click', function(e){
			if(!card.classList.contains('open', 'show')) {

				if(openedCards.length < 2){
					openedCards.push(card);
					card.classList.add('open', 'show');	
					if(openedCards.length == 2){
						if(openedCards[0].innerHTML == openedCards[1].innerHTML)
						{
							openedCards[0].classList.add('match');	
							openedCards[1].classList.add('match');
							openedCards = [];			
						}
					}
				}else{

				}
			}
		});
	};
}


startGame();