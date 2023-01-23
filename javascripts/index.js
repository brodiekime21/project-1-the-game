const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')


const dancefloor = new Image()
dancefloor.src = "../images/dancefloor.png"

const bouncer = new Image()
bouncer.src = "../images/bouncer.png"

const startingX = canvas.width/2 - 37.5
const startingY = canvas.height/2 - 150

let intervalId;
let animationId;

let gameOn = false

let score = 0

class Obstacle {

  constructor() {
    this.x = Math.random() * 750;
    this.y = 0;
    this.width = 20 + Math.floor(Math.random() * 375);
    this.height = 20;

  }

  newPosition() {
    this.y++
  }

  draw() {
    ctx.fillStyle = 'brown'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

}

const player = {

  x: startingX,
  y: startingY,
  width: 75,
  height: 75,

  draw: function() {
    ctx.drawImage(bouncer, this.x, this.y, this.width, this.height)
  },

  moveLeft: function() {
    this.x = this.x - 10
  },

  moveRight: function() {
    this.x = this.x + 10
  },

  moveUp: function() {
    this.y = this.y - 10
  },

  moveDown: function() {
    this.y = this.y + 10
  }
}


function checkCollision (obstacle) {

  if (player.y < obstacle.y + obstacle.height 
    && obstacle.y < player.y + player.height 
    && obstacle.x < player.x + player.width 
    & obstacle.x + obstacle.width > player.x ) {
      gameOver()
  }

}

let obstaclesArray = []

function createObstacle() {
  
  intervalId = setInterval(()=>{
    obstaclesArray.push(new Obstacle())
  }, 2000)
}

function animationLoop() {
  animationId = setInterval(()=>{
    updateCanvas()
  }, 16)
}

function showScore() {
  ctx.fillStyle = 'black'
  ctx.fillRect(485, 15, 250, 50)

  ctx.fillStyle = "white"
  ctx.font = '24px Verdana'
  ctx.fillText(`Time Left: ${score}`, 500, 50)
}

function updateCanvas() {

  ctx.clearRect(0,0,750,750)
  
  ctx.drawImage(dancefloor, 0, 0, 750, 750)

  
  player.draw()
  
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].y > canvas.height) {
      obstaclesArray.splice(i, 1)
      score++
      console.log("This is the score:", score, obstaclesArray)
    }
    checkCollision(obstaclesArray[i])
    obstaclesArray[i].newPosition()
    obstaclesArray[i].draw()
  }
  
  showScore()
  if (score === 15) {
    gameOver()
  }
  
}


function startGame() {

  gameOn = true

  obstaclesArray = []
  player.x = startingX
  player.y = startingY

  ctx.drawImage(dancefloor, 0, 0, 750, 750)
  player.draw()
  createObstacle()
  animationLoop()

}

function gameOver() {

  gameOn = false
  
  console.log("Game over")
  clearInterval(animationId)
  clearInterval(intervalId)
  
  ctx.clearRect(0,0,750,750)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,750,750)
  
  if (score > 14) {
    ctx.fillStyle = "white"
    ctx.font = '30px Verdana'
    ctx.fillText("Congratulations! You've SAVED THE RAVE!", 60, 200)
  } else {
    ctx.fillStyle = "white"
    ctx.font = '30px Verdana'
    ctx.fillText("You didn't save the rave. You lose!", 110, 200)
  }
  
  obstaclesArray = []
  score = 0
  
}

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    if (gameOn === false) {
      startGame();
    }
  };

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
    }

  });

};