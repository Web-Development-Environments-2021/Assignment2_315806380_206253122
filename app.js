/*
Content

1. Menu - line 15
2. Welcome page - line 90
	2.1 Validation - line 158
	2.2 Signup page - line 167
3. Settings Page - line 1020
4. Game Page - line 268
	4.1 Game Board - line 252
	4.3 Pacman Functions - line 651
	4.3 Ms Pacman Functions - line 795
	4.5 Pikachu Functions - line 812
	4.6 Ghosts Function - line 887
*/


 /* Menu */

var divs = [];
$(document).ready(function() {
	divs.push(document.getElementById('welcomePage'));
	divs.push(document.getElementById('loginPage'));
	divs.push(document.getElementById('signupPage'));
	divs.push(document.getElementById('settingsPage'));
	divs.push(document.getElementById('gamePage'));
	divs.push(document.getElementById('rulesPage'));
})

function changeDiv(toShow) {
	divs.forEach(element => {
		if (element.id == toShow){
			if (element.id == "welcomePage") {
				document.getElementById('userExit').style.display = 'none';
				element.style.display = 'flex';
			} else if (element.id == "settingsPage" || element.id == "rulesPage") {
				document.getElementById('newGame').style.display = 'none';
				element.style.display = 'block';
			} else {
				document.getElementById('newGame').style.display = 'none';
				element.style.display = 'flex';
			}
			
		} else {
			element.style.display = 'none';
		}
	});
	let mute = document.getElementById('muteMusic');
	mute.style.display = 'none';
	mute.innerHTML = 'Mute';
	resetGame();
}

function openModal() { 
	let blur = document.getElementById('blur');
    blur.classList.toggle('active');
    let diaglog = document.getElementById("modalDialog");
    diaglog.showModal();
    window.addEventListener('mousedown', function(e) {
        if (e.target !== diaglog){
            null;
        } 
        else {
            diaglog.close();
            blur.classList.remove('active');
        }
    });
    diaglog.addEventListener('keydown', function(e) {
        if (e.code == 'Escape'){
            let blur = document.getElementById('blur');
            blur.classList.remove('active');
        }
    });
}
function closeModal(){
	let diaglog = document.getElementById("modalDialog");
    diaglog.close();
    let blur = document.getElementById('blur');
    blur.classList.remove('active');
}

function muteGameMusic(){
	let mute = document.getElementById('muteMusic');
	if (mute.innerHTML == 'Mute') {
		document.getElementById('backgroundMusic').pause();
		mute.innerHTML = 'UnMute';
	} else {
		document.getElementById('backgroundMusic').play();
		mute.innerHTML = 'Mute';
	}
}

/* Welcome Page */

class User {
    constructor(username, password, fullname, email, birthdate){
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.birthdate = birthdate;
    }
}

User.prototype.equals = function (o) {
    if (o instanceof 'string') {
        return new String(this.username) == o;
    }
    return this.username === o.username;
};

// Database for users
let Users = [new User('k', 'k')]

var loginUser;

function includesIn(array, object) {
    let result = [false, undefined];
    array.forEach(element => {
        if (typeof object === 'string') {
            if (element.username === object) {
                result = [true, element];
				return result;
            };
        } else {
            if (element.username === object.username) {
                result = [true, element];
				return result;
            }
        }
    });
    return result;
}

function checkPassword(id, pass) {
	let user = includesIn(Users, id)[1];
	if(user){
		return user.password == pass;
	}
	return false;
}

function checkValidPass(pass) {
	let num = false;
	let char = false;
	for(let i=0; i<pass.length; i++){
		if (/^[a-z]+$/i.test(pass[i])){
			char = true;
		} else if (/[0-9]+$/i.test(pass[i])) {
			num = true;
		}
		if (num && char) {
			return true;
		}
	}
	return false;
}

// Switch divs - Welcome Page

// Switch div - to Login
$(document).ready(function() {
    $('#start').click(function() {
        $('#welcomePage').css('display', 'none');
        $('#loginPage').css('display', 'flex');
    })
})


// Switch div - to Signup
$(document).ready(function() {
    $('#signup').click(function() {
        $('#welcomePage').css('display', 'none');
        $('#signupPage').css('display', 'flex');
    })
})

$(document).ready(function() {
	$('#exit').click(function() {
		window.close();
	})
})

// Validation for Signup and Login

jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("lettersAndNubersOnly", function(value, element) {
	return this.optional(element) || checkValidPass(value);
}, "must have letters and numbers please");

jQuery.validator.addMethod("usernameExist", function(value, element) {
	return this.optional(element) || !includesIn(Users, value)[0];
}, "username already exist");

jQuery.validator.addMethod("usernameDoesntExist", function(value, element) {
	return this.optional(element) || includesIn(Users, value)[0];
}, "username dosn't exist");


jQuery.validator.addMethod("passwordCurrect", function(value, element) {
	return this.optional(element) || checkPassword($('#userLogin').val(), value);
}, "password incorrect");


$(document).ready(function() {
  $('#signupForm').validate({
    rules: {
      userSignup: {
          required: true,
          usernameExist: true
      },
      nameSignup: {
        required: true,
        lettersonly: true
      },
      passwordSubmit: {
        minlength: 6,
        required: true,
        lettersAndNubersOnly: true
      },
      emailSignup: {
        required: true,
        email: true
      },
      dateSignup: {
        required: true
      }
    },
    submitHandler: function (form) { 
		alert('valid form submitted'); 
		Users.push(new User(
			form.userSignup.value,
			form.passwordSubmit.value,
			form.nameSignup.value,
			form.emailSignup.value,
			form.dateSignup.value));
		$('#signupPage').css('display', 'none');
		$('#welcomePage').css('display', 'block');
		return false; 
  },    
  });

  $('#loginForm').validate({
    rules: {
      userLogin: {
          required: true,
          usernameDoesntExist: true
      },
      passwordLogin: {
        required: true,
        passwordCurrect: true
      },
    },
    submitHandler: function (form) { 
		loginUser = form.userLogin.value;
		$('#loginPage').css('display', 'none');
		$('#settingsPage').css('display', 'block');
		$('#userExit').css('display', 'block');
		return false; 
  },    
  });
});


/* Game Page */

// Game Keys
var upKey = "ArrowUp";
var downKey = "ArrowDown";
var leftKey = "ArrowLeft";
var rightKey = "ArrowRight";
var summonKey = "KeyP";
var InvisKey = "KeyI";
var foodAmount;
var fruit5 = "";
var fruit15 = "";
var fruit25 = "";
var timeLimit = 180;


// Game
var context;
var board;
var score = 0;
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
		this.life = 5;
		this.ownPokeball = false;
		this.invis = false;
		this.invisTime = 0;
		this.invisAmount = 0;
	}
}
var pacman = new Pacman();

// Ms Pacman

class MsPacman {
	constructor(){
		this.x;
		this.y;
		this.caught = false;
		this.prevuisMsPacman = 0;
	}
}

var msPacman = new MsPacman();

// Ghosts
var ghostMovement = false;

class Ghost {
	constructor(){
		this.id;
		this.starterX;
		this.starterY;
		this.x;
		this.y;
		this.prevuisGhost = 0;
	}

	respawn() {
		if (this.prevuisGhost){
			board[this.x][this.y] = this.prevuisGhost;
		}
		this.prevuisGhost = 0;
		board[this.starterX][this.starterY] = 20 + this.id;
		this.x = this.starterX;
		this.y = this.starterY;
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


// Pikachu
class Pikachu {
	constructor(){
		this.starterX = 14;
		this.starterY = 8;
		this.x;
		this.y;
		this.prevuisPikachu = 0;
		this.summoned = false;
		this.summonTime;
	}
}
var pikachu = new Pikachu();

// Walls
var walls = [[13, 7], [13, 8], [13, 9], [14, 9], [15, 7], [15, 8], [15, 9],
			 [3, 3], [4, 3], [3, 4], [4, 4],
			 [6, 13], [7, 13], [6, 14], [7, 14], [8, 13], [8, 14],
			 [22, 3], [22, 5], [22, 7], [22, 9], [22, 11], [22, 13],
			 [16, 16], [16, 15], [16, 14], [17, 16], [17, 15], [17, 14]];

for(let w=0; w<30; w++){
	walls.push([w, 0]);
	walls.push([w, 19]);
}
for(let w=0; w<20; w++){
	walls.push([0, w]);
	walls.push([29, w]);
}

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
var direction = [0.15, 1.85, 2, -10];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start game
$(document).ready(function() {
	context = canvas.getContext("2d");
});

function Start() {

	if (!foodCheck()){
		return;
	}

	document.getElementById('userNameGame').innerHTML = loginUser;
	document.getElementById("settingsPage").style.display = 'none';
	document.getElementById("gamePage").style.display = 'block';
	document.getElementById('muteMusic').style.display = 'block';
	$('#backgroundMusic').trigger('play');

	start_time = new Date();
	timeLimit = document.getElementById("timeSlider").value;
	document.getElementById('foodAmountLeft').innerHTML = document.getElementById('foodSlider').value;

	initailBoard();
	initialGhosts();
	initailPacman();
	initialFood();
	initailPokeball();
	initailPill();
	initiailMspacman();

	

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
		} else if (e.code === InvisKey) {
			usePill();
		}else {
			keyPressed = 5;
		}
	});
	interval = setInterval(UpdatePosition, 200);
	intervalTime = setInterval(updateTime, 50);
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
		ghosts[i].id = i;
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
		let random = getRandomInt(0, 3);
		if (pac_food[random] > 0){
			board[emptyCell[0]][emptyCell[1]] = 5 + random;
			pac_food[random]--;
		}
	}
}

function initailPokeball(){
	let emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 1;
}

function initailPill(){
	for(let i=0 ;i<3 ;i++){
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 3;
	}
}

function initiailMspacman() {
	let emptyCell = findRandomEmptyCell(board);
	msPacman.x = emptyCell[0];
	msPacman.y = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 3.5;
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
				img.src = ".//assets//img//" + fruit5.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}else if (board[i][j] == 6) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//" + fruit15.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}else if (board[i][j] == 7) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//" + fruit25.value + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 4) {
				context.beginPath();
				let img = document.getElementById("block");
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 20 && isGhost(i, j)) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 21 && isGhost(i, j)) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 22 && isGhost(i, j)) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 23 && isGhost(i, j)) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//ghost" + (board[i][j] - 19) + ".png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//pokeball.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (pikachu.summoned && board[i][j] == 15) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//pikachu.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//pill.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			} else if (board[i][j] == 3.5 && (msPacman.x == i && msPacman.y == j)) {
				context.beginPath();
				context.fillRect(center.x - 30, center.y - 30, 30, 30);
				let img = new Image();
				img.src = ".//assets//img//msPacman.png";
				context.drawImage(img, center.x - 30, center.y - 30, 30, 30)
			}
		}
	}
}

// Pacman Functions
function UpdatePosition() {
	// Checking pacman invis time
	if (time_elapsed - pacman.invisTime > 3){
		pacman.invis = false;
		pacman.color = "yellow";
	}
	// Pacman movement
	UpdatePositionP();
	if (board[pacman.x][pacman.y] == 5) {
		score += 5;
		document.getElementById("foodAmountLeft").innerHTML -= 1;
	} else if (board[pacman.x][pacman.y] == 6) {
		score += 15;
		document.getElementById("foodAmountLeft").innerHTML -= 1;
	} else if (board[pacman.x][pacman.y] == 7) {
		score += 25;
		document.getElementById("foodAmountLeft").innerHTML -= 1;
	} else if (board[pacman.x][pacman.y] == 3.5) {
		score += 50;
		msPacman.caught = true;
	}
	board[pacman.x][pacman.y] = 2;
	// Ghosts movement
	if (ghostMovement) {
		for(let index=0; index<ghosts.length; index++){
			UpdatePositionG(index);
		}
		ghostMovement = false;
	} else {
		ghostMovement = true;
	}
	// Pikachu movement
	if (pikachu.summoned){
		UpdatePositionPi();
	}
	if (!msPacman.caught){
		UpdatePositionMs();
	}
	document.getElementById("lblScore").value = score;
	if ((timeLimit - time_elapsed) < 0){
		if (score >= 100) {
			gameLost('Winner!');
		} else {
			gameLost('timeoutLose');
		}
	} else {
		Draw();
	}
}

function updateTime(){
	let currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	document.getElementById("lblTime").value = (timeLimit - time_elapsed).toFixed(2);
}

function UpdatePositionP() {
	board[pacman.x][pacman.y] = 0;
	if (keyPressed == 1) {
		if (!isWall(pacman.x, pacman.y - 1)) {
			if (!checkEaten(0, -1) || pacman.invis){
				pacman.y--;
				gotPokeball();
				gotPill();
			}
		}
	}
	if (keyPressed == 2) {
		if (!isWall(pacman.x, pacman.y + 1)) {
			if (!checkEaten(0, 1) || pacman.invis){
				pacman.y++;
				gotPokeball();
				gotPill();
			}
		}
	}
	if (keyPressed == 3) {
		if (!isWall(pacman.x - 1, pacman.y)) {
			if (!checkEaten(-1, 0) || pacman.invis){
				pacman.x--;
				gotPokeball();
				gotPill();
			}
		}
	}
	if (keyPressed == 4) {
		if (!isWall(pacman.x + 1, pacman.y)) {
			if (!checkEaten(1, 0) || pacman.invis){
				pacman.x++;
				gotPokeball();
				gotPill();
			}
		}
	}
}

function checkEaten(x, y) {
	if (isGhost(pacman.x + x, pacman.y + y) || isGhost(pacman.x, pacman.y)) {
		let lifeImage = 'lblLife' + pacman.life;
		document.getElementById(lifeImage).style.visibility = 'hidden';
		pacman.life--;
		score -= 10;
		if (pacman.life == 0){
			gameLost('loser');
		}
		initailPacman();
		keyPressed = 5;
		return true;
	}
	return false;
}

function gotPill() {
	if (board[pacman.x][pacman.y] == 3) {
		pacman.invisAmount++;
	}
}

function usePill() {
	if (pacman.invisAmount > 0){
		pacman.invisAmount--;
		pacman.invis = true;
		pacman.invisTime = time_elapsed;
		pacman.color = "darkgray";
	}
}

function gameLost(type) {
	window.clearInterval(interval);
	window.clearInterval(intervalTime);
	if (type == 'loser') {
		window.alert("Loser!");
		$('#newGame').css('display', 'block');
	} else if (type == 'timeoutLose') {
		window.alert("You are better then " + score + " points!");
		$('#newGame').css('display', 'block');
	} else {
		window.alert("Winner!!!");
		$('#newGame').css('display', 'block');
	}
	resetGame();
}

// MsPacman Functions

function UpdatePositionMs() {
	if (msPacman.prevuisMsPacman){
		board[msPacman.x][msPacman.y] = msPacman.prevuisMsPacman;
	} else {
		board[msPacman.x][msPacman.y] = 0;
	}
	randomMovement(msPacman);
	if (board[msPacman.x][msPacman.y] < 10 && board[msPacman.x][msPacman.y] != 2){
		msPacman.prevuisMsPacman = board[msPacman.x][msPacman.y];
	} else {
		msPacman.msPacman = undefined;
	}
	board[msPacman.x][msPacman.y] = 3.5;
}

// Pokemon Functions
function UpdatePositionPi() {
	if (pikachu.summoned) {
		if (pikachu.prevuisPikachu){
			board[pikachu.x][pikachu.y] = pikachu.prevuisPikachu;
		} else {
			board[pikachu.x][pikachu.y] = 0;
		}
		if ((new Date() - pikachu.summonTime)/1000 > 10){
			pikachu.summoned = false;
			initailPokeball();
			return;
		}
		let random = getRandomInt(0, ghosts.length - 1);
		console.log(random);
		smartMovementPi(ghosts[random], random);
		if (board[pikachu.x][pikachu.y] < 10 && board[pikachu.x][pikachu.y] != 2){
			pikachu.prevuisPikachu = board[pikachu.x][pikachu.y];
		} else {
			pikachu.prevuisPikachu = undefined;
		}
		board[pikachu.x][pikachu.y] = 15;
	}
}

function smartMovementPi(object, index) {
	if (Math.abs(pikachu.x - object.x) > Math.abs(pikachu.y - object.y)){
		if (pikachu.x - object.x > 0){
			if (!isWall(pikachu.x-1, pikachu.y)){
				pikachu.x--;
			} else {
				randomMovement(pikachu, index, true);
			}
		} else {
			if (!isWall(pikachu.x+1, pikachu.y)){
				pikachu.x++;
			} else {
				randomMovement(pikachu, index, true);
			}
		}
	} else {
		if (pikachu.y - object.y > 0){
			if (!isWall(pikachu.x, pikachu.y-1)){
				pikachu.y--;
			} else {
				randomMovement(pikachu, index, true);
			}
		} else {
			if (!isWall(pikachu.x, pikachu.y+1)){
				pikachu.y++;
			} else {
				randomMovement(pikachu, index, true);
			}
		}
	}
	checkEatenGhost(pikachu.x, pikachu.y, index);
}

function gotPokeball() {
	if (board[pacman.x][pacman.y] == 1) {
		pacman.ownPokeball = true;
	}
}

function summonPikachu() {
	if (pacman.ownPokeball && !pikachu.summoned){
		pikachu.x = pikachu.starterX;
		pikachu.y = pikachu.starterY;
		pikachu.prevuisPikachu = board[pikachu.x][pikachu.y];
		board[pikachu.x][pikachu.y] = 15;
		pikachu.summonTime = new Date();
		pikachu.summoned = true;
	}
}

// Ghosts Functions
function UpdatePositionG(index) {
	if (ghosts[index].prevuisGhost){
		board[ghosts[index].x][ghosts[index].y] = ghosts[index].prevuisGhost;
	} else {
		board[ghosts[index].x][ghosts[index].y] = 0;
	}
	if (!pacman.invis){
		smartMovement(ghosts[index], pacman, index);
	} else {
		randomMovement(ghosts[index], index);
	}
	if (board[ghosts[index].x][ghosts[index].y] < 10 && board[ghosts[index].x][ghosts[index].y] != 2){
		ghosts[index].prevuisGhost = board[ghosts[index].x][ghosts[index].y];
	} else {
		ghosts[index].prevuisGhost = undefined;
	}
	board[ghosts[index].x][ghosts[index].y] = 20 + index;
}

function checkEatenGhost(i, j, index) {
	if (isGhost(pikachu.x,pikachu.y)) {
		ghosts[index].respawn();
		return true;
	}
	return false;
}

// Movement Algo
function smartMovement(objectA, objectB, index) {
	if (Math.abs(objectA.x - objectB.x) > Math.abs(objectA.y - objectB.y)){
		if (objectA.x - objectB.x > 0){
			if (!isWall(objectA.x-1, objectA.y) && !isGhost(objectA.x-1, objectA.y)){
				objectA.x--;
			} else {
				randomMovement(objectA, index);
			}
		} else {
			if (!isWall(objectA.x+1, objectA.y) && !isGhost(objectA.x+1, objectA.y)){
				objectA.x++;
			} else {
				randomMovement(objectA, index);
			}
		}
	} else {
		if (objectA.y - objectB.y > 0){
			if (!isWall(objectA.x, objectA.y-1) && !isGhost(objectA.x, objectA.y-1)){
				objectA.y--;
			} else {
				randomMovement(objectA, index);
			}
		} else {
			if (!isWall(objectA.x, objectA.y+1) && !isGhost(objectA.x, objectA.y+1)){
				objectA.y++;
			} else {
				randomMovement(objectA, index);
			}
		}
	}
}

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
		else if (random == 1) {
			if (!isWall(object.x, object.y + 1) && !isGhost(object.x, object.y + 1)) {
				if (!checkEatenGhost(0, 1, index)){
					object.y++;
				 }else if (P) {
					object.y++;
				}
				movmentDone = true;
			}
		}
		else if (random == 2) {
			if (!isWall(object.x - 1, object.y) && !isGhost(object.x - 1, object.y)) {
				if (!checkEatenGhost(-1, 0, index)){
					object.x--;
				} else if (P) {
					object.x--;
				}
				movmentDone = true;
			}
		}
		else if (random == 3) {
			if (!isWall(object.x + 1, object.y) && !isGhost(object.x + 1, object.y)) {
				if (!checkEatenGhost(1, 0, index)){
					object.x++;
				} else if (P) {
					object.x++;
				}
				movmentDone = true;
			}
		}
		movmentDone = true;
	}	
}


function resetGame() {
	// stop music
	document.getElementById('backgroundMusic').pause();
	document.getElementById('backgroundMusic').currentTime = 0;

	// clear intervals
	window.clearInterval(interval);
	window.clearInterval(intervalTime);

	// reset Objects
	pacman = new Pacman();
	pikachu = new Pikachu();
	msPacman = new MsPacman();

	// reset ghosts
	ghostMovement = false;
	ghosts = []
	
	//reset game field
	board = []
	score = 0;
}

/* Setting Page */

$(document).ready(function() {
	// Game Keys
	let Up = document.getElementById("Up");
	let Down = document.getElementById("Down");
	let Left = document.getElementById("Left");
	let Right = document.getElementById("Right");
	let Summon = document.getElementById("Summon");
	let Invis = document.getElementById("Invis");
	Up.addEventListener('keydown', function(event){
		upKey = event.code;
		Up.value = upKey;
		document.getElementById("UpFixed").innerText = "Up Key: " + String.fromCharCode(event.keyCode)
	});
	Down.addEventListener('keydown', function(event){
		downKey = event.code;
		Down.value = downKey;
		document.getElementById("DownFixed").innerText = "Down Key: " + String.fromCharCode(event.keyCode)
	});
	Left.addEventListener('keydown', function(event){
		leftKey = event.code;
		Left.value = leftKey;
		document.getElementById("LeftFixed").innerText = "Left Key: " + String.fromCharCode(event.keyCode)
	});
	Right.addEventListener('keydown', function(event){
		rightKey = event.code;
		Right.value = rightKey;
		document.getElementById("RightFixed").innerText = "Right Key: " + String.fromCharCode(event.keyCode)
	});
	Summon.addEventListener('keydown', function(event){
		summonKey = event.code;
		Summon.value = summonKey;
		document.getElementById("SummonFixed").innerText = "Summon Key: " + String.fromCharCode(event.keyCode)
	});
	Invis.addEventListener('keydown', function(event){
		InvisKey = event.code;
		Invis.value = InvisKey;
		document.getElementById("InvisFixed").innerText = "Invisible Key: " + String.fromCharCode(event.keyCode)
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
	document.getElementById('5pointsFood').src = "./assets/img/" + fruit5.value + ".png";
	document.getElementById('15pointsFood').src = "./assets/img/" + fruit15.value + ".png";
	document.getElementById('25pointsFood').src = "./assets/img/" + fruit25.value + ".png";
	return true;
}

function randomSettings() {
	fruit5 = document.getElementById("5points");
	fruit15 = document.getElementById("15points");
	fruit25 = document.getElementById("25points");

	let fruits = ['Apple', 'GoldenApple', 'Strawberry'];
	let fruitToRandom = fruit5;
	for (let i=0; i<3; i++){
		let rand = getRandomInt(0, i-1);
		fruitToRandom.value = fruits.pop(rand);
		if (i == 0){
			fruitToRandom = fruit15;
		} else {
			fruitToRandom = fruit25;
		}
	}

	document.getElementById('5pointsFood').src = "./assets/img/" + fruit5.value + ".png";
	document.getElementById('15pointsFood').src = "./assets/img/" + fruit15.value + ".png";
	document.getElementById('25pointsFood').src = "./assets/img/" + fruit25.value + ".png";

	let foodSlider = document.getElementById('foodSlider');
	foodSlider.value = getRandomInt(50, 90);
	updateSlider(foodSlider.value, 'foodSliderNum');
	let timeSlider = document.getElementById('timeSlider');
	timeSlider.value = getRandomInt(60, 600);
	updateSlider(timeSlider.value, 'timeSliderNum');
	let ghostSlider = document.getElementById('ghostSlider');
	ghostSlider.value = getRandomInt(1, 4);
	updateSlider(ghostSlider.value, 'ghostSliderNum');
}





