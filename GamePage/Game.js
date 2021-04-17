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
	let pac_food = 50;
	while (pac_food > 0) {
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		pac_food--;
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
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				let img = document.getElementById("block");
				context.drawImage(img, center.x - 30, center.y - 30, 60, 60)
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	if (keyPressed == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (keyPressed == 2) {
		if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (keyPressed == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (keyPressed == 4) {
		if (shape.i < 29 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
