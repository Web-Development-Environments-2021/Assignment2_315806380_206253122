var context;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;

//intervals
var interval;
var intervalP;
var intervalG1;


// Players
var pacman = new Object();
var ghost1 = new Object();
ghost1.i = 13;
ghost1.j = 7;
var pikachu = new Object();

// Walls
var walls = [[11, 5], [11, 6], [11, 7], [11, 8], [12, 5], [12, 8], [13, 8], [14, 8], [15, 5], [15, 8], 
	[16, 5], [16, 6], [16, 7], [16, 8], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
	[0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
	[6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0],
	[18, 0], [19, 0], [20, 0], [21, 0], [22, 0], [23, 0], [24, 0], [25, 0], [26, 0], [27, 0], [28, 0], [29, 0],
	[1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14],
	[13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14],
	[24, 14], [25, 14], [26, 14], [27, 14], [28, 14], [29, 14], [29, 1], [29, 2], [29, 3], [29, 4], [29, 5], 
	[29, 6], [29, 7], [29, 8], [29, 9], [29, 10], [29, 11], [29, 12], [29, 13], [29, 14]];

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

//Previus
var prevuisGhost1 = 0;
var prevuisPikachu = 0;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


function Start() {
	board = new Array();
	score = 0;
	start_time = new Date();
	spawnTime = start_time;
	pac_color = "yellow";
	for (let i = 0; i < 30; i++) {
		board[i] = new Array();
		for (let j = 0; j < 15; j++) {
			if(isWall(i, j)) {
				board[i][j] = 4;
			} else if (i == 13 && j == 13) {
				// Set Packman
				pacman.i = 13
				pacman.j = 13
				board[i][j] = 2;
			} else {
				board[i][j] = 0;
			}
		}
	}
	board[13][7] = 10;
	let pac_food = [30, 15, 5];
	while (pac_food.reduce((a, b) => a + b) > 0) {
		let emptyCell = findRandomEmptyCell(board);
		let random = Math.floor(Math.random(4) * 10);
		if (pac_food[random] > 0){
			board[emptyCell[0]][emptyCell[1]] = 5 + random;
			pac_food[random]--;
		}
	}

	// Pokeball
	let emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 11;

	document.addEventListener('keyup', (e) => {
		if (e.code === "ArrowUp") {
			keyPressed = 1;
		} else if (e.code === "ArrowDown") {
			keyPressed = 2;
		} else if (e.code === "ArrowLeft") {
			keyPressed = 3;
		} else if (e.code === "ArrowRight") {
			keyPressed = 4;
		} else if (e.code === "KeyP") {
			summonPikachu();
		} else {
			keyPressed = 5;
		}
	});
	interval = setInterval(UpdatePosition, 250);
	intervalP = setInterval(UpdatePositionP, 200);
}

function findRandomEmptyCell(board) {
	let i = Math.floor(Math.random() * 29 + 1);
	let j = Math.floor(Math.random() * 14 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 29 + 1);
		j = Math.floor(Math.random() * 14 + 1);
	}
	return [i, j];
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 30; i++) {
		for (var j = 0; j < 15; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//food3.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			}else if (board[i][j] == 6) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//food4.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			}else if (board[i][j] == 7) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//food5.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			} else if (board[i][j] == 4) {
				context.beginPath();
				let img = document.getElementById("block");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			} else if (board[i][j] == 10) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//ghost1.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			} else if (board[i][j] == 11) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//pokeball.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			} else if (summoned && board[i][j] == 15) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 60, 60);
				let img = new Image();
				img.src = "..//assets//img//pikachu.png"; //transparent png
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			}
		}
	}
}

function UpdatePosition() {
	board[pacman.i][pacman.j] = 0;
	if (keyPressed == 1) {
		if (pacman.j > 0 && board[pacman.i][pacman.j - 1] != 4) {
			if (!checkEaten(0, -1)){
				pacman.j--;
			}
			gotPokeball(0, -1);
		}
	}
	if (keyPressed == 2) {
		if (pacman.j < 14 && board[pacman.i][pacman.j + 1] != 4) {
			if (!checkEaten(0, 1)){
				pacman.j++;
			}
			gotPokeball(0, 1)
		}
	}
	if (keyPressed == 3) {
		if (pacman.i > 0 && board[pacman.i - 1][pacman.j] != 4) {
			if (!checkEaten(-1, 0)){
				pacman.i--;
			}
			gotPokeball(-1, 0)
		}
	}
	if (keyPressed == 4) {
		if (pacman.i < 29 && board[pacman.i + 1][pacman.j] != 4) {
			if (!checkEaten(1, 0)){
				pacman.i++;
			}
			gotPokeball(1, 0)
		}
	}
	if (board[pacman.i][pacman.j] == 5) {
		score++;
	} else if (board[pacman.i][pacman.j] == 6) {
		score += 2;
	} else if (board[pacman.i][pacman.j] == 7) {
		score += 10;
	}
	if (summoned) {
		board[pikachu.i][pikachu.j] = prevuisPikachu;
		randomMovement(pikachu);
		prevuisPikachu = board[pikachu.i][pikachu.j];
		board[pikachu.i][pikachu.j] = 15;
	}
	board[ghost1.i][ghost1.j] = prevuisGhost1;
	randomMovement(ghost1);
	prevuisGhost1 = board[ghost1.i][ghost1.j];
	board[ghost1.i][ghost1.j] = 10;
	board[pacman.i][pacman.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 100) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function checkEaten(x, y) {
	if (board[pacman.i + x][pacman.j + y] == 10) {
		window.alert("You got eaten !");
		score -= 20;
		pacman.i = 13;
		pacman.j = 13;
		return true;
	}
	return false;
}

function UpdatePositionP() {
	board[pikachu.i][pikachu.j] = 0;
	if (summoned) {
		board[pikachu.i][pikachu.j] = prevuisPikachu;
		randomMovement(pikachu);
		prevuisPikachu = board[pikachu.i][pikachu.j];
		board[pikachu.i][pikachu.j] = 15;
	}
	Draw();
}

function checkEaten(x, y) {
	if (board[pacman.i + x][pacman.j + y] == 10) {
		window.alert("You got eaten !");
		score -= 20;
		pacman.i = 13;
		pacman.j = 13;
		return true;
	}
	return false;
}

function checkEatenGhost(x, y) {
	if (board[ghost1.i + x][ghost1.j + y] == 15) {
		window.alert("Pikachu got a Ghost !");
		ghost1.i = 13;
		ghost1.j = 7;
		return true;
	}
	return false;
}

function gotPokeball(x, y) {
	if (board[pacman.i + x][pacman.j + y] == 11) {
		ownPokeball = true;
	}
}

function summonPikachu() {
	if (ownPokeball && !summoned){
		pikachu.i = 1;
		pikachu.j = 1;
		board[1][1] = 15;
		summoned = true;
	}
}

// temp function until dolev will add the search algo
function randomMovement(object, P) {
	let movmentDone = false;
	while(!movmentDone){
		let random = Math.floor(Math.random(4) * 4);
		if (random == 0) {
			if (object.j > 0 && board[object.i][object.j - 1] != 4 && !isWall(object.i, object.j - 1)) {
				if (!checkEatenGhost(0, -1)){
					object.j--;
				} else if (P) {
					object.j--;
				}
				movmentDone = true;
			}
		}
		if (random == 1) {
			if (object.j < 14 && board[object.i][object.j + 1] != 4 && !isWall(object.i, object.j + 1)) {
				if (!checkEatenGhost(0, 1)){
					object.j++;
				 }else if (P) {
					object.j++;
				}
				movmentDone = true;
			}
		}
		if (random == 2) {
			if (object.i > 0 && board[object.i - 1][object.j] != 4 && !isWall(object.i - 1, object.j)) {
				if (!checkEatenGhost(-1, 0)){
					object.i--;
				} else if (P) {
					object.i--;
				}
				movmentDone = true;
			}
		}
		if (random == 3) {
			if (object.i < 29 && board[object.i + 1][object.j] != 4 && !isWall(object.i + 1, object.j)) {
				if (!checkEatenGhost(1, 0)){
					object.i++;
				} else if (P) {
					object.i++;
				}
				movmentDone = true;
			}
		}
	}	
}