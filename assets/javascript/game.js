//word list//
var wordsList = ["goku", "gohan", "goten", "vegeta", "trunks", "piccolo", "yamcha", "tien", "krillin", "frieza", "cell", "buu", "roshi"];


var alphabetLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// global 
var wins = 0;
var losses = 0;
//attempts user has remaining 
var guessesLeft = 12;
// array for users guess
var guessesSoFar = [];
//user picks by pressing a key
var userGuess = null;
// Have computer pick a word and store it in wordToBeGuessed
var wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
//array that will hold the letters of the wordToBeGuessed
var arrayFromWord = [];
// html for DOM 
var html = "<p><h1>";
//take wordToBeGuessed apart and put into an array
function breakWordIntoArray() {
    for (var i = 0, j = 0; i < wordToBeGuessed.length; i++) {
        arrayFromWord[j] = wordToBeGuessed.charAt(i);
        j++
        if (wordToBeGuessed.charAt(i) != " ") {
            arrayFromWord[j] = false;
        } else {
            arrayFromWord[j] = true;
        }
        j++
    }
}// debugging
function consoleLogs() {
	console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
	console.log("guessesLeft: " + guessesLeft + "\n");
	console.log("guessesSoFar: " + guessesSoFar + "\n");
	console.log("wordToBeGuessed: " + wordToBeGuessed + "\n");
	console.log("arrayFromWord: " + arrayFromWord + "\n");
	console.log("--------------------------------");
}
// function that gets run when the game is won or lost
function resetGame() {
	//  reset variables 
	guessesLeft = 12;
	guessesSoFar = [];
	wordToBeGuessed = wordsList[Math.floor(Math.random() * wordsList.length)];
	arrayFromWord = [];
	breakWordIntoArray();
	// update the document
	var htmlInstructions="<p><h3>Press any key to begin guessing</p></h3>";
	document.querySelector(".instructions").innerHTML = htmlInstructions;
	var htmlGameInitial = "<p><h1>";
	// populate initial game layout of dashesg
	// for every character in the word, place an underscore and a space
	// and for every space in the word, place two spaces
	for (var i = 0; i < wordToBeGuessed.length; i++) {
		if (wordToBeGuessed.charAt(i) == " ") {
			htmlGameInitial += "&nbsp;&nbsp;";
		} else {
			htmlGameInitial += "_&nbsp;";
		}
	}
	// remember to include h1 and p1 header open and close
	htmlGameInitial += "</h1></p>"
	document.querySelector(".game").innerHTML = htmlGameInitial;
	var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector(".stats").innerHTML = htmlStats;
}
// function that displays progress as the game is played
function displayProgress() {
	// Displaying progress to HTML
	// Display arrayFromWord by building html string for it
	// set variable html for output display
	for (i = 0, j = 0; i < (arrayFromWord.length / 2); i++) {
			if (arrayFromWord[j+1] == true) {
			html += arrayFromWord[j];
		} else {
			html += "_";
		}
		html += "&nbsp;";
		j=j+2;
	}
	html += "</h1></p>"	
	// place html into the game ID
	document.querySelector(".game").innerHTML = html;

	// now build the stats string to update document via stats id
	htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
	document.querySelector(".stats").innerHTML = htmlStats;

	// also build the guesses string to update document via guesses id
	htmlGuesses = "<p><h3>"
	for (var i = 0; i < guessesSoFar.length; i++) {
		htmlGuesses += guessesSoFar[i] + "&nbsp;";
	}
	htmlGuesses += "</h3></p>";
	document.querySelector(".guesses").innerHTML = htmlGuesses;
}

// function to check user guess as valid and update arrays
function validateUserGuess() {
	// if user's pick doesn't exist in the array of prior picks, and
	// it also doesn't exist in the array of the letters of the word
	// to be guessed, then reduce the guesses left by one and play
	// charge sound. make sure to verify user's pick is in the alphabet,
	// otherwise ignore it.
	if (arrayFromWord.indexOf(userGuess) < 0 && guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesLeft--;
		var audio = new Audio("./assets/audio/scream.mp3");
		audio.play();
		console.log(audio);
	}
	// add all alphabetic guesses to guessesSoFar if not already in there
	if (guessesSoFar.indexOf(userGuess) < 0 && alphabetLetters.indexOf(userGuess) >= 0) {
		guessesSoFar[guessesSoFar.length]=userGuess;
	}

	// if userGuess exists in the array then switch its associated
	// array pair from false to true
	for (var i = 0; i < arrayFromWord.length; i++) {
		if (arrayFromWord[i] === userGuess) {
			// if the letter wasn't previously guessed then play super saiyan sound
			if (arrayFromWord[i+1] == false) {
				var audio = new Audio("./assets/audio/supersaiyan.mp3");
				audio.play();
			}
			arrayFromWord[i+1] = true;
		}
	}	
}
// function to see whether user has won the game
function hasUserWon() {
	// check to see if user has won which will mean all the
	// letters have been revealed (no false flags remain in the array)
	if (arrayFromWord.indexOf(false) < 0 ) {
		console.log("USER WINS");
		// user has won, increment wins
		wins++;
		// play kamekameha
		var audio = new Audio("./assets/audio/win.mp3");
		audio.play();
		// finally reset the game for new round
		resetGame();
	}	
}
// function to see whether user has lost the game
function hasUserLost() {
	// check to see if user has lost which will mean guessesLeft = 0
	if (guessesLeft == 0) {
		console.log("USER LOSES");
		// user has lost, increment losses
		losses++;
		// play lose sound
		var audio = new Audio("./assets/audio/lose.mp3");
		audio.play();
		// finally reset the game for a new round
		resetGame();
	}

}
// function to reset the html variable
function resetHtmlVariable() {
	// reset the html variable so we can rebuild it after next user guess
	html="<p><h1>";

}

// ----------------------
// MAIN GAME COMES THIRD!
// ----------------------

// lets begin by breaking apart our selected word into an array of letter/flag
breakWordIntoArray();

// lets begin by resetting the game
resetGame();

// debugging
consoleLogs();

// start listening for events
document.onkeyup = function(event) {

	// When user presses a key, it records it and saves to userGuess
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// check if user's guess is valid and update appropriate array
	validateUserGuess();

	// inject progress so far back into html
	displayProgress();

	// debugging
	consoleLogs();

	// reset the html variable
	resetHtmlVariable();

	// check whether user has won and reset if true
	hasUserWon();

	// check whether user has lost and reset if true
	hasUserLost();

	// debugging
	consoleLogs();
}
// end listening for events

