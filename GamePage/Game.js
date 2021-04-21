// Settings
// Game Keys
var upKey = "ArrowUp";
var downKey = "ArrowDown";
var leftKey = "ArrowLeft";
var rightKey = "ArrowRight";
var summonKey = "KeyP";
var foodAmount;
var fruit5 = "";
var fruit15 = "";
var fruit25 = "";
var timeLimit = 180;




// Game
var context;
var board;
var score = 0;
var pac_color;
var start_time;
var time_elapsed;

//intervals
var interval;
var intervalTime;

// Players
class Pacman {
	constructor(){
		this.x;
		this.y;
		this.color = "yellow";
	}
}
var pacman;

class Ghost {
	constructor(){
		this.starterX;
		this.starterY;
		this.x;
		this.y;
		this.prevuisGhost = 0;
	}
}

function isGhost(x, y){
	for(let i=0; i<ghosts.length; i++){
		if (ghosts[i].x == x && ghosts[i].y == y){
			return true;
		}
	}
	return false;
}
var ghosts = [];

class Pikachu {
	constructor(){
		this.x;
		this.y;
		this.prevuisPikachu = 0;
	}
}
var pikachu;

// Walls
var walls = [[13, 7], [13, 8], [13, 9], [14, 9], [15, 7], [15, 8], [15, 9], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
	[0, 5], [0, 6], [0, 7],	[0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], 
	[0, 18], [0, 19], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], 
	[13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0],
	[26, 0], [27, 0], [28, 0], [29, 0], [1, 19], [2, 19], [3, 19], [4, 19], [5, 19], [6, 19], [7, 19], [8, 19],
	[9, 19], [10, 19], [11, 19], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19], [17, 19], [18, 19], [19, 19],
	[20, 19], [21, 19], [22, 19], [23, 19], [24, 19], [25, 19], [26, 19], [27, 19], [28, 19], [29, 19], [29, 1],
	[29, 2], [29, 3], [29, 4], [29, 5],  [29, 6], [29, 7], [29, 8], [29, 9], [29, 10], [29, 11], [29, 12], [29, 13],
	[29, 14], [29, 15], [29, 16], [29, 17], [29, 18], [29, 19]];

// for(let w=0; w<30; w++){
// 	walls.push([w, 0]);
// }

function isWall(i, j) {
	for (let k=0; k<walls.length; k++){
		if (walls[k][0] == i && walls[k][1] ==j) {
			return true;
		}
	}
	return false;
}

// Extra
var keyPressed = 5;
var spawnTime;
var ownPokeball = false;
var summoned = false;
var direction = [0.15, 1.85, 2, -10];

// Start game
$(document).ready(function() {
	context = canvas.getContext("2d");
});

function Start() {

	if (!foodCheck()){
		return;
	}

	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("gamePage").style.display = 'block';

	start_time = new Date();
	timeLimit = document.getElementById("timeSlider").value;

	initailBoard();
	initialGhosts();
	initailPacman();
	initialFood();
	initailExtra();

	

	document.addEventListener('keyup', (e) => {
		if (e.code === upKey) {
			keyPressed = 1;
			direction = [1.65, 1.35, -10, -2];
		} else if (e.code === downKey) {
			keyPressed = 2;
			direction = [0.65, 0.35, 10, 2];
		} else if (e.code === leftKey) {
			keyPressed = 3;
			direction = [1.15, 0.85, -2, -10];
		} else if (e.code === rightKey) {
			keyPressed = 4;
			direction = [0.15, 1.85, 2, -10];
		} else if (e.code === summonKey) {
			summonPikachu();
		} else {
			keyPressed = 5;
		}
	});
	interval = setInterval(UpdatePosition, 250);
	intervalTime = setInterval(updateTime, 10);
}

function findRandomEmptyCell(board) {
	let i = Math.floor(Math.random() * 29 + 1);
	let j = Math.floor(Math.random() * 29 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 29 + 1);
		j = Math.floor(Math.random() * 29 + 1);
	}
	return [i, j];
}

// Initails Functions
function initailBoard(){
	board = new Array();
	for (let i = 0; i < 30; i++) {
		board[i] = new Array();
		for (let j = 0; j < 20; j++) {
			if(isWall(i, j)) {
				board[i][j] = 4;
			} else {
				board[i][j] = 0;
			}
		}
	}
}

function initailPacman(){
	pacman = new Pacman();
	let emptyCell = findRandomEmptyCell(board);
	pacman.x = emptyCell[0];
	pacman.y = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
}

function initialGhosts(){
	let ghostsAmount = document.getElementById("ghostSlider").value;
	let x = 1;
	let y = 1;
	for (let i=0; i<ghostsAmount; i++){
		ghosts.push(new Ghost());
		ghosts[i].x = x;
		ghosts[i].y = y;
		ghosts[i].starterX = x;
		ghosts[i].starterY = y;
		board[x][y] = 10;
		if (x == 28 && y == 18){
			x = 1;
			y = 18;
		} else if (x == 1){
			x = 28;
		} else {
			y = 18;
		}
	}
}

function initialFood(){
	foodAmount = document.getElementById("foodSlider").value;
	let pac_food = [foodAmount*0.6, foodAmount*0.3, foodAmount*0.1];
	while (pac_food.reduce((a, b) => a + b) > 0) {
		let emptyCell = findRandomEmptyCell(board);
		let random = Math.floor(Math.random(4) * 10);
		if (pac_food[random] > 0){
			board[emptyCell[0]][emptyCell[1]] = 5 + random;
			pac_food[random]--;
		}
	}
}

function initailExtra(){
	// Pokeball
	let emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 1;
	// Pikachu
	pikachu = new Pikachu();
	pikachu.x = 14;
	pikachu.y = 8;
}


// Draw Functions
function Draw() {
	canvas.width = canvas.width; //clean board
	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x - 15, center.y - 15, 15, direction[0] * Math.PI, direction[1] * Math.PI, false);

				context.lineTo(center.x - 15, center.y - 15);

				context.closePath();

				context.fillStyle = pacman.color;
				context.fill();

				context.stroke();

				context.beginPath();
				context.arc(center.x + direction[2] - 15, center.y + direction[3] - 15, 2, 0, 2 * Math.PI, false);
				context.fillStyle = "rgb(0, 0, 0)";
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//" + fruit5.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}else if (board[i][j] == 6) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//" + fruit15.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}else if (board[i][j] == 7) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//" + fruit25.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 4) {
				context.beginPath();
				let img = document.getElementById("block");
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 20) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 21) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 22) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 23) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//pokeball.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (summoned && board[i][j] == 15) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = "..//assets//img//pikachu.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}
		}
	}
}

// Packman Functions
function UpdatePosition() {
	// Pacman movement
	UpdatePositionP();
	if (board[pacman.x][pacman.y] == 5) {
		score += 5;
	} else if (board[pacman.x][pacman.y] == 6) {
		score += 15;
	} else if (board[pacman.x][pacman.y] == 7) {
		score += 25;
	}
	board[pacman.x][pacman.y] = 2;
	// Ghosts movement
	for(let index=0; index<ghosts.length; index++){
		UpdatePositionG(index);
	}
	// Pikachu movement
	if (summoned){
		UpdatePositionPi();
	}
	document.getElementById("lblScore").value = score;;
	if (score >= 100) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function updateTime(){
	let currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	document.getElementById("lblTime").value = time_elapsed;
}

function UpdatePositionP() {
	board[pacman.x][pacman.y] = 0;
	if (keyPressed == 1) {
		if (!isWall(pacman.x, pacman.y - 1)) {
			if (!checkEaten(0, -1)){
				gotPokeball(0, -1);
				pacman.y--;
			}
		}
	}
	if (keyPressed == 2) {
		if (!isWall(pacman.x, pacman.y + 1)) {
			if (!checkEaten(0, 1)){
				gotPokeball(0, 1)
				pacman.y++;
			}
		}
	}
	if (keyPressed == 3) {
		if (!isWall(pacman.x - 1, pacman.y)) {
			if (!checkEaten(-1, 0)){
				gotPokeball(-1, 0)
				pacman.x--;
			}
		}
	}
	if (keyPressed == 4) {
		if (!isWall(pacman.x + 1, pacman.y)) {
			if (!checkEaten(1, 0)){
				gotPokeball(1, 0)
				pacman.x++;
			}
		}
	}
}

function checkEaten(x, y) {
	if (isGhost(pacman.x + x, pacman.y + y)) {
		window.alert("You got eaten !");
		score -= 10;
		initailPacman();
		keyPressed = 5;
		return true;
	}
	return false;
}

// Pokemon Functions
function UpdatePositionPi() {
	if (summoned) {
		board[pikachu.x][pikachu.y] = pikachu.prevuisPikachu;
		randomMovement(pikachu);
		pikachu.prevuisPikachu = board[pikachu.x][pikachu.y];
		board[pikachu.x][pikachu.y] = 15;
	}
}

function gotPokeball(x, y) {
	if (board[pacman.x + x][pacman.y + y] == 1) {
		ownPokeball = true;
	}
}

function summonPikachu() {
	if (ownPokeball && !summoned){
		pikachu.prevuisPikachu = board[pikachu.x][pikachu.y];
		board[pikachu.x][pikachu.y] = 15;
		summoned = true;
	}
}

// Ghosts Functions
function UpdatePositionG(index) {
	if (ghosts[index].prevuisGhost){
		board[ghosts[index].x][ghosts[index].y] = ghosts[index].prevuisGhost;
	} else {
		board[ghosts[index].x][ghosts[index].y] = 0;
	}
	randomMovement(ghosts[index], index);
	if (board[ghosts[index].x][ghosts[index].y] < 10 && board[ghosts[index].x][ghosts[index].y] != 2){
		ghosts[index].prevuisGhost = board[ghosts[index].x][ghosts[index].y];
	} else {
		ghosts[index].prevuisGhost = undefined;
	}
	board[ghosts[index].x][ghosts[index].y] = 20 + index;
}

function checkEatenGhost(i, j, index) {
	if (isGhost(i, j)) {
		window.alert("Pikachu got a Ghost !");
		ghosts[index].x = 1;
		ghosts[index].y = 1;
		return true;
	}
	return false;
}

// temp function until dolev will add the search algo
function randomMovement(object, index, P) {
	let movmentDone = false;
	while(!movmentDone){
		let random = Math.floor(Math.random(4) * 4);
		if (random == 0) {
			if (!isWall(object.x, object.y - 1) && !isGhost(object.x, object.y - 1)) {
				if (!checkEatenGhost(0, -1, index)){
					object.y--;
				} else if (P) {
					object.y--;
				}
				movmentDone = true;
			}
		}
		if (random == 1) {
			if (!isWall(object.x, object.y + 1) && !isGhost(object.x, object.y + 1)) {
				if (!checkEatenGhost(0, 1, index)){
					object.y++;
				 }else if (P) {
					object.y++;
				}
				movmentDone = true;
			}
		}
		if (random == 2) {
			if (!isWall(object.x - 1, object.y) && !isGhost(object.x - 1, object.y)) {
				if (!checkEatenGhost(-1, 0, index)){
					object.x--;
				} else if (P) {
					object.x--;
				}
				movmentDone = true;
			}
		}
		if (random == 3) {
			if (!isWall(object.x + 1, object.y) && !isGhost(object.x + 1, object.y)) {
				if (!checkEatenGhost(1, 0, index)){
					object.x++;
				} else if (P) {
					object.x++;
				}
				movmentDone = true;
			}
		}
	}	
}


// Setting Page
$(document).ready(function() {
	// Game Keys
	let Up = document.getElementById("Up");
	let Down = document.getElementById("Down");
	let Left = document.getElementById("Left");
	let Right = document.getElementById("Right");
	let Summon = document.getElementById("Summon");
	Up.addEventListener('keydown', function(event){
		upKey = event.code;
		Up.value = upKey;
	});
	Down.addEventListener('keydown', function(event){
		downKey = event.code;
		Down.value = downKey;
	});
	Left.addEventListener('keydown', function(event){
		leftKey = event.code;
		Left.value = leftKey;
	});
	Right.addEventListener('keydown', function(event){
		rightKey = event.code;
		Right.value = rightKey;
	});
	Summon.addEventListener('keydown', function(event){
		summonKey = event.code;
		Summon.value = summonKey;
	});
})

function updateSlider(slideAmount, id) {
	document.getElementById(id).innerHTML = slideAmount;
};

function foodCheck(){
	fruit5 = document.getElementById("5points");
	fruit15 = document.getElementById("15points");
	fruit25 = document.getElementById("25points");
	if (fruit5.value === fruit15.value) {
		alert("You can't choose same type of fruit more then once.")
		fruit5.style.borderColor = "red";
		fruit15.style.borderColor = "red";
		return false;
	} else if(fruit5.value === fruit25.value) {
		fruit5.style.borderColor = "red";
		fruit25.style.borderColor = "red";
		alert("You can't choose same type of fruit more then once.")
		return false;
	} else if (fruit15.value === fruit25.value){
		fruit15.style.borderColor = "red";
		fruit25.style.borderColor = "red";
		alert("You can't choose same type of fruit more then once.")
		return false;
	}
	return true;
}



