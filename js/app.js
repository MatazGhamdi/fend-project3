// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
   
    this.sprite = 'images/enemy-bug.png';
};



let lives = 3;
Enemy.prototype.update = function (dt) {

    this.x = this.x + this.speed * dt;

    // if enemy goes outside canvas, spawn it again at 0 x axis
    if (this.x > 510) {
        this.x = 0;
        //Randomize speed
        this.speed = 100 + Math.random() * 200 ;
    }

    // Check collision
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        //return player's position
        player.x = 200;
        player.y = 400;
        livesCount();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
let score = 0;
var Player = function (x, y, score) {

    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function () {



};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

let scoreTrigger = false;


Player.prototype.handleInput = function (keypress) {

    if (score <= 3 && lives > 0){
        if (keypress == 'left' && this.x > 10) {
            this.x -= 100;
        }
    
        if (keypress == 'right' && this.x < 400) {
            this.x += 100;
        }
    
        if (keypress == 'up' && this.y > 0) {
            this.y -= 90;
        }
    
        if (keypress == 'down' && this.y < 400) {
            this.y += 90;
        }
    
        //Reset game
        if (this.y < 10 && !scoreTrigger){
            scoreTrigger = true;
    
            setTimeout(() => {
                player.x = 200;
                player.y = 400;
            }, 800);
            updateScore();
        }
    }
   
}


var allEnemies = [];
var spawnEnemies = [60, 140, 230];

//Addign enemies
spawnEnemies.forEach(function (enemyPosition) {
    enemy = new Enemy(0,enemyPosition, 400);
    allEnemies.push(enemy);
})

// Place the player object in a variable called player
var player = new Player(202, 405);

var updateScore = function() {
    score++;
    document.getElementById('score').innerHTML = score;

    // So that the score is not added multiple times
    setTimeout(() => {
        scoreTrigger = false;
    }, 800);

    // Winning condition
    if (score > 3){
       
        Swal.fire({
            title: 'VICTORY!!',
            text: 'Congratulations! You Beat The Game!',
            confirmButtonText: 'Cool!'
        }).then((result) => {
            if (result.value) {
                restartGame();
            }
        })
    }
}; 


var livesCount = function (){
    lives -- ;
    document.getElementById('lives').innerHTML = lives;

    if (lives <= 0){
        Swal.fire({
            title: 'Game Over!',
            text: 'You Lost',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cool =('
        }).then((result) => {
            
                restartGame();
            
        })
    }
}

function restartGame() {
    location.reload()
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
