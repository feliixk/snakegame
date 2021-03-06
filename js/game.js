import {update as updateSnake, draw as drawSnake, SNAKE_SPEED,getSnakeHead,snakeIntersection} from './snake.js'
import {update as updateFood, draw as drawFood, getScore as getScore} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0
let gameOver = false
let name = '';
const gameBoard = document.getElementById('game-board')

//highscore constants
const NUMBER_OF_HIGHSCORES = 5;
const HIGH_SCORES = 'highscores'
const highScoreString = localStorage.getItem(HIGH_SCORES)

//if no local storage is found, return empty array
const highScores = JSON.parse(highScoreString) ?? []
const lowestScore = highScores[NUMBER_OF_HIGHSCORES -1 ]?.score ?? 0


//main game loop
function main(currentTime){

    if (gameOver){
        gameOverScreen()
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

//displays 'game over' screen
function gameOverScreen() {
    document.getElementById("game-over").style.display = "table";
    document.getElementById("score-gameover").innerHTML = "Score: " + getScore() + " points"
    showHighScores()

    document.querySelector(".btnSubmitScore").addEventListener('click', async (event) => {
        event.preventDefault()
        if (document.querySelector('[name="fname"]').value === ""){
            alert("Name cannot be empty. Please enter a name.")
        }else{
        name = document.querySelector('[name="fname"]').value
        checkHighScore(getScore())
        showHighScores()
        document.querySelector(".btnSubmitScore").setAttribute("disabled", "")
        }
    })
  }

//update function to check for all different cases
function update(){
    checkDeath()
    updateSnake()
    updateFood()
    displayScore()
}

// draw snake and food each update
function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function displayScore(){
    const scoreElem = document.getElementById("score-board")
    scoreElem.textContent = 'Score: ' + getScore()
}

function checkHighScore(score){
    if (score > lowestScore){
        submitHighScore(score, highScores)
    }
}

// function to submit new score, and sort accordingly
function submitHighScore(score, highScores){
    const newScore = {score, name}

    highScores.push(newScore)
    highScores.sort((a,b) => b.score-a.score)
    highScores.splice(NUMBER_OF_HIGHSCORES)
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores))
}

//function to get highscores and displaying
function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const highScoreList = document.getElementById("highScore-list");
    highScoreList.innerHTML = "";
    
    highScoreList.innerHTML += "<h2>Highscores</h2>" + highScores
      .map((score) => `<li>${score.score} pts??? -&ensp; ???${score.name}`)
      .join('');
  }

  window.requestAnimationFrame(main)