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
let intervalId2;
let intervalIdB;
let intervalIdT;
let animationId;

let gameOn = false


const song1 = new Audio("../songs/Mad World - Tears for Fears (Brodie Killem Edit) 1 minute.wav")
const song2 = new Audio("../songs/Last Christmas 1 minute for game.wav")
const song3 = new Audio("../songs/Gorillaz 1 minute for game.wav")

const spindown = new Audio("../songs/cd_fx_spindown.wav")




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


  const dj = {
    x: 287.5,
    y: 287.5,
    height: 175,
    width: 175,

    draw: function(){
        ctx.drawImage(stage, this.x,this.y,this.width,this.height)
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
    this.x = this.x - 25
    if(this.x <0){
        this.x= this.x+25
    }
    if (this.y < 445 && this.y > 232.5 && this.x > 230 && this.x <450){
        this.x= this.x+25
    }
  },

  moveRight: function() {
    this.x = this.x + 25
    if(this.x >675){
        this.x= this.x-25
    }
    if (this.y < 445 && this.y > 232.5 && this.x > 230 && this.x <450){
        this.x= this.x-25
    }
  },

  moveUp: function() {
    this.y = this.y - 25
    if(this.y <0){
        this.y= this.y+25
    }
    if (this.y < 445 && this.y > 232.5 && this.x > 230 && this.x <450){
        this.y= this.y+25
    }
  },

  moveDown: function() {
    this.y = this.y + 25
    if(this.y >675){
        this.y= this.y-25
    }
    if (this.y > 232.5 && this.y < 445 && this.x > 230 && this.x <450){
        this.y= this.y-25
    }
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
        ctx.fillStyle = "white"
        ctx.font = '24px "Press Start 2P"'
        ctx.fillText("OH NO!", 321, 140)
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("She spilled her beer", 180, 175) 
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("on the dj decks.", 225, 205) 
        ctx.font = '28px "Press Start 2P"'
        ctx.fillText("You lose!", 262, 250)
    }
  }

  function checkCollisionWithDj2 (obstacle2) {
    if (dj.y < obstacle2.y + obstacle2.height 
      && obstacle2.y < dj.y + dj.height 
      && obstacle2.x < dj.x + dj.width 
      & obstacle2.x + obstacle2.width > dj.x ) {
  console.log("Obstacle 2 hit the dj")
        gameOver()  
        ctx.fillStyle = "white"
        ctx.font = '24px "Press Start 2P"'
        ctx.fillText("OH NO!", 321, 140)
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("He spilled his beer", 190, 175) 
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("on the dj decks.", 225, 205) 
        ctx.font = '28px "Press Start 2P"'
        ctx.fillText("You lose!", 262, 250)
    }
  }

  function checkCollisionWithDjT (obstacleT) {
    if (dj.y < obstacleT.y + obstacleT.height 
      && obstacleT.y < dj.y + dj.height 
      && obstacleT.x < dj.x + dj.width 
      & obstacleT.x + obstacleT.width > dj.x ) {
  console.log("Obstacle T hit the dj")
        gameOver()  
        ctx.fillStyle = "white"
        ctx.font = '24px "Press Start 2P"'
        ctx.fillText("OH NO!", 321, 165)
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("The DJ doesn't play Taylor Swift.", 60, 205)
        ctx.font = '28px "Press Start 2P"'
        ctx.fillText("You lose!", 262, 250)
    }
  }

  function checkCollisionWithDjB (obstacleB) {

    if (dj.y < obstacleB.y + obstacleB.height 
      && obstacleB.y < dj.y + dj.height 
      && obstacleB.x < dj.x + dj.width 
      & obstacleB.x + obstacleB.width > dj.x ) {
  console.log("Obstacle B hit the dj")
        gameOver()  
        ctx.fillStyle = "white"
        ctx.font = '24px "Press Start 2P"'
        ctx.fillText("OH NO!", 321, 165)
        ctx.font = '20px "Press Start 2P"'
        ctx.fillText("The DJ already played Bad Bunny.", 70, 200)
        ctx.font = '28px "Press Start 2P"'
        ctx.fillText("You lose!", 262, 250)
    }
  }


function createObstacle() {
  intervalId = setInterval(()=>{
    obstaclesArray.push(new Obstacle())
  }, 7000)
}

function createObstacle2() {
    intervalId2 = setInterval(()=>{
      obstaclesArray2.push(new Obstacle2())
    }, 5000)
  }

function createObstacleT() {
    intervalIdT = setInterval(()=>{
      obstaclesArrayT.push(new ObstacleT())
    }, 6000)
  }

function createObstacleB() {
    intervalIdB = setInterval(()=>{
      obstaclesArrayB.push(new ObstacleB())
    }, 5000)
  }

function animationLoop() {
  animationId = setInterval(()=>{
    updateCanvas()
  }, 32)
}

function showTime() {
  ctx.fillStyle = 'black'
  ctx.fillRect(500, 19, 230, 46)

  ctx.fillStyle = "white"
  ctx.font = '16px "Press Start 2P"'
  ctx.fillText(`Time Left: ${time}`, 510, 50)
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
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
button.addEventListener("click", () => {
    if(gameOn === true){
        return;
    }
    else{
    let randomNumber = Math.floor(Math.random()* 3)
    
    if (randomNumber === 0){
        song1.play();
    }
    else if (randomNumber === 1){
        song2.play();
    }
    else if (randomNumber === 2){
        song3.play();
    }
}
});
});

function startGame() {
     
    clearInterval(timer)
    time = 45
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
  clearInterval(intervalId2)
  clearInterval(intervalIdB)
  clearInterval(intervalIdT)
  
  ctx.clearRect(0,0,750,750)
  ctx.fillStyle = 'black'
  ctx.fillRect(0,0,750,750)
  
  if (time === -1) {
    ctx.fillStyle = "white"
    ctx.font = '30px "Press Start 2P"'
    ctx.fillText("Congratulations!", 145, 200)
    ctx.font = '24px "Press Start 2P"'
    ctx.fillText("You've SAVED THE RAVE!", 118, 250)
  } else {
    
    song1.pause();
    song1.currentTime = 0
    song2.pause();
    song2.currentTime = 0
    song3.pause();
    song3.currentTime = 0
    spindown.play();
  }
  
  obstaclesArray = []
  obstaclesArray2 = []
  obstaclesArrayT = []
  obstaclesArrayB = []
  
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

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);