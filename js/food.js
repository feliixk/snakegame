import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let score = 0
let food = getRandomFoodPos()
let EXPANSION_RATE = 1
let SCORE_RATE = 1

export function update(){
    if (onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPos()

        score += SCORE_RATE
    }

}

export function draw(gameBoard){

    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x

        foodElement.classList.add('food')
        EXPANSION_RATE = 1
        SCORE_RATE = 1
    
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPos(){
    let newFoodPosition
    while(newFoodPosition == null ||onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

export function getScore(){
    return score
}