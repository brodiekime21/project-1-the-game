const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')


const dancefloor = new Image()
dancefloor.src = "../images/dancefloor.png"

const bouncer = new Image()
bouncer.src = "../images/bouncer.png"

const drunkGirl = new Image()
drunkGirl.src = "../images/drunkGirl.png"

const drunkGuy = new Image()
drunkGuy.src = "../images/drunkGuy.png"

const taylorSwift = new Image()
taylorSwift.src = "../images/taylorSwift.png"

const badBunny = new Image()
badBunny.src = "../images/badBunny.png"

const stage = new Image()
stage.src = "../images/stage.png"


const startingX = canvas.width/2 - 37.5
const startingY = canvas.height/2 - 162.5

let intervalId;
let animationId;

let gameOn = false

let time = 30;





class Obstacle {

  constructor() {
    this.x = Math.random() * 690;
    this.y = -60;
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

class Obstacle2 {

    constructor() {
      this.x = -60;
      this.y = Math.random() * 690;
      this.width = 60;
      this.height = 60;
  
    }
  
    newPosition() {
      this.x++
    }
  
    draw() {
      ctx.drawImage(drunkGuy, this.x, this.y, 60, 60)
    }
  
  }

  class ObstacleT {

    constructor() {
      this.x = 750;
      this.y = Math.random() * 650;
      this.width = 65;
      this.height = 100;
  
    }
  
    newPosition() {
      this.x--
    }
  
    draw() {
      ctx.drawImage(taylorSwift, this.x, this.y, 65, 100)
    }
  
  }

  class ObstacleB {

    constructor() {
      this.x = Math.random() * 685;
      this.y = 750;
      this.width = 65;
      this.height = 100;
  
    }
  
    newPosition() {
      this.y--
    }
  
    draw() {
      ctx.drawImage(badBunny, this.x, this.y, 65, 100)
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
    this.x = this.x - 15
  },

  moveRight: function() {
    this.x = this.x + 15
  },

  moveUp: function() {
    this.y = this.y - 15
  },

  moveDown: function() {
    this.y = this.y + 15
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
let obstaclesArray2 = []
let obstaclesArrayT=[]
let obstaclesArrayB=[]

function checkCollision (obstacle) {

  if (player.y < obstacle.y + obstacle.height 
    && obstacle.y < player.y + player.height 
    && obstacle.x < player.x + player.width 
    & obstacle.x + obstacle.width > player.x ) {

    obstaclesArray.splice(obstaclesArray.indexOf(obstacle), 1);
  }
}

function checkCollision2 (obstacle2) {

    if (player.y < obstacle2.y + obstacle2.height 
      && obstacle2.y < player.y + player.height 
      && obstacle2.x < player.x + player.width 
      & obstacle2.x + obstacle2.width > player.x ) {
  
      obstaclesArray2.splice(obstaclesArray2.indexOf(obstacle2), 1);
    }
  }

  function checkCollisionT (obstacleT) {

    if (player.y < obstacleT.y + obstacleT.height 
      && obstacleT.y < player.y + player.height 
      && obstacleT.x < player.x + player.width 
      & obstacleT.x + obstacleT.width > player.x ) {
  
      obstaclesArrayT.splice(obstaclesArrayT.indexOf(obstacleT), 1);
    }
  }

  function checkCollisionB (obstacleB) {

    if (player.y < obstacleB.y + obstacleB.height 
      && obstacleB.y < player.y + player.height 
      && obstacleB.x < player.x + player.width 
      & obstacleB.x + obstacleB.width > player.x ) {
  
      obstaclesArrayB.splice(obstaclesArrayB.indexOf(obstacleB), 1);
    }
  }

function checkCollisionWithDj (obstacle) {

    if (dj.y < obstacle.y + obstacle.height 
      && obstacle.y < dj.y + dj.height 
      && obstacle.x < dj.x + dj.width 
      & obstacle.x + obstacle.width > dj.x ) {
  console.log("Obstacle 1 hit the dj")
        gameOver()  
    }
  }

  function checkCollisionWithDj2 (obstacle2) {

    if (dj.y < obstacle2.y + obstacle2.height 
      && obstacle2.y < dj.y + dj.height 
      && obstacle2.x < dj.x + dj.width 
      & obstacle2.x + obstacle2.width > dj.x ) {
  console.log("Obstacle 2 hit the dj")
        gameOver()  
    }
  }

  function checkCollisionWithDjT (obstacleT) {

    if (dj.y < obstacleT.y + obstacleT.height 
      && obstacleT.y < dj.y + dj.height 
      && obstacleT.x < dj.x + dj.width 
      & obstacleT.x + obstacleT.width > dj.x ) {
  console.log("Obstacle T hit the dj")
        gameOver()  
    }
  }

  function checkCollisionWithDjB (obstacleB) {

    if (dj.y < obstacleB.y + obstacleB.height 
      && obstacleB.y < dj.y + dj.height 
      && obstacleB.x < dj.x + dj.width 
      & obstacleB.x + obstacleB.width > dj.x ) {
  console.log("Obstacle B hit the dj")
        gameOver()  
    }
  }


function createObstacle() {
  intervalId = setInterval(()=>{
    obstaclesArray.push(new Obstacle())
  }, 2000+ Math.random() * 10000)
}

function createObstacle2() {
    intervalId = setInterval(()=>{
      obstaclesArray2.push(new Obstacle2())
    }, 2000+ Math.random() * 10000)
  }

function createObstacleT() {
    intervalId = setInterval(()=>{
      obstaclesArrayT.push(new ObstacleT())
    }, 2000+ Math.random() * 10000)
  }

function createObstacleB() {
    intervalId = setInterval(()=>{
      obstaclesArrayB.push(new ObstacleB())
    }, 2000+ Math.random() * 10000)
  }

function animationLoop() {
  animationId = setInterval(()=>{
    updateCanvas()
  }, 32)
}

function showTime() {
  ctx.fillStyle = 'black'
  ctx.fillRect(485, 15, 250, 50)

  ctx.fillStyle = "white"
  ctx.font = '24px Verdana'
  ctx.fillText(`Time Left: ${time}`, 500, 50)
}

function updateCanvas() {

  ctx.clearRect(0,0,750,750)
  
  ctx.drawImage(dancefloor, 0, 0, 750, 750)

  dj.draw()
  player.draw()
  

  for (let i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].y > canvas.height) {
      obstaclesArray.splice(i, 1)
    }

    obstaclesArray[i].newPosition()
    obstaclesArray[i].draw()
    checkCollisionWithDj(obstaclesArray[i])
    checkCollision(obstaclesArray[i])
}


for (let i = 0; i < obstaclesArray2.length; i++) {
    if (obstaclesArray2[i].y > canvas.height) {
      obstaclesArray2.splice(i, 1)
    }
    obstaclesArray2[i].newPosition()
    obstaclesArray2[i].draw()
    checkCollisionWithDj2(obstaclesArray2[i])
    checkCollision2(obstaclesArray2[i])
}

for (let i = 0; i < obstaclesArrayT.length; i++) {
    if (obstaclesArrayT[i].y > canvas.height) {
      obstaclesArrayT.splice(i, 1)
    }
    obstaclesArrayT[i].newPosition()
    obstaclesArrayT[i].draw()
    checkCollisionWithDjT(obstaclesArrayT[i])
    checkCollisionT(obstaclesArrayT[i])
}

for (let i = 0; i < obstaclesArrayB.length; i++) {
    if (obstaclesArrayB[i].y > canvas.height) {
      obstaclesArrayB.splice(i, 1)
    }
    obstaclesArrayB[i].newPosition()
    obstaclesArrayB[i].draw()
    checkCollisionWithDjB(obstaclesArrayB[i])
    checkCollisionB(obstaclesArrayB[i])
}
  
  
  showTime()
  if (time === -1) {
    gameOver()
  }
}

let timer;

function startGame() {
    clearInterval(timer)
    time = 30
    timer = setInterval(timedown, 1000);
    
    
    function timedown(){
      time= time - 1;
    }

  gameOn = true

  obstaclesArray = []
  obstaclesArray2 = []
  obstaclesArrayT = []
  obstaclesArrayB = []

  player.x = startingX
  player.y = startingY

  ctx.drawImage(dancefloor, 0, 0, 750, 750)
  dj.draw()
  player.draw()
  createObstacle()
  createObstacle2()
  createObstacleT()
  createObstacleB()
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
  
  if (time === -1) {
    ctx.fillStyle = "white"
    ctx.font = '30px Verdana'
    ctx.fillText("Congratulations! You've SAVED THE RAVE!", 60, 200)
  } else {
    ctx.fillStyle = "white"
    ctx.font = '30px Verdana'
    ctx.fillText("You didn't save the rave. You lose!", 110, 200)
  }
  
  obstaclesArray = []
  obstaclesArray2 = []
  obstaclesArrayT = []
  obstaclesArrayB = []
  time = 30
  
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