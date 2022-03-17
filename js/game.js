import {update as updateSnake, draw as drawSnake, SNAKE_SPEED,getSnakeHead,snakeIntersection} from './snake.js'
import {update as updateFood, draw as drawFood, getScore as getScore} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')

document.getElementById ("btnRestart").addEventListener ("click", restarter, false);

function main(currentTime){

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)


function update(){
    updateSnake()
    updateFood()
    displayScore()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function displayScore(){
    const scoreElem = document.getElementById("score-board")
    scoreElem.textContent = 'Score: ' + getScore()
}

function restarter(){
    window.location = '/'
}