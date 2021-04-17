var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var keyPressed = 5;


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});


function Start() {
	board = new Array();
	score = 0;
	start_time = new Date();
	pac_color = "yellow";
	for (let i = 0; i < 30; i++) {
		board[i] = new Array();
		for (let j = 0; j < 15; j++) {
			if(i == 0 || j == 0 || i == 29 || j == 14) {
				board[i][j] = 4;
			} else if(
			// Creating Ghosts box
				(i == 11 && j == 5) ||
				(i == 11 && j == 6) ||
				(i == 11 && j == 7) ||
				(i == 16 && j == 5) ||
				(i == 16 && j == 6) ||
				(i == 16 && j == 8) ||
				(i == 12 && j == 8) ||
				(i == 13 && j == 8) ||
				(i == 14 && j == 8) ||
				(i == 15 && j == 8) ||
				(i == 12 && j == 5) ||
				(i == 15 && j == 5) ||
				(i == 11 && j == 8) ||
				(i == 16 && j == 7)
			) {
				board[i][j] = 4;
			} else if (i == 13 && j == 13) {
				// Set Packman
				shape.i = 13
				shape.j = 13
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

	document.addEventListener('keyup', (e) => {
		if (e.code === "ArrowUp") {
			keyPressed = 1;
		} else if (e.code === "ArrowDown") {
			keyPressed = 2;
		} else if (e.code === "ArrowLeft") {
			keyPressed = 3;
		} else if (e.code === "ArrowRight") {
			keyPressed = 4;
		} else {
			keyPressed = 5;
		}
	});
	interval = setInterval(UpdatePosition, 250);
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
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	if (keyPressed == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			if (!checkEaten(0, -1)){
				shape.j--;
			}
		}
	}
	if (keyPressed == 2) {
		if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
			if (!checkEaten(0, 1)){
				shape.j++;
			}
		}
	}
	if (keyPressed == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			if (!checkEaten(-1, 0)){
				shape.i--;
			}
		}
	}
	if (keyPressed == 4) {
		if (shape.i < 29 && board[shape.i + 1][shape.j] != 4) {
			if (!checkEaten(1, 0)){
				shape.i++;
			}
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score++;
	} else if (board[shape.i][shape.j] == 6) {
		score += 2;
	} else if (board[shape.i][shape.j] == 7) {
		score += 10;
	}
	board[shape.i][shape.j] = 2;
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
	if (board[shape.i + x][shape.j + y] == 10) {
		window.alert("You got eaten !");
		score -= 20;
		shape.i = 13;
		shape.j = 13;
		return true;
	}
	return false;
}