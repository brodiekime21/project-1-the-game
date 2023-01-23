const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')


const dancefloor = new Image()
dancefloor.src = "../images/dancefloor.png"

const bouncer = new Image()
bouncer.src = "../images/bouncer.png"

const drunkGirl = new Image()
drunkGirl.src = "../images/drunkGirl.png"

const stage = new Image()
stage.src = "../images/stage.png"


const startingX = canvas.width/2 - 37.5
const startingY = canvas.height/2 - 162.5

let intervalId;
let animationId;

let gameOn = false

let score = 0

class Obstacle {

  constructor() {
    this.x = Math.random() * 690;
    this.y = 0;
    this.width = 60;
    this.height = 60;

  }

  newPosition() {
    this.y++
  }

  draw() {
    ctx.drawImage(drunkGirl, this.x, this.y, 60, 60)
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

const dj = {
    x: 287.5,
    y: 287.5,
    height: 175,
    width: 175,

    draw: function(){
        ctx.drawImage(stage, this.x,this.y,this.width,this.height)
    }
}

let obstaclesArray = []


function checkCollision (obstacle) {

  if (player.y < obstacle.y + obstacle.height 
    && obstacle.y < player.y + player.height 
    && obstacle.x < player.x + player.width 
    & obstacle.x + obstacle.width > player.x ) {

    obstaclesArray.splice(obstaclesArray.indexOf(obstacle), 1);

  }
}

function checkCollisionWithDj (obstacle) {

    if (dj.y < obstacle.y + obstacle.height 
      && obstacle.y < dj.y + dj.height 
      && obstacle.x < dj.x + dj.width 
      & obstacle.x + obstacle.width > dj.x ) {
  console.log("hit the dj")
        gameOver()  
    }
  }


function createObstacle() {
  
  intervalId = setInterval(()=>{
    obstaclesArray.push(new Obstacle())
  }, 3000)
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

  dj.draw()
  player.draw()
  
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].y > canvas.height) {
      obstaclesArray.splice(i, 1)
      score++
      console.log("This is the score:", score, obstaclesArray)
    }
    obstaclesArray[i].newPosition()
    obstaclesArray[i].draw()
    checkCollisionWithDj(obstaclesArray[i])
    checkCollision(obstaclesArray[i])
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
  dj.draw()
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