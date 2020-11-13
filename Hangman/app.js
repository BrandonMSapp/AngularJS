var app = angular.module("HangmanApp", []);
app.controller("GameController",['$scope','$timeout',function($scope, $timeout){

var words = ["man", "pan", "can", "fan"];
$scope.incorrectLetters = [];
$scope.correctLetters = [];
$scope.guesses = 5;
$scope.displayWiord = '';
$scope.input = {
	letter : ''
}

var selectRandomWord = function(){
	var index = Math.round(Math.random()*words.length);
	return words[index];
}

var newGame = function(){
	$scope.incorrectLetters = [];
	$scope.correctLetters = [];
	$scope.guesses = 5;
	$scope.displayWiord = '';
	selectedWord = selectRandomWord();
	var displayWord = '';
	for(var i = 0; i < selectedWord.length; i++){
		displayWord += '*';
	}
	$scope.displayWord = displayWord;
}

$scope.letterChosen = function(){
	for(var i = 0; i < $scope.correctLetters.length; i++){
		if($scope.correctLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.input.letter = "";
			return;
		}
	}

	for(var i = 0; i < $scope.incorrectLetters.length; i++){
		if($scope.incorrectLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.input.letter = "";
			return;
		}
	}

	var correct = false;
	for(var i = 0; i <selectedWord.length; i++){
		if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
			$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
			correct = true;
		}
	}

	if(correct){
		$scope.correctLetters.push($scope.input.letter.toLowerCase());
	}
	else{
		$scope.guesses--;
		$scope.incorrectLetters.push($scope.input.letter.toLowerCase());
	}
	$scope.input.letter = "";
	if($scope.guesses == 0){
		alert("Loser!");
		$timeout(function(){
			newGame();
		},500);
	}
	if($scope.displayWord.indexOf("*") == -1){
		alert("Winner!");
		$timeout(function(){
			newGame();
		},500);
	}

}
newGame();

}])