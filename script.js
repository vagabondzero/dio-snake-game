let canvas = document.getElementById('snake')
let score = document.getElementById('score')
let btn_audio_on = document.getElementById('btn_audio_on')
let btn_audio_off = document.getElementById('btn_audio_off')
let scoreCount = 0
let context = canvas.getContext('2d')
let box = 32
let snake = []
let direction = 'right'
let biteSFX = new Audio('sfx_bite.wav')
let playSFX = true
let food = {
  x: 0,
  y: 0
}

snake[0] = {
  x: 8 * box,
  y: 8 * box
}
function createBG() {
  context.fillStyle = 'yellow'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake(){
  for(let s of snake){
    context.fillStyle = 'blue'
    context.strokeRect(s.x, s.y, box, box)
    context.fillRect(s.x+2, s.y+2, box-2, box-2)
    context.strokeStyle = 'yellow'
    context.stroke()
  }
}

function drawFood(){
  context.fillStyle = 'red'
  context.fillRect(food.x+2, food.y+2, box-2, box-2)
  context.strokeRect(food.x, food.y, box, box)
  context.strokeStyle = 'yellow'
  context.stroke()
}

function updateScore(){
  scoreCount++
  score.innerHTML = scoreCount
}

document.addEventListener('keydown', update)

function update(event){
  if(event.keyCode === 39 || event.keyCode === 68 && direction !== 'left') direction = 'right'
  if(event.keyCode === 37 || event.keyCode === 65 && direction !== 'right') direction = 'left'
  if(event.keyCode === 40 || event.keyCode === 83 && direction !== 'up') direction = 'down'
  if(event.keyCode === 38 || event.keyCode === 87 && direction !== 'down') direction = 'up'
}

function foodPos(){
  food.x = Math.floor(Math.random() * 15 + 1) * box
  food.y = Math.floor(Math.random() * 15 + 1) * box
}

function playSFXF(){
  playSFX = !playSFX  
  btn_audio_on.classList.toggle('hidden')
  btn_audio_off.classList.toggle('hidden')
}

function startGame(){
  if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box
  if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0
  if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box
  if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0

  for(let i = 1; i < snake.length; i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      clearInterval(game)
      alert('Game Over')
    }
  }

  createBG()
  createSnake()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if(direction === 'left') snakeX -= box
  if(direction === 'right') snakeX += box
  if(direction === 'up') snakeY -= box
  if(direction === 'down') snakeY += box

  if(snakeX !== food.x || snakeY !== food.y){
    snake.pop()
  }
  else {
    if (playSFX) biteSFX.play()
    foodPos()
    updateScore()
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

foodPos()

let game = setInterval(startGame, 100)