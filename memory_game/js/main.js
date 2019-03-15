
document.getElementById('instructions').onclick = function(){
	document.getElementById('instructionsDiv').style.display = "block";
	document.getElementById('gameDiv').style.display = "none";
} ;
document.getElementById('game').onclick = function(){
	document.getElementById('gameDiv').style.display = "block";
	document.getElementById('instructionsDiv').style.display = "none";
	document.getElementById("game-board").innerHTML = "";
	newGame();
} ;
var cards = [
	{
		rank: "queen",	
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",		
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",		
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",		
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];
for (var i = 0; i < 4; i++){
	cards.push(cards[i]);
};
function shuffle(cards) {
    var ctr = cards.length; 
    var temp = []; 
    var index = 0;
  while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = cards[ctr];
        cards[ctr] = cards[index];
        cards[index] = temp;
    }
    return cards;
};

shuffle(cards);
var createBoard = function(){
	for (var i = 0; i < cards.length; i++) {
    	var cardElement = document.createElement('img');
    	cardElement.setAttribute('src', "images/back.png");
    	cardElement.setAttribute('data-id', i);
    	cardElement.addEventListener('click', flipCard);
    	document.getElementById("game-board").appendChild(cardElement);
    	document.getElementById('alert').innerHTML = "New game"; 
};
};


var imgElementsInPlay = [];
var attempts = 0;
var match = 0;
var alert = 0;
var checkForMatch = function(){
		var card1 = imgElementsInPlay[0].getAttribute('data-id');
		var card2 = imgElementsInPlay[1].getAttribute('data-id');
	if (cards[card1].rank === cards[card2].rank && cards[card1].suit === cards[card2].suit) {
		  document.getElementById('alert').innerHTML = "You found a match!";
		  imgElementsInPlay[0].removeEventListener('click', flipCard);
		  imgElementsInPlay[1].removeEventListener('click', flipCard);
		  attempts += 1;
		  match += 1;
		  alert = 2;
		  if (match == 4){
		  	document.getElementById('alert').innerHTML = "Congratulations! You did it in " + attempts + " attempts.";
		  	document.getElementById("game-board").innerHTML = "";
		  	document.getElementById("game-board").style.height = "648px";
		    var newGameButton = document.createElement('button');
		    newGameButton.innerHTML = "New Game";
		    newGameButton.setAttribute('id', "newGameButton");
		    document.getElementById("game-board").appendChild(newGameButton);
		    newGameButton.onclick = function (){
		    	newGame();
		    	document.getElementById("game-board").removeChild(newGameButton);
		    	document.getElementById('alert').innerHTML = "New game";
		    	attempts = 0;
				match = 0;
				
		    	};
		    
		  }
		} else {
		  document.getElementById('alert').innerHTML = "Sorry, try again.";
		  attempts += 1;
		  alert = 1;
		};
	
};

var flipCard = function(e){
	if (imgElementsInPlay.length == 2){
		if (alert == 1) {
		  imgElementsInPlay[0].setAttribute('src', "images/back.png");
		  imgElementsInPlay[1].setAttribute('src', "images/back.png");
		  imgElementsInPlay = [];
		} else if (alert == 2){
		  imgElementsInPlay[0].setAttribute('src', "images/None.png");
		  imgElementsInPlay[1].setAttribute('src', "images/None.png");
		  imgElementsInPlay = [];
		};
	};
	document.getElementById('alert').innerHTML = "";
	var cardId = e.target.getAttribute('data-id');
	e.target.setAttribute('src', cards[cardId].cardImage);
	switch(imgElementsInPlay.length){

		case 1:
			if (imgElementsInPlay[0] === e.target){

			} else {imgElementsInPlay.push(e.target);
			  setTimeout(checkForMatch, 100);};
			break;
			
		case 0: 
			imgElementsInPlay.push(e.target);
			break;

	};

};

createBoard();
var newGame = function(){
	shuffle(cards);
	createBoard();
}
